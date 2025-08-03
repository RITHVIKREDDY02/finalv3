// Optional database configuration - only used if DATABASE_URL is provided
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

let db: any = null;
let pool: any = null;

// Only initialize database if URL is provided
if (process.env.DATABASE_URL) {
  neonConfig.webSocketConstructor = ws;
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
  db = drizzle({ client: pool, schema });
  console.log('📊 Database connected (optional)');
} else {
  console.log('💾 Using in-memory storage (no database required)');
}

export { pool, db };