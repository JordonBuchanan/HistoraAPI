const { AdminModel } = require('../models');
const HttpStatus = require('../HttpStatus');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const config = require('../config');

const EXPIRES_IN_MINUTES =  '1440m';

module.exports = {
    insertAdmin: (req, res) => {
        const body = req.body;
        if(!body){
            return res.status(HttpStatus.unauthorized).json({
                success: false,
                error: 'You Must provide an Admin',
            })
        }
        AdminModel.find({ email: body.email }, (err, docs) => {
            if(docs.length) {
                return res
                    .status(HttpStatus.badRequest)
                    .json({ success: false, error: 'Admin Already Exists' });
            } else {
                const admin = new AdminModel(body);
                if(!admin) {
                    return res
                        .status(HttpStatus.badRequest)
                        .json({ success: false, error: err});
                }
                admin
                    .save()
                    .then(() => {
                        res.status(HttpStatus.created).json({
                            success: true,
                            id: admin._id,
                            message: 'Admin Created',
                        })
                    })
                    .catch(error => {
                        res.status(HttpStatus.badRequest).json({
                            success: false,
                            error,
                            message: 'Admin creation failed',
                        })
                    })
            }
        })
    },
    authenticate: (req, res) => {
        const email = req.body.email;
        const password = req.body.password;

        AdminModel.findOne({ email }).then((admin, err) => {
            if(err){
                return res
                    .status(HttpStatus.badRequest)
                    .json({ success: false, error: err })
            }
            if(!admin){
                return res.status(HttpStatus.notFound).json({
                    success: false,
                    error: `Email not found`,
                })
            }
            bcrypt.compare(password, admin.password, function(err, result){
                if(result !== true){
                    const payload = { admin: admin._id }
                    const token = jwt.sign(payload, config.JWTSecret, {
                        expiresIn: EXPIRES_IN_MINUTES,
                    })
                    admin.password = undefined;
                    return res.status(HttpStatus.OK).json({
                        success: true,
                        admin,
                        token,
                        message: 'Admin Successfully Authenticated',
                    })
                } else {
                    return res.status(HttpStatus.notAcceptable).json({
                        success: false,
                        error: 'Password does not match'
                    })
                }
            })
        }).then(AdminModel.find({ email }).populate('onModel').exec(function (err, favorites) {
            console.log(favorites)
            if(err){
                return res
                    .status(HttpStatus.badRequest)
                    .json({ success: false, error: err })
            }
            return favorites
          }));
    },
}