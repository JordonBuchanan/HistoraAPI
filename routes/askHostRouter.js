const express = require('express');
const { askHostController } = require('../controllers');
const router = express.Router();

router.post('/askhost', askHostController.askHost);

module.exports = router;