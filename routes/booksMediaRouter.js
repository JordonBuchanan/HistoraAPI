const express = require('express');
const { booksMediaController } = require('../controllers');
const router = express.Router();

router.get('/booksmedia', booksMediaController.getAllBooksMedia);
router.post('/booksmedia/add', booksMediaController.createBooksMedia);
router.get('/booksmedia/:id', booksMediaController.getBooksMediaById);
router.post('/booksmedia/:id', booksMediaController.deleteBooksMedia);
router.put('/booksmedia/:id', booksMediaController.updateBooksMedia);

module.exports = router;
