import ProjectPage from "@/src/pages/project/ProjectPage";
import { projectsData } from "@/lib/data";

export default async function Page({ params }) {
  const { slug } = params;
  const project = projectsData.find((project) => project.slug === slug);

  console.log("project", project);

  return <ProjectPage {...project} />;
}

// export const config = {
//   runtime: "experimental-edge",
//   regions: ["sin1"],
// };
// import ProjectPageCoce from "@/src/pages/project/ProjectPage";
// import { projectsData } from "@/lib/data";

// export async function getStaticPaths() {
//   //   const storeIds = await projectsData;

//   const paths = projectsData.map((project) => ({
//     params: { project: project?.slug },
//   }));

//   return {
//     paths,
//     fallback: "blocking",
//   };
// }

// export async function getStaticProps({ params }) {
//   const apiUrl = isProd
//     ? "https://7ji9fopek7.execute-api.ap-southeast-1.amazonaws.com/production/api/v1"
//     : "http://localhost:8000/api/v1";

//   const project = params.project;
//   //   const stores = await fetch(`${apiUrl}/public/stores/${project}`);

//   const projectData = await projectsData.find(
//     (project) => project.slug === project
//   );

//   return {
//     props: {
//       project: projectData,
//     },
//     // 3,600 (1 hour) in development, 86,400 (1 day) in production
//     revalidate: isProd ? 86400 : 60,
//   };
// }

// const ProjectPage = (props) => <ProjectPageCoce {...props} />;

// export default ProjectPage;
