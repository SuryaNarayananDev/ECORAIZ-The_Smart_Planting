const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const suggestionRoutes = require('./routes/suggestionRoutes');
const connectDB = require('./config/db');
const { optionalAuth, rateLimit } = require('./middleware/auth');

const app = express();

// Connect to the database (optional for suggestion API)
connectDB();

// Middleware
app.use(express.json({ limit: '10mb' })); // Increase limit for image uploads
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// CORS middleware for development
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-api-key');
    
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Rate limiting
app.use(rateLimit());

// Routes
app.use('/api/users', userRoutes());
app.use('/api/suggestions', optionalAuth, suggestionRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});