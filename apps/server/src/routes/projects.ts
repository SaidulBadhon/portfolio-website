import { Hono } from "hono";
import { Project } from "../models/Project.js";

export const projects = new Hono();

const isDuplicateKeyError = (error: unknown): boolean => {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: number }).code === 11000
  );
};

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
  try {
    const body = await c.req.json();
    const doc = await Project.create(body);
    return c.json(doc, 201);
  } catch (error) {
    if (isDuplicateKeyError(error)) {
      return c.json({ error: "Project ID already exists." }, 409);
    }
    throw error;
  }
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
