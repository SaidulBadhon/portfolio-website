import type { MiddlewareHandler } from "hono";
import { bearerAuth } from "hono/bearer-auth";

let verify: MiddlewareHandler | undefined;

/**
 * Protects write/admin routes with `Authorization: Bearer <API_SECRET>`.
 * Only the dashboard (through the web app's server) and the seed scripts
 * know the secret. Fails closed when API_SECRET isn't configured.
 */
export const requireAdmin: MiddlewareHandler = async (c, next) => {
  const token = process.env.API_SECRET;
  if (!token) {
    return c.json({ error: "API_SECRET is not configured on the server." }, 503);
  }
  verify ??= bearerAuth({
    token,
    noAuthenticationHeader: { message: { error: "Unauthorized" } },
    invalidAuthenticationHeader: { message: { error: "Unauthorized" } },
    invalidToken: { message: { error: "Unauthorized" } },
  });
  return verify(c, next);
};
