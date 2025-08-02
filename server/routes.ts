import type { Express } from "express";
import { createServer, type Server } from "http";
import express from "express";
import { storage } from "./storage";
import { insertUserSchema } from "@shared/schema";
import { z } from "zod";
import { wingoService, WINGO_VARIANTS } from "./wingo-service";

export async function registerRoutes(app: Express): Promise<Server> {
  app.use(express.json());

  // Start background prediction scheduler
  console.log('🚀 Starting Wingo prediction scheduler at server startup...');
  wingoService.startBackgroundScheduler();

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

  // Check user registration status
  app.get("/api/user/:uid", async (req, res) => {
    try {
      const { uid } = req.params;
      const user = await storage.getUserByUid(uid);
      
      if (!user) {
        return res.status(404).json({ message: "User not found", registered: false });
      }

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

  // Approve user (admin endpoint)
  app.patch("/api/approve/:uid", async (req, res) => {
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

  // Admin routes
  app.get('/api/admin/users', async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });

  app.get('/api/admin/games', async (req, res) => {
    try {
      const games = await storage.getAllGameConfigs();
      res.json(games);
    } catch (error) {
      console.error("Error fetching game configs:", error);
      res.status(500).json({ error: "Failed to fetch game configs" });
    }
  });

  app.patch('/api/admin/games/:gameName', async (req, res) => {
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



  const httpServer = createServer(app);
  return httpServer;
}
