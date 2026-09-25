import { cache } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProjectDetailPage from "@/components/project-detail-page";
import { projectsApi } from "@/lib/api";

// Shared by the page and generateMetadata so each request fetches once.
const getProject = cache((slug: string) =>
  projectsApi.get(slug, { next: { revalidate: 300 } }).catch(() => null)
);

export async function generateStaticParams() {
  const projects = await projectsApi
    .list({ next: { revalidate: 300 } })
    .catch(() => []);
  return projects.map((project) => ({ slug: project.id }));
}

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailPage project={project} />;
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const description =
    project.longDescription || project.description || `Details about ${project.title}.`;

  return {
    title: `${project.title} | Projects`,
    description,
    openGraph: {
      title: project.title,
      description,
      images: project.images?.[0] ? [{ url: project.images[0] }] : undefined,
    },
  };
}
