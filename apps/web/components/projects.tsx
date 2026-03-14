"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import SectionHeading from "./section-heading";
import { useSectionInView } from "@/lib/hooks";
import { projectIconMap } from "@/lib/projectIcons";
import type { ProjectItem } from "@/lib/api";
import { FaArrowRight } from "react-icons/fa";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

type ProjectsProps = {
  projects: ProjectItem[];
};

const hasIcon = (icon: string | undefined): icon is keyof typeof projectIconMap =>
  Boolean(icon && icon in projectIconMap);

export default function Projects({ projects }: ProjectsProps) {
  const { ref } = useSectionInView("Projects", 0.5);

  return (
    <section
      ref={ref}
      id="projects"
      className="scroll-mt-28 mb-28 py-4 px-4 dark:bg-slate-900/30"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <SectionHeading>My projects</SectionHeading>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => {
            const IconComponent = hasIcon(project.icon)
              ? projectIconMap[project.icon]
              : projectIconMap.rocket;
            const gradient = project.gradient ?? "from-violet-500 to-purple-600";
            return (
              <motion.div
                key={project.id}
                variants={fadeInUp}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Link href={`/projects/${project.id}`} className="block cursor-pointer">
                  <div className="group h-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-violet-500/30 dark:border-white/5 dark:bg-slate-800/30">
                    <div
                      className={`h-2 bg-gradient-to-r ${gradient}`}
                    />
                    <div className="relative h-40 overflow-hidden">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20`}
                      />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      {(project.images?.[0] || project.logo) && (
                        <img
                          src={project.images?.[0] ?? project.logo}
                          alt={project.title}
                          className="h-full w-full object-cover opacity-60 transition-all duration-500 group-hover:scale-105 group-hover:opacity-80"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent dark:from-slate-900 dark:via-slate-900/50 dark:to-transparent" />
                      <div className="absolute right-3 top-3">
                        <span className="rounded-full bg-black/60 px-2 py-1 text-xs text-white backdrop-blur-sm dark:bg-slate-800/80 dark:text-slate-300">
                          {project.type ?? "Project"}
                        </span>
                      </div>
                      <div className="absolute bottom-3 right-3 opacity-0 transition-opacity group-hover:opacity-100">
                        <div className="flex items-center gap-1 text-sm font-medium text-violet-400">
                          View Details <FaArrowRight size={14} />
                        </div>
                      </div>
                    </div>
                    <div className="-mt-8 relative px-4 pb-2 pt-4">
                      <div
                        className={`inline-flex rounded-xl bg-gradient-to-br ${gradient} p-3 shadow-lg`}
                      >
                        <IconComponent size={24} className="text-white" />
                      </div>
                      <h3 className="mt-4 text-xl font-bold text-gray-900 transition-colors group-hover:text-violet-600 dark:text-white dark:group-hover:text-violet-300">
                        {project.title}
                      </h3>
                    </div>
                    <div className="px-4 pb-4">
                      <p className="mb-4 line-clamp-3 text-gray-600 dark:text-slate-400">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md bg-gray-200 px-2 py-0.5 text-xs text-gray-700 dark:bg-slate-700/50 dark:text-slate-300"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 4 && (
                          <span className="rounded-md bg-gray-200 px-2 py-0.5 text-xs text-gray-500 dark:bg-slate-700/50 dark:text-slate-400">
                            +{project.tags.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
