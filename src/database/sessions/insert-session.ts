import { pool } from "../db";

export async function insertSession(
  token: string,
  userId: number,
  expiresAt: Date,
) {
  const queryText = `INSERT INTO sessions(token, user_id, expires_at) VALUES($1, $2, $3)`;
  await pool.query(queryText, [token, userId, expiresAt]);
}
