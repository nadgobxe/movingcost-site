import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_PATHS = new Set(["/dashboard"]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (![...PROTECTED_PATHS].some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const sessionToken = request.cookies.get("mc_session");
  if (!sessionToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
