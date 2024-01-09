import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import corpcommentImg from "@/public/corpcomment.png";
import rmtdevImg from "@/public/rmtdev.png";
import wordanalyticsImg from "@/public/wordanalytics.png";
import jutsuWebImg from "@/public/jutsu-web.png";
import jutsuEditorImg from "@/public/jutsu-editor.png";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;
// React, Next.js, JavaScript, Tailwind, Prisma and MongoDB
export const experiencesData = [
  {
    title: "Graduated bootcamp",
    location: "Miami, FL",
    description:
      "I graduated after 6 months of studying. I immediately found a job as a front-end developer.",
    icon: React.createElement(LuGraduationCap),
    date: "2019",
  },
  {
    title: "Front-End Developer",
    location: "Orlando, FL",
    description:
      "I worked as a front-end developer for 2 years in 1 job and 1 year in another job. I also upskilled to the full stack.",
    icon: React.createElement(CgWorkAlt),
    date: "2019 - 2021",
  },
  {
    title: "Full-Stack Software Engineer",
    location: "Concord, CF",
    description:
      "I'm now a working as a full-stack software engineer in Jutsu.ai. My stack includes Web2, Web3, Blockchain, AI and ML. I'm open to full-time opportunities.",
    icon: React.createElement(FaReact),
    date: "2023 - present",
  },
] as const;

export const projectsData = [
  {
    slug: "jutsu-ai",
    title: "Jutsu.ai",
    description:
      "I'm now a working as a full-stack software engineer in Jutsu.ai. My stack includes Web2, Web3, Blockchain, AI and ML. I'm open to full-time opportunities",
    tags: ["Next JS", "Near VM", "Blockchain", "Web3"],
    imageUrl: jutsuWebImg,
  },
  {
    slug: "jutsu-ai",
    title: "Jutsu IDE",
    description:
      "I'm now a working as a full-stack software engineer in Jutsu.ai. My stack includes Web2, Web3, Blockchain, AI and ML. I'm open to full-time opportunities",
    tags: ["CodeMirror", "Near Protocol", "Blockchain", "Web3"],
    imageUrl: jutsuEditorImg,
  },
  {
    slug: "project-1",
    title: "CorpComment",
    description:
      "I worked as a full-stack developer on this startup project for 2 years. Users can give public feedback to companies.",
    tags: ["React", "Next.js", "MongoDB", "Tailwind", "Prisma"],
    imageUrl: corpcommentImg,
  },
  {
    slug: "project-2",
    title: "rmtDev",
    description:
      "Job board for remote developer jobs. I was the front-end developer. It has features like filtering, sorting and pagination.",
    tags: ["React", "TypeScript", "Next.js", "Tailwind", "Redux"],
    imageUrl: rmtdevImg,
  },
  {
    slug: "project-3",
    title: "Word Analytics",
    description:
      "A public web app for quick analytics on text. It shows word count, character count and social media post limits.",
    tags: ["React", "Next.js", "SQL", "Tailwind", "Framer"],
    imageUrl: wordanalyticsImg,
  },
] as const;

export const skillsData = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Git",
  "MongoDB",
  "Express",
  "PostgreSQL",
  "Python",
  "Web3",
  "Blockchain",


] as const;
