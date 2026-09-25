"use client";

import type { ProjectItem } from "@/lib/api";
import { Pencil, Trash2, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: ProjectItem;
  onEdit: (p: ProjectItem) => void;
  onDelete: (id: string) => void;
};

export function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  const coverSrc = project.images?.[0];
  // `gradient` holds Tailwind gradient stop classes, e.g. "from-violet-500 to-purple-600".
  const gradient = project.gradient || "from-violet-500 to-purple-600";

  return (
    <Card className="flex flex-col overflow-hidden transition-shadow hover:shadow-md">
      {/* Cover image or gradient */}
      <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-muted">
        {coverSrc ? (
          // eslint-disable-next-line @next/next/no-img-element -- image URLs come from the CMS
          <img
            src={coverSrc}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          <div className={cn("h-full w-full bg-linear-to-br", gradient)} />
        )}
      </div>

      <CardHeader className="flex-1 pb-1">
        <CardTitle className="line-clamp-1 text-base">{project.title}</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 pt-0">
        {project.description ? (
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {project.description}
          </p>
        ) : (
          <p className="text-sm italic text-muted-foreground">No description</p>
        )}
        {project.tags?.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-muted px-1.5 py-0.5 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="text-xs text-muted-foreground">
                +{project.tags.length - 4}
              </span>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-wrap items-center justify-between gap-2 border-t pt-3">
        <div className="flex items-center gap-1">
          {project.links?.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open live site"
              className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }))}
            >
              <ExternalLink className="size-4" />
            </a>
          )}
          {project.links?.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open GitHub"
              className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }))}
            >
              <FaGithub className="size-4" />
            </a>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onEdit(project)}
            aria-label="Edit project"
          >
            <Pencil className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onDelete(project.id)}
            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
            aria-label="Delete project"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
