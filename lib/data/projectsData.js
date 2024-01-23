import corpcommentImg from "@/public/corpcomment.png";
import rmtdevImg from "@/public/rmtdev.png";
import wordanalyticsImg from "@/public/wordanalytics.png";
import jutsuWebImg from "@/public/jutsu-web.png";
import jutsuEditorImg from "@/public/jutsu-editor.png";

// jutsu.ai
import jutsuAi1Img from "@/public/assets/projects/jutsu.ai/1.png";
import jutsuAi2Img from "@/public/assets/projects/jutsu.ai/2.png";
import jutsuAi3Img from "@/public/assets/projects/jutsu.ai/3.png";
import jutsuAi4Img from "@/public/assets/projects/jutsu.ai/4.png";
import jutsuAi5Img from "@/public/assets/projects/jutsu.ai/5.png";
import jutsuAi6Img from "@/public/assets/projects/jutsu.ai/6.png";
import jutsuAi7Img from "@/public/assets/projects/jutsu.ai/7.png";
import jutsuAi8Img from "@/public/assets/projects/jutsu.ai/8.png";
import jutsuAi9Img from "@/public/assets/projects/jutsu.ai/9.png";
import jutsuAi10Img from "@/public/assets/projects/jutsu.ai/10.png";
import jutsuAiFullImg from "@/public/assets/projects/jutsu.ai/full.png";

export const projectsData = [
  {
    slug: "jutsu-ai",
    title: "Jutsu.ai",
    description:
      "Deploy Forever | Jutsu is a developer platform designed to help you build, launch, and host decentralized frontends. We exponentially decrease development time and costs and lower the barrier to entry for new blockchain developers – with Jutsu, any Web2 developer can build and deploy full-stack on-chain applications.",

    shortDescription:
      "Jutsu is the fastest way to build and deploy decentralized apps.",

    tags: ["Next JS", "Near VM", "Blockchain", "Web3"],
    imageUrl: jutsuWebImg,

    gallery: [
      {
        url: jutsuAi1Img,
        description: "Jutsu Landing Page Image 1",
      },
      {
        url: jutsuAi2Img,
        description: "Jutsu Landing Page Image 2",
      },
      {
        url: jutsuAi3Img,
        description: "Jutsu Landing Page Image 3",
      },
      {
        url: jutsuAi4Img,
        description: "Jutsu Landing Page Image 4",
      },
      {
        url: jutsuAi5Img,
        description: "Jutsu Landing Page Image 5",
      },
      {
        url: jutsuAi6Img,
        description: "Jutsu Landing Page Image 6",
      },
      {
        url: jutsuAi7Img,
        description: "Jutsu Landing Page Image 7",
      },
      {
        url: jutsuAi8Img,
        description: "Jutsu Landing Page Image 8",
      },
      {
        url: jutsuAi9Img,
        description: "Jutsu Landing Page Image 9",
      },
      {
        url: jutsuAi10Img,
        description: "Jutsu Landing Page Image 10",
      },
      {
        url: jutsuAiFullImg,
        description: "Jutsu Landing Page Full Image",
      },
    ],
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
];
