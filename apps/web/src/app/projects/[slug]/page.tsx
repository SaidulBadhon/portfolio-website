import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProjectDetailPage from "@/components/project-detail-page";
import { getProject, projects } from "@/content/projects";

// Only the projects in content/projects exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailPage project={project} />;
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Projects`,
    description: project.longDescription || project.description,
    openGraph: {
      title: project.title,
      description: project.longDescription || project.description,
      images: project.images[0] ? [{ url: project.images[0].src }] : undefined,
    },
  };
}
