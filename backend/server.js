require('dotenv').config();

const app = require('./app');
const mongoose = require('mongoose');
const config = require('./config/config');

// Allow requests from the configured frontend (CORS)
const FRONTEND = (config.frontendUrl || '').replace(/\/+$/, '');
if (FRONTEND) {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', FRONTEND);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    if (req.method === 'OPTIONS') return res.sendStatus(204);
    next();
  });
}

mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));
