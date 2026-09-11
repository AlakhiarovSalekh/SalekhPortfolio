import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { getDictionary } from "@/i18n/dictionaries";
import { getProjectBySlug,getTranslation } from "@/lib/data/projects";
import type { Locale } from "@/types/project";

export async function ProjectDetail({locale,slug}:{locale:Locale;slug:string}){
  const project=await getProjectBySlug(slug);
  if(!project)notFound();
  const copy=getTranslation(project,locale);
  const d=getDictionary(locale);
  const sections=[
    [d.caseStudy.overview,copy.overview],
    [d.caseStudy.problem,copy.problem],
    [d.caseStudy.solution,copy.solution],
    [d.caseStudy.myRole,copy.myRole],
    [d.caseStudy.keyFeatures,copy.keyFeatures],
    [d.caseStudy.architecture,copy.architecture],
    [d.caseStudy.challenges,copy.challenges]
  ].filter(([,body])=>Boolean(body));

  return <>
    <SiteHeader locale={locale}/>
    <main className="shell case-shell">
      <div className="case-hero">
        <span className="eyebrow">{d.caseStudy.eyebrow} / {project.category}</span>
        <h1>{copy.title}</h1>
        <p>{copy.shortDescription}</p>
        <div className="chips">{project.technologies.map((t)=><span key={t}>{t}</span>)}</div>
      </div>
      <div className="case-banner"><span>{project.status}</span><strong>{copy.title}</strong></div>
      <div className="case-grid">{sections.map(([title,body])=><section key={title}><h2>{title}</h2><p>{body}</p></section>)}</div>
      <div className="case-links">
        {project.githubUrl&&<a className="secondary-button" href={project.githubUrl} target="_blank" rel="noopener noreferrer">GitHub ↗</a>}
        {project.liveUrl&&<a className="primary-button" href={project.liveUrl} target="_blank" rel="noopener noreferrer">{d.caseStudy.liveDemo} ↗</a>}
      </div>
    </main>
  </>;
}
