"use client";

import { useState, useEffect } from "react";
import { experiencesApi, type ExperienceItem } from "@/lib/api";
import { Plus, Pencil, Trash2 } from "lucide-react";
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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

const emptyForm = () => ({
  title: "",
  company: "",
  companyLogo: "",
  location: "",
  description: "",
  icon: "",
  date: "",
});

export default function DashboardExperiencePage() {
  const [list, setList] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modal, setModal] = useState<"new" | ExperienceItem | null>(null);
  const [form, setForm] = useState(emptyForm());
  const [saving, setSaving] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const data = await experiencesApi.list();
      setList(data);
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openNew = () => {
    setForm(emptyForm());
    setModal("new");
  };
  const openEdit = (x: ExperienceItem) => {
    setForm({
      title: x.title,
      company: x.company,
      companyLogo: x.companyLogo ?? "",
      location: x.location ?? "",
      description: x.description ?? "",
      icon: x.icon ?? "",
      date: x.date ?? "",
    });
    setModal(x);
  };
  const closeModal = () => {
    setModal(null);
    setForm(emptyForm());
  };

  const save = async () => {
    if (!form.title.trim() || !form.company.trim()) {
      setError("Title and company are required.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      if (modal === "new") {
        await experiencesApi.create(form);
      } else {
        await experiencesApi.update((modal as ExperienceItem)._id, form);
      }
      closeModal();
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this experience?")) return;
    try {
      await experiencesApi.delete(id);
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
    }
  };

  const update = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  if (loading) return <p className="text-muted-foreground">Loading…</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Experience</h1>
        <Button onClick={openNew}>
          <Plus className="size-4" />
          Add experience
        </Button>
      </div>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="space-y-3">
        {list.length === 0 ? (
          <Card>
            <CardContent className="py-6">
              <p className="text-muted-foreground text-center">
                No experience entries yet. Add one to get started.
              </p>
            </CardContent>
          </Card>
        ) : (
          list.map((x) => (
            <Card key={x._id}>
              <CardHeader className="flex-row items-center">
                <div className="min-w-0">
                  <CardTitle className="text-base">
                    {x.title}
                    <span className="text-muted-foreground font-normal"> at </span>
                    {x.company}
                    {x.date && (
                      <span className="ml-2 text-muted-foreground text-sm font-normal">
                        {x.date}
                      </span>
                    )}
                  </CardTitle>
                </div>
                <CardAction className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => openEdit(x)}
                    aria-label="Edit experience"
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => remove(x._id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    aria-label="Delete experience"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </CardAction>
              </CardHeader>
            </Card>
          ))
        )}
      </div>

      <Dialog open={!!modal} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {modal === "new" ? "New experience" : "Edit experience"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="exp-title">Job title</Label>
              <Input
                id="exp-title"
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                placeholder="Full Stack Engineer"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="exp-company">Company</Label>
              <Input
                id="exp-company"
                value={form.company}
                onChange={(e) => update("company", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="exp-location">Location</Label>
              <Input
                id="exp-location"
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
                placeholder="San Francisco, CA • Remote"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="exp-date">Date / period</Label>
              <Input
                id="exp-date"
                value={form.date}
                onChange={(e) => update("date", e.target.value)}
                placeholder="Jul 2025 - Present"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="exp-desc">Description</Label>
              <Textarea
                id="exp-desc"
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="exp-logo">Company logo path (optional)</Label>
              <Input
                id="exp-logo"
                value={form.companyLogo}
                onChange={(e) => update("companyLogo", e.target.value)}
                placeholder="/assets/experience/jutsu.png"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="exp-icon">Icon name (optional)</Label>
              <Input
                id="exp-icon"
                value={form.icon}
                onChange={(e) => update("icon", e.target.value)}
                placeholder="FaReact"
              />
            </div>
          </div>
          <DialogFooter showCloseButton={false}>
            <Button variant="outline" onClick={closeModal}>
              Cancel
            </Button>
            <Button onClick={save} disabled={saving}>
              {saving ? "Saving…" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
