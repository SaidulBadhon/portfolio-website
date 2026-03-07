"use client";

import { useState, useEffect } from "react";
import { projectsApi, type ProjectItem } from "@/lib/api";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ProjectCard } from "./_components/project-card";
import { ProjectFormDialog } from "./_components/project-form-dialog";

function ProjectCardSkeleton() {
  return (
    <Card className="flex flex-col overflow-hidden">
      <div className="aspect-video w-full shrink-0 animate-pulse bg-muted" />
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
        <div className="h-3 w-full animate-pulse rounded bg-muted" />
        <div className="h-3 w-4/5 animate-pulse rounded bg-muted" />
        <div className="mt-2 flex gap-1">
          <div className="h-5 w-12 animate-pulse rounded bg-muted" />
          <div className="h-5 w-14 animate-pulse rounded bg-muted" />
          <div className="h-5 w-10 animate-pulse rounded bg-muted" />
        </div>
      </div>
      <div className="flex gap-2 border-t p-3">
        <div className="h-8 w-8 animate-pulse rounded bg-muted" />
        <div className="h-8 w-8 animate-pulse rounded bg-muted" />
      </div>
    </Card>
  );
}

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

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
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

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      ) : list.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground">
              No projects yet. Add one to get started.
            </p>
            <Button onClick={openNew} className="mt-4">
              <Plus className="size-4" />
              Add project
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <ProjectCard
              key={p.id}
              project={p}
              onEdit={openEdit}
              onDelete={remove}
            />
          ))}
        </div>
      )}

      <ProjectFormDialog
        open={!!modal}
        mode={modal ?? "new"}
        onClose={closeModal}
        onSuccess={load}
      />
    </div>
  );
}
