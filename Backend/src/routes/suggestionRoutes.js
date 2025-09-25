const express = require('express');
const multer = require('multer');
const SuggestionController = require('../controllers/suggestionController');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Make sure this directory exists
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'soil-image-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    },
    fileFilter: function (req, file, cb) {
        // Accept images only
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    }
});

const router = express.Router();
const suggestionController = new SuggestionController();

/**
 * Tree Suggestion API Routes
 */

// Health check
router.get('/health', suggestionController.healthCheck);

// Get all available trees
router.get('/trees', suggestionController.getAllTrees);

// Get suggestions for single soil condition
router.post('/suggest', suggestionController.getSuggestions);

// Process multiple zones
router.post('/zones', suggestionController.processZones);

// Get soil analysis summary
router.post('/summary', suggestionController.getSoilSummary);

// Process image upload (with file support)
router.post('/analyze-image', upload.single('soilImage'), suggestionController.processImageUpload);

module.exports = router;