import { users, gameConfig, type User, type InsertUser, type GameConfig, type InsertGameConfig } from "@shared/schema";
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


}

export const storage = new DatabaseStorage();
