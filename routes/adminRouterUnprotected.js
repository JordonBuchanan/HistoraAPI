const express = require('express');
const { adminController } = require('../controllers');
const router = express.Router();

router.post('/admin/auth', adminController.authenticate);

module.exports = router