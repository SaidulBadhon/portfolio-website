import type { Project } from "../types";
import cover from "./cover.png";

const project: Project = {
  slug: "cystellar-dashboard",
  title: "CyStellar Risk Intelligence Dashboard",
  description: "Geospatial data visualization dashboard for insurance risk intelligence.",
  longDescription:
    "A sophisticated geospatial data visualization dashboard for CyStellar's satellite-driven risk intelligence platform. The dashboard transforms complex environmental and satellite data into actionable insights for insurance companies and risk analysts.",
  type: "Project I worked on",
  role: "Frontend Developer Intern",
  duration: "Jul 2022 - Dec 2022",
  icon: "database",
  gradient: "from-indigo-500 to-violet-500",
  tags: [
    "React.js",
    "Data Visualization",
    "Geospatial",
    "APIs",
    "Dashboard",
  ],
  technologies: [
    "React.js",
    "D3.js",
    "Mapbox GL",
    "Python",
    "FastAPI",
    "PostgreSQL",
    "AWS",
  ],
  features: [
    "Interactive geospatial maps with satellite imagery",
    "Real-time environmental risk monitoring",
    "Custom risk scoring algorithms visualization",
    "Historical data trend analysis",
    "Automated report generation",
    "Multi-layer data overlay system",
  ],
  links: {
    live: "https://cystellar.com",
  },
  // The first image is the cover. Add more screenshots to this folder and list
  // them here to show them on the project page.
  images: [cover],
};

export default project;
