const express = require('express');
const { podcastController } = require('../controllers');
const router = express.Router();

router.get('/podcasts', podcastController.getAllPodcasts);
router.post('/podcasts/add', podcastController.createPodcast);
router.get('/podcasts/:id', podcastController.getPodcastById);
router.delete('/podcasts/:id', podcastController.deletePodcast);
router.put('/podcasts/:id', podcastController.updatePodcast);

module.exports = router;