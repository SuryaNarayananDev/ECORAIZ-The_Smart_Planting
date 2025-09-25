# Tree Suggestion API Documentation

## Overview
The Tree Suggestion API provides RESTful endpoints for analyzing soil conditions and recommending suitable trees for planting. It integrates with the ECORAIZ smart planting system.

## Base URL
```
http://localhost:5000/api/suggestions
```

## Authentication
The API supports optional authentication using API keys:

**Headers:**
- `x-api-key: your-api-key` (Optional but recommended)
- `Authorization: Bearer your-api-key` (Alternative format)

**Valid API Keys for Development:**
- `ecoraiz-api-key-2025`
- `tree-suggestion-key`  
- `development-key`

## Endpoints

### 1. Health Check
**GET** `/health`

Check if the service is running.

**Response:**
```json
{
  "success": true,
  "message": "Tree Suggestion Service is running",
  "data": {
    "totalTrees": 30,
    "timestamp": "2025-09-25T08:28:22.578Z"
  }
}
```

### 2. Get All Trees
**GET** `/trees`

Retrieve all available trees in the database.

**Response:**
```json
{
  "success": true,
  "data": {
    "totalTrees": 30,
    "trees": [
      {
        "id": "peepal_tree___",
        "name": "Peepal Tree 🌿",
        "role": "Oxygen producer, sacred",
        "lifespan": "150+ years",
        "requirements": {
          "pH": [6, 7.5],
          "humidity": [30, 70],
          "moisture": [20, 50]
        }
      }
    ]
  }
}
```

### 3. Get Tree Suggestions
**POST** `/suggest`

Get tree recommendations for specific soil conditions.

**Request Body:**
```json
{
  "pH": 6.5,
  "humidity": 50,
  "moisture": 35,
  "minScore": 0,
  "maxResults": 10,
  "includeIncompatible": false,
  "sortBy": "score"
}
```

**Parameters:**
- `pH` (required): Soil pH level (0-14)
- `humidity` (required): Humidity percentage (0-100)
- `moisture` (required): Moisture percentage (0-100)
- `minScore` (optional): Minimum compatibility score (default: 0)
- `maxResults` (optional): Maximum number of results (default: 10)
- `includeIncompatible` (optional): Include incompatible trees (default: false)
- `sortBy` (optional): Sort by "score", "name", or "lifespan" (default: "score")

**Response:**
```json
{
  "success": true,
  "data": {
    "soilConditions": {
      "pH": 6.5,
      "humidity": 50,
      "moisture": 35
    },
    "totalFound": 3,
    "suggestions": [
      {
        "id": "peepal_tree___",
        "name": "Peepal Tree 🌿",
        "role": "Oxygen producer, sacred",
        "lifespan": "150+ years",
        "score": 94.44,
        "compatible": true,
        "requirements": {
          "pH": [6, 7.5],
          "humidity": [30, 70],
          "moisture": [20, 50]
        }
      }
    ],
    "timestamp": "2025-09-25T08:28:22.687Z"
  }
}
```

### 4. Process Multiple Zones
**POST** `/zones`

Process multiple soil zones and get suggestions for each.

**Request Body:**
```json
{
  "zones": [
    {"pH": 6.0, "humidity": 45, "moisture": 30},
    {"pH": 7.0, "humidity": 60, "moisture": 40}
  ]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalZones": 2,
    "processedZones": 2,
    "results": [
      {
        "zoneId": 1,
        "success": true,
        "soilConditions": {"pH": 6, "humidity": 45, "moisture": 30},
        "totalFound": 3,
        "suggestions": [...]
      }
    ],
    "timestamp": "2025-09-25T08:30:00.000Z"
  }
}
```

### 5. Get Soil Analysis Summary
**POST** `/summary`

Get statistical summary of soil conditions across multiple zones.

**Request Body:**
```json
{
  "zones": [
    {"pH": 6.0, "humidity": 45, "moisture": 30},
    {"pH": 7.0, "humidity": 60, "moisture": 40}
  ]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalZones": 2,
    "validZones": 2,
    "averageConditions": {
      "pH": 6.5,
      "humidity": 52.5,
      "moisture": 35
    },
    "ranges": {
      "pH": {"min": 6.0, "max": 7.0},
      "humidity": {"min": 45, "max": 60},
      "moisture": {"min": 30, "max": 40}
    }
  }
}
```

### 6. Analyze Image
**POST** `/analyze-image`

Upload and analyze soil image for automatic zone detection and analysis.

**Content-Type:** `multipart/form-data`

**Form Data:**
- `soilImage`: Image file (JPG, PNG, etc., max 10MB)

**Alternative JSON format:**
```json
{
  "imageData": "base64_encoded_image_data"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Image processed successfully (mock analysis)",
  "file": {
    "filename": "soil-image-1640995200000-123456789.jpg",
    "originalname": "my-soil-image.jpg",
    "size": 1024000
  },
  "data": {
    "totalZones": 9,
    "processedZones": 9,
    "results": [...],
    "note": "This is mock data. Real implementation will process uploaded image through ML model.",
    "processingInfo": {
      "imageProcessed": true,
      "zonesDetected": 9,
      "modelUsed": "placeholder_model",
      "timestamp": "2025-09-25T08:35:00.000Z"
    }
  }
}
```

## Error Responses

All endpoints return errors in the following format:

```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

**Common HTTP Status Codes:**
- `200`: Success
- `400`: Bad Request (invalid parameters)
- `401`: Unauthorized (invalid API key)
- `429`: Too Many Requests (rate limited)
- `500`: Internal Server Error

## Rate Limiting
- **Limit**: 100 requests per 15 minutes per IP address
- **Headers**: Rate limit info included in response headers

## Example Usage

### cURL Examples

```bash
# Health check
curl http://localhost:5000/api/suggestions/health

# Get tree suggestions
curl -X POST http://localhost:5000/api/suggestions/suggest \
  -H "Content-Type: application/json" \
  -H "x-api-key: ecoraiz-api-key-2025" \
  -d '{"pH": 6.5, "humidity": 50, "moisture": 35}'

# Upload image for analysis
curl -X POST http://localhost:5000/api/suggestions/analyze-image \
  -H "x-api-key: ecoraiz-api-key-2025" \
  -F "soilImage=@path/to/soil-image.jpg"
```

### Frontend Integration

```javascript
// Get tree suggestions
const getSuggestions = async (soilData) => {
  const response = await fetch('/api/suggestions/suggest', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'your-api-key'
    },
    body: JSON.stringify(soilData)
  });
  return await response.json();
};

// Upload image for analysis
const analyzeImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('soilImage', imageFile);
  
  const response = await fetch('/api/suggestions/analyze-image', {
    method: 'POST',
    headers: {
      'x-api-key': 'your-api-key'
    },
    body: formData
  });
  return await response.json();
};
```

## Integration with Frontend

The API is designed to work seamlessly with the existing frontend components:

1. **Home.js**: Can call the `/zones` endpoint to process the 9-zone soil data
2. **DataTable.js**: Can upload .txt files with soil data or use the `/zones` endpoint
3. **SoilAnalysis.js**: Can use the `/analyze-image` endpoint for photo uploads

## Future Enhancements

- Integration with .h5 deep learning model for real image analysis
- Advanced authentication with JWT tokens
- Database integration for user-specific recommendations
- Weather data integration
- Geolocation-based recommendations
- Real-time soil sensor data integration