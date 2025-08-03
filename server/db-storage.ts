import { eq } from "drizzle-orm";
import { db } from "./db-optional";
import { users, gameConfig } from "@shared/schema";
import type { User, InsertUser, GameConfig, InsertGameConfig } from "@shared/schema";
import type { IStorage } from "./storage";

export class DatabaseStorage implements IStorage {
  private defaultGames = ["Win Go", "Trx Wingo", "K3", "Moto Racing", "Mines Pro", "Mines", "Boom", "Aviator", "Limbo"];
  
  constructor() {
    if (!db) {
      throw new Error('Database not initialized. Cannot use DatabaseStorage without DATABASE_URL.');
    }
  }

  async initializeDefaultGames() {
    if (!db) {
      console.error('Database not available for initializing default games');
      return;
    }
    
    try {
      // Check if games already exist
      const existingGames = await db.select().from(gameConfig);
      
      if (existingGames.length === 0) {
        console.log('Initializing default game configurations...');
        // Insert default games
        for (const gameName of this.defaultGames) {
          await db.insert(gameConfig).values({
            gameName,
            isEnabled: true
          }).onConflictDoNothing();
        }
        console.log('Default game configurations initialized');
      }
    } catch (error) {
      console.error('Error initializing default games:', error);
    }
  }

  async getUser(id: string): Promise<User | undefined> {
    if (!db) return undefined;
    
    try {
      const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
      return result[0];
    } catch (error) {
      console.error('Error getting user by id:', error);
      return undefined;
    }
  }

  async getUserByUid(uid: string): Promise<User | undefined> {
    if (!db) return undefined;
    
    try {
      const result = await db.select().from(users).where(eq(users.uid, uid)).limit(1);
      return result[0];
    } catch (error) {
      console.error('Error getting user by UID:', error);
      return undefined;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    if (!db) throw new Error('Database not available');
    
    try {
      const result = await db.insert(users).values({
        uid: insertUser.uid,
        approved: false
      }).returning();
      return result[0];
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Failed to create user');
    }
  }

  async approveUser(uid: string): Promise<User | undefined> {
    if (!db) return undefined;
    
    try {
      const result = await db.update(users)
        .set({ approved: true })
        .where(eq(users.uid, uid))
        .returning();
      return result[0];
    } catch (error) {
      console.error('Error approving user:', error);
      return undefined;
    }
  }

  async deleteUser(uid: string): Promise<boolean> {
    if (!db) return false;
    
    try {
      const result = await db.delete(users).where(eq(users.uid, uid));
      return (result.rowCount ?? 0) > 0;
    } catch (error) {
      console.error('Error deleting user:', error);
      return false;
    }
  }

  async getAllUsers(): Promise<User[]> {
    if (!db) return [];
    
    try {
      return await db.select().from(users).orderBy(users.createdAt);
    } catch (error) {
      console.error('Error getting all users:', error);
      return [];
    }
  }

  async getGameConfig(gameName: string): Promise<GameConfig | undefined> {
    if (!db) return undefined;
    
    try {
      const result = await db.select().from(gameConfig).where(eq(gameConfig.gameName, gameName)).limit(1);
      return result[0];
    } catch (error) {
      console.error('Error getting game config:', error);
      return undefined;
    }
  }

  async getAllGameConfigs(): Promise<GameConfig[]> {
    if (!db) return [];
    
    try {
      return await db.select().from(gameConfig).orderBy(gameConfig.gameName);
    } catch (error) {
      console.error('Error getting all game configs:', error);
      return [];
    }
  }

  async updateGameConfig(gameName: string, isEnabled: boolean): Promise<GameConfig | undefined> {
    if (!db) return undefined;
    
    try {
      const result = await db.update(gameConfig)
        .set({ 
          isEnabled, 
          updatedAt: new Date() 
        })
        .where(eq(gameConfig.gameName, gameName))
        .returning();
      return result[0];
    } catch (error) {
      console.error('Error updating game config:', error);
      return undefined;
    }
  }

  async createGameConfig(config: InsertGameConfig): Promise<GameConfig> {
    if (!db) throw new Error('Database not available');
    
    try {
      const result = await db.insert(gameConfig).values({
        gameName: config.gameName,
        isEnabled: config.isEnabled ?? true
      }).returning();
      return result[0];
    } catch (error) {
      console.error('Error creating game config:', error);
      throw new Error('Failed to create game config');
    }
  }
}