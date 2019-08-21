const express = require('express');
const { commentController } = require('../controllers');
const router = express.Router();

router.post('/posts/:id/comment', commentController.commentPost);
router.delete('/posts/:id/:comment', commentController.commentDelete);

module.exports = router;