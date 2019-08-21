const express = require('express');
const { likeController } = require('../controllers');
const router = express.Router();
const passport = require('passport');

router.post('/posts/:id/like/', likeController.Like);
router.post('/posts/:id/unlike', likeController.Unlike);

module.exports = router;