"use client";

import { useState, useEffect } from "react";
import { projectsApi, type ProjectItem } from "@/lib/api";
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ProjectFormDialog } from "./_components/project-form-dialog";

export default function DashboardProjectsPage() {
  const [list, setList] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modal, setModal] = useState<"new" | ProjectItem | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      const data = await projectsApi.list();
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

  const openNew = () => setModal("new");
  const openEdit = (p: ProjectItem) => setModal(p);
  const closeModal = () => setModal(null);

  const remove = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    try {
      await projectsApi.delete(id);
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
    }
  };

  if (loading) {
    return (
      <p className="text-muted-foreground">Loading…</p>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Projects</h1>
        <Button onClick={openNew}>
          <Plus className="size-4" />
          Add project
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
                No projects yet. Add one to get started.
              </p>
            </CardContent>
          </Card>
        ) : (
          list.map((p) => (
            <Card key={p.id}>
              <CardHeader className="flex-row items-center">
                <div className="flex items-center gap-2 min-w-0">
                  <CardTitle className="text-base truncate">{p.title}</CardTitle>
                  <span className="text-muted-foreground text-sm shrink-0">({p.id})</span>
                  {p.links?.live && (
                    <a
                      href={p.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline inline-flex items-center shrink-0"
                    >
                      <ExternalLink className="size-4" />
                    </a>
                  )}
                </div>
                <CardAction className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => openEdit(p)}
                    aria-label="Edit project"
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => remove(p.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    aria-label="Delete project"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </CardAction>
              </CardHeader>
            </Card>
          ))
        )}
      </div>

      <ProjectFormDialog
        open={!!modal}
        mode={modal ?? "new"}
        onClose={closeModal}
        onSuccess={load}
      />
    </div>
  );
}
