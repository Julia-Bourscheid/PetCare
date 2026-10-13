import type { Pet } from "@/types";
import { pool } from "../db";
import { petColumns } from "./columns";

export async function getPets(userId: number) {
  const queryText = `SELECT ${petColumns} FROM pets WHERE user_id = $1 ORDER BY name`;

  const res = await pool.query<Pet>(queryText, [userId]);
  return res.rows;
}
