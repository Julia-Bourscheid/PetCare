import { randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { deleteSession } from "@/database/sessions/delete-session";
import { getSessionUser } from "@/database/sessions/get-session-user";
import { insertSession } from "@/database/sessions/insert-session";
import { SESSION_COOKIE } from "./session-cookie";

const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

export async function startSession(userId: string) {
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
  await insertSession(token, userId, expiresAt);

  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  });
}

export async function currentUser() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return getSessionUser(token);
}

export async function endSession() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (token) await deleteSession(token);
  store.delete(SESSION_COOKIE);
}

export function unauthorized() {
  return Response.json(
    { message: "Faça login para continuar." },
    { status: 401 },
  );
}
