"use client";

import React from "react";
import { motion } from "framer-motion";
import type { ProjectCardItem } from "@/lib/data/projectsCardData";
import {
  FaUser,
  FaCalendar,
  FaLayerGroup,
  FaCode,
  FaCheckCircle,
  FaCog,
  FaExternalLinkAlt,
  FaGithub,
} from "react-icons/fa";

type ProjectModalProps = {
  project: ProjectCardItem | null;
  isOpen: boolean;
  onClose: () => void;
  IconComponent: React.ComponentType<{ size?: number; className?: string }>;
};

export default function ProjectModal({
  project,
  isOpen,
  onClose,
  IconComponent,
}: ProjectModalProps) {
  if (!project || !isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div className="fixed left-1/2 top-1/2 z-50 w-[90vw] max-w-4xl max-h-[90vh] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl border border-white/10 bg-slate-900 text-white shadow-2xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start gap-4">
            <div
              className={`flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br p-4 ${project.gradient}`}
            >
              <IconComponent size={28} className="text-white" />
            </div>
            <div className="flex-1">
              <h2 className="mb-2 text-2xl font-bold text-white">
                {project.title}
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-slate-700/50 px-2 py-0.5 text-xs text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Project Image */}
            <div className="relative overflow-hidden rounded-xl">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-30`}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {project.images?.[0] && (
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="h-64 w-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
            </div>

            {/* Project Info Grid */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-white/5 bg-slate-800/50 p-4">
                <div className="mb-1 flex items-center gap-2 text-sm text-slate-400">
                  <FaUser size={16} className="text-violet-400" />
                  Role
                </div>
                <p className="font-medium text-white">{project.role}</p>
              </div>
              <div className="rounded-xl border border-white/5 bg-slate-800/50 p-4">
                <div className="mb-1 flex items-center gap-2 text-sm text-slate-400">
                  <FaCalendar size={16} className="text-cyan-400" />
                  Duration
                </div>
                <p className="font-medium text-white">{project.duration}</p>
              </div>
              <div className="rounded-xl border border-white/5 bg-slate-800/50 p-4">
                <div className="mb-1 flex items-center gap-2 text-sm text-slate-400">
                  <FaLayerGroup size={16} className="text-emerald-400" />
                  Type
                </div>
                <p className="font-medium text-white">{project.type}</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-white">
                <FaCode size={20} className="text-violet-400" />
                Overview
              </h3>
              <p className="leading-relaxed text-slate-300">
                {project.longDescription}
              </p>
            </div>

            {/* Features */}
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-white">
                <FaCheckCircle size={20} className="text-emerald-400" />
                Key Features
              </h3>
              <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
                {project.features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-2 text-slate-300"
                  >
                    <div
                      className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r ${project.gradient}`}
                    />
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-white">
                <FaCog size={20} className="text-cyan-400" />
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-white/10 bg-slate-700/30 px-3 py-1.5 text-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-3 border-t border-white/10 pt-4">
              <motion.a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 px-6 py-3 font-medium text-white"
              >
                <FaExternalLinkAlt size={18} />
                View Live
              </motion.a>
              <motion.a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-700/50 px-6 py-3 font-medium text-white transition-colors hover:bg-slate-700/70"
              >
                <FaGithub size={18} />
                Source Code
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
