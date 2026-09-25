import About from "@/components/about";
import Contact from "@/components/contact";
import Experience from "@/components/experience";
import Intro from "@/components/intro";
import Projects from "@/components/projects";
import SectionDivider from "@/components/section-divider";
import Skills from "@/components/skills";
import { experiencesApi, projectsApi, skillsApi } from "@/lib/api";

const revalidate = { next: { revalidate: 120 } };

// Render the page even if the API is unreachable (e.g. during a build);
// ISR fills the sections in on the next revalidation.
async function loadOrEmpty<T>(name: string, load: () => Promise<T[]>) {
  try {
    return await load();
  } catch (error) {
    console.error(`Failed to load ${name}:`, error);
    return [];
  }
}

export default async function Home() {
  const [projects, skills, experiences] = await Promise.all([
    loadOrEmpty("projects", () => projectsApi.list(revalidate)),
    loadOrEmpty("skills", () => skillsApi.list(revalidate)),
    loadOrEmpty("experiences", () => experiencesApi.list(revalidate)),
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
