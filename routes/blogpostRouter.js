const express = require('express');
const { blogPostController } = require('../controllers');
const router = express.Router();

router.get('/blog', blogPostController.getBlogPosts);
router.post('/blog/add', blogPostController.createBlogPost);
router.get('/blog/:id', blogPostController.getBlogPostsById);
router.delete('/blog/:id', blogPostController.deleteBlogPost);
router.put('/blog/:id', blogPostController.updateBlogPost);

module.exports = router;