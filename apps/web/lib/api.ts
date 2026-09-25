/** Base URL of the backend API (Bun + Hono server). */
export const getApiBaseUrl = () =>
  (
    process.env.API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:4000"
  ).replace(/\/$/, "");

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: options?.body
      ? { "Content-Type": "application/json", ...options.headers }
      : options?.headers,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      (err as { error?: string }).error ||
        res.statusText ||
        `Request failed (${res.status})`
    );
  }
  return res.json();
}

/** Public, read-only endpoints (plus the contact form). */
const publicFetch = <T>(path: string, options?: RequestInit) =>
  request<T>(`${getApiBaseUrl()}${path}`, options);

/** Dashboard endpoints, proxied through the authenticated /api/admin route. */
const adminFetch = <T>(path: string, options?: RequestInit) =>
  request<T>(`/api/admin${path}`, { cache: "no-store", ...options });

const json = (method: string, body: unknown): RequestInit => ({
  method,
  body: JSON.stringify(body),
});

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
  list: (options?: RequestInit) =>
    publicFetch<ProjectItem[]>("/api/projects", options),
  get: (id: string, options?: RequestInit) =>
    publicFetch<ProjectItem>(`/api/projects/${encodeURIComponent(id)}`, options),
};

// Skills
export type SkillItem = { _id: string; name: string; color?: string };

export const skillsApi = {
  list: (options?: RequestInit) =>
    publicFetch<SkillItem[]>("/api/skills", options),
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
  list: (options?: RequestInit) =>
    publicFetch<ExperienceItem[]>("/api/experiences", options),
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
    publicFetch<{ ok: boolean; id: string }>("/api/contact", json("POST", body)),
};

// Dashboard (requires a dashboard session)
type SkillInput = { name: string; color?: string };
type ExperienceInput = Omit<ExperienceItem, "_id">;
type Ok = { ok: boolean };

export const adminApi = {
  projects: {
    list: () => adminFetch<ProjectItem[]>("/projects"),
    create: (body: Partial<ProjectItem>) =>
      adminFetch<ProjectItem>("/projects", json("POST", body)),
    update: (id: string, body: Partial<ProjectItem>) =>
      adminFetch<ProjectItem>(
        `/projects/${encodeURIComponent(id)}`,
        json("PUT", body)
      ),
    delete: (id: string) =>
      adminFetch<Ok>(`/projects/${encodeURIComponent(id)}`, {
        method: "DELETE",
      }),
  },
  skills: {
    list: () => adminFetch<SkillItem[]>("/skills"),
    create: (body: SkillInput) =>
      adminFetch<SkillItem>("/skills", json("POST", body)),
    update: (id: string, body: SkillInput) =>
      adminFetch<SkillItem>(`/skills/${encodeURIComponent(id)}`, json("PUT", body)),
    delete: (id: string) =>
      adminFetch<Ok>(`/skills/${encodeURIComponent(id)}`, { method: "DELETE" }),
  },
  experiences: {
    list: () => adminFetch<ExperienceItem[]>("/experiences"),
    create: (body: ExperienceInput) =>
      adminFetch<ExperienceItem>("/experiences", json("POST", body)),
    update: (id: string, body: Partial<ExperienceInput>) =>
      adminFetch<ExperienceItem>(
        `/experiences/${encodeURIComponent(id)}`,
        json("PUT", body)
      ),
    delete: (id: string) =>
      adminFetch<Ok>(`/experiences/${encodeURIComponent(id)}`, {
        method: "DELETE",
      }),
  },
  messages: {
    list: () => adminFetch<ContactMessageItem[]>("/contact"),
    delete: (id: string) =>
      adminFetch<Ok>(`/contact/${encodeURIComponent(id)}`, { method: "DELETE" }),
  },
};
