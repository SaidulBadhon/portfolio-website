import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { FaExternalLinkAlt } from "react-icons/fa";

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

            backgroundColor: "#FFFFFF11",

            display: "grid",
            gridTemplateColumns: "5fr 1fr",
            gap: "1rem",
          }}
        >
          <h1 className="text-5xl font-bold">{projectId}</h1>

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

        <p className="mt-4 text-xl">This is a page inside a project.</p>
        <p className="mt-4 text-xl">
          The project ID is <code className="text-red-500">{projectId}</code>.
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
      </div>
    </main>
  );
}
