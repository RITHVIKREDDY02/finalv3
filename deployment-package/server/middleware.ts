// Express middleware for VPS performance optimization
import express from 'express';
import { rateLimiter } from './performance-optimizations';

// Rate limiting middleware
export const createRateLimitMiddleware = (maxRequests: number = 10, windowMs: number = 60000) => {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const identifier = req.ip || req.connection.remoteAddress || 'unknown';
    
    if (!rateLimiter.isAllowed(identifier, maxRequests, windowMs)) {
      return res.status(429).json({ 
        error: 'Too many requests. Please try again later.',
        retryAfter: Math.ceil(windowMs / 1000)
      });
    }
    
    next();
  };
};

// Compression middleware for API responses
export const compressionMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const originalSend = res.send;
  
  res.send = function(data) {
    // Add compression headers for JSON responses
    if (typeof data === 'object' || (typeof data === 'string' && data.startsWith('{'))) {
      res.setHeader('Content-Encoding', 'deflate');
      res.setHeader('Vary', 'Accept-Encoding');
    }
    
    return originalSend.call(this, data);
  };
  
  next();
};

// Response time tracking
export const responseTimeMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.path} - ${res.statusCode} in ${duration}ms`);
  });
  
  next();
};

// Error handling middleware
export const errorHandlerMiddleware = (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(`Error in ${req.method} ${req.path}:`, err);
  
  // Don't leak error details in production
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  res.status(err.status || 500).json({
    error: isDevelopment ? err.message : 'Internal server error',
    ...(isDevelopment && { stack: err.stack })
  });
};

// Cache headers for static content
export const cacheMiddleware = (maxAge: number = 300) => {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.setHeader('Cache-Control', `public, max-age=${maxAge}`);
    next();
  };
};