"use client";

import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Rating from "@/components/Rating";
import { motion } from "framer-motion";
import Link from "next/link";

import { MdDateRange } from "react-icons/md";
import { TbStarsFilled } from "react-icons/tb";
import { FaHourglassEnd } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdEngineering } from "react-icons/md";
import { HiOutlineExternalLink } from "react-icons/hi";

import GallerySection from "./_components/GallerySection";
import ReviewsSection from "./_components/ReviewsSection";

import MarkdownViewer from "../../../components/MarkdownViewer";

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
      duration: 0.3,
    },
  }),
};

export default function ProjectPage(props) {
  const {
    title,
    label,
    description,
    shortDescription,
    tags,
    coverArt,
    gallery,
    reviews,
    projectDuration,
    projectTeam,
    projectRole,
    projectResponsibilities,
    websiteUrl,
    deliveredAt,
  } = props;

  const [showResponsibilities, setShowResponsibilities] = useState(false);

  return (
    <main className="flex flex-col items-center px-4 sm:px-6 lg:px-8 pb-20">
      <div className="max-w-7xl w-full">
        {/* Breadcrumb Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Projects</span>
          </Link>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-8">
            <div className="flex-1">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                {label || title}
              </h1>
              {shortDescription && (
                <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                  {shortDescription}
                </p>
              )}
            </div>

            {websiteUrl && (
              <motion.a
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-4 flex items-center gap-3 rounded-full outline-none hover:bg-gray-800 dark:hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
              >
                <span className="font-medium">Visit Project</span>
                <HiOutlineExternalLink className="text-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </motion.a>
            )}
          </div>

          {/* Cover Image */}
          {coverArt && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src={coverArt?.src}
                alt={title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>
          )}
        </motion.div>

        {/* Project Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {/* Delivered Date */}
          {deliveredAt && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <GlassContainer className="flex items-center gap-4 h-full">
                <motion.div
                  initial={{ scale: 0.75, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", duration: 0.6, delay: 0.2 }}
                  className="text-gray-700 dark:text-gray-300"
                >
                  <MdDateRange className="text-4xl sm:text-5xl" />
                </motion.div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    Delivered
                  </p>
                  <p className="text-lg sm:text-xl font-bold">{deliveredAt}</p>
                </div>
              </GlassContainer>
            </motion.div>
          )}

          {/* Rating */}
          {reviews && reviews.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <GlassContainer className="flex items-center gap-4 h-full">
                <motion.div
                  initial={{ scale: 0.75, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", duration: 0.6, delay: 0.3 }}
                  className="text-gray-700 dark:text-gray-300"
                >
                  <TbStarsFilled className="text-4xl sm:text-5xl" />
                </motion.div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Client Rating
                  </p>
                  <Rating size={3} rate={5} />
                </div>
              </GlassContainer>
            </motion.div>
          )}

          {/* Project Details - Spans 2 columns on large screens */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="sm:col-span-2"
          >
            <GlassContainer className="h-full">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Duration */}
                {projectDuration && (
                  <div className="flex items-center gap-3">
                    <motion.div
                      initial={{ scale: 0.75, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", duration: 0.6, delay: 0.4 }}
                      className="text-gray-700 dark:text-gray-300"
                    >
                      <FaHourglassEnd className="text-3xl sm:text-4xl" />
                    </motion.div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        Duration
                      </p>
                      <p className="text-lg sm:text-xl font-bold">
                        {projectDuration}{" "}
                        <span className="text-xs font-normal">Months</span>
                      </p>
                    </div>
                  </div>
                )}

                {/* Team Size */}
                {projectTeam && (
                  <div className="flex items-center gap-3">
                    <motion.div
                      initial={{ scale: 0.75, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", duration: 0.6, delay: 0.5 }}
                      className="text-gray-700 dark:text-gray-300"
                    >
                      <FaPeopleGroup className="text-3xl sm:text-4xl" />
                    </motion.div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        Team Size
                      </p>
                      <p className="text-lg sm:text-xl font-bold">
                        {projectTeam}{" "}
                        <span className="text-xs font-normal">Members</span>
                      </p>
                    </div>
                  </div>
                )}

                {/* Role */}
                {projectRole && (
                  <div className="flex items-center gap-3">
                    <motion.div
                      initial={{ scale: 0.75, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", duration: 0.6, delay: 0.6 }}
                      className="text-gray-700 dark:text-gray-300"
                    >
                      <MdEngineering className="text-3xl sm:text-4xl" />
                    </motion.div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        My Role
                      </p>
                      <p className="text-base sm:text-lg font-bold">
                        {projectRole}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Responsibilities Button */}
              {projectResponsibilities &&
                projectResponsibilities.length > 0 && (
                  <button
                    onClick={() =>
                      setShowResponsibilities(!showResponsibilities)
                    }
                    className="mt-4 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    {showResponsibilities
                      ? "Hide Responsibilities"
                      : "View Responsibilities"}
                  </button>
                )}
            </GlassContainer>
          </motion.div>
        </div>

        {/* Responsibilities Section */}
        {showResponsibilities &&
          projectResponsibilities &&
          projectResponsibilities.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-12"
            >
              <GlassContainer>
                <h3 className="text-xl sm:text-2xl font-bold mb-4">
                  Key Responsibilities
                </h3>
                <ul className="space-y-3">
                  {projectResponsibilities.map((responsibility, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <span className="text-blue-600 dark:text-blue-400 mt-1">
                        •
                      </span>
                      <span className="text-gray-700 dark:text-gray-300">
                        {responsibility}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </GlassContainer>
            </motion.div>
          )}

        {/* Technologies Used */}
        {tags && tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">
              Technologies Used
            </h2>
            <div className="flex flex-wrap gap-3">
              {tags.map((tag, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  variants={fadeInAnimationVariants}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-gray-900/10 dark:bg-white/10 hover:bg-gray-900/20 dark:hover:bg-white/20 backdrop-blur-sm rounded-lg font-medium transition-all cursor-default"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Client Reviews */}
        {reviews && reviews.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-12"
          >
            <GlassContainer>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                Client Reviews
              </h2>
              <ReviewsSection reviews={reviews} />
            </GlassContainer>
          </motion.div>
        )}

        {/* Description */}
        <Description description={description} />

        {/* Carousel */}
        {gallery && <GallerySection gallery={gallery} />}
      </div>
    </main>
  );
}

const Description = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!description) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="mb-12"
    >
      <GlassContainer className="p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          Project Description
        </h2>

        <div className="relative">
          <MarkdownViewer
            className={`prose prose-gray dark:prose-invert max-w-none transition-all duration-300 ${
              isExpanded ? "" : "max-h-[300px] overflow-hidden"
            }`}
            src={description}
            pOnly
          />

          {!isExpanded && (
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-100 dark:from-gray-900 to-transparent pointer-events-none" />
          )}
        </div>

        <div className="flex justify-center mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-full font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-lg"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Show Less" : "Read More"}
          </motion.button>
        </div>
      </GlassContainer>
    </motion.div>
  );
};

const GlassContainer = ({ children, style, className }) => (
  <div
    className={`bg-gray-900/10 dark:bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6 h-full ${className}`}
    style={style}
  >
    {children}
  </div>
);
