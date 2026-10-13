import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/session-cookie";

// Checagem rápida pelo cookie; as rotas da API validam a sessão no banco.
export function proxy(request: NextRequest) {
  if (request.cookies.has(SESSION_COOKIE)) return NextResponse.next();
  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/dashboard", "/compromissos/:path*", "/pets/:path*"],
};
