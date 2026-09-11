import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/content/site";
import { getDictionary } from "@/i18n/dictionaries";
import { localePrefix } from "@/i18n/locales";
import { getPublishedProjects } from "@/lib/data/projects";
import type { Locale } from "@/types/project";

export async function PublicHome({locale}:{locale:Locale}){
  const d=getDictionary(locale);
  const prefix=localePrefix(locale);
  const projects=(await getPublishedProjects()).filter((p)=>p.featured).slice(0,3);

  return <>
    <SiteHeader locale={locale}/>
    <main>
      <section className="hero shell" id="home">
        <div>
          <span className="eyebrow">{d.hero.eyebrow}</span>
          <h1>{d.hero.title}</h1>
          <p>{d.hero.body}</p>
          <div className="hero-actions">
            <Link className="primary-button" href={`${prefix}/projects`}>{d.hero.primary} ↗</Link>
            <a className="secondary-button" href="#contact">{d.hero.secondary}</a>
          </div>
          <div className="tech-strip">{["Java","Kotlin","Swift","React","Next.js","Node.js","C#","SQL"].map((t)=><span key={t}>{t}</span>)}</div>
        </div>
        <div className="hero-stage" aria-label="Abstract software product preview">
          <div className="stage-glow"/>
          <div className="stage-window stage-window-back"><div className="dots"><i/><i/><i/></div><div className="skeleton"><b/><b/><b/></div></div>
          <div className="stage-window stage-window-front"><div className="dots"><i/><i/><i/></div><div className="dashboard-grid"><span/><span/><span/><span/></div></div>
          <div className="code-chip">&lt;/&gt;</div>
        </div>
      </section>

      <section className="section shell">
        <div className="section-heading">
          <div><span className="eyebrow">01 / WORK</span><h2>{d.sections.featured}</h2><p>{d.sections.featuredBody}</p></div>
          <Link className="text-link" href={`${prefix}/projects`}>{d.misc.allProjects} ↗</Link>
        </div>
        <div className="project-grid">{projects.map((p)=><ProjectCard key={p.id} project={p} locale={locale}/>)}</div>
      </section>

      <section className="section shell">
        <div className="section-heading"><div><span className="eyebrow">02 / CAPABILITIES</span><h2>{d.sections.services}</h2></div></div>
        <div className="service-grid">{d.services.map(([title,body],i)=><article className="service-card" key={title}><span>0{i+1}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
      </section>

      <section className="section split shell" id="about">
        <div><span className="eyebrow">03 / PROFILE</span><h2>{d.sections.about}</h2><p className="large-copy">{siteConfig.role}. {d.aboutBody}</p></div>
        <dl className="facts">
          <div><dt>{d.misc.based}</dt><dd>{siteConfig.location}</dd></div>
          <div><dt>{d.misc.focus}</dt><dd>{siteConfig.focus}</dd></div>
          <div><dt>{d.misc.available}</dt><dd>{siteConfig.availability}</dd></div>
        </dl>
      </section>

      <section className="section shell" id="skills">
        <div className="section-heading"><div><span className="eyebrow">04 / STACK</span><h2>{d.sections.skills}</h2></div></div>
        <div className="stack-grid">{Object.entries(siteConfig.technologies).map(([group,list])=><div className="stack-card" key={group}><h3>{group}</h3><div className="chips">{list.map((t)=><span key={t}>{t}</span>)}</div></div>)}</div>
      </section>

      <section className="contact-section shell" id="contact">
        <span className="eyebrow">05 / CONTACT</span>
        <h2>{d.sections.contact}</h2>
        <p>{d.sections.contactBody}</p>
        <p><a className="text-link" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></p>
        <div className="hero-actions">
          <a className="primary-button" href={`mailto:${siteConfig.email}`}>{d.misc.email} ↗</a>
          <a className="secondary-button" href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          <a className="secondary-button" href={siteConfig.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
        </div>
      </section>
    </main>
    <footer className="footer">
      <div className="shell">
        <strong>{siteConfig.brand}</strong>
        <span>© {new Date().getFullYear()} {siteConfig.name}</span>
        <span><a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a> · <a href={siteConfig.github} target="_blank" rel="noopener noreferrer">GitHub</a></span>
      </div>
    </footer>
  </>;
}
