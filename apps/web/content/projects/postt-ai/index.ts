import type { Project } from "../types";
import cover from "./cover.png";

const project: Project = {
  slug: "postt-ai",
  title: "Postt.ai",
  description: "AI-powered developer relations platform automating community engagement and support.",
  longDescription:
    "Postt.ai is an innovative developer relations platform that leverages artificial intelligence to automate community engagement, support ticket resolution, and content generation. It helps developer-focused companies scale their community efforts while maintaining personalized interactions.",
  type: "Project I worked on",
  role: "Lead Developer & Project Manager",
  duration: "Jul 2024 - Present",
  icon: "bolt",
  gradient: "from-emerald-500 to-teal-500",
  tags: [
    "AI",
    "Next.js",
    "TypeScript",
    "Developer Relations",
    "Automation",
  ],
  technologies: [
    "Next.js",
    "OpenAI",
    "TypeScript",
    "PostgreSQL",
    "Redis",
    "Discord.js",
    "Twitter API",
  ],
  features: [
    "AI-powered support ticket auto-resolution",
    "Automated community engagement across Discord, Telegram, and Twitter",
    "Intelligent FAQ generation from documentation",
    "Developer sentiment analysis and reporting",
    "Multi-platform bot integration",
    "Custom training on company-specific knowledge",
  ],
  links: {
    live: "https://postt.ai",
  },
  // The first image is the cover. Add more screenshots to this folder and list
  // them here to show them on the project page.
  images: [cover],
};

export default project;
