import type { Project } from "../types";
import cover from "./cover.png";

const project: Project = {
  slug: "dokan-gg",
  title: "Dokan.gg Platform",
  description: "Full-stack gaming platform serving the gaming community.",
  longDescription:
    "Dokan.gg is a comprehensive gaming platform that connects gamers, provides marketplace functionality, and builds community features. As founder and lead developer, I built the entire platform from scratch, managing both technical development and business operations.",
  type: "Project I worked on",
  role: "Founder & CEO",
  duration: "Apr 2022 - Present",
  icon: "globe",
  gradient: "from-green-500 to-emerald-500",
  tags: [
    "Full-Stack",
    "Product Management",
    "React",
    "Node.js",
    "MongoDB",
  ],
  technologies: [
    "React",
    "Node.js",
    "MongoDB",
    "Express",
    "Socket.io",
    "Redis",
    "AWS",
  ],
  features: [
    "Gaming marketplace with secure transactions",
    "Community forums and discussion boards",
    "Real-time matchmaking system",
    "User profiles with gaming statistics",
    "Tournament management system",
    "Steam and Discord integration",
  ],
  links: {
    live: "https://dokan.gg",
  },
  // The first image is the cover. Add more screenshots to this folder and list
  // them here to show them on the project page.
  images: [cover],
};

export default project;
