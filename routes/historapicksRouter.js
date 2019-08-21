const express = require('express');
const { historapicksController } = require('../controllers');
const router = express.Router();

router.get('/historapicks', historapicksController.getAllHistoraPicks);
router.post('/historapicks/add', historapicksController.createHistoraPicks);
router.post('/historapicks/:id', historapicksController.getHistoraPicksById);
router.get('/historapicks/:id', historapicksController.updateHistoraPicks);

module.exports = router;