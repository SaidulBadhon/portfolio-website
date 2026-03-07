import { Hono } from "hono";
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

projects.post("/", async (c) => {
  const body = await c.req.json();
  const doc = await Project.create(body);
  return c.json(doc, 201);
});

projects.put("/:id", async (c) => {
  const body = await c.req.json();
  const doc = await Project.findOneAndUpdate(
    { id: c.req.param("id") },
    { $set: body },
    { new: true }
  );
  if (!doc) return c.json({ error: "Not found" }, 404);
  return c.json(doc);
});

projects.delete("/:id", async (c) => {
  const result = await Project.findOneAndDelete({ id: c.req.param("id") });
  if (!result) return c.json({ error: "Not found" }, 404);
  return c.json({ ok: true });
});
