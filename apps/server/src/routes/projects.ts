import { Hono } from "hono";
import { requireAdmin } from "../auth.js";
import { readBody } from "../body.js";
import { Project } from "../models/Project.js";

export const projects = new Hono();

projects.get("/", async (c) => {
  const list = await Project.find().sort({ createdAt: -1 }).lean();
  return c.json(list);
});

projects.get("/:id", async (c) => {
  const doc = await Project.findOne({ id: c.req.param("id") }).lean();
  if (!doc) return c.json({ error: "Not found" }, 404);
  return c.json(doc);
});

projects.post("/", requireAdmin, async (c) => {
  const doc = await Project.create(await readBody(c));
  return c.json(doc, 201);
});

projects.put("/:id", requireAdmin, async (c) => {
  const doc = await Project.findOneAndUpdate(
    { id: c.req.param("id") },
    { $set: await readBody(c) },
    { returnDocument: "after", runValidators: true }
  );
  if (!doc) return c.json({ error: "Not found" }, 404);
  return c.json(doc);
});

projects.delete("/:id", requireAdmin, async (c) => {
  const result = await Project.findOneAndDelete({ id: c.req.param("id") });
  if (!result) return c.json({ error: "Not found" }, 404);
  return c.json({ ok: true });
});
