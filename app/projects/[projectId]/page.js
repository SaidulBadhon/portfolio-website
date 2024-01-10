import React from "react";

export default function page() {
  const projectId = "123";
  const pageId = "456";
  const pageSlug = "page";
  const pagePath = "/projects/123/page";
  const pageUrl = "http://localhost:3000/projects/123/page";

  return (
    <main className="flex flex-col items-center px-4">
      <h1 className="text-4xl font-bold">Page</h1>

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
    </main>
  );
}
