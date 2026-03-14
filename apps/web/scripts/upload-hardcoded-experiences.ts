import { experiencesData } from "../lib/data/experiencesData";

type ExperiencePayload = {
  title: string;
  company: string;
  companyLogo?: string;
  location?: string;
  description?: string;
  icon?: string;
  date?: string;
};

type ExperienceDoc = ExperiencePayload & {
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

const endpoint = `${apiBase}/api/experiences`;

const readErrorMessage = async (res: Response) => {
  const body = (await res.json().catch(() => null)) as ApiError | null;
  return body?.error || `${res.status} ${res.statusText}`;
};

const listExperiences = async () => {
  const res = await fetch(endpoint);
  if (!res.ok) {
    throw new Error(`Failed to fetch experiences: ${await readErrorMessage(res)}`);
  }
  return (await res.json()) as ExperienceDoc[];
};

const createExperience = async (payload: ExperiencePayload) => {
  return fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
};

const updateExperience = async (id: string, payload: ExperiencePayload) => {
  return fetch(`${endpoint}/${encodeURIComponent(id)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
};

const keyFor = (item: { title?: string; company?: string; date?: string }) =>
  `${item.title ?? ""}::${item.company ?? ""}::${item.date ?? ""}`.toLowerCase();

const toPayload = (item: (typeof experiencesData)[number]): ExperiencePayload => {
  return {
    title: item.title,
    company: item.company,
    companyLogo: item.companyLogo,
    location: item.location,
    description: item.description,
    date: item.date,
  };
};

const run = async () => {
  console.log(`Uploading ${experiencesData.length} hardcoded experiences to ${endpoint}`);

  const existing = await listExperiences();
  const byKey = new Map(existing.map((entry) => [keyFor(entry), entry]));

  let created = 0;
  let updated = 0;
  let failed = 0;

  for (const item of experiencesData) {
    const payload = toPayload(item);
    const key = keyFor(payload);
    const match = byKey.get(key);

    if (!match) {
      const createRes = await createExperience(payload);
      if (createRes.ok) {
        created += 1;
        console.log(`+ Created: ${payload.title} @ ${payload.company}`);
      } else {
        failed += 1;
        console.error(
          `x Failed to create ${payload.title} @ ${payload.company}: ${await readErrorMessage(createRes)}`
        );
      }
      continue;
    }

    const updateRes = await updateExperience(match._id, payload);
    if (updateRes.ok) {
      updated += 1;
      console.log(`~ Updated: ${payload.title} @ ${payload.company}`);
    } else {
      failed += 1;
      console.error(
        `x Failed to update ${payload.title} @ ${payload.company}: ${await readErrorMessage(updateRes)}`
      );
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
