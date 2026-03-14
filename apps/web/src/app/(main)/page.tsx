import About from "@/components/about";
import Contact from "@/components/contact";
import Experience from "@/components/experience";
import Intro from "@/components/intro";
import Projects from "@/components/projects";
import SectionDivider from "@/components/section-divider";
import Skills from "@/components/skills";
import { experiencesApi, projectsApi, skillsApi } from "@/lib/api";

export default async function Home() {
  const [projects, skills, experiences] = await Promise.all([
    projectsApi.list({
      next: { revalidate: 120 },
    }),
    skillsApi.list({
      next: { revalidate: 120 },
    }),
    experiencesApi.list({
      next: { revalidate: 120 },
    }),
  ]);

  return (
    <main className="flex flex-col items-center px-4">
      <Intro />
      <SectionDivider />
      <About />
      <Projects projects={projects} />
      <Skills skills={skills} />
      <Experience experiences={experiences} />
      <Contact />
    </main>
  );
}
