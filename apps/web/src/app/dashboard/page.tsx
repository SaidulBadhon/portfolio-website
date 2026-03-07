import Link from "next/link";
import { FolderGit2, Sparkles, Briefcase } from "lucide-react";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-white mb-2">Overview</h1>
      <p className="text-slate-400 mb-8">Manage the content that appears on your portfolio.</p>
      <div className="grid gap-4 sm:grid-cols-3">
        <Link
          href="/dashboard/projects"
          className="rounded-xl border border-slate-700 bg-slate-800/50 p-6 hover:border-violet-500/50 hover:bg-slate-800 transition-colors"
        >
          <FolderGit2 className="text-violet-400 mb-3" size={32} />
          <h2 className="font-medium text-white">Projects</h2>
          <p className="text-sm text-slate-400">Add, edit, and remove projects</p>
        </Link>
        <Link
          href="/dashboard/skills"
          className="rounded-xl border border-slate-700 bg-slate-800/50 p-6 hover:border-violet-500/50 hover:bg-slate-800 transition-colors"
        >
          <Sparkles className="text-violet-400 mb-3" size={32} />
          <h2 className="font-medium text-white">Skills</h2>
          <p className="text-sm text-slate-400">Manage skills and tags</p>
        </Link>
        <Link
          href="/dashboard/experience"
          className="rounded-xl border border-slate-700 bg-slate-800/50 p-6 hover:border-violet-500/50 hover:bg-slate-800 transition-colors"
        >
          <Briefcase className="text-violet-400 mb-3" size={32} />
          <h2 className="font-medium text-white">Experience</h2>
          <p className="text-sm text-slate-400">Work and education history</p>
        </Link>
      </div>
    </div>
  );
}
