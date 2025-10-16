const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.generateToken = (userId) => {
  return jwt.sign({ userId }, config.jwtSecret, { expiresIn: '1d' });
};
