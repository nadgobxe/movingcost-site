import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { query } from "@/lib/db";

const PROTECTED_PATHS = ["/dashboard"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!PROTECTED_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const sessionToken = request.cookies.get("mc_session")?.value;
  if (!sessionToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const sessions = await query<{ user_id: string; expires_at: Date }>(
    "SELECT user_id, expires_at FROM sessions WHERE token = $1",
    [sessionToken]
  );

  const session = sessions.at(0);
  if (!session || new Date(session.expires_at) < new Date()) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const users = await query<{ role: string }>(
    "SELECT role FROM users WHERE id = $1",
    [session.user_id]
  );

  const user = users.at(0);
  if (!user || user.role !== "admin") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
