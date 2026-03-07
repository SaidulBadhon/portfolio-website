import { Hono } from "hono";
import { Skill } from "../models/Skill.js";

export const skills = new Hono();

skills.get("/", async (c) => {
  const list = await Skill.find().sort({ createdAt: -1 }).lean();
  return c.json(list);
});

skills.post("/", async (c) => {
  const body = await c.req.json();
  const doc = await Skill.create(body);
  return c.json(doc, 201);
});

skills.put("/:id", async (c) => {
  const body = await c.req.json();
  const doc = await Skill.findByIdAndUpdate(c.req.param("id"), { $set: body }, { new: true });
  if (!doc) return c.json({ error: "Not found" }, 404);
  return c.json(doc);
});

skills.delete("/:id", async (c) => {
  const result = await Skill.findByIdAndDelete(c.req.param("id"));
  if (!result) return c.json({ error: "Not found" }, 404);
  return c.json({ ok: true });
});
