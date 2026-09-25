import "server-only";

import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const SESSION_COOKIE = "dashboard_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days, in seconds

const TOKEN_VERSION = "v1";

/**
 * The dashboard is protected by a single password. Sessions are stateless
 * signed tokens (`v1.<expiresAt>.<signature>`), so a cookie can't be forged
 * without knowing both API_SECRET and DASHBOARD_PASSWORD. Changing either one
 * invalidates every existing session.
 */
function getSigningKey(): Buffer | null {
  const password = process.env.DASHBOARD_PASSWORD;
  const secret = process.env.API_SECRET;
  if (!password || !secret) return null;
  return createHmac("sha256", secret)
    .update(`dashboard-session:${password}`)
    .digest();
}

export function isDashboardConfigured(): boolean {
  return getSigningKey() !== null;
}

function sign(key: Buffer, payload: string): string {
  return createHmac("sha256", key).update(payload).digest("base64url");
}

function safeEqual(a: string, b: string): boolean {
  // Hash first so inputs of different lengths can still be compared in constant time.
  const digest = (value: string) => createHash("sha256").update(value).digest();
  return timingSafeEqual(digest(a), digest(b));
}

export function verifyPassword(candidate: unknown): boolean {
  const password = process.env.DASHBOARD_PASSWORD;
  if (!password || typeof candidate !== "string") return false;
  return safeEqual(candidate, password);
}

export function createSessionToken(): string {
  const key = getSigningKey();
  if (!key) throw new Error("Dashboard auth is not configured");
  const payload = `${TOKEN_VERSION}.${Date.now() + SESSION_MAX_AGE * 1000}`;
  return `${payload}.${sign(key, payload)}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  const key = getSigningKey();
  if (!key || !token) return false;

  const [version, expiresAt, signature, ...rest] = token.split(".");
  if (version !== TOKEN_VERSION || !expiresAt || !signature || rest.length > 0) {
    return false;
  }
  if (!safeEqual(signature, sign(key, `${version}.${expiresAt}`))) return false;

  const expires = Number(expiresAt);
  return Number.isFinite(expires) && expires > Date.now();
}
