const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.generateToken = (userId) => {
  const options = { expiresIn: '1d' };
  const aud = (config.frontendUrl || '').replace(/\/+$/, '');
  if (aud) options.audience = aud;
  return jwt.sign({ userId }, config.jwtSecret, options);
};
