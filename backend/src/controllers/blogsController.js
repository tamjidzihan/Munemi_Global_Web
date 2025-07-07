const blogService = require('../services/blogsService');
const fs = require('fs').promises;
const path = require('path');

// Configure upload directory path
const uploadDir = path.join(__dirname, '../uploads/');


const getAllBlogs = async (req, res) => {
    try {
        const blogs = await blogService.getBlogs();
        res.status(200).json(blogs);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error fetching blogs" });
    }
};

const getPublishedBlogs = async (req, res) => {
    try {
        const blogs = await blogService.getPublishedBlogs();
        res.status(200).json(blogs);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error fetching published blogs" });
    }
};

const getBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await blogService.findBlogById(id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json(blog);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error fetching blog" });
    }
};

const getBlogBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const blog = await blogService.findBlogBySlug(slug);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json(blog);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error fetching blog" });
    }
};

const createBlog = async (req, res) => {
    try {
        const {
            title,
            author,
            content,
            category,
            slug,
            status
        } = req.body;

        // Get uploaded featured image filename if exists
        const featuredImage = req.file ? req.file.filename : null;

        if (!title || !author || !content || !category || !slug) {
            // Clean up uploaded file if validation fails
            if (req.file) {
                await fs.unlink(path.join(uploadDir, req.file.filename));
            }
            return res.status(400).json({ message: "Please fill out all required fields" });
        }

        const newBlog = await blogService.createBlog({
            title,
            author,
            content,
            category,
            featuredImage,
            slug,
            status,
            publishedAt: status === 'published' ? new Date() : null
        });

        res.status(201).json(newBlog);
    } catch (error) {
        // Clean up uploaded file if error occurs
        if (req.file) {
            await fs.unlink(path.join(uploadDir, req.file.filename)).catch(console.error);
        }
        console.log(error);
        res.status(500).json({ message: "Error creating blog", error: error.message });
    }
};

const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            title,
            author,
            content,
            category,
            slug,
            status
        } = req.body;

        // Get current blog data
        const existingBlog = await blogService.findBlogById(id);
        if (!existingBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // Prepare update data
        const updateData = {
            title,
            author,
            content,
            category,
            slug,
            status,
            publishedAt: status === 'published' && !existingBlog.publishedAt
                ? new Date()
                : existingBlog.publishedAt
        };

        // Handle featured image update
        let oldFeaturedImage = null;
        if (req.file) {
            updateData.featuredImage = req.file.filename;
            oldFeaturedImage = existingBlog.featuredImage;
        }

        // Validate required fields
        if (!title || !author || !content || !category || !slug) {
            // Clean up newly uploaded file if validation fails
            if (req.file) {
                await fs.unlink(path.join(uploadDir, req.file.filename));
            }
            return res.status(400).json({ message: "Please fill out all required fields" });
        }

        // Update the blog
        await blogService.updateBlog(id, updateData);
        const updatedBlog = await blogService.findBlogById(id);

        // Delete old featured image if it was replaced
        if (oldFeaturedImage) {
            try {
                await fs.unlink(path.join(uploadDir, oldFeaturedImage));
            } catch (err) {
                console.error(`Error deleting old featured image: ${oldFeaturedImage}`, err);
            }
        }

        res.status(200).json(updatedBlog);
    } catch (error) {
        // Clean up newly uploaded file if error occurs
        if (req.file) {
            await fs.unlink(path.join(uploadDir, req.file.filename)).catch(console.error);
        }
        console.log(error);
        res.status(500).json({ message: "Error updating blog", error: error.message });
    }
};

const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blogToDelete = await blogService.findBlogById(id);

        if (!blogToDelete) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // Delete the blog record
        const deleted = await blogService.deleteBlog(id);

        if (!deleted) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // Delete associated featured image if exists
        if (blogToDelete.featuredImage) {
            try {
                await fs.unlink(path.join(uploadDir, blogToDelete.featuredImage));
            } catch (err) {
                console.error(`Error deleting featured image: ${blogToDelete.featuredImage}`, err);
            }
        }

        res.status(204).json({ message: "Blog deleted successfully" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error deleting blog", error: error.message });
    }
};

module.exports = {
    getAllBlogs,
    getPublishedBlogs,
    getBlogById,
    getBlogBySlug,
    createBlog,
    updateBlog,
    deleteBlog
};