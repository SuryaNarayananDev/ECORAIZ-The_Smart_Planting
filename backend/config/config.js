module.exports = {
  port: process.env.PORT || 5000,
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/ecoraiz',
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
  emailUser: process.env.EMAIL_USER || 'your_email@gmail.com',
  emailPass: process.env.EMAIL_PASS || 'your_email_password',
  frontendUrl: process.env.FRONTEND_URL || ''
};
