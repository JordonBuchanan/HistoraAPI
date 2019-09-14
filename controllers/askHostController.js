const { UserModel } = require('../models');
const { AdminModel } = require('../models');
const HttpStatus = require('../HttpStatus');
const nodemailer = require('nodemailer');

askHost = async(req, res, next) => {
    AdminModel.findById(req.body.admin.admin._id).then(function(user){
      if (!user) { 
        return res.sendStatus(HttpStatus.unauthorized); 
      }
      let payload = req.body.body;
      let sender = req.body.admin.admin.name;
      let testAccount = nodemailer.createTestAccount();
      let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass // generated ethereal password
        }
    });

    let info = transporter.sendMail({
        from: sender,
        to: 'jordonbuchanan@outlook.com',
        subject: 'New Question!',
        text: payload,
        html: '<b>' + payload + '</b>'
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

  }).catch(next);
};

module.exports = {
    askHost,
}