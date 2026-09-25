import { Hono } from "hono";
import { requireAdmin } from "../auth.js";
import { readBody } from "../body.js";
import { ContactMessage } from "../models/ContactMessage.js";

export const contact = new Hono();

const isValidEmail = (value: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

contact.get("/", requireAdmin, async (c) => {
  const list = await ContactMessage.find().sort({ createdAt: -1 }).lean();
  return c.json(list);
});

contact.post("/", async (c) => {
  const body = await readBody(c);

  const senderEmail =
    typeof body.senderEmail === "string" ? body.senderEmail.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!senderEmail || !isValidEmail(senderEmail) || senderEmail.length > 500) {
    return c.json({ error: "Invalid sender email." }, 400);
  }

  if (!message || message.length > 5000) {
    return c.json({ error: "Invalid message." }, 400);
  }

  const doc = await ContactMessage.create({ senderEmail, message });

  return c.json({ ok: true, id: doc._id }, 201);
});

contact.delete("/:id", requireAdmin, async (c) => {
  const result = await ContactMessage.findByIdAndDelete(c.req.param("id"));
  if (!result) return c.json({ error: "Not found" }, 404);
  return c.json({ ok: true });
});
