var nodemailer = require('nodemailer');
var randomString = require('randomstring');
exports.sendMail = (toMail,subject, message)=>{

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MAIL,
          pass: process.env.PASSWORD,
        }
      });
      
      var mailOptions = {
        from: process.env.MAIL,
        to: toMail,
        subject: subject,
        text: message
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}
exports.otp = function(){
    return randomString.generate({length:6, charset: 'alphanumeric',capitalization: 'uppercase'})

}