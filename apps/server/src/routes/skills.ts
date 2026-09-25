import { Hono } from "hono";
import { requireAdmin } from "../auth.js";
import { readBody } from "../body.js";
import { Skill } from "../models/Skill.js";

export const skills = new Hono();

skills.get("/", async (c) => {
  const list = await Skill.find().sort({ createdAt: -1 }).lean();
  return c.json(list);
});

skills.post("/", requireAdmin, async (c) => {
  const doc = await Skill.create(await readBody(c));
  return c.json(doc, 201);
});

skills.put("/:id", requireAdmin, async (c) => {
  const doc = await Skill.findByIdAndUpdate(
    c.req.param("id"),
    { $set: await readBody(c) },
    { returnDocument: "after", runValidators: true }
  );
  if (!doc) return c.json({ error: "Not found" }, 404);
  return c.json(doc);
});

skills.delete("/:id", requireAdmin, async (c) => {
  const result = await Skill.findByIdAndDelete(c.req.param("id"));
  if (!result) return c.json({ error: "Not found" }, 404);
  return c.json({ ok: true });
});
