import type { Express } from "express";
import { createServer, type Server } from "http";
import express from "express";
import { storage } from "./storage";
import { insertUserSchema } from "@shared/schema";
import { z } from "zod";
import { wingoService, WINGO_VARIANTS } from "./wingo-service";
import { trxWingoService, TRXWINGO_VARIANTS } from "./trxwingo-service";
import { 
  createRateLimitMiddleware, 
  compressionMiddleware, 
  responseTimeMiddleware, 
  errorHandlerMiddleware,
  cacheMiddleware 
} from "./middleware";
import { memoizedUserLookup } from "./performance-optimizations";

export async function registerRoutes(app: Express): Promise<Server> {
  // Performance middleware
  app.use(compressionMiddleware);
  app.use(responseTimeMiddleware);
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  
  // Rate limiting for API endpoints
  app.use('/api', createRateLimitMiddleware(30, 60000)); // 30 requests per minute for API
  app.use('/api/wingo', createRateLimitMiddleware(60, 60000)); // Higher limit for prediction endpoints
  app.use('/api/trxwingo', createRateLimitMiddleware(60, 60000));

  // Start background prediction schedulers
  console.log('🚀 Starting Wingo prediction scheduler at server startup...');
  wingoService.startBackgroundScheduler();
  
  console.log('🚀 Starting TrxWingo prediction scheduler at server startup...');
  trxWingoService.startBackgroundScheduler();

  // Register user with UID
  app.post("/api/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByUid(userData.uid);
      if (existingUser) {
        return res.status(409).json({ 
          message: "User already registered", 
          approved: existingUser.approved 
        });
      }

      const user = await storage.createUser(userData);
      res.status(201).json({ 
        message: "Registration successful", 
        user: { id: user.id, uid: user.uid, approved: user.approved } 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid UID format", errors: error.errors });
      }
      console.error("Registration error:", error);
      res.status(500).json({ message: "Registration failed" });
    }
  });

  // Check user registration status - optimized with caching
  app.get("/api/user/:uid", async (req, res) => {
    try {
      const { uid } = req.params;
      
      // Quick validation
      if (!uid || uid.trim().length === 0) {
        return res.status(400).json({ message: "Invalid UID", registered: false });
      }
      
      // Use memoized lookup for better performance
      const user = await memoizedUserLookup(uid, (uid: string) => storage.getUserByUid(uid));
      
      if (!user) {
        return res.status(404).json({ message: "User not found", registered: false });
      }

      // Cache successful responses for 10 seconds
      res.setHeader('Cache-Control', 'public, max-age=10');
      res.json({ 
        registered: true, 
        approved: user.approved,
        user: { id: user.id, uid: user.uid, approved: user.approved }
      });
    } catch (error) {
      console.error("User check error:", error);
      res.status(500).json({ message: "Failed to check user status" });
    }
  });

  // Fast user approval check - optimized endpoint
  app.get("/api/user/:uid/status", async (req, res) => {
    try {
      const { uid } = req.params;
      
      if (!uid || uid.trim().length === 0) {
        return res.json({ approved: false, registered: false });
      }
      
      const user = await storage.getUserByUid(uid);
      res.json({ 
        approved: user?.approved || false,
        registered: !!user
      });
    } catch (error) {
      console.error("Fast status check error:", error);
      res.json({ approved: false, registered: false });
    }
  });

  // Admin authentication
  const ADMIN_PASSWORD = "Samara@tashan";
  
  // Admin login endpoint - optimized for speed
  app.post('/api/admin/login', async (req, res) => {
    try {
      const { password } = req.body;
      
      // Quick password validation
      if (!password || typeof password !== 'string') {
        return res.status(400).json({ error: "Password required" });
      }
      
      if (password === ADMIN_PASSWORD) {
        // Generate a simple session token
        const token = Buffer.from(`admin:${Date.now()}`).toString('base64');
        res.json({ success: true, token });
      } else {
        res.status(401).json({ error: "Invalid password" });
      }
    } catch (error) {
      console.error("Admin login error:", error);
      res.status(500).json({ error: "Login failed" });
    }
  });

  // Admin middleware to verify authentication
  const verifyAdmin = (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: "Authentication required" });
    }
    
    const token = authHeader.substring(7);
    
    try {
      const decoded = Buffer.from(token, 'base64').toString();
      if (decoded.startsWith('admin:')) {
        next();
      } else {
        res.status(401).json({ error: "Invalid token" });
      }
    } catch (error) {
      res.status(401).json({ error: "Invalid token" });
    }
  };

  // Admin routes with authentication
  app.get('/api/admin/users', verifyAdmin, async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });

  app.get('/api/admin/games', verifyAdmin, async (req, res) => {
    try {
      const games = await storage.getAllGameConfigs();
      res.json(games);
    } catch (error) {
      console.error("Error fetching game configs:", error);
      res.status(500).json({ error: "Failed to fetch game configs" });
    }
  });

  app.patch('/api/admin/games/:gameName', verifyAdmin, async (req, res) => {
    try {
      const { gameName } = req.params;
      const { isEnabled } = req.body;
      
      if (typeof isEnabled !== 'boolean') {
        return res.status(400).json({ error: "isEnabled must be a boolean" });
      }

      let gameConfig = await storage.getGameConfig(gameName);
      
      if (!gameConfig) {
        // Create game config if it doesn't exist
        gameConfig = await storage.createGameConfig({ gameName, isEnabled });
      } else {
        // Update existing game config
        gameConfig = await storage.updateGameConfig(gameName, isEnabled);
      }

      res.json(gameConfig);
    } catch (error) {
      console.error("Error updating game config:", error);
      res.status(500).json({ error: "Failed to update game config" });
    }
  });

  // Admin: Delete user
  app.delete('/api/admin/users/:uid', verifyAdmin, async (req, res) => {
    try {
      const { uid } = req.params;
      const user = await storage.getUser(uid);
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      await storage.deleteUser(uid);
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Also protect the approve endpoint
  app.patch("/api/approve/:uid", verifyAdmin, async (req, res) => {
    try {
      const { uid } = req.params;
      const user = await storage.approveUser(uid);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ 
        message: "User approved successfully", 
        user: { id: user.id, uid: user.uid, approved: user.approved }
      });
    } catch (error) {
      console.error("Approval error:", error);
      res.status(500).json({ message: "Failed to approve user" });
    }
  });

  // Wingo prediction routes
  app.get('/api/wingo/variants', (req, res) => {
    res.json(WINGO_VARIANTS);
  });

  app.get('/api/wingo/prediction/:variant', async (req, res) => {
    try {
      const { variant } = req.params;
      
      if (!WINGO_VARIANTS[variant]) {
        return res.status(400).json({ error: "Invalid variant" });
      }

      // Use cached prediction from background scheduler
      const prediction = await wingoService.getCachedPrediction(variant);
      
      if (prediction) {
        res.json(prediction);
      } else {
        res.status(503).json({ error: "Prediction service temporarily unavailable" });
      }
    } catch (error) {
      console.error("Error generating prediction:", error);
      res.status(500).json({ error: "Failed to generate prediction" });
    }
  });

  app.get('/api/wingo/results/:variant', async (req, res) => {
    try {
      const { variant } = req.params;
      
      if (!WINGO_VARIANTS[variant]) {
        return res.status(400).json({ error: "Invalid variant" });
      }

      // Use real API for results
      const results = await wingoService.getLatestResults(variant);
      
      if (results && results.length > 0) {
        res.json(results);
      } else {
        res.status(503).json({ error: "Results service temporarily unavailable" });
      }
    } catch (error) {
      console.error("Error fetching results:", error);
      res.status(500).json({ error: "Failed to fetch results" });
    }
  });

  // TrxWingo prediction routes
  app.get('/api/trxwingo/variants', (req, res) => {
    res.json(TRXWINGO_VARIANTS);
  });

  app.get('/api/trxwingo/prediction/:variant', async (req, res) => {
    try {
      const { variant } = req.params;
      
      if (!TRXWINGO_VARIANTS[variant]) {
        return res.status(400).json({ error: "Invalid TrxWingo variant" });
      }

      // Use cached prediction from background scheduler
      const prediction = await trxWingoService.getCachedPrediction(variant);
      
      if (prediction) {
        res.json(prediction);
      } else {
        res.status(503).json({ error: "TrxWingo prediction service temporarily unavailable" });
      }
    } catch (error) {
      console.error("Error generating TrxWingo prediction:", error);
      res.status(500).json({ error: "Failed to generate TrxWingo prediction" });
    }
  });

  app.get('/api/trxwingo/results/:variant', async (req, res) => {
    try {
      const { variant } = req.params;
      
      if (!TRXWINGO_VARIANTS[variant]) {
        return res.status(400).json({ error: "Invalid TrxWingo variant" });
      }

      // Use real API for results
      const results = await trxWingoService.getLatestResults(variant);
      
      if (results && results.length > 0) {
        res.json(results);
      } else {
        res.status(503).json({ error: "TrxWingo results service temporarily unavailable" });
      }
    } catch (error) {
      console.error("Error fetching TrxWingo results:", error);
      res.status(500).json({ error: "Failed to fetch TrxWingo results" });
    }
  });

  // Add error handling middleware as the last middleware
  app.use(errorHandlerMiddleware);

  const httpServer = createServer(app);
  return httpServer;
}
