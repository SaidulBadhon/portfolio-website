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
import type { ProjectCardItem } from "@/lib/data/projectsCardData";
import { projectIconMap } from "@/lib/projectIcons";

type ProjectDetailPageProps = {
  project: ProjectCardItem;
};

export default function ProjectDetailPage({ project }: ProjectDetailPageProps) {
  const IconComponent = projectIconMap[project.icon];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 -mt-28 sm:-mt-36">
      <div className="mx-auto max-w-4xl px-4 pt-24 pb-8 sm:px-6 lg:px-8">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-4"
        >
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            <FaArrowLeft className="transition-transform group-hover:-translate-x-1" />
            <span>Back to Projects</span>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-start"
        >
          <div
            className={`flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br p-4 ${project.gradient}`}
          >
            <IconComponent size={28} className="text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              {project.title}
            </h1>
            <div className="mt-2 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-gray-200 px-2 py-0.5 text-xs text-gray-700 dark:bg-slate-700/50 dark:text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="mt-8 space-y-8">
          {/* Project Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="relative overflow-hidden rounded-xl"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-30`}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={project.title}
              className="h-64 w-full object-cover sm:h-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent dark:from-gray-900" />
          </motion.div>

          {/* Meta grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-3"
          >
            <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-white/5 dark:bg-slate-800/50">
              <div className="mb-1 flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400">
                <FaUser size={16} className="text-violet-400" />
                Role
              </div>
              <p className="font-medium text-gray-900 dark:text-white">
                {project.role}
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-white/5 dark:bg-slate-800/50">
              <div className="mb-1 flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400">
                <FaCalendar size={16} className="text-cyan-400" />
                Duration
              </div>
              <p className="font-medium text-gray-900 dark:text-white">
                {project.duration}
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-white/5 dark:bg-slate-800/50">
              <div className="mb-1 flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400">
                <FaLayerGroup size={16} className="text-emerald-400" />
                Type
              </div>
              <p className="font-medium text-gray-900 dark:text-white">
                {project.type}
              </p>
            </div>
          </motion.div>

          {/* Overview */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
              <FaCode size={20} className="text-violet-400" />
              Overview
            </h2>
            <p className="leading-relaxed text-gray-600 dark:text-slate-300">
              {project.longDescription}
            </p>
          </motion.section>

          {/* Key Features */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
          >
            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
              <FaCheckCircle size={20} className="text-emerald-400" />
              Key Features
            </h2>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {project.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-gray-600 dark:text-slate-300"
                >
                  <div
                    className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r ${project.gradient}`}
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Technologies */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
              <FaCog size={20} className="text-cyan-400" />
              Technologies Used
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-gray-200 bg-gray-100 px-3 py-1.5 text-sm text-gray-700 dark:border-white/10 dark:bg-slate-700/30 dark:text-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.section>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="flex flex-wrap gap-3 border-t border-gray-200 pt-6 dark:border-white/10"
          >
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 px-6 py-3 font-medium text-white transition-opacity hover:opacity-90"
            >
              <FaExternalLinkAlt size={18} />
              View Live
            </a>
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-white/10 dark:bg-slate-700/50 dark:text-white dark:hover:bg-slate-700/70"
            >
              <FaGithub size={18} />
              Source Code
            </a>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
