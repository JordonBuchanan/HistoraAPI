const express = require('express');
const { favoriteController } = require('../controllers');
const router = express.Router();
const passport = require('passport');

router.post('/:id/favorite', favoriteController.favorite);
router.post('/:id/unfavorite', favoriteController.unfavorite);

module.exports = router;