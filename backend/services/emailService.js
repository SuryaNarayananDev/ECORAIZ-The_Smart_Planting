const nodemailer = require('nodemailer');
const config = require('../config/config');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.emailUser,
    pass: config.emailPass
  }
});

exports.sendOTP = async (to, otp) => {
  await transporter.sendMail({
    from: config.emailUser,
    to,
    subject: 'Your OTP Code',
    text: `Your OTP is: ${otp}`
  });
};
