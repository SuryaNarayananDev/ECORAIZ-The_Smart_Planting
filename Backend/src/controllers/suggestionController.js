const SuggestionConverter = require('../converters/suggestion_converter');

/**
 * Tree Suggestion Controller
 * Handles API requests for tree recommendations based on soil analysis
 */
class SuggestionController {
    constructor() {
        this.converter = new SuggestionConverter();
    }

    /**
     * Get tree suggestions for single soil condition
     */
    getSuggestions = async (req, res) => {
        try {
            const { pH, humidity, moisture } = req.body;
            
            // Validate required fields
            if (pH === undefined || humidity === undefined || moisture === undefined) {
                return res.status(400).json({
                    success: false,
                    error: 'Missing required parameters: pH, humidity, moisture',
                    received: req.body
                });
            }

            const options = {
                minScore: req.body.minScore || 0,
                maxResults: req.body.maxResults || 10,
                includeIncompatible: req.body.includeIncompatible || false,
                sortBy: req.body.sortBy || 'score'
            };

            const result = this.converter.getTreeSuggestions({ pH, humidity, moisture }, options);
            
            res.status(200).json({
                success: true,
                data: result
            });

        } catch (error) {
            console.error('Error in getSuggestions:', error);
            res.status(400).json({
                success: false,
                error: error.message
            });
        }
    };

    /**
     * Process multiple zones from soil analysis
     */
    processZones = async (req, res) => {
        try {
            const { zones } = req.body;
            
            if (!zones || !Array.isArray(zones)) {
                return res.status(400).json({
                    success: false,
                    error: 'Missing or invalid zones array in request body'
                });
            }

            const result = this.converter.processSoilZones(zones);
            
            res.status(200).json({
                success: true,
                data: result
            });

        } catch (error) {
            console.error('Error in processZones:', error);
            res.status(400).json({
                success: false,
                error: error.message
            });
        }
    };

    /**
     * Get soil analysis summary
     */
    getSoilSummary = async (req, res) => {
        try {
            const { zones } = req.body;
            
            if (!zones || !Array.isArray(zones)) {
                return res.status(400).json({
                    success: false,
                    error: 'Missing or invalid zones array in request body'
                });
            }

            const summary = this.converter.getSoilAnalysisSummary(zones);
            
            if (!summary) {
                return res.status(400).json({
                    success: false,
                    error: 'No valid soil data found in zones'
                });
            }

            res.status(200).json({
                success: true,
                data: summary
            });

        } catch (error) {
            console.error('Error in getSoilSummary:', error);
            res.status(400).json({
                success: false,
                error: error.message
            });
        }
    };

    /**
     * Health check endpoint
     */
    healthCheck = async (req, res) => {
        try {
            const treesCount = this.converter.treesData.length;
            
            res.status(200).json({
                success: true,
                message: 'Tree Suggestion Service is running',
                data: {
                    totalTrees: treesCount,
                    timestamp: new Date().toISOString()
                }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Service unavailable',
                details: error.message
            });
        }
    };

    /**
     * Get all available trees
     */
    getAllTrees = async (req, res) => {
        try {
            const trees = this.converter.treesData.map(tree => ({
                id: tree.name.toLowerCase().replace(/[^a-z0-9]/g, '_'),
                name: tree.name,
                role: tree.role,
                lifespan: tree.lifespan,
                requirements: {
                    pH: tree.pH,
                    humidity: tree.humidity,
                    moisture: tree.moisture
                }
            }));

            res.status(200).json({
                success: true,
                data: {
                    totalTrees: trees.length,
                    trees: trees
                }
            });

        } catch (error) {
            console.error('Error in getAllTrees:', error);
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    };

    /**
     * Process image upload for soil analysis (placeholder for future ML integration)
     */
    processImageUpload = async (req, res) => {
        try {
            const uploadedFile = req.file;
            const imageData = req.body.imageData;
            
            if (!uploadedFile && !imageData) {
                return res.status(400).json({
                    success: false,
                    error: 'No image file or data provided'
                });
            }

            // Log file information if uploaded
            if (uploadedFile) {
                console.log('Image uploaded:', {
                    filename: uploadedFile.filename,
                    originalname: uploadedFile.originalname,
                    mimetype: uploadedFile.mimetype,
                    size: uploadedFile.size
                });
            }

            // Mock soil analysis results - in real implementation, this would process the image
            // through the deep learning model and extract soil conditions
            const mockSoilZones = Array.from({ length: 9 }, (_, index) => ({
                pH: 6.0 + Math.random() * 2, // Random pH between 6.0 and 8.0
                humidity: 40 + Math.random() * 30, // Random humidity between 40 and 70
                moisture: 25 + Math.random() * 35 // Random moisture between 25 and 60
            }));

            const result = this.converter.processSoilZones(mockSoilZones);

            res.status(200).json({
                success: true,
                message: 'Image processed successfully (mock analysis)',
                file: uploadedFile ? {
                    filename: uploadedFile.filename,
                    originalname: uploadedFile.originalname,
                    size: uploadedFile.size
                } : null,
                data: {
                    ...result,
                    note: 'This is mock data. Real implementation will process uploaded image through ML model.',
                    processingInfo: {
                        imageProcessed: true,
                        zonesDetected: 9,
                        modelUsed: 'placeholder_model',
                        timestamp: new Date().toISOString()
                    }
                }
            });

        } catch (error) {
            console.error('Error in processImageUpload:', error);
            
            if (error.message === 'Only image files are allowed!') {
                return res.status(400).json({
                    success: false,
                    error: 'Invalid file type. Please upload an image file.'
                });
            }
            
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    };
}

module.exports = SuggestionController;