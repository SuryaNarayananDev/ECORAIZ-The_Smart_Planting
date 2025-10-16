const User = require('../models/User');
const jwtService = require('../services/jwtService');
const emailService = require('../services/emailService');
const bcrypt = require('bcrypt');

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'Signup successful' });
  } catch (err) {
    res.status(400).json({ error: 'Email already exists' });
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwtService.generateToken(user._id);
  res.json({ token, user: { name: user.name, email: user.email } });
};

exports.updateProfile = async (req, res) => {
  const userId = req.userId;
  const { name, email } = req.body;
  const user = await User.findByIdAndUpdate(userId, { name, email }, { new: true });
  res.json({ user: { name: user.name, email: user.email } });
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: 'User not found' });
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  user.otp = otp;
  user.otpExpiry = Date.now() + 10 * 60 * 1000; // 10 min
  await user.save();
  await emailService.sendOTP(email, otp);
  res.json({ message: 'OTP sent to email' });
};

exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  const user = await User.findOne({ email, otp, otpExpiry: { $gt: Date.now() } });
  if (!user) return res.status(400).json({ error: 'Invalid or expired OTP' });
  user.password = await bcrypt.hash(newPassword, 10);
  user.otp = undefined;
  user.otpExpiry = undefined;
  await user.save();
  res.json({ message: 'Password reset successful' });
};

exports.getProfile = async (req, res) => {
  const userId = req.userId;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json({ user: { name: user.name, email: user.email } });
};