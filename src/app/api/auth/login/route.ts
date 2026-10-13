import type { NextRequest } from "next/server";
import { getUserByEmail } from "@/database/users/get-user-by-email";
import { verifyPassword } from "@/lib/password";
import { startSession } from "@/lib/session";

async function readCredentials(request: NextRequest) {
  try {
    const body = await request.json();
    return {
      email: typeof body.email === "string" ? body.email.trim() : "",
      password: typeof body.password === "string" ? body.password : "",
    };
  } catch {
    return { email: "", password: "" };
  }
}

export async function POST(request: NextRequest) {
  const { email, password } = await readCredentials(request);
  if (!email || !password) {
    return Response.json(
      { message: "Informe e-mail e senha para continuar." },
      { status: 400 },
    );
  }

  const user = await getUserByEmail(email);
  if (!user || !(await verifyPassword(password, user.password))) {
    return Response.json(
      { message: "E-mail ou senha inválidos." },
      { status: 401 },
    );
  }

  await startSession(user.id);
  return Response.json({ id: user.id, name: user.name, email: user.email });
}
