import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  uid: text("uid").notNull().unique(),
  approved: boolean("approved").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Game configuration table
export const gameConfig = pgTable("game_config", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  gameName: varchar("game_name").notNull().unique(),
  isEnabled: boolean("is_enabled").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Prediction history table
export const predictionHistory = pgTable("prediction_history", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  variant: varchar("variant").notNull(), // 30sec, 1min, 3min, 5min
  period: varchar("period").notNull(),
  predictedNumber: integer("predicted_number").notNull(),
  predictedSize: varchar("predicted_size").notNull(), // BIG or SMALL
  actualNumber: integer("actual_number"),
  actualSize: varchar("actual_size"),
  status: varchar("status"), // WIN, LOSS, PENDING
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  uid: true,
});

export const insertGameConfigSchema = createInsertSchema(gameConfig).pick({
  gameName: true,
  isEnabled: true,
});

export const insertPredictionHistorySchema = createInsertSchema(predictionHistory).pick({
  variant: true,
  period: true,
  predictedNumber: true,
  predictedSize: true,
  actualNumber: true,
  actualSize: true,
  status: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type GameConfig = typeof gameConfig.$inferSelect;
export type InsertGameConfig = z.infer<typeof insertGameConfigSchema>;
export type PredictionHistory = typeof predictionHistory.$inferSelect;
export type InsertPredictionHistory = z.infer<typeof insertPredictionHistorySchema>;
