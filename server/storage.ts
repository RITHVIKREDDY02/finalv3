import { users, gameConfig, predictionHistory, type User, type InsertUser, type GameConfig, type InsertGameConfig, type PredictionHistory, type InsertPredictionHistory } from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUid(uid: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  approveUser(uid: string): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
  getGameConfig(gameName: string): Promise<GameConfig | undefined>;
  getAllGameConfigs(): Promise<GameConfig[]>;
  updateGameConfig(gameName: string, isEnabled: boolean): Promise<GameConfig | undefined>;
  createGameConfig(config: InsertGameConfig): Promise<GameConfig>;
  createPrediction(prediction: InsertPredictionHistory): Promise<PredictionHistory>;
  updatePredictionResult(period: string, variant: string, actualNumber: number, actualSize: string): Promise<PredictionHistory | undefined>;
  getPredictionHistory(variant: string, limit?: number): Promise<PredictionHistory[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUid(uid: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.uid, uid));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async approveUser(uid: string): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ approved: true })
      .where(eq(users.uid, uid))
      .returning();
    return user || undefined;
  }

  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users);
  }

  async getGameConfig(gameName: string): Promise<GameConfig | undefined> {
    const [config] = await db.select().from(gameConfig).where(eq(gameConfig.gameName, gameName));
    return config || undefined;
  }

  async getAllGameConfigs(): Promise<GameConfig[]> {
    return await db.select().from(gameConfig);
  }

  async updateGameConfig(gameName: string, isEnabled: boolean): Promise<GameConfig | undefined> {
    const [config] = await db
      .update(gameConfig)
      .set({ isEnabled, updatedAt: new Date() })
      .where(eq(gameConfig.gameName, gameName))
      .returning();
    return config || undefined;
  }

  async createGameConfig(config: InsertGameConfig): Promise<GameConfig> {
    const [gameConfigResult] = await db
      .insert(gameConfig)
      .values(config)
      .returning();
    return gameConfigResult;
  }

  async createPrediction(prediction: InsertPredictionHistory): Promise<PredictionHistory> {
    const [result] = await db
      .insert(predictionHistory)
      .values({
        ...prediction,
        status: 'PENDING'
      })
      .returning();
    return result;
  }

  async updatePredictionResult(period: string, variant: string, actualNumber: number, actualSize: string): Promise<PredictionHistory | undefined> {
    // Calculate win/loss status
    const [existingPrediction] = await db
      .select()
      .from(predictionHistory)
      .where(and(
        eq(predictionHistory.period, period),
        eq(predictionHistory.variant, variant)
      ));
    
    if (!existingPrediction) return undefined;

    // Determine if prediction was correct
    const numberMatch = existingPrediction.predictedNumber === actualNumber;
    const sizeMatch = existingPrediction.predictedSize === actualSize;
    const status = (numberMatch || sizeMatch) ? 'WIN' : 'LOSS';

    const [updated] = await db
      .update(predictionHistory)
      .set({ 
        actualNumber, 
        actualSize, 
        status,
        updatedAt: new Date()
      })
      .where(and(
        eq(predictionHistory.period, period),
        eq(predictionHistory.variant, variant)
      ))
      .returning();
    
    return updated || undefined;
  }

  async getPredictionHistory(variant: string, limit: number = 10): Promise<PredictionHistory[]> {
    return await db
      .select()
      .from(predictionHistory)
      .where(eq(predictionHistory.variant, variant))
      .orderBy(desc(predictionHistory.createdAt))
      .limit(limit);
  }
}

export const storage = new DatabaseStorage();
