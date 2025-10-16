const express = require('express');
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());

// serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/users', userRoutes);

// new soil routes
const soilRoutes = require('./routes/soilRoutes');
app.use('/api/soil', soilRoutes);

module.exports = app;
