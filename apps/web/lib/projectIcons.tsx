import React from "react";
import {
  FaRocket,
  FaCode,
  FaBolt,
  FaBrain,
  FaCubes,
  FaDatabase,
  FaGlobe,
} from "react-icons/fa";
import type { ProjectIconKey } from "@/lib/data/projectsCardData";

export const projectIconMap: Record<
  ProjectIconKey,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  rocket: FaRocket,
  code: FaCode,
  bolt: FaBolt,
  brain: FaBrain,
  cubes: FaCubes,
  database: FaDatabase,
  globe: FaGlobe,
};
