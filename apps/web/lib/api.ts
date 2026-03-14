const getBaseUrl = () =>
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function apiFetch<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${getBaseUrl()}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options?.headers },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error || res.statusText);
  }
  return res.json();
}

// Projects
export type ProjectItem = {
  _id?: string;
  id: string;
  title: string;
  description: string;
  tags: string[];
  gradient?: string;
  icon?: string;
  type?: string;
  logo?: string;
  images?: string[];
  videos?: string[];
  longDescription?: string;
  features?: string[];
  technologies?: string[];
  role?: string;
  duration?: string;
  links?: { live?: string; github?: string };
};

export const projectsApi = {
  list: () => apiFetch<ProjectItem[]>("/api/projects"),
  get: (id: string) => apiFetch<ProjectItem>(`/api/projects/${id}`),
  create: (body: Partial<ProjectItem>) =>
    apiFetch<ProjectItem>("/api/projects", { method: "POST", body: JSON.stringify(body) }),
  update: (id: string, body: Partial<ProjectItem>) =>
    apiFetch<ProjectItem>(`/api/projects/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  delete: (id: string) =>
    apiFetch<{ ok: boolean }>(`/api/projects/${id}`, { method: "DELETE" }),
};

// Skills
export type SkillItem = { _id: string; name: string; color?: string };

export const skillsApi = {
  list: () => apiFetch<SkillItem[]>("/api/skills"),
  create: (body: { name: string; color?: string }) =>
    apiFetch<SkillItem>("/api/skills", { method: "POST", body: JSON.stringify(body) }),
  update: (id: string, body: { name: string; color?: string }) =>
    apiFetch<SkillItem>(`/api/skills/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  delete: (id: string) =>
    apiFetch<{ ok: boolean }>(`/api/skills/${id}`, { method: "DELETE" }),
};

// Experiences
export type ExperienceItem = {
  _id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location?: string;
  description?: string;
  icon?: string;
  date?: string;
};

export const experiencesApi = {
  list: () => apiFetch<ExperienceItem[]>("/api/experiences"),
  create: (body: Omit<ExperienceItem, "_id">) =>
    apiFetch<ExperienceItem>("/api/experiences", { method: "POST", body: JSON.stringify(body) }),
  update: (id: string, body: Partial<Omit<ExperienceItem, "_id">>) =>
    apiFetch<ExperienceItem>(`/api/experiences/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  delete: (id: string) =>
    apiFetch<{ ok: boolean }>(`/api/experiences/${id}`, { method: "DELETE" }),
};

// Contact
export type ContactMessageItem = {
  _id: string;
  senderEmail: string;
  message: string;
  createdAt: string;
  updatedAt: string;
};

export const contactApi = {
  submit: (body: { senderEmail: string; message: string }) =>
    apiFetch<{ ok: boolean; id: string }>("/api/contact", {
      method: "POST",
      body: JSON.stringify(body),
    }),
  list: () => apiFetch<ContactMessageItem[]>("/api/contact"),
  delete: (id: string) =>
    apiFetch<{ ok: boolean }>(`/api/contact/${id}`, { method: "DELETE" }),
};
