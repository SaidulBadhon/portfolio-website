import { Hono } from "hono";
import { Experience } from "../models/Experience.js";

export const experiences = new Hono();

experiences.get("/", async (c) => {
  const list = await Experience.find().sort({ createdAt: -1 }).lean();
  return c.json(list);
});

experiences.post("/", async (c) => {
  const body = await c.req.json();
  const doc = await Experience.create(body);
  return c.json(doc, 201);
});

experiences.put("/:id", async (c) => {
  const body = await c.req.json();
  const doc = await Experience.findByIdAndUpdate(c.req.param("id"), { $set: body }, { new: true });
  if (!doc) return c.json({ error: "Not found" }, 404);
  return c.json(doc);
});

experiences.delete("/:id", async (c) => {
  const result = await Experience.findByIdAndDelete(c.req.param("id"));
  if (!result) return c.json({ error: "Not found" }, 404);
  return c.json({ ok: true });
});
