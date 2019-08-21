const express = require('express');
const { videosMediaController } = require('../controllers');
const router = express.Router();

router.get('/videosmedia', videosMediaController.getAllVideosMedia);
router.post('/videosmedia/add', videosMediaController.createVideosMedia);
router.get('/videosmedia/:id', videosMediaController.getVideosMediaById);
router.post('/videosmedia/:id', videosMediaController.deleteVideosMedia);
router.put('/videosmedia/:id', videosMediaController.updateVideosMedia);

module.exports = router;