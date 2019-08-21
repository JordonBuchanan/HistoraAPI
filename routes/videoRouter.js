const express = require('express');
const { videoController } = require('../controllers');
const router = express.Router();

router.get('/videos', videoController.getAllVideos);
router.post('/videos/add', videoController.createVideo);
router.get('/videos/:id', videoController.getVideoById);
router.delete('/videos/:id', videoController.deleteVideo);
router.put('/videos/:id', videoController.updateVideo);

module.exports = router;