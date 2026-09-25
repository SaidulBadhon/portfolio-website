import type { Project } from "./types";
import jutsuWeb3Copilot from "./jutsu-web3-copilot";
import jutsuIde from "./jutsu-ide";
import posttAi from "./postt-ai";
import aiDeveloperWorkspace from "./ai-developer-workspace";
import nearconTicketing from "./nearcon-ticketing";
import cystellarDashboard from "./cystellar-dashboard";
import dokanGg from "./dokan-gg";

export type { Project, ProjectIconKey } from "./types";

/** Projects in the order they appear on the site. */
export const projects: Project[] = [
  jutsuWeb3Copilot,
  jutsuIde,
  posttAi,
  aiDeveloperWorkspace,
  nearconTicketing,
  cystellarDashboard,
  dokanGg,
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
