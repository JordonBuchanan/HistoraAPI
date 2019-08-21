/* const express = require('express');
const router = express.Router();
const passport = require('passport');
const socialAuthController = require('../controllers/socialAuthController');

const twitterAuth = passport.authenticate('twitter');
const googleAuth = passport.authenticate('google', { scope: ['profile'] });

const addSocketIdtoSession = (req, res, next) => {
    req.session.socketId = req.query.socketId
    next()
};

router.get('/twitter', addSocketIdtoSession, twitterAuth);
router.get('/google', addSocketIdtoSession, googleAuth);

router.get('/twitter/callback', twitterAuth, socialAuthController.twitter);
router.get('/google/callback', googleAuth, socialAuthController.google) */