const express = require('express');
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
const allowedOrigins = [
  'http://localhost:3000',              // local frontend
  'https://ecoraiz.netlify.app',        // deployed frontend
];
app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('CORS not allowed'));
    }
  },
  credentials: true,
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
}));

// serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/users', userRoutes);

// new soil routes
const soilRoutes = require('./routes/soilRoutes');
app.use('/api/soil', soilRoutes);

module.exports = app;
