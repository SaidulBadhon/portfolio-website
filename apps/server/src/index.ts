import { Hono } from "hono";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";
import mongoose from "mongoose";
import { connectDb } from "./db.js";
import { projects } from "./routes/projects.js";
import { skills } from "./routes/skills.js";
import { experiences } from "./routes/experiences.js";
import { contact } from "./routes/contact.js";

await connectDb();

if (!process.env.API_SECRET) {
  console.warn(
    "API_SECRET is not set: write and admin endpoints will reject every request."
  );
}

const app = new Hono();

app.use("*", cors());

app.get("/", (c) => c.json({ name: "portfolio-api", version: "0.1.0" }));

app.route("/api/projects", projects);
app.route("/api/skills", skills);
app.route("/api/experiences", experiences);
app.route("/api/contact", contact);

app.notFound((c) => c.json({ error: "Not found" }, 404));

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    // e.g. bearerAuth, which builds its own 401 response
    if (err.res) return err.getResponse();
    return c.json({ error: err.message }, err.status);
  }
  if (
    err instanceof mongoose.Error.ValidationError ||
    err instanceof mongoose.Error.CastError
  ) {
    return c.json({ error: err.message }, 400);
  }
  if ((err as { code?: unknown }).code === 11000) {
    return c.json({ error: "A record with this ID already exists." }, 409);
  }
  console.error(err);
  return c.json({ error: "Internal Server Error" }, 500);
});

const port = Number(process.env.PORT) || 4000;
console.log(`Server listening on http://localhost:${port}`);

export default {
  port,
  fetch: app.fetch,
};
