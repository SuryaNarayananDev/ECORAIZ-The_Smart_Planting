const nodemailer = require('nodemailer');
const config = require('../config/config');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.emailUser,
    pass: config.emailPass
  }
});

// Test transporter connection at startup (logs error if misconfigured)
transporter.verify(function(error, success) {
  if (error) {
    console.error('Nodemailer connection error:', error);
  } else {
    console.log('Nodemailer is ready to send emails');
  }
});

exports.sendOTP = async (to, otp) => {
  const frontend = (config.frontendUrl || '').replace(/\/+$/, '');
  const body = [
    `Your OTP is: ${otp}`,
    frontend ? `Enter it here: ${frontend}/reset-password` : null
  ].filter(Boolean).join('\n');

  try {
    await transporter.sendMail({
      from: config.emailUser,
      to,
      subject: 'Your OTP Code',
      text: body
    });
  } catch (err) {
    // Log the error for debugging
    console.error('Failed to send OTP email:', err);
    throw err;
  }
};
