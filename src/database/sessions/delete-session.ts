import { pool } from "../db";

export async function deleteSession(token: string) {
  const queryText = `DELETE FROM sessions WHERE token = $1`;
  await pool.query(queryText, [token]);
}
