"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { FaExternalLinkAlt } from "react-icons/fa";
import Rating from "@/components/Rating";
import { MdDateRange } from "react-icons/md";
import { TbStarsFilled } from "react-icons/tb";
import { motion, useScroll, useTransform } from "framer-motion";

import macbook_pro_cover from "/public/assets/macbook_pro_cover.png";

export default function page() {
  const projectId =
    "Jutsu IDE - A code editor for near protocol & smart contracts on the blockchain";
  const pageId = "456";
  const pageSlug = "page";
  const pagePath = "/projects/123/page";
  const pageUrl = "http://localhost:3000/projects/123/page";

  const picture1 =
    "https://ipfs.near.social/ipfs/bafkreih2dzkami7r3d3cbuvz2fu5keoxkt52didhawuy5foza3qgrpwv2m";

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
          <GlassContainer
            className="a"
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <MdDateRange style={{ fontSize: 48 }} />

            <div>
              <p className="text-sm">Created on</p>
              <p className="text-xl font-bold">2021-03-19</p>
            </div>

            {/* A
            <p className="mt-4 text-xl">
              The project ID is */}
            {/* <code className="text-red-500">{projectId}</code>. */}
            {/* </p> */}
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
          <GlassContainer
            className="b"
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <TbStarsFilled style={{ fontSize: 48 }} />

            <div>
              <p className="text-sm pb-1">Final Rating</p>

              <Rating size={3} rate={3} />
            </div>
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
          <motion.div
            style={{
              scale: 1,
              opacity: 1,

              overflow: "hidden",
              backdropFilter: "blur(10px)",
              borderRadius: "1rem",
              padding: "1rem",

              position: "relative",
            }}
            className="bg-gray-900 bg-opacity-10 dark:bg-white dark:bg-opacity-10 group e"
          >
            <div
              style={{
                // height: 45,

                display: "flex",
                justifyContent: "center",
                alignItems: "center",
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
              src={picture1}
              alt="Project I worked on"
              quality={95}
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
          <GlassContainer
            className="f"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              gap: ".25rem",
            }}
          >
            <p className="text-sm">Review</p>

            <div className="mt-4">
              <div className="flex gap-4">
                <img className="rounded-full w-14 h-14" src={picture1} />

                <div className="flex flex-col justify-center items-start gap-0">
                  <p className="text-xl font-bold">Saidul Badhon</p>
                  <p className="text-sm">Web Developer</p>
                </div>
              </div>

              <p
                className="text-lg font-medium mt-4 py-3 px-6 relative"
                style={{
                  backdropFilter: "blur(2px)",
                  borderRadius: ".5rem",
                }}
              >
                <q className="max4Lines">
                  I highly recommend saidulbadhon for your mobile app
                  development project. They took my app from a messy prototype
                  to a beautiful finished product, suitable for submission to
                  the stores. They were extremely responsive to my requests and
                  understood the requirements easily, the work was of extremely
                  high quality and they were understanding when I requested
                  revisions. They were also great at keeping me involved in the
                  development and worked with my preferences in mind which I
                  really appreciated. I would definitely hire again.
                </q>
              </p>
            </div>
            {/* F
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
            </div> */}
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

      height: "100%",

      ...style,
    }}
  >
    {children}
  </div>
);
