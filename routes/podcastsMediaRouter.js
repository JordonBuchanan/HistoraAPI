const express = require('express');
const { podcastsMediaController } = require('../controllers');
const router = express.Router();

router.get('/podcastsmedia', podcastsMediaController.getAllPodcastsMedia);
router.post('/podcastsmedia/add', podcastsMediaController.createPodcastsMedia);
router.get('/podcastsmedia/:id', podcastsMediaController.getPodcastsMediaById);
router.post('/podcastsmedia/:id', podcastsMediaController.deletePodcastsMedia);
router.put('/podcastsmedia/:id', podcastsMediaController.updatePodcastsMedia);

module.exports = router;