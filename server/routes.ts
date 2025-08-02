import type { Express } from "express";
import { createServer, type Server } from "http";
import express from "express";
import { storage } from "./storage";
import { insertUserSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  app.use(express.json());

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

  const httpServer = createServer(app);
  return httpServer;
}
