import Link from "next/link";
import { ProjectVisual } from "@/components/project-visual";
import { getDictionary } from "@/i18n/dictionaries";
import { localePrefix } from "@/i18n/locales";
import { getTranslation } from "@/lib/data/projects";
import type { Locale, Project } from "@/types/project";

export function ProjectCard({ project, locale }: { project: Project; locale: Locale }) {
  const copy = getTranslation(project, locale);
  const d = getDictionary(locale);
  const prefix = localePrefix(locale);

  return <article className="project-card">
    <div className={`project-visual${project.coverImage ? " has-image" : " custom-visual"}`}>
      {project.coverImage
        ? <img src={project.coverImage} alt={`${copy.title} preview`}/>
        : <ProjectVisual title={copy.title} slug={project.slug} category={project.category}/>} 
    </div>
    <div className="project-card-body">
      <div className="project-meta"><span>{project.status}</span>{project.featured && <span>{d.misc.featured}</span>}</div>
      <h3>{copy.title}</h3>
      <p>{copy.shortDescription}</p>
      <div className="chips">{project.technologies.slice(0, 5).map((technology) => <span key={technology}>{technology}</span>)}</div>
      <Link className="text-link" href={`${prefix}/projects/${project.slug}`}>{d.misc.viewCase} ↗</Link>
    </div>
  </article>;
}
