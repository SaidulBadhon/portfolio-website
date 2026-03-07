import { Hono } from "hono";
import { cors } from "hono/cors";
import { connectDb } from "./db.js";
import { projects } from "./routes/projects.js";
import { skills } from "./routes/skills.js";
import { experiences } from "./routes/experiences.js";

await connectDb();

const app = new Hono();

app.use("*", cors());

app.get("/", (c) => c.json({ name: "portfolio-api", version: "0.1.0" }));

app.route("/api/projects", projects);
app.route("/api/skills", skills);
app.route("/api/experiences", experiences);

const port = Number(process.env.PORT) || 4000;
console.log(`Server listening on http://localhost:${port}`);

export default {
  port,
  fetch: app.fetch,
};
