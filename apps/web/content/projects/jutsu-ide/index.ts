import type { Project } from "../types";
import cover from "./cover.png";

const project: Project = {
  slug: "jutsu-ide",
  title: "Jutsu IDE",
  description: "AI-powered decentralized code editor for building Web3 applications with intelligent code completion and blockchain integration.",
  longDescription:
    "Jutsu IDE is an AI-powered decentralized code editor specifically designed for Web3 development. It features intelligent code completion, real-time smart contract analysis, and seamless blockchain integration, enabling developers to build, test, and deploy smart contracts entirely in the browser.",
  type: "Project I worked on",
  role: "Core Developer",
  duration: "Jan 2023 - Dec 2023",
  icon: "code",
  gradient: "from-blue-500 to-cyan-500",
  tags: [
    "CodeMirror",
    "Near Protocol",
    "Blockchain",
    "Web3",
  ],
  technologies: [
    "CodeMirror",
    "NEAR Protocol",
    "Monaco Editor",
    "TypeScript",
    "WASM",
    "WebSocket",
  ],
  features: [
    "AI-powered code completion and suggestions",
    "In-browser smart contract compilation and deployment",
    "Real-time security vulnerability detection",
    "Multi-language support (Rust, Solidity, AssemblyScript)",
    "Integrated terminal and file system",
    "Collaborative editing with real-time sync",
  ],
  links: {
    live: "https://ide.jutsu.ai",
  },
  // The first image is the cover. Add more screenshots to this folder and list
  // them here to show them on the project page.
  images: [cover],
};

export default project;
