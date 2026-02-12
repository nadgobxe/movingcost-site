import { NextResponse } from "next/server";
import { login } from "@/lib/auth";

const SESSION_COOKIE = "mc_session";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
    }
    const session = await login(email, password);
    const response = NextResponse.json({ ok: true });
    response.cookies.set(SESSION_COOKIE, session.token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      expires: session.expiresAt,
    });
    return response;
  } catch (error) {
    const message =
      error instanceof Error && error.message === "not_authorized"
        ? "Not authorized"
        : "Invalid credentials";
    return NextResponse.json({ error: message }, { status: 401 });
  }
}
