import { skillsData } from "../lib/data/skillsData";

type SkillPayload = {
  name: string;
  color?: string;
};

type SkillDoc = SkillPayload & {
  _id: string;
};

type ApiError = {
  error?: string;
};

const apiBase = (
  process.env.NEXT_PUBLIC_API_URL ??
  process.env.API_URL ??
  "http://localhost:4000"
).replace(/\/$/, "");

const endpoint = `${apiBase}/api/skills`;

const readErrorMessage = async (res: Response) => {
  const body = (await res.json().catch(() => null)) as ApiError | null;
  return body?.error || `${res.status} ${res.statusText}`;
};

const listSkills = async () => {
  const res = await fetch(endpoint);
  if (!res.ok) {
    throw new Error(`Failed to fetch skills: ${await readErrorMessage(res)}`);
  }
  return (await res.json()) as SkillDoc[];
};

const createSkill = async (payload: SkillPayload) => {
  return fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
};

const updateSkill = async (id: string, payload: SkillPayload) => {
  return fetch(`${endpoint}/${encodeURIComponent(id)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
};

const run = async () => {
  console.log(`Uploading ${skillsData.length} hardcoded skills to ${endpoint}`);

  const existing = await listSkills();
  const byName = new Map(existing.map((skill) => [skill.name.toLowerCase(), skill]));

  let created = 0;
  let updated = 0;
  let failed = 0;

  for (const name of skillsData) {
    const payload: SkillPayload = { name };
    const match = byName.get(name.toLowerCase());

    if (!match) {
      const createRes = await createSkill(payload);
      if (createRes.ok) {
        created += 1;
        console.log(`+ Created: ${name}`);
      } else {
        failed += 1;
        console.error(`x Failed to create ${name}: ${await readErrorMessage(createRes)}`);
      }
      continue;
    }

    const updateRes = await updateSkill(match._id, payload);
    if (updateRes.ok) {
      updated += 1;
      console.log(`~ Updated: ${name}`);
    } else {
      failed += 1;
      console.error(`x Failed to update ${name}: ${await readErrorMessage(updateRes)}`);
    }
  }

  console.log("");
  console.log("Upload complete");
  console.log(`Created: ${created}`);
  console.log(`Updated: ${updated}`);
  console.log(`Failed:  ${failed}`);

  if (failed > 0) {
    process.exitCode = 1;
  }
};

void run();
