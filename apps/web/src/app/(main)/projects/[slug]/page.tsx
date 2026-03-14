import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProjectDetailPage from "@/components/project-detail-page";
import { projectsApi } from "@/lib/api";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projectsApi
    .list({
      next: { revalidate: 300 },
    })
    .then((projects) =>
      projects.map((project) => ({
        slug: project.id,
      }))
    )
    .catch(() => []);
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await projectsApi
    .get(slug, {
      next: { revalidate: 300 },
    })
    .catch(() => null);

  if (!project) {
    notFound();
  }

  return <ProjectDetailPage project={project} />;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await projectsApi
    .get(slug, {
      next: { revalidate: 300 },
    })
    .catch(() => null);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Projects`,
    description:
      project.longDescription || project.description || `Details about ${project.title}.`,
    openGraph: {
      title: project.title,
      description:
        project.longDescription || project.description || `Details about ${project.title}.`,
      images: project.images?.[0] ? [{ url: project.images[0] }] : undefined,
    },
  };
}
