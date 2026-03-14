import { projectsCardData } from "../lib/data/projectsCardData";

type UploadableProject = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  gradient?: string;
  icon?: string;
  type?: string;
  image?: string;
  images?: string[];
  longDescription?: string;
  features?: string[];
  technologies?: string[];
  role?: string;
  duration?: string;
  links?: { live?: string; github?: string };
};

type ApiError = {
  error?: string;
};

const apiBase = (
  process.env.NEXT_PUBLIC_API_URL ??
  process.env.API_URL ??
  "http://localhost:4000"
).replace(/\/$/, "");

const projectsEndpoint = `${apiBase}/api/projects`;

const toPayload = (project: UploadableProject): UploadableProject => {
  const images = project.images?.length
    ? project.images
    : project.image
      ? [project.image]
      : [];

  return {
    ...project,
    images,
  };
};

const readErrorMessage = async (res: Response) => {
  const body = (await res.json().catch(() => null)) as ApiError | null;
  return body?.error || `${res.status} ${res.statusText}`;
};

const createProject = async (payload: UploadableProject) => {
  return fetch(projectsEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
};

const updateProject = async (id: string, payload: UploadableProject) => {
  return fetch(`${projectsEndpoint}/${encodeURIComponent(id)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
};

const run = async () => {
  console.log(`Uploading ${projectsCardData.length} hardcoded projects to ${projectsEndpoint}`);

  let created = 0;
  let updated = 0;
  let failed = 0;

  for (const project of projectsCardData) {
    const payload = toPayload(project);
    const createRes = await createProject(payload);

    if (createRes.ok) {
      created += 1;
      console.log(`+ Created: ${project.id}`);
      continue;
    }

    if (createRes.status === 409) {
      const updateRes = await updateProject(project.id, payload);
      if (updateRes.ok) {
        updated += 1;
        console.log(`~ Updated: ${project.id}`);
        continue;
      }

      failed += 1;
      console.error(
        `x Failed to update ${project.id}: ${await readErrorMessage(updateRes)}`
      );
      continue;
    }

    failed += 1;
    console.error(
      `x Failed to create ${project.id}: ${await readErrorMessage(createRes)}`
    );
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
