const express = require('express');
const { paperMediaController } = require('../controllers');
const router = express.Router();

router.get('/papermedia', paperMediaController.getAllPaperMedia);
router.post('/papermedia/add', paperMediaController.createPaperMedia);
router.get('/papermedia/:id', paperMediaController.getPaperMediaById);
router.post('/papermedia/:id', paperMediaController.deletePaperMedia);
router.put('/papermedia/:id', paperMediaController.updatePaperMedia);

module.exports = router;