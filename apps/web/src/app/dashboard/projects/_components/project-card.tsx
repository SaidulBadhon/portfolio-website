"use client";

import type { ProjectItem } from "@/lib/api";
import { Pencil, Trash2, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ProjectCardProps = {
  project: ProjectItem;
  onEdit: (p: ProjectItem) => void;
  onDelete: (id: string) => void;
};

export function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  const coverSrc = project.images?.[0];
  const gradient = project.gradient ?? "linear-gradient(135deg, hsl(var(--muted)) 0%, hsl(var(--muted) / 0.7) 100%)";

  return (
    <Card className="flex flex-col overflow-hidden transition-shadow hover:shadow-md">
      {/* Cover image or gradient */}
      <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-muted">
        {coverSrc ? (
          <img
            src={coverSrc}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            className="h-full w-full"
            style={{ background: gradient }}
          />
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
            <Button variant="ghost" size="icon-sm" asChild>
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open live site"
              >
                <ExternalLink className="size-4" />
              </a>
            </Button>
          )}
          {project.links?.github && (
            <Button variant="ghost" size="icon-sm" asChild>
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open GitHub"
              >
                <Github className="size-4" />
              </a>
            </Button>
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
