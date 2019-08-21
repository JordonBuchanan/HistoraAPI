const express = require('express');
const { postController } = require('../controllers');
const router = express.Router();

router.get('/posts', postController.getAllPosts);
router.post('/posts/add', postController.createPost);
router.get('/posts/:id', postController.getPostById);
router.post('/posts/:id', postController.deletePost);
router.put('/posts/:id', postController.updatePost);

module.exports = router;