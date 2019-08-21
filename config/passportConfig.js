/* const passport = require('passport');
const { Strategy: TwitterStrategy } = require('passport-twitter');
const { OAuth2Strategy: GoogleStrategy } = require('passport-google-oauth');
const {
    TWITTER_CONFIG, GOOGLE_CONFIG 
} = require('../config');

module.exports = () => {
    passport.serializeUser((user, cb) => cb(null, user));
    passport.deserializeUser((obj, cb) => cb(null, obj));

    const callback = (accessToken, refreshToken, profile, cb) => cb(null, profile);

    passport.use(new TwitterStrategy(TWITTER_CONFIG, callback));
    passport.use(new GoogleStrategy(GOOGLE_CONFIG, callback));
} */

const { Strategy, ExtractJwt } = require('passport-jwt');
const config = require('./index');
const secret = config.JWTSecret;
const mongoose = require('mongoose');
const User = require('../models/User');
const Admin = require('../models/Admin');
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
};

module.exports = passport => {
    passport.use(
        new Strategy(opts, (payload, done) => {
            User.findById(payload.id)
                .then(user => {
                    if(user){
                        return done(null, {
                            id: user.id,
                            email: user.email,
                        });
                    }
                    return done(null, false);
                }).catch(err => console.error(err));
            Admin.findById(payload.id)
                .then(admin => {
                    if(admin){
                        return done(null, {
                            id: admin.id,
                            email: admin.email,
                        });
                    }
                    return done(null, false);
                }).catch(err => console.error(err));
        })
    )
}