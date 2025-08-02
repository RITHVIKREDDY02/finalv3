import { users, type User, type InsertUser } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUid(uid: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  approveUser(uid: string): Promise<User | undefined>;
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
}

export const storage = new DatabaseStorage();
