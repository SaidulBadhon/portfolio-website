import type { Project } from "../types";
import cover from "./cover.png";

const project: Project = {
  slug: "jutsu-web3-copilot",
  title: "Jutsu | Web3 Copilot",
  description: "Jutsu is the fastest way to build and deploy decentralized apps.",
  longDescription:
    "Jutsu Web3 Copilot is a revolutionary platform that accelerates the development and deployment of decentralized applications. It provides developers with an intuitive interface, pre-built templates, and seamless integration with blockchain networks, reducing the time from concept to deployment by up to 70%.",
  type: "Project I worked on",
  role: "Full Stack Developer",
  duration: "Jan 2024 - Present",
  icon: "rocket",
  gradient: "from-violet-500 to-purple-600",
  tags: [
    "Next JS",
    "Near VM",
    "Blockchain",
    "Web3",
  ],
  technologies: [
    "Next.js",
    "NEAR Protocol",
    "TypeScript",
    "Rust",
    "Web3.js",
    "IPFS",
  ],
  features: [
    "One-click dApp deployment to multiple blockchain networks",
    "Pre-built smart contract templates and components",
    "Real-time testing and debugging environment",
    "Integrated wallet management and transaction monitoring",
    "Cross-chain compatibility with NEAR, Ethereum, and more",
  ],
  links: {
    live: "https://jutsu.ai",
  },
  // The first image is the cover. Add more screenshots to this folder and list
  // them here to show them on the project page.
  images: [cover],
};

export default project;
