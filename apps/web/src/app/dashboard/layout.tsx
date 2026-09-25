"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderGit2,
  Sparkles,
  Briefcase,
  Mail,
  LogOut,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { logout } from "./actions";

const nav = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/projects", label: "Projects", icon: FolderGit2 },
  { href: "/dashboard/skills", label: "Skills", icon: Sparkles },
  { href: "/dashboard/experience", label: "Experience", icon: Briefcase },
  { href: "/dashboard/messages", label: "Messages", icon: Mail },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // The dashboard is always dark. Dialogs render in a portal on <body>, outside
  // this layout, so the class has to be on <html> for them to be dark too.
  useEffect(() => {
    const root = document.documentElement;
    const wasDark = root.classList.contains("dark");
    root.classList.add("dark");
    return () => {
      if (!wasDark) root.classList.remove("dark");
    };
  }, []);

  if (pathname === "/dashboard/login") {
    return (
      <div className="dark min-h-screen bg-slate-900 flex items-center justify-center p-4">
        {children}
      </div>
    );
  }

  return (
    <div className="dark min-h-screen bg-slate-900 flex">
      <aside className="w-56 border-r border-slate-700 bg-slate-800/50 flex flex-col">
        <div className="p-4 border-b border-slate-700">
          <h1 className="font-semibold text-white">Dashboard</h1>
          <p className="text-xs text-slate-400">Portfolio CMS</p>
        </div>
        <nav className="p-2 flex-1 space-y-1">
          {nav.map(({ href, label, icon: Icon }) => {
            const isActive =
              href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  buttonVariants({ variant: isActive ? "default" : "ghost" }),
                  "w-full justify-start gap-2"
                )}
              >
                <Icon className="size-4" />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="p-2 border-t border-slate-700">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
            onClick={() => logout()}
          >
            <LogOut className="size-4" />
            Log out
          </Button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto p-6 text-slate-200">{children}</main>
    </div>
  );
}
