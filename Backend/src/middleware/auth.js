/**
 * Authentication middleware for Tree Suggestion API
 * Simple API key based authentication (authO5 check)
 */

const authO5 = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const apiKey = req.headers['x-api-key'];

        // Check for API key in headers
        if (!authHeader && !apiKey) {
            return res.status(401).json({
                success: false,
                error: 'Authentication required. Please provide API key or authorization header.'
            });
        }

        // Simple API key validation
        const validApiKeys = [
            'ecoraiz-api-key-2025',
            'tree-suggestion-key',
            'development-key'
        ];

        let providedKey = null;

        if (apiKey) {
            providedKey = apiKey;
        } else if (authHeader) {
            // Extract key from "Bearer <key>" or "ApiKey <key>" format
            const parts = authHeader.split(' ');
            if (parts.length === 2 && (parts[0] === 'Bearer' || parts[0] === 'ApiKey')) {
                providedKey = parts[1];
            } else {
                providedKey = authHeader;
            }
        }

        if (!providedKey || !validApiKeys.includes(providedKey)) {
            return res.status(401).json({
                success: false,
                error: 'Invalid API key provided.'
            });
        }

        // Add user info to request for downstream use
        req.user = {
            authenticated: true,
            apiKey: providedKey,
            timestamp: new Date().toISOString()
        };

        next();
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(500).json({
            success: false,
            error: 'Authentication service error'
        });
    }
};

/**
 * Optional authentication - allows both authenticated and unauthenticated requests
 */
const optionalAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const apiKey = req.headers['x-api-key'];

        if (!authHeader && !apiKey) {
            // No authentication provided, but allow request to continue
            req.user = { authenticated: false };
            return next();
        }

        // Use the main auth function if credentials are provided
        return authO5(req, res, next);
    } catch (error) {
        // On error, allow request to continue without authentication
        req.user = { authenticated: false };
        next();
    }
};

/**
 * Rate limiting middleware (basic implementation)
 */
const rateLimit = (maxRequests = 100, windowMs = 15 * 60 * 1000) => {
    const requests = new Map();

    return (req, res, next) => {
        const clientId = req.ip || req.connection.remoteAddress;
        const now = Date.now();
        
        if (!requests.has(clientId)) {
            requests.set(clientId, { count: 1, resetTime: now + windowMs });
            return next();
        }

        const clientRequests = requests.get(clientId);
        
        if (now > clientRequests.resetTime) {
            // Reset window
            requests.set(clientId, { count: 1, resetTime: now + windowMs });
            return next();
        }

        if (clientRequests.count >= maxRequests) {
            return res.status(429).json({
                success: false,
                error: 'Too many requests. Please try again later.',
                retryAfter: Math.ceil((clientRequests.resetTime - now) / 1000)
            });
        }

        clientRequests.count++;
        next();
    };
};

module.exports = {
    authO5,
    optionalAuth,
    rateLimit
};