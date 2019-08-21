const express = require('express');
const { biographyController } = require('../controllers');
const router = express.Router();

router.get('/biography', biographyController.getAllBiographies);
router.post('/biography/add', biographyController.createBiography);
router.get('/biography/:id', biographyController.getBiographyById);
router.post('/biography/:id', biographyController.deleteBiography);
router.put('/biography/:id', biographyController.updateBiography);

module.exports = router;