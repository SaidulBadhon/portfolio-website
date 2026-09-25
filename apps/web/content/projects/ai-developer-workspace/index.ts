import type { Project } from "../types";
import cover from "./cover.png";

const project: Project = {
  slug: "ai-developer-workspace",
  title: "AI-Powered Developer Workspace",
  description: "AI workspace with vector database and big data processing for developers.",
  longDescription:
    "A comprehensive AI-powered workspace designed for developers working with large-scale data processing and machine learning. Features include vector database integration for semantic search, big data pipeline management, and Small Language Model (SLM) fine-tuning capabilities.",
  type: "Project I worked on",
  role: "Full Stack Engineer",
  duration: "Aug 2023 - Jun 2024",
  icon: "brain",
  gradient: "from-orange-500 to-amber-500",
  tags: [
    "AI",
    "Vector DB",
    "Big Data",
    "Python",
    "Machine Learning",
  ],
  technologies: [
    "Python",
    "Pinecone",
    "Pandas",
    "PyTorch",
    "FastAPI",
    "Redis",
    "Docker",
    "Kubernetes",
  ],
  features: [
    "Vector database integration for semantic code search",
    "Big data pipeline visualization and management",
    "Small Language Model (SLM) fine-tuning tools",
    "Real-time collaborative notebooks",
    "GPU resource management and optimization",
    "Model versioning and experiment tracking",
  ],
  links: {},
  // The first image is the cover. Add more screenshots to this folder and list
  // them here to show them on the project page.
  images: [cover],
};

export default project;
