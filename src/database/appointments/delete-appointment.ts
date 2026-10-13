import { pool } from "../db";

export async function deleteAppointment(id: string, userId: string) {
  const queryText = `
    DELETE FROM appointments a
    USING pets p
    WHERE a.id = $1 AND p.id = a.pet_id AND p.user_id = $2`;

  const res = await pool.query(queryText, [id, userId]);
  return res.rowCount === 1;
}
