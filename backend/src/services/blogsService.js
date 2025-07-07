const Blog = require('../models/BlogModel');

const getBlogs = (options = {}) => Blog.findAll(options);
const findBlogById = (id) => Blog.findByPk(id);
const findBlogBySlug = (slug) => Blog.findOne({ where: { slug } });
const createBlog = (values) => Blog.create(values);
const updateBlog = (id, values) => Blog.update(values, { where: { id }, returning: true });
const deleteBlog = (id) => Blog.destroy({ where: { id } });

// Additional blog-specific services
const getPublishedBlogs = () => Blog.findAll({
    where: { status: 'published' },
    order: [['publishedAt', 'DESC']]
});

const getBlogsByCategory = (category) => Blog.findAll({
    where: { category, status: 'published' },
    order: [['publishedAt', 'DESC']]
});

module.exports = {
    getBlogs,
    findBlogById,
    findBlogBySlug,
    createBlog,
    updateBlog,
    deleteBlog,
    getPublishedBlogs,
    getBlogsByCategory
};