const { UserModel } = require('../models');
const { AdminModel } = require('../models');
const HttpStatus = require('../HttpStatus');
const nodemailer = require('nodemailer');
const config = require('../config');

askHost = async(req, res, next) => {
    console.log(req.body)
    AdminModel.findById(req.body.admin.admin._id).then(function(user){
      if (!user) { 
        return res.sendStatus(HttpStatus.unauthorized); 
      }
      let payload = req.body.body;
      let sender = req.body.admin.admin.name;
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: config.HISTORA_EMAIL,
            clientId: config.CLIENT_ID,
            clientSecret: config.CLIENT_SECRET,
            refreshToken: config.REFRESH_TOKEN,
            accessToken: config.ACCESS_TOKEN
        }
    });

    let info = transporter.sendMail({
        from: sender,
        to: config.HOST_EMAIL,
        subject: 'New Question!',
        text: payload,
        html: '<b>' + payload + '</b>'
    });

    return res.status(HttpStatus.OK).json({
      message: 'Sent!'
  }) 

  }).catch(next);
};

module.exports = {
    askHost,
}