import Link from "next/link";
import { FolderGit2, Sparkles, Briefcase } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-foreground mb-2">Overview</h1>
      <p className="text-muted-foreground mb-8">
        Manage the content that appears on your portfolio.
      </p>
      <div className="grid gap-4 sm:grid-cols-3">
        <Link href="/dashboard/projects">
          <Card className="transition-colors hover:ring-2 hover:ring-primary/50">
            <CardHeader>
              <FolderGit2 className="text-primary mb-2 size-8" />
              <CardTitle>Projects</CardTitle>
              <CardDescription>Add, edit, and remove projects</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/dashboard/skills">
          <Card className="transition-colors hover:ring-2 hover:ring-primary/50">
            <CardHeader>
              <Sparkles className="text-primary mb-2 size-8" />
              <CardTitle>Skills</CardTitle>
              <CardDescription>Manage skills and tags</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/dashboard/experience">
          <Card className="transition-colors hover:ring-2 hover:ring-primary/50">
            <CardHeader>
              <Briefcase className="text-primary mb-2 size-8" />
              <CardTitle>Experience</CardTitle>
              <CardDescription>Work and education history</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );
}
