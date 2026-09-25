import { NextResponse, type NextRequest } from "next/server";
import { getApiBaseUrl } from "@/lib/api";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/session";

/**
 * Authenticated pass-through from the dashboard to the backend API.
 *
 * The browser never sees API_SECRET: the dashboard calls /api/admin/*, this
 * handler checks the session cookie and forwards the request with the secret.
 */
const RESOURCES = new Set(["projects", "skills", "experiences", "contact"]);

function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  const host = (
    request.headers.get("x-forwarded-host") ?? request.headers.get("host")
  )
    ?.split(",")[0]
    .trim();
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

async function forward(
  request: NextRequest,
  { params }: RouteContext<"/api/admin/[...path]">
) {
  if (!verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (request.method !== "GET" && !isSameOrigin(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { path } = await params;
  const [resource, id, ...rest] = path;
  if (!RESOURCES.has(resource) || rest.length > 0 || id === "." || id === "..") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const target = `${getApiBaseUrl()}/api/${resource}${id ? `/${encodeURIComponent(id)}` : ""}`;
  const hasBody = request.method === "POST" || request.method === "PUT";

  let upstream: Response;
  try {
    upstream = await fetch(target, {
      method: request.method,
      headers: {
        Authorization: `Bearer ${process.env.API_SECRET}`,
        ...(hasBody && { "Content-Type": "application/json" }),
      },
      body: hasBody ? await request.text() : undefined,
      cache: "no-store",
    });
  } catch (error) {
    console.error("Admin API request failed:", error);
    return NextResponse.json(
      { error: "Could not reach the API server." },
      { status: 502 }
    );
  }

  return new NextResponse(upstream.body, {
    status: upstream.status,
    headers: {
      "Content-Type":
        upstream.headers.get("content-type") ?? "application/json",
    },
  });
}

export { forward as GET, forward as POST, forward as PUT, forward as DELETE };
