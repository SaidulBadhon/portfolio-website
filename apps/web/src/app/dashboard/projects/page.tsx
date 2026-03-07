"use client";

import { useState, useEffect } from "react";
import { projectsApi, type ProjectItem } from "@/lib/api";
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react";

const emptyProject = (): Partial<ProjectItem> => ({
  id: "",
  title: "",
  description: "",
  tags: [],
  gradient: "from-violet-500 to-purple-600",
  icon: "rocket",
  type: "Project I worked on",
  image: "",
  longDescription: "",
  features: [],
  technologies: [],
  role: "",
  duration: "",
  links: { live: "", github: "" },
});

export default function DashboardProjectsPage() {
  const [list, setList] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modal, setModal] = useState<"new" | ProjectItem | null>(null);
  const [form, setForm] = useState<Partial<ProjectItem>>(emptyProject());
  const [saving, setSaving] = useState(false);

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

  const openNew = () => {
    setForm(emptyProject());
    setModal("new");
  };
  const openEdit = (p: ProjectItem) => {
    setForm({ ...p });
    setModal(p);
  };
  const closeModal = () => {
    setModal(null);
    setForm(emptyProject());
  };

  const save = async () => {
    if (!form.id?.trim() || !form.title?.trim() || !form.description?.trim()) {
      setError("ID, title, and description are required.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      if (modal === "new") {
        await projectsApi.create(form as ProjectItem);
      } else {
        await projectsApi.update((modal as ProjectItem).id, form);
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
    if (!confirm("Delete this project?")) return;
    try {
      await projectsApi.delete(id);
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
    }
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
  const updateArray = (key: "tags" | "features" | "technologies", value: string[]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  if (loading) return <p className="text-slate-400">Loading…</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-white">Projects</h1>
        <button
          type="button"
          onClick={openNew}
          className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
        >
          <Plus size={18} />
          Add project
        </button>
      </div>
      {error && <p className="mb-4 text-sm text-red-400">{error}</p>}
      <div className="space-y-3">
        {list.length === 0 ? (
          <p className="rounded-lg border border-slate-700 bg-slate-800/50 p-6 text-slate-400">
            No projects yet. Add one to get started.
          </p>
        ) : (
          list.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800/50 p-4"
            >
              <div>
                <span className="font-medium text-white">{p.title}</span>
                <span className="ml-2 text-slate-500 text-sm">({p.id})</span>
                {p.links?.live && (
                  <a
                    href={p.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-violet-400 hover:underline inline-flex items-center"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => openEdit(p)}
                  className="rounded p-2 text-slate-400 hover:bg-slate-700 hover:text-white"
                >
                  <Pencil size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => remove(p.id)}
                  className="rounded p-2 text-slate-400 hover:bg-red-500/20 hover:text-red-400"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-slate-700 bg-slate-800 p-6">
            <h2 className="text-lg font-semibold text-white mb-4">
              {modal === "new" ? "New project" : "Edit project"}
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">ID (slug)</label>
                  <input
                    value={form.id ?? ""}
                    onChange={(e) => update("id", e.target.value)}
                    className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2 text-white"
                    placeholder="my-project"
                    disabled={modal !== "new"}
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Title</label>
                  <input
                    value={form.title ?? ""}
                    onChange={(e) => update("title", e.target.value)}
                    className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2 text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Short description</label>
                <input
                  value={form.description ?? ""}
                  onChange={(e) => update("description", e.target.value)}
                  className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Tags (comma-separated)</label>
                <input
                  value={(form.tags ?? []).join(", ")}
                  onChange={(e) =>
                    updateArray(
                      "tags",
                      e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                    )
                  }
                  className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2 text-white"
                  placeholder="Next.js, TypeScript"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Role</label>
                  <input
                    value={form.role ?? ""}
                    onChange={(e) => update("role", e.target.value)}
                    className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Duration</label>
                  <input
                    value={form.duration ?? ""}
                    onChange={(e) => update("duration", e.target.value)}
                    className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2 text-white"
                    placeholder="Jan 2024 - Present"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Long description</label>
                <textarea
                  value={form.longDescription ?? ""}
                  onChange={(e) => update("longDescription", e.target.value)}
                  className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2 text-white"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Live URL</label>
                  <input
                    value={form.links?.live ?? ""}
                    onChange={(e) => updateLinks("live", e.target.value)}
                    className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">GitHub URL</label>
                  <input
                    value={form.links?.github ?? ""}
                    onChange={(e) => updateLinks("github", e.target.value)}
                    className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2 text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Image path</label>
                <input
                  value={form.image ?? ""}
                  onChange={(e) => update("image", e.target.value)}
                  className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2 text-white"
                  placeholder="/projects/web3.png"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Features (one per line)</label>
                <textarea
                  value={(form.features ?? []).join("\n")}
                  onChange={(e) =>
                    updateArray(
                      "features",
                      e.target.value.split("\n").map((s) => s.trim()).filter(Boolean)
                    )
                  }
                  className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2 text-white"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Technologies (comma-separated)</label>
                <input
                  value={(form.technologies ?? []).join(", ")}
                  onChange={(e) =>
                    updateArray(
                      "technologies",
                      e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                    )
                  }
                  className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2 text-white"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg border border-slate-600 px-4 py-2 text-slate-300 hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={save}
                disabled={saving}
                className="rounded-lg bg-violet-600 px-4 py-2 text-white hover:bg-violet-700 disabled:opacity-50"
              >
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
