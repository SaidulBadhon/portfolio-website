import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/session";

// Optimistic check only: every dashboard route handler verifies the session again.
export function proxy(request: NextRequest) {
  const isLoginPage = request.nextUrl.pathname === "/dashboard/login";
  const isAuthenticated = verifySessionToken(
    request.cookies.get(SESSION_COOKIE)?.value
  );

  if (isLoginPage) {
    return isAuthenticated
      ? NextResponse.redirect(new URL("/dashboard", request.url))
      : NextResponse.next();
  }

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard/login", request.url));
  }

  return NextResponse.next();
}

export const config = { matcher: ["/dashboard", "/dashboard/:path*"] };
