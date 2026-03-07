import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";

export const experiencesData = [
  {
    title: "Full Stack Engineer & Project Manager",
    company: "Jutsu",
    companyLogo: "/assets/experience/jutsu.png",
    location: "San Francisco, California, United States • Remote",
    description:
      "Leading a small engineering team while remaining hands-on with development. Bridging technical execution and project management, overseeing product strategy, coordinating sprints, and contributing code across the stack. Building AI-powered developer relations services and leading the development of Postt.ai.",
    icon: React.createElement(FaReact),
    date: "Jul 2025 - Present",
  },
  {
    title: "Full Stack Engineer",
    company: "Jutsu",
    companyLogo: "/assets/experience/jutsu.png",
    location: "San Francisco, California, United States",
    description:
      "Contributed to building scalable Web3 and AI-powered solutions, helping transition the company's focus from decentralized applications to advanced AI developer tools. Developed an AI-powered workspace for developers, implemented a vector database, and built big data processing systems to support small language models (SLMs).",
    icon: React.createElement(FaReact),
    date: "Aug 2023 - Jun 2025",
  },
  {
    title: "Software Engineer Intern",
    company: "Jutsu",
    companyLogo: "/assets/experience/jutsu.png",
    location: "San Francisco, California, United States • Remote",
    description:
      "Started as a frontend developer and quickly expanded into a full-stack role. Helped develop a Web3 IDE for in-browser smart contract development and contributed to building a Web3 ticketing system used for NEARCON 2023.",
    icon: React.createElement(CgWorkAlt),
    date: "Jan 2023 - Jul 2023",
  },
  {
    title: "CEO",
    company: "Dokan.gg",
    companyLogo: "/assets/experience/dokan.png",
    location: "Dhaka, Bangladesh • Hybrid",
    description:
      "Founded and led Dokan.gg, managing business operations, product development, and team coordination.",
    icon: React.createElement(CgWorkAlt),
    date: "Apr 2022 - Present",
  },
  {
    title: "Frontend Web Developer Intern",
    company: "CyStellar",
    companyLogo: "/assets/experience/cystellar.png",
    location: "London, United Kingdom • Remote",
    description:
      "Developed intuitive, data-driven web dashboards that transform complex geospatial and environmental data into clear, interactive visual insights. Built responsive, high-performance user interfaces, integrated APIs, and optimized user experiences for CyStellar's satellite-driven risk intelligence platform.",
    icon: React.createElement(FaReact),
    date: "Jul 2022 - Dec 2022",
  },
  {
    title: "Freelance Web Developer",
    company: "Fiverr",
    companyLogo: "/assets/experience/fiverr.png",
    location: "Remote",
    description:
      "Started as a frontend developer on Fiverr, building modern and responsive websites, landing pages, and small business portfolios. Expanded into full-stack development, managing both client-side and server-side features using JavaScript, React, Node.js, and MongoDB.",
    icon: React.createElement(CgWorkAlt),
    date: "Oct 2020 - Nov 2022",
  },
  {
    title: "Frontend Developer",
    company: "Cryptosynk LLC",
    companyLogo: "/assets/experience/cryptosynk.png",
    location: "San Francisco Bay Area • Remote",
    description:
      "Built modern, responsive websites and landing pages. Collaborated with designers and backend developers to create fast, user-friendly interfaces and helped improve the overall design and performance of the company's web products.",
    icon: React.createElement(FaReact),
    date: "Sep 2021 - Jun 2022",
  },
  {
    title: "CEO",
    company: "TechSecBD",
    companyLogo: "/assets/experience/techsecbd.jpeg",
    location: "Bangladesh",
    description:
      "Founded and managed a tech-focused YouTube channel, creating educational content about technology, programming, and cybersecurity for a growing audience.",
    icon: React.createElement(CgWorkAlt),
    date: "Jan 2018 - Mar 2020",
  },
] as const;
