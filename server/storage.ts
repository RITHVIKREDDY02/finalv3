import { type User, type InsertUser, type GameConfig, type InsertGameConfig } from "@shared/schema";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUid(uid: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  approveUser(uid: string): Promise<User | undefined>;
  deleteUser(uid: string): Promise<boolean>;
  getAllUsers(): Promise<User[]>;
  getGameConfig(gameName: string): Promise<GameConfig | undefined>;
  getAllGameConfigs(): Promise<GameConfig[]>;
  updateGameConfig(gameName: string, isEnabled: boolean): Promise<GameConfig | undefined>;
  createGameConfig(config: InsertGameConfig): Promise<GameConfig>;
}

export class MemoryStorage implements IStorage {
  private users = new Map<string, User>();
  private gameConfigs = new Map<string, GameConfig>();
  
  constructor() {
    // Initialize default game configurations
    const defaultGames = ["Win Go", "Trx Wingo", "K3", "Moto Racing", "Mines Pro", "Mines", "Boom", "Aviator", "Limbo"];
    defaultGames.forEach(gameName => {
      const config: GameConfig = {
        id: this.generateId(),
        gameName,
        isEnabled: true,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      this.gameConfigs.set(gameName, config);
    });
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  async getUser(id: string): Promise<User | undefined> {
    for (const user of Array.from(this.users.values())) {
      if (user.id === id) return user;
    }
    return undefined;
  }

  async getUserByUid(uid: string): Promise<User | undefined> {
    return this.users.get(uid);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = {
      id: this.generateId(),
      uid: insertUser.uid,
      approved: false,
      createdAt: new Date()
    };
    this.users.set(insertUser.uid, user);
    return user;
  }

  async approveUser(uid: string): Promise<User | undefined> {
    const user = this.users.get(uid);
    if (user) {
      user.approved = true;
      this.users.set(uid, user);
      return user;
    }
    return undefined;
  }

  async deleteUser(uid: string): Promise<boolean> {
    return this.users.delete(uid);
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async getGameConfig(gameName: string): Promise<GameConfig | undefined> {
    return this.gameConfigs.get(gameName);
  }

  async getAllGameConfigs(): Promise<GameConfig[]> {
    return Array.from(this.gameConfigs.values());
  }

  async updateGameConfig(gameName: string, isEnabled: boolean): Promise<GameConfig | undefined> {
    const config = this.gameConfigs.get(gameName);
    if (config) {
      config.isEnabled = isEnabled;
      config.updatedAt = new Date();
      this.gameConfigs.set(gameName, config);
      return config;
    }
    return undefined;
  }

  async createGameConfig(config: InsertGameConfig): Promise<GameConfig> {
    const gameConfig: GameConfig = {
      id: this.generateId(),
      gameName: config.gameName,
      isEnabled: config.isEnabled ?? true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.gameConfigs.set(config.gameName, gameConfig);
    return gameConfig;
  }
}

export const storage = new MemoryStorage();
