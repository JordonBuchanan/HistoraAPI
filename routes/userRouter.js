const express = require('express');
const { userController } = require('../controllers');
const router = express.Router();
const guard = require('express-jwt-permissions');

router.post('/user', userController.insertUser);
router.post('/user/auth', userController.authenticate);

module.exports = router