const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();


let transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com', 
  port: 587, 
  secure: false, 
  auth: {
    user: process.env.EMAILID, 
    pass: process.env.EMAILPASSWORD, 
  },
});

// // Set up email data
// let mailOptions = {
//   from: '"Merci Emart" shop@merciemart.com', // Sender address
//   to: 'sridharnagandla9@gmail.com', // List of recipients
//   subject: 'Hello from Merci Emart', // Subject line
//   text: 'Thankyou', // Plain text body
//   html: '<b>This is Test</b>', // HTML body
// };

// // Send mail with the defined transport object
// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     return console.log(error);
//   }
//   console.log('Message sent: %s', info.messageId);
//   // Preview only available when sending through an Ethereal account
//   console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
// });



 const sendEmail = async (toEmail, subject, htmlMsg) => {

  const mailOptions = {
    from: '"Merci Emart" shop@merciemart.com',
    to: toEmail,
    subject: subject, 
    html: htmlMsg,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    // console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    return true
  } catch (error) {
    // console.error('Error sending email:', error);
    return false
  }
};

module.exports = sendEmail