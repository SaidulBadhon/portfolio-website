import { NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  createSessionToken,
  isDashboardConfigured,
  verifyPassword,
} from "@/lib/session";

export async function POST(req: Request) {
  if (!isDashboardConfigured()) {
    return NextResponse.json(
      { error: "Dashboard not configured: set DASHBOARD_PASSWORD and API_SECRET." },
      { status: 500 }
    );
  }

  const body = await req.json().catch(() => null);
  const password = (body as { password?: unknown } | null)?.password;
  if (!verifyPassword(password)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });
  return res;
}
