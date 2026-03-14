"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import { X, ChevronLeft, ChevronRight, Check, Sparkles } from "lucide-react";

type ModalMode = "new" | ProjectItem;

const emptyProject = (): Partial<ProjectItem> => ({
  id: "",
  title: "",
  description: "",
  tags: [],
  gradient: "from-violet-500 to-purple-600",
  icon: "rocket",
  type: "Project I worked on",
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

const STEPS = [
  { id: 1, label: "Basics", description: "ID, title & tags" },
  { id: 2, label: "Details", description: "Role, links & description" },
  { id: 3, label: "Media", description: "Logo, images & videos" },
  { id: 4, label: "Extras", description: "Features & technologies" },
] as const;

const STEP_COUNT = STEPS.length;

export function ProjectFormDialog({
  open,
  mode,
  onClose,
  onSuccess,
}: ProjectFormDialogProps) {
  const [form, setForm] = useState<Partial<ProjectItem>>(emptyProject());
  const [step, setStep] = useState(1);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [videoFiles, setVideoFiles] = useState<File[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [techInput, setTechInput] = useState("");
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [generating, setGenerating] = useState(false);
  const stepContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setForm(mode === "new" ? emptyProject() : { ...mode });
      setStep(1);
      setLogoFile(null);
      setImageFiles([]);
      setVideoFiles([]);
      setError(null);
      setTechInput("");
      setDirection("next");
    }
  }, [open, mode]);

  const goNext = () => {
    setError(null);
    setDirection("next");
    setStep((s) => Math.min(s + 1, STEP_COUNT));
    stepContentRef.current?.scrollTo(0, 0);
  };

  const goBack = () => {
    setError(null);
    setDirection("prev");
    setStep((s) => Math.max(s - 1, 1));
    stepContentRef.current?.scrollTo(0, 0);
  };

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

  const generateWithAI = async () => {
    const hasContext =
      (form.id ?? "").trim() ||
      (form.title ?? "").trim() ||
      (form.description ?? "").trim();
    if (!hasContext) {
      setError("Fill in at least ID, title, or short description first.");
      return;
    }
    setGenerating(true);
    setError(null);
    try {
      const res = await fetch("/api/projects/generate-fields", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: form.id,
          title: form.title,
          description: form.description,
          tags: form.tags,
          longDescription: form.longDescription,
          features: form.features,
          technologies: form.technologies,
          role: form.role,
          duration: form.duration,
          links: form.links,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Generation failed");
        return;
      }
      const { generated } = data;
      if (generated && typeof generated === "object") {
        setForm((prev) => ({
          ...prev,
          ...(generated.description != null && { description: generated.description }),
          ...(generated.tags != null && generated.tags.length > 0 && { tags: generated.tags }),
          ...(generated.longDescription != null && { longDescription: generated.longDescription }),
          ...(generated.features != null && generated.features.length > 0 && { features: generated.features }),
          ...(generated.technologies != null && generated.technologies.length > 0 && { technologies: generated.technologies }),
          ...(generated.role != null && { role: generated.role }),
          ...(generated.duration != null && { duration: generated.duration }),
        }));
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Generate with AI failed");
    } finally {
      setGenerating(false);
    }
  };

  const slideVariants = {
    enter: (d: "next" | "prev") => ({
      x: d === "next" ? 24 : -24,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (d: "next" | "prev") => ({
      x: d === "next" ? -24 : 24,
      opacity: 0,
    }),
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent fullScreen className="flex flex-col">
        <DialogHeader className="shrink-0">
          <DialogTitle>
            {mode === "new" ? "New project" : "Edit project"}
          </DialogTitle>
          {/* Step indicator */}
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between gap-2">
              {STEPS.map((s, index) => (
                <div key={s.id} className="flex flex-1 items-center">
                  <button
                    type="button"
                    onClick={() => {
                      setDirection(step > s.id ? "prev" : "next");
                      setStep(s.id);
                      setError(null);
                      stepContentRef.current?.scrollTo(0, 0);
                    }}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-3 py-2 text-left transition-colors",
                      step === s.id
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-medium",
                        step === s.id
                          ? "bg-primary-foreground/20"
                          : step > s.id
                            ? "bg-primary/80 text-primary-foreground"
                            : "bg-muted"
                      )}
                    >
                      {step > s.id ? <Check className="size-3.5" /> : s.id}
                    </span>
                    <span className="hidden truncate text-sm font-medium sm:inline">
                      {s.label}
                    </span>
                  </button>
                  {index < STEPS.length - 1 && (
                    <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-full rounded-full bg-primary"
                initial={false}
                animate={{ width: `${(step / STEP_COUNT) * 100}%` }}
                transition={{ type: "tween", duration: 0.25 }}
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs text-muted-foreground">
                Step {step} of {STEP_COUNT} · {STEPS[step - 1].description}
              </p>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={generateWithAI}
                disabled={generating}
                className="gap-1.5"
              >
                <Sparkles className="size-3.5" />
                {generating ? "Generating…" : "Generate with AI"}
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div
          ref={stepContentRef}
          className="min-h-0 flex-1 overflow-y-auto py-4"
        >
          <div className="mx-auto max-w-2xl">
            <AnimatePresence mode="wait" custom={direction}>
              {step === 1 && (
                <motion.div
                  key="step1"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                        placeholder="Project name"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="project-desc">Short description</Label>
                    <Input
                      id="project-desc"
                      value={form.description ?? ""}
                      onChange={(e) => update("description", e.target.value)}
                      placeholder="One-line summary"
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
                          e.target.value
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean)
                        )
                      }
                      placeholder="Next.js, TypeScript"
                    />
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="project-role">Role</Label>
                      <Input
                        id="project-role"
                        value={form.role ?? ""}
                        onChange={(e) => update("role", e.target.value)}
                        placeholder="e.g. Full-stack developer"
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
                      rows={4}
                      placeholder="Detailed project overview..."
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="project-live">Live URL</Label>
                      <Input
                        id="project-live"
                        value={form.links?.live ?? ""}
                        onChange={(e) => updateLinks("live", e.target.value)}
                        placeholder="https://..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="project-github">GitHub URL</Label>
                      <Input
                        id="project-github"
                        value={form.links?.github ?? ""}
                        onChange={(e) => updateLinks("github", e.target.value)}
                        placeholder="https://github.com/..."
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
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
                    onChange={(v) =>
                      setImageFiles(Array.isArray(v) ? v : v ? [v] : [])
                    }
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
                    onChange={(v) =>
                      setVideoFiles(Array.isArray(v) ? v : v ? [v] : [])
                    }
                    description="Multiple videos for the project"
                  />
                  {(form.videos?.length ?? 0) > 0 && (
                    <p className="text-muted-foreground text-xs">
                      {form.videos?.length} existing video(s) on server
                    </p>
                  )}
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
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
                      rows={4}
                      placeholder="Feature one&#10;Feature two"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="project-tech">Technologies</Label>
                    <div className="flex flex-wrap gap-2">
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
                        className="min-w-[180px] flex-1"
                      />
                      <Button type="button" variant="secondary" onClick={addTechnology}>
                        Add
                      </Button>
                    </div>
                    {technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {technologies.map((tech, index) => (
                          <span
                            key={`${tech}-${index}`}
                            className="inline-flex items-center gap-1 rounded-md border bg-muted/50 px-2 py-1 text-sm"
                          >
                            {tech}
                            <button
                              type="button"
                              onClick={() => removeTechnology(index)}
                              className="rounded p-0.5 hover:bg-muted-foreground/20"
                              aria-label={`Remove ${tech}`}
                            >
                              <X className="size-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mx-6 shrink-0">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <DialogFooter showCloseButton={false} className="shrink-0">
          <div className="flex w-full flex-col-reverse gap-2 sm:flex-row sm:justify-between">
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              {step > 1 && (
                <Button type="button" variant="outline" onClick={goBack}>
                  <ChevronLeft className="size-4" />
                  Back
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              {step < STEP_COUNT ? (
                <Button type="button" onClick={goNext}>
                  Next
                  <ChevronRight className="size-4" />
                </Button>
              ) : (
                <Button onClick={save} disabled={saving}>
                  {saving ? "Saving…" : "Save project"}
                </Button>
              )}
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
