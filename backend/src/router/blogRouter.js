const blogController = require('../controllers/blogsController');
const upload = require("../middlewares/multerConfig");
const { isAuthenticated } = require("../middlewares");


module.exports = (router) => {
    // Public routes
    router.get('/blogs', blogController.getAllBlogs);
    router.get('/blogs/published', blogController.getPublishedBlogs);
    router.get('/blogs/slug/:slug', blogController.getBlogBySlug);
    router.get('/blogs/:id', blogController.getBlogById);

    // Protected routes
    router.post(
        '/blogs',
        isAuthenticated,
        upload.single('featuredImage'), // Single image upload
        blogController.createBlog
    );
    router.put(
        '/blogs/:id',
        isAuthenticated,
        upload.single('featuredImage'), // Single image upload
        blogController.updateBlog
    );

    router.delete(
        '/blogs/:id',
        isAuthenticated,
        blogController.deleteBlog
    );
};