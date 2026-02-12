import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const SESSION_COOKIE = "mc_session";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  const response = NextResponse.json({ ok: true });
  response.cookies.delete(SESSION_COOKIE);
  return response;
}
