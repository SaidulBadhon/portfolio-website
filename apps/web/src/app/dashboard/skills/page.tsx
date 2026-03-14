"use client";

import { useState, useEffect } from "react";
import { skillsApi, type SkillItem } from "@/lib/api";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function DashboardSkillsPage() {
  const [list, setList] = useState<SkillItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modal, setModal] = useState<"new" | SkillItem | null>(null);
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [saving, setSaving] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const data = await skillsApi.list();
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
    setName("");
    setColor("");
    setModal("new");
  };
  const openEdit = (s: SkillItem) => {
    setName(s.name);
    setColor(s.color ?? "");
    setModal(s);
  };
  const closeModal = () => setModal(null);

  const save = async () => {
    if (!name.trim()) {
      setError("Name is required.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      if (modal === "new") {
        await skillsApi.create({ name: name.trim(), color: color.trim() || undefined });
      } else {
        await skillsApi.update((modal as SkillItem)._id, {
          name: name.trim(),
          color: color.trim() || undefined,
        });
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
    if (!confirm("Remove this skill?")) return;
    try {
      await skillsApi.delete(id);
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
    }
  };

  if (loading) return <p className="text-muted-foreground">Loading…</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Skills</h1>
        <Button onClick={openNew}>
          <Plus className="size-4" />
          Add skill
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
                No skills yet. Add one to get started.
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/30">
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                        Skill
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                        Color
                      </th>
                      <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((s) => (
                      <tr key={s._id} className="border-b last:border-b-0">
                        <td className="px-4 py-3 font-medium">{s.name}</td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {s.color || "-"}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="icon-xs"
                              onClick={() => openEdit(s)}
                              aria-label="Edit skill"
                            >
                              <Pencil className="size-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon-xs"
                              onClick={() => remove(s._id)}
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                              aria-label="Remove skill"
                            >
                              <Trash2 className="size-3.5" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog open={!!modal} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{modal === "new" ? "New skill" : "Edit skill"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="skill-name">Name</Label>
              <Input
                id="skill-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. TypeScript"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="skill-color">Color (Tailwind class, optional)</Label>
              <Input
                id="skill-color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="bg-blue-500/10 text-blue-600"
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
