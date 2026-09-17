import Link from "next/link";
import { ProjectVisual } from "@/components/project-visual";
import { getDictionary } from "@/i18n/dictionaries";
import { localePrefix } from "@/i18n/locales";
import { getTranslation } from "@/lib/data/projects";
import type { Locale, Project } from "@/types/project";

export function ReferenceProjectCard({ project, locale }: { project: Project; locale: Locale }) {
  const copy = getTranslation(project, locale);
  const d = getDictionary(locale);
  const prefix = localePrefix(locale);

  return <article className="ref-project-card">
    <Link className="ref-project-media" href={`${prefix}/projects/${project.slug}`} aria-label={copy.title}>
      <div className="ref-project-media-inner">
        {project.coverImage
          ? <img src={project.coverImage} alt={`${copy.title} preview`} loading="lazy"/>
          : <ProjectVisual title={copy.title} slug={project.slug} category={project.category}/>}
      </div>
      <div className="ref-project-media-shade"/>
      <span className="ref-project-open">↗</span>
    </Link>
    <div className="ref-project-copy">
      <div className="ref-project-topline">
        <span>{project.category.replaceAll("-", " ")}</span>
        <span>{project.status.replaceAll("-", " ")}</span>
      </div>
      <h3><Link href={`${prefix}/projects/${project.slug}`}>{copy.title}</Link></h3>
      <p>{copy.shortDescription}</p>
      <div className="ref-project-tech">
        {project.technologies.slice(0,4).map((technology)=><span key={technology}>{technology}</span>)}
      </div>
      <Link className="ref-project-link" href={`${prefix}/projects/${project.slug}`}>{d.misc.viewCase}<span>→</span></Link>
    </div>
  </article>;
}
