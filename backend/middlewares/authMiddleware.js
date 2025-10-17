const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    const verifyOptions = {};
    const aud = (config.frontendUrl || '').replace(/\/+$/, '');
    if (aud) verifyOptions.audience = aud;
    const decoded = jwt.verify(token, config.jwtSecret, verifyOptions);
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};