import { Pool } from "pg";

// Em desenvolvimento o Next recarrega os módulos; reaproveita o mesmo pool.
const globalForDb = globalThis as unknown as { pool?: Pool };

export const pool =
  globalForDb.pool ??
  new Pool({
    connectionString: process.env.DATABASE_URI,
    ssl:
      process.env.DATABASE_SSL === "false"
        ? false
        : { rejectUnauthorized: false },
  });

if (process.env.NODE_ENV !== "production") globalForDb.pool = pool;
