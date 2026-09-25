import type { StaticImageData } from "next/image";

export type ProjectIconKey =
  | "rocket"
  | "code"
  | "bolt"
  | "brain"
  | "cubes"
  | "database"
  | "globe";

export type Project = {
  /** URL of the project page: /projects/<slug>. Keep it the same as the folder name. */
  slug: string;
  title: string;
  /** One-line summary shown on the project card. */
  description: string;
  /** Overview paragraph on the project page. */
  longDescription: string;
  /** Badge on the project card, e.g. "Project I worked on". */
  type: string;
  role: string;
  duration: string;
  icon: ProjectIconKey;
  /** Tailwind gradient stops, e.g. "from-violet-500 to-purple-600". */
  gradient: string;
  tags: string[];
  technologies: string[];
  features: string[];
  links: { live?: string; github?: string };
  /** Images imported from the project's folder. The first one is the cover. */
  images: StaticImageData[];
};
