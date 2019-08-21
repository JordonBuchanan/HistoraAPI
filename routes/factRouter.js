const express = require('express');
const { factController } = require('../controllers');
const router = express.Router();

router.get('/facts', factController.getAllFacts);
router.post('/facts/add', factController.createFact);
router.get('/facts/:id', factController.getFactById);
router.delete('/facts/:id', factController.deleteFact);
router.put('/facts/:id', factController.updateFact);

module.exports = router;