"use client";

import { useState, useEffect } from "react";
import { experiencesApi, type ExperienceItem } from "@/lib/api";
import { Plus, Pencil, Trash2 } from "lucide-react";

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

  if (loading) return <p className="text-slate-400">Loading…</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-white">Experience</h1>
        <button
          type="button"
          onClick={openNew}
          className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
        >
          <Plus size={18} />
          Add experience
        </button>
      </div>
      {error && <p className="mb-4 text-sm text-red-400">{error}</p>}
      <div className="space-y-3">
        {list.length === 0 ? (
          <p className="rounded-lg border border-slate-700 bg-slate-800/50 p-6 text-slate-400">
            No experience entries yet. Add one to get started.
          </p>
        ) : (
          list.map((x) => (
            <div
              key={x._id}
              className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800/50 p-4"
            >
              <div>
                <span className="font-medium text-white">{x.title}</span>
                <span className="text-slate-400"> at </span>
                <span className="font-medium text-white">{x.company}</span>
                {x.date && <span className="ml-2 text-slate-500 text-sm">{x.date}</span>}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => openEdit(x)}
                  className="rounded p-2 text-slate-400 hover:bg-slate-700 hover:text-white"
                >
                  <Pencil size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => remove(x._id)}
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
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-xl border border-slate-700 bg-slate-800 p-6">
            <h2 className="text-lg font-semibold text-white mb-4">
              {modal === "new" ? "New experience" : "Edit experience"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Job title</label>
                <input
                  value={form.title}
                  onChange={(e) => update("title", e.target.value)}
                  className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2 text-white"
                  placeholder="Full Stack Engineer"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Company</label>
                <input
                  value={form.company}
                  onChange={(e) => update("company", e.target.value)}
                  className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Location</label>
                <input
                  value={form.location}
                  onChange={(e) => update("location", e.target.value)}
                  className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2 text-white"
                  placeholder="San Francisco, CA • Remote"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Date / period</label>
                <input
                  value={form.date}
                  onChange={(e) => update("date", e.target.value)}
                  className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2 text-white"
                  placeholder="Jul 2025 - Present"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                  className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2 text-white"
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Company logo path (optional)</label>
                <input
                  value={form.companyLogo}
                  onChange={(e) => update("companyLogo", e.target.value)}
                  className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2 text-white"
                  placeholder="/assets/experience/jutsu.png"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Icon name (optional)</label>
                <input
                  value={form.icon}
                  onChange={(e) => update("icon", e.target.value)}
                  className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2 text-white"
                  placeholder="FaReact"
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
