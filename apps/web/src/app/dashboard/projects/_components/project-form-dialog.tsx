"use client";

import { useState, useEffect } from "react";
import { projectsApi, type ProjectItem } from "@/lib/api";
import { uploadImageToIPFS, uploadFileToIPFS } from "@/lib/uploadImageToIPFS";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dropzone } from "@/components/ui/dropzone";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

type ModalMode = "new" | ProjectItem;

const emptyProject = (): Partial<ProjectItem> => ({
  id: "",
  title: "",
  description: "",
  tags: [],
  gradient: "from-violet-500 to-purple-600",
  icon: "rocket",
  type: "Project I worked on",
  image: "",
  logo: "",
  images: [],
  videos: [],
  longDescription: "",
  features: [],
  technologies: [],
  role: "",
  duration: "",
  links: { live: "", github: "" },
});

type ProjectFormDialogProps = {
  open: boolean;
  mode: ModalMode;
  onClose: () => void;
  onSuccess?: () => void;
};

const ACCEPT_IMAGE = "image/*";
const ACCEPT_VIDEO = "video/*";

export function ProjectFormDialog({
  open,
  mode,
  onClose,
  onSuccess,
}: ProjectFormDialogProps) {
  const [form, setForm] = useState<Partial<ProjectItem>>(emptyProject());
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [videoFiles, setVideoFiles] = useState<File[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [techInput, setTechInput] = useState("");

  useEffect(() => {
    if (open) {
      setForm(mode === "new" ? emptyProject() : { ...mode });
      setLogoFile(null);
      setImageFiles([]);
      setVideoFiles([]);
      setError(null);
      setTechInput("");
    }
  }, [open, mode]);

  const update = (key: keyof ProjectItem, value: unknown) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };
  const updateLinks = (key: "live" | "github", value: string) => {
    setForm((prev) => ({
      ...prev,
      links: { ...prev.links, [key]: value },
    }));
  };
  const updateArray = (
    key: "tags" | "features" | "technologies",
    value: string[]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const save = async () => {
    if (!form.id?.trim() || !form.title?.trim() || !form.description?.trim()) {
      setError("ID, title, and description are required.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const payload = { ...form };

      if (logoFile) {
        const url = await uploadImageToIPFS({ file: logoFile });
        if (!url) {
          setError("Failed to upload logo. Please try again.");
          setSaving(false);
          return;
        }
        payload.logo = url;
      }

      if (imageFiles.length > 0) {
        const urls: string[] = [];
        for (const file of imageFiles) {
          const url = await uploadImageToIPFS({ file });
          if (url) urls.push(url);
        }
        payload.images = [...(form.images ?? []), ...urls];
      }

      if (videoFiles.length > 0) {
        const urls: string[] = [];
        for (const file of videoFiles) {
          const url = await uploadFileToIPFS({ file });
          if (url) urls.push(url);
        }
        payload.videos = [...(form.videos ?? []), ...urls];
      }

      if (mode === "new") {
        await projectsApi.create(payload as ProjectItem);
      } else {
        await projectsApi.update(mode.id, payload);
      }
      onClose();
      onSuccess?.();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const technologies = form.technologies ?? [];

  const addTechnology = () => {
    const value = techInput.trim();
    if (!value || technologies.includes(value)) return;
    updateArray("technologies", [...technologies, value]);
    setTechInput("");
  };

  const removeTechnology = (index: number) => {
    updateArray(
      "technologies",
      technologies.filter((_, i) => i !== index)
    );
  };

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
                onChange={(e) => update("id", e.target.value)}
                placeholder="my-project"
                disabled={mode !== "new"}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-title">Title</Label>
              <Input
                id="project-title"
                value={form.title ?? ""}
                onChange={(e) => update("title", e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="project-desc">Short description</Label>
            <Input
              id="project-desc"
              value={form.description ?? ""}
              onChange={(e) => update("description", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="project-tags">Tags (comma-separated)</Label>
            <Input
              id="project-tags"
              value={(form.tags ?? []).join(", ")}
              onChange={(e) =>
                updateArray(
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
                onChange={(e) => update("role", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-duration">Duration</Label>
              <Input
                id="project-duration"
                value={form.duration ?? ""}
                onChange={(e) => update("duration", e.target.value)}
                placeholder="Jan 2024 - Present"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="project-long">Long description</Label>
            <Textarea
              id="project-long"
              value={form.longDescription ?? ""}
              onChange={(e) => update("longDescription", e.target.value)}
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="project-live">Live URL</Label>
              <Input
                id="project-live"
                value={form.links?.live ?? ""}
                onChange={(e) => updateLinks("live", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-github">GitHub URL</Label>
              <Input
                id="project-github"
                value={form.links?.github ?? ""}
                onChange={(e) => updateLinks("github", e.target.value)}
              />
            </div>
          </div>
          <Dropzone
            label="Project logo"
            accept={ACCEPT_IMAGE}
            multiple={false}
            value={logoFile}
            onChange={(v) => setLogoFile(Array.isArray(v) ? null : v)}
            existingUrl={form.logo}
            onClearExisting={() => update("logo", "")}
            description="Single image for project logo"
          />
          <Dropzone
            label="Project images"
            accept={ACCEPT_IMAGE}
            multiple
            value={imageFiles.length ? imageFiles : null}
            onChange={(v) => setImageFiles(Array.isArray(v) ? v : v ? [v] : [])}
            description="Multiple images for the project"
          />
          {(form.images?.length ?? 0) > 0 && (
            <p className="text-muted-foreground text-xs">
              {form.images?.length} existing image(s) on server
            </p>
          )}
          <Dropzone
            label="Project videos"
            accept={ACCEPT_VIDEO}
            multiple
            value={videoFiles.length ? videoFiles : null}
            onChange={(v) => setVideoFiles(Array.isArray(v) ? v : v ? [v] : [])}
            description="Multiple videos for the project"
          />
          {(form.videos?.length ?? 0) > 0 && (
            <p className="text-muted-foreground text-xs">
              {form.videos?.length} existing video(s) on server
            </p>
          )}
          <div className="space-y-2">
            <Label htmlFor="project-features">Features (one per line)</Label>
            <Textarea
              id="project-features"
              value={(form.features ?? []).join("\n")}
              onChange={(e) =>
                updateArray(
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
            <Label htmlFor="project-tech">Technologies</Label>
            <div className="flex gap-2 flex-wrap">
              <Input
                id="project-tech"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTechnology();
                  }
                }}
                placeholder="Type and press Enter or Add"
                className="flex-1 min-w-[180px]"
              />
              <Button type="button" variant="secondary" onClick={addTechnology}>
                Add
              </Button>
            </div>
            {technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {technologies.map((tech, index) => (
                  <span
                    key={`${tech}-${index}`}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-md border bg-muted/50 px-2 py-1 text-sm"
                    )}
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTechnology(index)}
                      className="p-0.5 hover:bg-muted-foreground/20 rounded"
                      aria-label={`Remove ${tech}`}
                    >
                      <X className="size-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        {error && (
          <Alert variant="destructive" className="mx-6 mb-2">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <DialogFooter showCloseButton={false}>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={save} disabled={saving}>
            {saving ? "Saving…" : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
