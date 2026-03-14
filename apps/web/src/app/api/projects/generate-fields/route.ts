import { NextResponse } from "next/server";
import { google } from "@ai-sdk/google";
import { generateText, Output } from "ai";
import { z } from "zod";

const GeneratedFieldsSchema = z.object({
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  longDescription: z.string().optional(),
  features: z.array(z.string()).optional(),
  technologies: z.array(z.string()).optional(),
  role: z.string().optional(),
  duration: z.string().optional(),
});

export type GeneratedFields = z.infer<typeof GeneratedFieldsSchema>;

/** Request body: partial project data from the form */
type GenerateBody = {
  id?: string;
  title?: string;
  description?: string;
  tags?: string[];
  longDescription?: string;
  features?: string[];
  technologies?: string[];
  role?: string;
  duration?: string;
  links?: { live?: string; github?: string };
};

function isEmpty(value: unknown): boolean {
  if (value == null) return true;
  if (typeof value === "string") return value.trim() === "";
  if (Array.isArray(value)) return value.length === 0;
  return false;
}

export async function POST(request: Request) {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "GOOGLE_GENERATIVE_AI_API_KEY is not configured" },
      { status: 500 }
    );
  }

  let body: GenerateBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const provided = {
    id: body.id ?? "",
    title: body.title ?? "",
    description: body.description ?? "",
    tags: body.tags ?? [],
    longDescription: body.longDescription ?? "",
    features: body.features ?? [],
    technologies: body.technologies ?? [],
    role: body.role ?? "",
    duration: body.duration ?? "",
  };

  const missing: string[] = [];
  if (isEmpty(provided.description)) missing.push("description (short one-line summary)");
  if (isEmpty(provided.tags)) missing.push("tags (comma-separated tech/topic tags)");
  if (isEmpty(provided.longDescription)) missing.push("longDescription (2-4 sentence overview)");
  if (isEmpty(provided.features)) missing.push("features (bullet list of key features)");
  if (isEmpty(provided.technologies)) missing.push("technologies (list of tech stack)");
  if (isEmpty(provided.role)) missing.push("role (e.g. Full-stack developer)");
  if (isEmpty(provided.duration)) missing.push("duration (e.g. Jan 2024 - Present)");

  if (missing.length === 0) {
    return NextResponse.json({ generated: {} as GeneratedFields });
  }

  const hasContext = [provided.id, provided.title, provided.description].some(
    (v) => typeof v === "string" && v.trim().length > 0
  );
  if (!hasContext) {
    return NextResponse.json(
      { error: "Provide at least ID, title, or short description so AI can generate missing fields." },
      { status: 400 }
    );
  }

  const prompt = `You are helping fill out a portfolio project form. Given the following project data, generate only the missing fields listed below. Keep responses concise and professional. Use the existing fields as context.

Existing project data:
- id: ${provided.id || "(none)"}
- title: ${provided.title || "(none)"}
- description: ${provided.description || "(none)"}
- tags: ${(provided.tags ?? []).join(", ") || "(none)"}
- longDescription: ${provided.longDescription || "(none)"}
- role: ${provided.role || "(none)"}
- duration: ${provided.duration || "(none)"}
- features: ${(provided.features ?? []).join("; ") || "(none)"}
- technologies: ${(provided.technologies ?? []).join(", ") || "(none)"}

Generate only these missing fields (use exact keys, omit any field you prefer to leave empty): ${missing.join(", ")}`;

  try {
    const { output } = await generateText({
      model: google("gemini-2.5-flash"),
      output: Output.object({
        schema: GeneratedFieldsSchema,
      }),
      prompt,
    });

    const generated: GeneratedFields = {
      ...(output.description != null && { description: output.description }),
      ...(output.tags != null && output.tags.length > 0 && { tags: output.tags }),
      ...(output.longDescription != null && { longDescription: output.longDescription }),
      ...(output.features != null && output.features.length > 0 && { features: output.features }),
      ...(output.technologies != null && output.technologies.length > 0 && { technologies: output.technologies }),
      ...(output.role != null && { role: output.role }),
      ...(output.duration != null && { duration: output.duration }),
    };

    return NextResponse.json({ generated });
  } catch (err) {
    console.error("Generate fields error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "AI generation failed" },
      { status: 500 }
    );
  }
}
