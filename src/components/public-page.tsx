import Link from "next/link";
import { PremiumEffects } from "@/components/premium-effects";
import { ReferenceProjectCard } from "@/components/reference-project-card";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/content/site";
import { getDictionary } from "@/i18n/dictionaries";
import { localePrefix } from "@/i18n/locales";
import { getPublishedProjects } from "@/lib/data/projects";
import type { Locale } from "@/types/project";

export async function PublicHome({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const prefix = localePrefix(locale);
  const allProjects = await getPublishedProjects();
  const projects = allProjects.filter((project) => project.featured).slice(0, 3);

  const ui = locale === "az"
    ? {
        kicker: "İDEYALARI REAL MƏHSULLARA ÇEVİRİRƏM",
        role: "Software Developer",
        summary: "Praktik, yüksək keyfiyyətli və real problemləri həll edən proqram təminatı hazırlayıram. Web, mobile və desktop məhsullarında təmiz arxitektura, güclü istifadəçi təcrübəsi və real nəticəyə fokuslanıram.",
        viewProjects: "Layihələrimə bax",
        contact: "Əlaqə saxla",
        available: "Freelance və full-time imkanlara açığam",
        featuredLabel: "SEÇİLMİŞ LAYİHƏLƏR",
        selectedWork: "Selected Work",
        rail: ["IDEYALAR", "KOD", "MƏHSULLAR", "NƏTİCƏ"],
        quote: "Daha yaxşı proqram. Daha yaxşı sabah üçün.",
      }
    : locale === "ka"
      ? {
          kicker: "იდეებიდან რეალურ პროდუქტებამდე",
          role: "Software Developer",
          summary: "ვქმნი პრაქტიკულ და მაღალხარისხიან პროგრამულ პროდუქტებს, რომლებიც რეალურ პრობლემებს წყვეტს. ვფოკუსირდები სუფთა არქიტექტურაზე, კარგ გამოცდილებაზე და რეალურ შედეგებზე.",
          viewProjects: "ნახე ჩემი პროექტები",
          contact: "დამიკავშირდი",
          available: "ღია ვარ freelance და full-time შესაძლებლობებისთვის",
          featuredLabel: "რჩეული პროექტები",
          selectedWork: "Selected Work",
          rail: ["IDEAS", "CODE", "PRODUCTS", "IMPACT"],
          quote: "უკეთესი პროგრამული უზრუნველყოფა უკეთესი ხვალისთვის.",
        }
      : {
          kicker: "BUILDING IDEAS INTO REAL PRODUCTS",
          role: "Software Developer",
          summary: "I build practical, high-quality software that solves real problems. From web and mobile apps to desktop and enterprise systems, I focus on clean architecture, great user experience, and measurable impact.",
          viewProjects: "View My Projects",
          contact: "Get In Touch",
          available: "Available for freelance & full-time opportunities",
          featuredLabel: "FEATURED PROJECTS",
          selectedWork: "Selected Work",
          rail: ["IDEAS", "CODE", "PRODUCTS", "IMPACT"],
          quote: "Better software for a brighter tomorrow.",
        };

  return <>
    <PremiumEffects />
    <SiteHeader locale={locale}/>
    <main className="reference-home">
      <section className="reference-hero" id="home">
        <div className="reference-hero-backdrop"/>
        <div className="reference-hero-inner shell">
          <div className="reference-copy">
            <div className="reference-kicker"><span>{ui.kicker}</span><i/></div>
            <h1>{siteConfig.name}</h1>
            <div className="reference-role">{ui.role}</div>
            <p className="reference-summary">{ui.summary}</p>
            <div className="reference-actions">
              <Link className="reference-primary" href={`${prefix}/projects`}>{ui.viewProjects}<span>→</span></Link>
              <a className="reference-secondary" href="#contact">{ui.contact}<span>✉</span></a>
            </div>
            <div className="reference-meta">
              <span className="reference-location">⌖ <b>{siteConfig.location}</b></span>
              <span className="reference-separator"/>
              <span className="reference-available"><i/>{ui.available}</span>
            </div>
          </div>

          <div className="reference-portrait" aria-label={`${siteConfig.name} portrait`}>
            <div className="portrait-light"/>
            <img
              src="/salekh-portrait.webp"
              alt={siteConfig.name}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>

          <aside className="reference-rail" aria-hidden="true">
            <div className="reference-rail-words">{ui.rail.map((word) => <span key={word}>{word}</span>)}</div>
            <div className="reference-rail-line"/>
            <blockquote>“{ui.quote}”</blockquote>
          </aside>
        </div>
      </section>

      <section className="reference-work shell" data-reveal>
        <div className="reference-work-head">
          <div>
            <span className="reference-section-label">{ui.featuredLabel}</span>
            <h2>{ui.selectedWork}</h2>
          </div>
          <Link className="reference-all-link" href={`${prefix}/projects`}>{d.misc.allProjects}<span>→</span></Link>
        </div>
        <div className="reference-project-grid">
          {projects.map((project) => <ReferenceProjectCard key={project.id} project={project} locale={locale}/>)}
        </div>
      </section>

      <section className="section shell" data-reveal="delay-1">
        <div className="section-heading"><div><span className="eyebrow">02 / CAPABILITIES</span><h2>{d.sections.services}</h2></div></div>
        <div className="premium-bento">
          {d.services.map(([title, body], index) => <article className="service-card" key={title}><span className="service-index">0{index + 1}</span><h3>{title}</h3><p>{body}</p></article>)}
        </div>
      </section>

      <section className="section shell profile-stage" id="about" data-reveal>
        <div className="profile-copy"><span className="eyebrow">03 / PROFILE</span><h2>{d.sections.about}</h2><p className="large-copy">{siteConfig.role}. {d.aboutBody}</p></div>
        <dl className="facts">
          <div><dt>{d.misc.based}</dt><dd>{siteConfig.location}</dd></div>
          <div><dt>{d.misc.focus}</dt><dd>{siteConfig.focus}</dd></div>
          <div><dt>{d.misc.available}</dt><dd>{siteConfig.availability}</dd></div>
        </dl>
      </section>

      <section className="section shell" id="skills" data-reveal="delay-1">
        <div className="section-heading"><div><span className="eyebrow">04 / STACK</span><h2>{d.sections.skills}</h2></div></div>
        <div className="stack-grid">{Object.entries(siteConfig.technologies).map(([group, list]) => <div className="stack-card" key={group}><h3>{group}</h3><div className="chips">{list.map((technology) => <span key={technology}>{technology}</span>)}</div></div>)}</div>
      </section>

      <section className="contact-section shell" id="contact" data-reveal>
        <span className="eyebrow">05 / CONTACT</span>
        <h2>{d.sections.contact}</h2>
        <p>{d.sections.contactBody}</p>
        <p><a className="text-link" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></p>
        <div className="hero-actions">
          <a className="primary-button" href={`mailto:${siteConfig.email}`}>{d.misc.email} →</a>
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
