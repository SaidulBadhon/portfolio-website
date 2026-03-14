"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaUser,
  FaCalendar,
  FaLayerGroup,
  FaCode,
  FaCheckCircle,
  FaCog,
  FaExternalLinkAlt,
  FaGithub,
} from "react-icons/fa";
import { projectIconMap } from "@/lib/projectIcons";
import type { ProjectItem } from "@/lib/api";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

type ProjectDetailPageProps = {
  project: ProjectItem;
};

export default function ProjectDetailPage({ project }: ProjectDetailPageProps) {
  const IconComponent =
    project.icon && project.icon in projectIconMap
      ? projectIconMap[project.icon as keyof typeof projectIconMap]
      : projectIconMap.rocket;
  const gradient = project.gradient ?? "from-violet-500 to-purple-600";

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 -mt-28 sm:-mt-36">
      <div className="mx-auto max-w-4xl px-4 pt-24 pb-16 sm:px-6 lg:px-8">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900 dark:border-white/10 dark:bg-slate-800/50 dark:text-slate-300 dark:hover:border-white/20 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <FaArrowLeft className="transition-transform group-hover:-translate-x-0.5" size={14} />
            Back to Projects
          </Link>
        </motion.div>

        <motion.div variants={container} initial="hidden" animate="visible">
          {/* Hero: icon + title + tags */}
          <motion.header
            variants={item}
            className="mb-10"
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <div
                className={`flex shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br p-5 shadow-lg ${gradient}`}
              >
                <IconComponent size={32} className="text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                  {project.title}
                </h1>
                <div
                  className={`mt-3 h-1 w-16 rounded-full bg-gradient-to-r ${gradient}`}
                />
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-sm dark:border-white/10 dark:bg-slate-800/60 dark:text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.header>

          {/* Project image */}
          <motion.div
            variants={item}
            className="relative mb-10 overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5 dark:ring-white/5"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20`}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {project.images?.[0] && (
              <img
                src={project.images[0]}
                alt={project.title}
                className="relative h-56 w-full object-cover sm:h-72 md:h-80"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent dark:from-gray-900" />
          </motion.div>

          {/* Meta: role, duration, type */}
          <motion.div
            variants={item}
            className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3"
          >
            {[
              {
                icon: FaUser,
                label: "Role",
                value: project.role,
                accent: "text-violet-500 dark:text-violet-400",
              },
              {
                icon: FaCalendar,
                label: "Duration",
                value: project.duration,
                accent: "text-cyan-500 dark:text-cyan-400",
              },
              {
                icon: FaLayerGroup,
                label: "Type",
                value: project.type ?? "Project",
                accent: "text-emerald-500 dark:text-emerald-400",
              },
            ].map(({ icon: Icon, label, value, accent }) => (
              <div
                key={label}
                className={`rounded-xl border border-gray-200 bg-white p-4 dark:border-white/10 dark:bg-slate-800/50`}
              >
                <div className={`mb-1 flex items-center gap-2 text-sm font-medium ${accent}`}>
                  <Icon size={16} />
                  {label}
                </div>
                <p className="text-gray-900 dark:text-white font-medium">{value ?? "-"}</p>
              </div>
            ))}
          </motion.div>

          {/* Overview */}
          <motion.section variants={item} className="mb-10">
            <h2 className="mb-3 flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-white">
              <span className={`rounded-lg bg-gradient-to-br p-1.5 ${gradient}`}>
                <FaCode size={18} className="text-white" />
              </span>
              Overview
            </h2>
            <p className="leading-relaxed text-gray-600 dark:text-slate-300 text-base">
              {project.longDescription ?? project.description}
            </p>
          </motion.section>

          {/* Key features */}
          <motion.section variants={item} className="mb-10">
            <h2 className="mb-3 flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-white">
              <span className="rounded-lg bg-emerald-500/20 p-1.5">
                <FaCheckCircle size={18} className="text-emerald-500 dark:text-emerald-400" />
              </span>
              Key Features
            </h2>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {(project.features ?? []).map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 dark:border-white/5 dark:bg-slate-800/40"
                >
                  <div
                    className={`mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gradient-to-r ${gradient}`}
                  />
                  <span className="text-gray-600 dark:text-slate-300 text-sm leading-relaxed">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Technologies */}
          <motion.section variants={item} className="mb-10">
            <h2 className="mb-3 flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-white">
              <span className="rounded-lg bg-cyan-500/20 p-1.5">
                <FaCog size={18} className="text-cyan-500 dark:text-cyan-400" />
              </span>
              Technologies Used
            </h2>
            <div className="flex flex-wrap gap-2">
              {(project.technologies ?? project.tags).map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 dark:border-white/10 dark:bg-slate-800/50 dark:text-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.section>

          {/* CTA links */}
          <motion.div
            variants={item}
            className="flex flex-wrap gap-4 border-t border-gray-200 pt-8 dark:border-white/10"
          >
            <a
              href={project.links?.live || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 px-6 py-3 font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-violet-500/30 active:scale-[0.98]"
            >
              <FaExternalLinkAlt size={18} />
              View Live
            </a>
            <a
              href={project.links?.github || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 shadow-sm transition-all hover:scale-[1.02] hover:border-gray-400 hover:bg-gray-50 active:scale-[0.98] dark:border-white/10 dark:bg-slate-800/50 dark:text-white dark:hover:bg-slate-700/50"
            >
              <FaGithub size={18} />
              Source Code
            </a>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
