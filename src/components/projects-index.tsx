import { ProjectCard } from "@/components/project-card";
import { SiteHeader } from "@/components/site-header";
import { getDictionary } from "@/i18n/dictionaries";
import { getPublishedProjects } from "@/lib/data/projects";
import type { Locale } from "@/types/project";

export async function ProjectsIndex({locale}:{locale:Locale}){
  const projects=await getPublishedProjects();
  const d=getDictionary(locale);
  return <>
    <SiteHeader locale={locale}/>
    <main className="shell page-shell">
      <span className="eyebrow">{d.projectsPage.eyebrow}</span>
      <h1 className="page-title">{d.projectsPage.title}</h1>
      <p className="page-intro">{d.projectsPage.body}</p>
      <div className="project-grid">{projects.map((p)=><ProjectCard key={p.id} project={p} locale={locale}/>)}</div>
    </main>
  </>;
}
