const AUTH_TOKEN = process.env.AUTH_TOKEN || 'supersecrettoken';

const authMiddleware = {
  requestDidStart: async ({ request }) => {
    // Try different ways to access the authorization header
    const authHeader = request.http?.headers?.authorization || 
                      request.http?.headers?.Authorization ||
                      request.headers?.authorization ||
                      request.headers?.Authorization;
    
    if (!authHeader) {
      throw new Error('Authorization header is required');
    }

    const token = authHeader.replace('Bearer ', '');
    
    if (token !== AUTH_TOKEN) {
      throw new Error('Invalid authentication token');
    }
  }
};

module.exports = authMiddleware;
