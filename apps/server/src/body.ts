import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";

// Fields managed by MongoDB/Mongoose that clients must not set.
const PROTECTED_FIELDS = new Set(["_id", "__v", "createdAt", "updatedAt"]);

/** Reads a JSON object body, dropping protected and operator (`$`) keys. */
export async function readBody(c: Context): Promise<Record<string, unknown>> {
  const body: unknown = await c.req.json().catch(() => {
    throw new HTTPException(400, { message: "Invalid JSON body." });
  });
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    throw new HTTPException(400, { message: "Expected a JSON object." });
  }
  return Object.fromEntries(
    Object.entries(body).filter(
      ([key]) => !PROTECTED_FIELDS.has(key) && !key.startsWith("$")
    )
  );
}
