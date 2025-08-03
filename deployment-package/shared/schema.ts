import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, integer, unique } from "drizzle-orm/pg-core";
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



export const insertUserSchema = createInsertSchema(users).pick({
  uid: true,
});

export const insertGameConfigSchema = createInsertSchema(gameConfig).pick({
  gameName: true,
  isEnabled: true,
});



export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type GameConfig = typeof gameConfig.$inferSelect;
export type InsertGameConfig = z.infer<typeof insertGameConfigSchema>;

