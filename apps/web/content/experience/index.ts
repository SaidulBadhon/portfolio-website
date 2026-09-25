import type { StaticImageData } from "next/image";
import cryptosynkLogo from "./logos/cryptosynk.png";
import cystellarLogo from "./logos/cystellar.png";
import dokanLogo from "./logos/dokan.png";
import fiverrLogo from "./logos/fiverr.png";
import jutsuLogo from "./logos/jutsu.png";
import techsecbdLogo from "./logos/techsecbd.jpeg";

export type Experience = {
  title: string;
  company: string;
  /** Company logo; the first letter of the company is shown without one. */
  logo?: StaticImageData;
  location: string;
  date: string;
  description: string;
};

/** Work history, shown top to bottom on the timeline. */
export const experiences: Experience[] = [
  {
    title: "Full Stack Engineer & Project Manager",
    company: "Jutsu",
    logo: jutsuLogo,
    location: "San Francisco, California, United States • Remote",
    date: "Jul 2025 - Present",
    description:
      "Leading a small engineering team while remaining hands-on with development. Bridging technical execution and project management, overseeing product strategy, coordinating sprints, and contributing code across the stack. Building AI-powered developer relations services and leading the development of Postt.ai.",
  },
  {
    title: "Full Stack Engineer",
    company: "Jutsu",
    logo: jutsuLogo,
    location: "San Francisco, California, United States",
    date: "Aug 2023 - Jun 2025",
    description:
      "Contributed to building scalable Web3 and AI-powered solutions, helping transition the company's focus from decentralized applications to advanced AI developer tools. Developed an AI-powered workspace for developers, implemented a vector database, and built big data processing systems to support small language models (SLMs).",
  },
  {
    title: "Software Engineer Intern",
    company: "Jutsu",
    logo: jutsuLogo,
    location: "San Francisco, California, United States • Remote",
    date: "Jan 2023 - Jul 2023",
    description:
      "Started as a frontend developer and quickly expanded into a full-stack role. Helped develop a Web3 IDE for in-browser smart contract development and contributed to building a Web3 ticketing system used for NEARCON 2023.",
  },
  {
    title: "CEO",
    company: "Dokan.gg",
    logo: dokanLogo,
    location: "Dhaka, Bangladesh • Hybrid",
    date: "Apr 2022 - Present",
    description:
      "Founded and led Dokan.gg, managing business operations, product development, and team coordination.",
  },
  {
    title: "Frontend Web Developer Intern",
    company: "CyStellar",
    logo: cystellarLogo,
    location: "London, United Kingdom • Remote",
    date: "Jul 2022 - Dec 2022",
    description:
      "Developed intuitive, data-driven web dashboards that transform complex geospatial and environmental data into clear, interactive visual insights. Built responsive, high-performance user interfaces, integrated APIs, and optimized user experiences for CyStellar's satellite-driven risk intelligence platform.",
  },
  {
    title: "Freelance Web Developer",
    company: "Fiverr",
    logo: fiverrLogo,
    location: "Remote",
    date: "Oct 2020 - Nov 2022",
    description:
      "Started as a frontend developer on Fiverr, building modern and responsive websites, landing pages, and small business portfolios. Expanded into full-stack development, managing both client-side and server-side features using JavaScript, React, Node.js, and MongoDB.",
  },
  {
    title: "Frontend Developer",
    company: "Cryptosynk LLC",
    logo: cryptosynkLogo,
    location: "San Francisco Bay Area • Remote",
    date: "Sep 2021 - Jun 2022",
    description:
      "Built modern, responsive websites and landing pages. Collaborated with designers and backend developers to create fast, user-friendly interfaces and helped improve the overall design and performance of the company's web products.",
  },
  {
    title: "CEO",
    company: "TechSecBD",
    logo: techsecbdLogo,
    location: "Bangladesh",
    date: "Jan 2018 - Mar 2020",
    description:
      "Founded and managed a tech-focused YouTube channel, creating educational content about technology, programming, and cybersecurity for a growing audience.",
  },
];
