"use client";

import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import Rating from "@/components/Rating";
import { motion } from "framer-motion";

export default function page() {
  const projectId =
    "Jutsu IDE - A code editor for near protocol & smart contracts on the blockchain";
  const pageId = "456";
  const pageSlug = "page";
  const pagePath = "/projects/123/page";
  const pageUrl = "http://localhost:3000/projects/123/page";

  const picture1 =
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

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
            {projectId}
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

        <div
          class="profile-hero-container"
          style={{
            marginTop: 32,
          }}
        >
          {/* A */}
          <GlassContainer className="a">
            A
            <p className="mt-4 text-xl">
              The project ID is
              <code className="text-red-500">{projectId}</code>.
            </p>
            {/* <p className="mt-4 text-xl">
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
            </p> */}
          </GlassContainer>

          {/* B */}
          <GlassContainer className="b">
            B
            <Rating size={4} rate={3} />
          </GlassContainer>

          {/* C */}
          <GlassContainer className="c">
            C
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                type: "tween",
                duration: 0.4,

                delay: 0.1,
              }}
            >
              <svg
                className="text-yellow-300"
                style={{
                  width: 60,
                  height: 60,
                }}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            </motion.div>
          </GlassContainer>

          {/* D */}
          <GlassContainer className="d">
            D
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                type: "tween",
                duration: 0.4,

                delay: 0.1,
              }}
            >
              <svg
                className="text-yellow-300"
                style={{
                  width: 60,
                  height: 60,
                }}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            </motion.div>
          </GlassContainer>

          {/* E */}
          <GlassContainer className="e">
            <p className="mt-4 text-xl">E</p>
            <p className="mt-4 text-xl">This is a page inside a project.</p>
          </GlassContainer>

          {/* F */}
          <GlassContainer className="f">
            F
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: ".25rem",
              }}
            >
              <h2 className="text-1xl" style={{ fontWeight: 600 }}>
                Final Rating
              </h2>

              <Rating size={3} rate={3} />
            </div>
          </GlassContainer>
        </div>
      </div>
    </main>
  );
}

const GlassContainer = ({ children, style, className }) => (
  <div
    className={`bg-gray-900 bg-opacity-10 dark:bg-white dark:bg-opacity-10 ${className}`}
    style={{
      backdropFilter: "blur(10px)",
      borderRadius: "1rem",
      padding: "1rem",
      ...style,
    }}
  >
    {children}
  </div>
);
