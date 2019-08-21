const { UserModel } = require('../models');
const HttpStatus = require('../HttpStatus');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const config = require('../config');

const EXPIRES_IN_MINUTES =  '1440m';

module.exports = {
    insertUser: (req, res) => {
        const body = req.body;
        if(!body){
            return res.status(HttpStatus.unauthorized).json({
                success: false,
                error: 'Must be Logged In',
            })
        }
        UserModel.find({ email: body.email }, (err, docs) => {
            if(docs.length) {
                return res
                    .status(HttpStatus.badRequest)
                    .json({ success: false, error: 'Account Already Exists' });
            } else {
                const user = new UserModel(body);
                if(!user) {
                    return res
                        .status(HttpStatus.badRequest)
                        .json({ success: false, error: err});
                }
                user
                    .save()
                    .then(() => {
                        res.status(HttpStatus.created).json({
                            success: true,
                            id: user._id,
                            message: 'Account Created',
                        })
                    })
                    .catch(error => {
                        res.status(HttpStatus.badRequest).json({
                            success: false,
                            error,
                            message: 'Account creation failed',
                        })
                    })
            }
        })
    },
    authenticate: (req, res) => {
        const email = req.body.email;
        const password = req.body.password;

        UserModel.findOne({ email }).then((user, err) => {
            if(err){
                return res
                    .status(HttpStatus.badRequest)
                    .json({ success: false, error: err })
            }
            if(!user){
                return res.status(HttpStatus.notFound).json({
                    success: false,
                    error: `Email not found`,
                })
            }
            bcrypt.compare(password, user.password, function(err, result){
                if(result === true){
                    const payload = { user: user._id }
                    const token = jwt.sign(payload, config.JWTSecret, {
                        expiresIn: EXPIRES_IN_MINUTES,
                    })
                    user.password = undefined;
                    return res.status(HttpStatus.OK).json({
                        success: true,
                        user,
                        token,
                        message: 'Account Successfully Authenticated',
                    })
                } else {
                    return res.status(HttpStatus.notAcceptable).json({
                        success: false,
                        error: 'Password does not match'
                    })
                }
            })
        })
    },
}