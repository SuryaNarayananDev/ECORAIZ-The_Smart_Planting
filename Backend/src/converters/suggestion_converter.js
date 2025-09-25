const fs = require('fs');
const path = require('path');

/**
 * Tree Suggestion Converter Service
 * Converts tree recommendation logic to RESTful API responses
 */
class SuggestionConverter {
    constructor() {
        this.treesData = this.loadTreesData();
    }

    /**
     * Load trees data from JSON file
     */
    loadTreesData() {
        try {
            const dataPath = path.join(__dirname, '../trees_data.json');
            const data = fs.readFileSync(dataPath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error loading trees data:', error);
            return [];
        }
    }

    /**
     * Parse range values (e.g., "6.0-7.5" or [6.0, 7.5])
     */
    parseRange(value) {
        if (Array.isArray(value)) {
            return { min: value[0], max: value[1] };
        }
        if (typeof value === 'string') {
            const match = value.match(/(\d+\.?\d*)-(\d+\.?\d*)/);
            if (match) {
                return { min: parseFloat(match[1]), max: parseFloat(match[2]) };
            }
        }
        return { min: null, max: null };
    }

    /**
     * Calculate compatibility score between soil conditions and tree requirements
     */
    calculateScore(treeData, soilConditions) {
        const { pH, humidity, moisture } = soilConditions;
        
        const phRange = this.parseRange(treeData.pH);
        const humidityRange = this.parseRange(treeData.humidity);
        const moistureRange = this.parseRange(treeData.moisture);
        
        let score = 0;
        let factors = 0;
        
        // pH score
        if (phRange.min !== null && phRange.max !== null) {
            const phMid = (phRange.min + phRange.max) / 2;
            const phScore = Math.max(0, 1 - Math.abs(pH - phMid) / (phRange.max - phRange.min));
            score += phScore;
            factors++;
        }
        
        // Humidity score
        if (humidityRange.min !== null && humidityRange.max !== null) {
            const humidityMid = (humidityRange.min + humidityRange.max) / 2;
            const humidityScore = Math.max(0, 1 - Math.abs(humidity - humidityMid) / (humidityRange.max - humidityRange.min));
            score += humidityScore;
            factors++;
        }
        
        // Moisture score
        if (moistureRange.min !== null && moistureRange.max !== null) {
            const moistureMid = (moistureRange.min + moistureRange.max) / 2;
            const moistureScore = Math.max(0, 1 - Math.abs(moisture - moistureMid) / (moistureRange.max - moistureRange.min));
            score += moistureScore;
            factors++;
        }
        
        return factors > 0 ? (score / factors) * 100 : 0;
    }

    /**
     * Check if soil conditions are within tree's acceptable range
     */
    isCompatible(treeData, soilConditions) {
        const { pH, humidity, moisture } = soilConditions;
        
        const phRange = this.parseRange(treeData.pH);
        const humidityRange = this.parseRange(treeData.humidity);
        const moistureRange = this.parseRange(treeData.moisture);
        
        const phCompatible = phRange.min === null || phRange.max === null || 
            (pH >= phRange.min && pH <= phRange.max);
        
        const humidityCompatible = humidityRange.min === null || humidityRange.max === null || 
            (humidity >= humidityRange.min && humidity <= humidityRange.max);
        
        const moistureCompatible = moistureRange.min === null || moistureRange.max === null || 
            (moisture >= moistureRange.min && moisture <= moistureRange.max);
        
        return phCompatible && humidityCompatible && moistureCompatible;
    }

    /**
     * Get tree suggestions based on soil analysis data
     */
    getTreeSuggestions(soilData, options = {}) {
        const { 
            minScore = 0, 
            maxResults = 10, 
            includeIncompatible = false,
            sortBy = 'score' // 'score', 'name', 'lifespan'
        } = options;

        if (!soilData || typeof soilData !== 'object') {
            throw new Error('Invalid soil data provided');
        }

        const { pH, humidity, moisture } = soilData;

        if (pH === undefined || humidity === undefined || moisture === undefined) {
            throw new Error('Missing required soil parameters: pH, humidity, moisture');
        }

        // Validate ranges
        if (pH < 0 || pH > 14) {
            throw new Error('pH value must be between 0 and 14');
        }
        if (humidity < 0 || humidity > 100) {
            throw new Error('Humidity value must be between 0 and 100');
        }
        if (moisture < 0 || moisture > 100) {
            throw new Error('Moisture value must be between 0 and 100');
        }

        const suggestions = this.treesData.map(tree => {
            const score = this.calculateScore(tree, soilData);
            const compatible = this.isCompatible(tree, soilData);
            
            return {
                id: tree.name.toLowerCase().replace(/[^a-z0-9]/g, '_'),
                name: tree.name,
                role: tree.role,
                lifespan: tree.lifespan,
                score: Math.round(score * 100) / 100,
                compatible: compatible,
                requirements: {
                    pH: tree.pH,
                    humidity: tree.humidity,
                    moisture: tree.moisture
                }
            };
        });

        // Filter based on options
        let filteredSuggestions = suggestions;
        
        if (!includeIncompatible) {
            filteredSuggestions = suggestions.filter(s => s.compatible);
        }
        
        filteredSuggestions = filteredSuggestions.filter(s => s.score >= minScore);

        // Sort suggestions
        switch (sortBy) {
            case 'name':
                filteredSuggestions.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'lifespan':
                filteredSuggestions.sort((a, b) => {
                    // Extract numeric value from lifespan string
                    const aLifespan = parseInt(a.lifespan) || 0;
                    const bLifespan = parseInt(b.lifespan) || 0;
                    return bLifespan - aLifespan;
                });
                break;
            case 'score':
            default:
                filteredSuggestions.sort((a, b) => b.score - a.score);
                break;
        }

        // Limit results
        if (maxResults > 0) {
            filteredSuggestions = filteredSuggestions.slice(0, maxResults);
        }

        return {
            soilConditions: { pH, humidity, moisture },
            totalFound: filteredSuggestions.length,
            suggestions: filteredSuggestions,
            timestamp: new Date().toISOString()
        };
    }

    /**
     * Process multiple zones from soil analysis
     */
    processSoilZones(zonesData) {
        if (!Array.isArray(zonesData)) {
            throw new Error('Zones data must be an array');
        }

        const results = zonesData.map((zone, index) => {
            try {
                const suggestions = this.getTreeSuggestions(zone, { maxResults: 5 });
                return {
                    zoneId: index + 1,
                    success: true,
                    ...suggestions
                };
            } catch (error) {
                return {
                    zoneId: index + 1,
                    success: false,
                    error: error.message,
                    soilConditions: zone
                };
            }
        });

        return {
            totalZones: zonesData.length,
            processedZones: results.filter(r => r.success).length,
            results,
            timestamp: new Date().toISOString()
        };
    }

    /**
     * Get summary statistics for soil analysis
     */
    getSoilAnalysisSummary(zonesData) {
        if (!Array.isArray(zonesData) || zonesData.length === 0) {
            return null;
        }

        const validZones = zonesData.filter(zone => 
            zone.pH !== undefined && zone.humidity !== undefined && zone.moisture !== undefined
        );

        if (validZones.length === 0) {
            return null;
        }

        const summary = {
            totalZones: zonesData.length,
            validZones: validZones.length,
            averageConditions: {
                pH: validZones.reduce((sum, zone) => sum + zone.pH, 0) / validZones.length,
                humidity: validZones.reduce((sum, zone) => sum + zone.humidity, 0) / validZones.length,
                moisture: validZones.reduce((sum, zone) => sum + zone.moisture, 0) / validZones.length
            },
            ranges: {
                pH: {
                    min: Math.min(...validZones.map(z => z.pH)),
                    max: Math.max(...validZones.map(z => z.pH))
                },
                humidity: {
                    min: Math.min(...validZones.map(z => z.humidity)),
                    max: Math.max(...validZones.map(z => z.humidity))
                },
                moisture: {
                    min: Math.min(...validZones.map(z => z.moisture)),
                    max: Math.max(...validZones.map(z => z.moisture))
                }
            }
        };

        // Round averages
        summary.averageConditions.pH = Math.round(summary.averageConditions.pH * 100) / 100;
        summary.averageConditions.humidity = Math.round(summary.averageConditions.humidity * 100) / 100;
        summary.averageConditions.moisture = Math.round(summary.averageConditions.moisture * 100) / 100;

        return summary;
    }
}

module.exports = SuggestionConverter;