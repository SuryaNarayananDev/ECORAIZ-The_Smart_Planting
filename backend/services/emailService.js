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
  const frontend = (config.frontendUrl || '').replace(/\/+$/, '');
  const body = [
    `Your OTP is: ${otp}`,
    frontend ? `Enter it here: ${frontend}/reset-password` : null
  ].filter(Boolean).join('\n');

  await transporter.sendMail({
    from: config.emailUser,
    to,
    subject: 'Your OTP Code',
    text: body
  });
};
