"use client";

import React, { useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import Rating from "@/components/Rating";
import { motion } from "framer-motion";

import { MdDateRange } from "react-icons/md";
import { TbStarsFilled } from "react-icons/tb";
import { FaHourglassEnd } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdEngineering } from "react-icons/md";

import GallerySection from "./_components/GallerySection";
import ReviewsSection from "./_components/ReviewsSection";

import MarkdownViewer from "../../../components/MarkdownViewer";

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

    // project
    projectDuration,
    projectTeam,
    projectRole,
    projectResponsibilities,
  } = props;

  return (
    <main className="flex flex-col items-center px-4">
      <div className="max-w-7xl w-full">
        <div
          style={{
            width: "100%",

            // backgroundColor: "#FFFFFF11",

            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "1rem",
          }}
        >
          <h1
            className="text-5xl font-bold"
            style={{
              lineHeight: 1.25,
            }}
          >
            {label}
          </h1>

          <div className="flex flex-col justify-center items-end">
            <a
              href="/projects/123"
              className="group bg-gray-900 text-white px-5 py-5 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 transition"
              target="_blank"
            >
              <FaExternalLinkAlt className="opacity-70 group-hover:scale-140 transition" />
            </a>
          </div>
        </div>

        <div className="project-info-grid mt-12">
          {/* A */}
          <GlassContainer className="flex items-center gap-4">
          >
            <motion.div
              initial={{
                marginTop: 3,
                opacity: 1,
                scale: 0.75,
                rotate: -180,
              }}
              animate={{ marginTop: 3, opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                type: "tween",
                duration: 0.4,

                delay: 0.1,
              }}
            >
              <MdDateRange style={{ fontSize: 48 }} />
            </motion.div>
            <div>
              <p className="text-sm">Delivered at</p>
              <p className="text-xl font-bold">2021-03-19</p>
            </div>
            {/* A
              <p className="mt-4 text-xl">
                The project ID is 
                <code className="text-red-500">{projectId}</code>. 
              </p>

              <p className="mt-4 text-xl">
                The page ID is <code className="text-red-500">{pageId}</code>.
              </p>

              <p className="mt-4 text-xl">
                The page slug is <code className="text-red-500">{pageSlug}</code>.
              </p>

              <p className="mt-4 text-xl">
                The page path is <code className="text-red-500">{pagePath}</code>.
              </p>

              <p className="mt-4 text-xl">
                The page URL is <code className="text-red-500">{pageUrl}</code>.
              </p> 
            */}
          </GlassContainer>

          {/* B */}
          <GlassContainer className="flex items-center gap-4">
          >
            <motion.div
              initial={{
                marginTop: 3,
                opacity: 1,
                scale: 0.75,
                rotate: -180,
              }}
              animate={{ marginTop: 3, opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                type: "tween",
                duration: 0.4,

                delay: 0.3,
              }}
            >
              <TbStarsFilled style={{ fontSize: 48 }} />
            </motion.div>

            <div>
              <p className="text-sm pb-1">Final Rating</p>

              <Rating size={3} rate={3} />
            </div>
          </GlassContainer>

          {/* C */}
          <GlassContainer className="flex flex-col gap-4 pt-10">
          >
            <div style={{ display: "flex", gap: "1rem" }}>
              <motion.div
                initial={{
                  marginTop: 3,
                  opacity: 1,
                  scale: 0.75,
                  rotate: -180,
                }}
                animate={{ marginTop: 3, opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                  type: "tween",
                  duration: 0.4,

                  delay: 0.2,
                }}
              >
                <FaHourglassEnd style={{ fontSize: 40 }} />
              </motion.div>

              <div>
                <p className="text-sm">Project Duration</p>
                <p className="text-xl font-bold">
                  {projectDuration}{" "}
                  <span className="font-normal" style={{ fontSize: ".75rem" }}>
                    Months
                  </span>
                </p>
              </div>
            </div>

            {/* projectTeam */}
            <div style={{ display: "flex", gap: "1rem" }}>
              <motion.div
                initial={{
                  marginTop: 3,
                  opacity: 1,
                  scale: 0.75,
                  rotate: -180,
                }}
                animate={{ marginTop: 3, opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                  type: "tween",
                  duration: 0.4,

                  delay: 0.2,
                }}
              >
                <FaPeopleGroup style={{ fontSize: 40 }} />
              </motion.div>

              <div>
                <p className="text-sm">Team</p>
                <p className="text-xl font-bold">
                  {projectTeam}{" "}
                  <span className="font-normal" style={{ fontSize: ".75rem" }}>
                    Members
                  </span>
                </p>
              </div>
            </div>

            {/* projectRole */}
            <div style={{ display: "flex", gap: "1rem" }}>
              <motion.div
                initial={{
                  marginTop: 3,
                  opacity: 1,
                  scale: 0.75,
                  rotate: -180,
                }}
                animate={{ marginTop: 3, opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                  type: "tween",
                  duration: 0.4,

                  delay: 0.2,
                }}
              >
                <MdEngineering style={{ fontSize: 40 }} />
              </motion.div>

              <div>
                <p className="text-sm">My Role</p>
                <p className="text-xl font-bold">{projectRole}</p>
              </div>
            </div>

            <button className="text-sky-100 hover:text-sky-500 transition-all font-medium	">
              See Responsibilities
            </button>
            {/* <p className="text-sm">{shortDescription}</p> */}
          </GlassContainer>

          {/* D */}
          <GlassContainer className="flex flex-wrap items-start gap-2">
            {tags?.map((tag, i) => (
                <span
                  key={i}
                  className="
                    px-4 py-2 
                    bg-opacity-10 
                    
                    hover:bg-opacity-30 
                    dark:bg-opacity-10 
                    hover:dark:bg-opacity-30 
                  
                    bg-gray-900 
                  "
                  // dark:active:bg-white
                  style={{
                    borderRadius: ".5rem",
                  }}
                >
                  {tag}
                </span>
              ))}
          </GlassContainer>

          {/* E */}
          <motion.div
            style={{
              scale: 1,
              opacity: 1,

              overflow: "hidden",
              backdropFilter: "blur(10px)",
              borderRadius: "1rem",
              padding: "1rem",
              // height: "100%",

              position: "relative",
            }}
            className="bg-gray-900 bg-opacity-10 dark:bg-white dark:bg-opacity-10 group e"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                zIndex: 999,
              }}
            >
              <p
                className="text-sm opacity-0 translate-x-0
                transition 
                  group-hover:opacity-[1]
                  group-hover:translate-x-8
"
              >
                Screenshots
              </p>
            </div>

            <img
              src={coverArt?.src}
              alt="Project I worked on"
              quality={95}
              style={{
                zIndex: 1,
              }}
              className="absolute hidden sm:block bottom-0 left-0 w-[100%] rounded-t-lg shadow-2xl
          transition 
          group-hover:scale-[1.2]
          group-hover:translate-x-3
          group-hover:translate-y-3
          group-hover:rotate-3

          group-even:group-hover:translate-x-3
          group-even:group-hover:translate-y-3
          group-even:group-hover:rotate-2

          group-even:right-[initial] group-even:-left-40"
            />
          </motion.div>

          {/* F */}
          <GlassContainer className="flex flex-col gap-1">
            <p className="text-sm">Review</p>

            <ReviewsSection reviews={reviews} />
          </GlassContainer>
        </div>

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

  return (
    <div
      className="bg-gray-900 bg-opacity-10 dark:bg-white dark:bg-opacity-10"
      style={{
        backdropFilter: "blur(10px)",
        borderRadius: "1rem",
        padding: "1rem",
        height: "100%",

        marginTop: 48,
      }}
    >
      <h1 className="text-3xl font-bold">Description</h1>

      <div
        style={{
          height: 1,
          width: "100%",

          backgroundColor: "#FFFFFF11",

          marginTop: 16,
          marginBottom: 16,
        }}
      />

      <MarkdownViewer
        className={isExpanded ? "" : "max6Lines truncate-overflow transition "}
        src={description}
        pOnly
      />

      <div
        className="flex justify-center items-center gap-2"
        style={{
          marginTop: 16,
        }}
      >
        <button
          className="bg-gray-900 text-white px-5 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 transition"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span>{isExpanded ? "Read Less" : "Read More"}</span>
        </button>
      </div>
    </div>
  );
};

const GlassContainer = ({ children, style, className }) => (
  <div
    className={`bg-gray-900/10 dark:bg-white/10 backdrop-blur-lg rounded-xl p-4 h-full ${className}`}
    style={style}
  >
    {children}
  </div>
);
