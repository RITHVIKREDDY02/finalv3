import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import path from "path";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Enhanced logging for production
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Health check endpoint for VPS monitoring
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production'
  });
});

(async () => {
  try {
    console.log('🚀 Starting production server...');
    
    // Validate required environment variables
    const requiredEnvVars = ['DATABASE_URL'];
    const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
    if (missingEnvVars.length > 0) {
      console.error('❌ Missing required environment variables:', missingEnvVars);
      console.log('💡 Please set the following environment variables:');
      missingEnvVars.forEach(varName => {
        console.log(`   ${varName}=your_${varName.toLowerCase()}_here`);
      });
      process.exit(1);
    }

    console.log('✅ Environment variables validated');
    
    const server = await registerRoutes(app);

    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      
      console.error('Server error:', err);
      res.status(status).json({ message });
    });

    // Set NODE_ENV to production for proper static file serving
    process.env.NODE_ENV = process.env.NODE_ENV || 'production';
    
    // Always serve static files in production
    serveStatic(app);

    // Configure port with proper fallbacks for VPS deployment
    const port = parseInt(process.env.PORT || '3000', 10);
    
    server.listen({
      port,
      host: "0.0.0.0",
    }, () => {
      console.log(`🚀 Production server running on port ${port}`);
      console.log(`📊 Admin panel: http://localhost:${port}/admin`);
      console.log(`🌐 Application: http://localhost:${port}`);
      console.log(`❤️  Health check: http://localhost:${port}/health`);
    });

    // Graceful shutdown handling
    process.on('SIGTERM', () => {
      console.log('🛑 SIGTERM received, shutting down gracefully');
      server.close(() => {
        console.log('✅ Process terminated');
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      console.log('🛑 SIGINT received, shutting down gracefully');
      server.close(() => {
        console.log('✅ Process terminated');
        process.exit(0);
      });
    });

  } catch (error) {
    console.error('❌ Failed to start production server:', error);
    process.exit(1);
  }
})();