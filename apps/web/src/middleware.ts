import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/dashboard/login") return NextResponse.next();
  if (!req.nextUrl.pathname.startsWith("/dashboard")) return NextResponse.next();
  const cookie = req.cookies.get("dashboard_auth");
  if (!cookie?.value) {
    return NextResponse.redirect(new URL("/dashboard/login", req.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/dashboard", "/dashboard/:path*"] };
