import type { Project } from "../types";
import cover from "./cover.png";

const project: Project = {
  slug: "nearcon-ticketing",
  title: "NEARCON 2023 Ticketing System",
  description: "Decentralized ticketing system for NEARCON 2023 conference.",
  longDescription:
    "A fully decentralized ticketing system built for NEARCON 2023, one of the largest Web3 conferences. The system handled thousands of attendees with NFT-based tickets, ensuring transparency, preventing fraud, and providing a seamless check-in experience.",
  type: "Project I worked on",
  role: "Smart Contract Developer",
  duration: "Jun 2023 - Oct 2023",
  icon: "cubes",
  gradient: "from-pink-500 to-rose-500",
  tags: [
    "Web3",
    "Blockchain",
    "NEAR Protocol",
    "React",
    "Smart Contracts",
  ],
  technologies: [
    "NEAR Protocol",
    "React",
    "Rust",
    "TypeScript",
    "Wallet Connect",
    "IPFS",
  ],
  features: [
    "NFT-based tickets with transferability controls",
    "QR code generation and validation",
    "Real-time attendance tracking on-chain",
    "Multi-tier ticket system (General, VIP, Speaker)",
    "POAP (Proof of Attendance Protocol) integration",
    "Analytics dashboard for organizers",
  ],
  links: {
    live: "https://nearcon.dev",
  },
  // The first image is the cover. Add more screenshots to this folder and list
  // them here to show them on the project page.
  images: [cover],
};

export default project;
