import type { User } from "@/types";
import { pool } from "../db";

export async function getUserByEmail(email: string) {
  const queryText = `SELECT id, name, email, password FROM users WHERE lower(email) = lower($1)`;

  const res = await pool.query<User & { password: string }>(queryText, [email]);
  return res.rows[0] ?? null;
}
