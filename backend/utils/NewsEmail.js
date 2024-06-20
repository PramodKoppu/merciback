const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();


let transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com', 
  port: 587, 
  secure: false, 
  auth: {
    user: process.env.NEWSEMAILID, 
    pass: process.env.NEWSEMAILPASSWORD, 
  },
});

 const newsEmail = async (toEmail, subject, htmlMsg) => {

  const mailOptions = {
    from: '"Merci Emart" no-reply@merciemart.com',
    to: toEmail,
    subject: subject, 
    html: htmlMsg,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    // console.log('Message sent: %s', info.messageId);
    // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    return true
  } catch (error) {
    // console.error('Error sending email:', error);
    return false
  }
};

module.exports = newsEmail