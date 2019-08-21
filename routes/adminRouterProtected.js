const express = require('express');
const { adminController } = require('../controllers');
const router = express.Router();

router.post('/admin', adminController.insertAdmin);

module.exports = router