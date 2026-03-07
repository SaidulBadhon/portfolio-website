import { notFound } from "next/navigation";
import { projectsCardData } from "@/lib/data/projectsCardData";
import ProjectDetailPage from "@/components/project-detail-page";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projectsCardData.map((project) => ({
    slug: project.id,
  }));
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projectsCardData.find((p) => p.id === slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailPage project={project} />;
}
