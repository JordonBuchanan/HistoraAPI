const express = require('express');
const { annoucementController } = require('../controllers');
const router = express.Router();

router.get('/annoucements', annoucementController.getAllAnnoucements);
router.post('/annoucements/add', annoucementController.createAnnoucement);
router.get('/annoucements/:id', annoucementController.getAnnoucementById);
router.delete('/annoucements/:id', annoucementController.deleteAnnoucement);
router.put('/annoucements/:id', annoucementController.updateAnnoucement);

module.exports = router;