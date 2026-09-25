import { Hono } from "hono";
import { requireAdmin } from "../auth.js";
import { readBody } from "../body.js";
import { Experience } from "../models/Experience.js";

export const experiences = new Hono();

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

/**
 * Sort key for the start of a period like "Jul 2025 - Present" or "2018 - 2020".
 * Entries without a recognizable date sort last.
 */
function startDateKey(date: string | null | undefined): number {
  const match = date?.match(/(?:([a-z]{3})[a-z]*\.?\s+)?(\d{4})/i);
  if (!match) return -Infinity;
  const month = match[1] ? MONTHS.indexOf(match[1].toLowerCase()) : 0;
  return Number(match[2]) * 12 + Math.max(month, 0);
}

// Newest role first, so the timeline reads in reverse-chronological order.
experiences.get("/", async (c) => {
  const list = await Experience.find().sort({ createdAt: -1 }).lean();
  list.sort((a, b) => startDateKey(b.date) - startDateKey(a.date));
  return c.json(list);
});

experiences.post("/", requireAdmin, async (c) => {
  const doc = await Experience.create(await readBody(c));
  return c.json(doc, 201);
});

experiences.put("/:id", requireAdmin, async (c) => {
  const doc = await Experience.findByIdAndUpdate(
    c.req.param("id"),
    { $set: await readBody(c) },
    { returnDocument: "after", runValidators: true }
  );
  if (!doc) return c.json({ error: "Not found" }, 404);
  return c.json(doc);
});

experiences.delete("/:id", requireAdmin, async (c) => {
  const result = await Experience.findByIdAndDelete(c.req.param("id"));
  if (!result) return c.json({ error: "Not found" }, 404);
  return c.json({ ok: true });
});
