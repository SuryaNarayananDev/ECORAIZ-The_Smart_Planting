require('dotenv').config();

const app = require('./app');
const mongoose = require('mongoose');
const config = require('./config/config');

mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));
