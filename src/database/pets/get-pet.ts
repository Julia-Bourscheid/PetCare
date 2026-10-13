import type { Pet } from "@/types";
import { pool } from "../db";
import { petColumns } from "./columns";

export async function getPet(petId: number, userId: number) {
  const queryText = `SELECT ${petColumns} FROM pets WHERE id = $1 AND user_id = $2`;

  const res = await pool.query<Pet>(queryText, [petId, userId]);
  return res.rows[0] ?? null;
}
