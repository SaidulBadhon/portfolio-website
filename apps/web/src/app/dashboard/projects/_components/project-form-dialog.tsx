"use client";

import type { ProjectItem } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

type ModalMode = "new" | ProjectItem | null;

type ProjectFormDialogProps = {
  open: boolean;
  mode: ModalMode;
  form: Partial<ProjectItem>;
  saving: boolean;
  onClose: () => void;
  onSave: () => void;
  onUpdate: (key: keyof ProjectItem, value: unknown) => void;
  onUpdateLinks: (key: "live" | "github", value: string) => void;
  onUpdateArray: (
    key: "tags" | "features" | "technologies",
    value: string[]
  ) => void;
};

export function ProjectFormDialog({
  open,
  mode,
  form,
  saving,
  onClose,
  onSave,
  onUpdate,
  onUpdateLinks,
  onUpdateArray,
}: ProjectFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent fullScreen className="flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {mode === "new" ? "New project" : "Edit project"}
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 min-h-0 overflow-y-auto space-y-4 py-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="project-id">ID (slug)</Label>
              <Input
                id="project-id"
                value={form.id ?? ""}
                onChange={(e) => onUpdate("id", e.target.value)}
                placeholder="my-project"
                disabled={mode !== "new"}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-title">Title</Label>
              <Input
                id="project-title"
                value={form.title ?? ""}
                onChange={(e) => onUpdate("title", e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="project-desc">Short description</Label>
            <Input
              id="project-desc"
              value={form.description ?? ""}
              onChange={(e) => onUpdate("description", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="project-tags">Tags (comma-separated)</Label>
            <Input
              id="project-tags"
              value={(form.tags ?? []).join(", ")}
              onChange={(e) =>
                onUpdateArray(
                  "tags",
                  e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                )
              }
              placeholder="Next.js, TypeScript"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="project-role">Role</Label>
              <Input
                id="project-role"
                value={form.role ?? ""}
                onChange={(e) => onUpdate("role", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-duration">Duration</Label>
              <Input
                id="project-duration"
                value={form.duration ?? ""}
                onChange={(e) => onUpdate("duration", e.target.value)}
                placeholder="Jan 2024 - Present"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="project-long">Long description</Label>
            <Textarea
              id="project-long"
              value={form.longDescription ?? ""}
              onChange={(e) => onUpdate("longDescription", e.target.value)}
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="project-live">Live URL</Label>
              <Input
                id="project-live"
                value={form.links?.live ?? ""}
                onChange={(e) => onUpdateLinks("live", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-github">GitHub URL</Label>
              <Input
                id="project-github"
                value={form.links?.github ?? ""}
                onChange={(e) => onUpdateLinks("github", e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="project-image">Image path</Label>
            <Input
              id="project-image"
              value={form.image ?? ""}
              onChange={(e) => onUpdate("image", e.target.value)}
              placeholder="/projects/web3.png"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="project-features">Features (one per line)</Label>
            <Textarea
              id="project-features"
              value={(form.features ?? []).join("\n")}
              onChange={(e) =>
                onUpdateArray(
                  "features",
                  e.target.value
                    .split("\n")
                    .map((s) => s.trim())
                    .filter(Boolean)
                )
              }
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="project-tech">Technologies (comma-separated)</Label>
            <Input
              id="project-tech"
              value={(form.technologies ?? []).join(", ")}
              onChange={(e) =>
                onUpdateArray(
                  "technologies",
                  e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                )
              }
            />
          </div>
        </div>
        <DialogFooter showCloseButton={false}>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onSave} disabled={saving}>
            {saving ? "Saving…" : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
