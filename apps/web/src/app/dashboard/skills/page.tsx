"use client";

import { useState, useEffect } from "react";
import { skillsApi, type SkillItem } from "@/lib/api";
import { Plus, Pencil, Trash2 } from "lucide-react";

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

  if (loading) return <p className="text-slate-400">Loading…</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-white">Skills</h1>
        <button
          type="button"
          onClick={openNew}
          className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
        >
          <Plus size={18} />
          Add skill
        </button>
      </div>
      {error && <p className="mb-4 text-sm text-red-400">{error}</p>}
      <div className="flex flex-wrap gap-2">
        {list.length === 0 ? (
          <p className="rounded-lg border border-slate-700 bg-slate-800/50 p-6 text-slate-400">
            No skills yet. Add one to get started.
          </p>
        ) : (
          list.map((s) => (
            <div
              key={s._id}
              className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2"
            >
              <span className="text-white">{s.name}</span>
              <button
                type="button"
                onClick={() => openEdit(s)}
                className="rounded p-1 text-slate-400 hover:bg-slate-700 hover:text-white"
              >
                <Pencil size={14} />
              </button>
              <button
                type="button"
                onClick={() => remove(s._id)}
                className="rounded p-1 text-slate-400 hover:bg-red-500/20 hover:text-red-400"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))
        )}
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-xl border border-slate-700 bg-slate-800 p-6">
            <h2 className="text-lg font-semibold text-white mb-4">
              {modal === "new" ? "New skill" : "Edit skill"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2 text-white"
                  placeholder="e.g. TypeScript"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Color (Tailwind class, optional)</label>
                <input
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2 text-white"
                  placeholder="bg-blue-500/10 text-blue-600"
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
