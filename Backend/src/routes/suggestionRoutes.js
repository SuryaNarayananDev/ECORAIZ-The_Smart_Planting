const express = require('express');
const SuggestionController = require('../controllers/suggestionController');

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

// Process image upload (placeholder for ML integration)
router.post('/analyze-image', suggestionController.processImageUpload);

module.exports = router;