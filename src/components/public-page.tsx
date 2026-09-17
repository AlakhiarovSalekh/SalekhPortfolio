import Link from "next/link";
import { PremiumEffects } from "@/components/premium-effects";
import { ProjectCard } from "@/components/project-card";
import { SiteHeader } from "@/components/site-header";
import { portraitDataUri } from "@/content/portrait";
import { siteConfig } from "@/content/site";
import { getDictionary } from "@/i18n/dictionaries";
import { localePrefix } from "@/i18n/locales";
import { getPublishedProjects } from "@/lib/data/projects";
import type { Locale } from "@/types/project";

const techs = [
  ["JV", "Java"],
  ["KT", "Kotlin"],
  ["SW", "Swift"],
  ["⚛", "React"],
  ["N", "Next.js"],
  ["JS", "Node.js"],
  ["C#", "C#"],
  ["DB", "SQL"],
] as const;

export async function PublicHome({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const prefix = localePrefix(locale);
  const allProjects = await getPublishedProjects();
  const projects = allProjects.filter((project) => project.featured).slice(0, 3);

  const ui = locale === "az"
    ? {
        status: "Yeni imkanlara açığam",
        heroLead: "Real problemləri həll edən",
        heroAccent: "proqramlar hazırlayıram.",
        projects: "Layihə",
        platforms: "Platforma",
        languages: "Dil",
        learning: "Daim öyrənirəm",
        techLabel: "İşlədiyim texnologiyalar",
        quote: "Yaxşı proqram sadəcə işləmir — güvən yaradır.",
        signature: "Alakhiarov Salekh",
      }
    : locale === "ka"
      ? {
          status: "ღია ვარ ახალი შესაძლებლობებისთვის",
          heroLead: "ვქმნი პროგრამულ პროდუქტებს,",
          heroAccent: "რომლებიც რეალურ პრობლემებს წყვეტს.",
          projects: "პროექტი",
          platforms: "პლატფორმა",
          languages: "ენა",
          learning: "მუდამ ვსწავლობ",
          techLabel: "ტექნოლოგიები",
          quote: "კარგი პროგრამული უზრუნველყოფა ნდობას ქმნის.",
          signature: "Alakhiarov Salekh",
        }
      : {
          status: "Available for opportunities",
          heroLead: "I build software that solves",
          heroAccent: "real problems.",
          projects: "Projects",
          platforms: "Platforms",
          languages: "Languages",
          learning: "Always learning",
          techLabel: "Technologies I work with",
          quote: "Good software does more than work — it earns trust.",
          signature: "Alakhiarov Salekh",
        };

  return <>
    <PremiumEffects />
    <SiteHeader locale={locale}/>
    <main className="premium-home">
      <section className="premium-hero shell" id="home">
        <div className="hero-copy">
          <div className="hero-status"><i/>{ui.status}</div>
          <span className="eyebrow">{d.hero.eyebrow}</span>
          <h1><span>{ui.heroLead}</span><br/><strong>{ui.heroAccent}</strong></h1>
          <p className="hero-body">{d.hero.body}</p>
          <div className="hero-actions">
            <Link className="primary-button" href={`${prefix}/projects`}>{d.hero.primary} →</Link>
            <a className="secondary-button" href="#contact">{d.hero.secondary}</a>
          </div>
          <div className="hero-stats" aria-label="Portfolio highlights">
            <div className="hero-stat"><strong>{allProjects.length}+</strong><span>{ui.projects}</span></div>
            <div className="hero-stat"><strong>3</strong><span>{ui.platforms}</span></div>
            <div className="hero-stat"><strong>3</strong><span>{ui.languages}</span></div>
            <div className="hero-stat"><strong>∞</strong><span>{ui.learning}</span></div>
          </div>
        </div>

        <div className="portrait-stage" aria-label={`${siteConfig.name} portrait`}>
          <div className="portrait-aura"/>
          <div className="portrait-grid"/>
          <div className="hero-orbit one"/>
          <div className="hero-orbit two"/>
          <div className="portrait-cutout">
            <img src={portraitDataUri} alt={siteConfig.name}/>
          </div>
          <div className="hero-quote">“{ui.quote}”</div>
          <div className="hero-signature">{ui.signature}</div>
        </div>
      </section>

      <div className="tech-marquee shell" aria-label={ui.techLabel}>
        <div className="tech-marquee-inner">
          <div className="tech-label"><i/>{ui.techLabel}</div>
          {techs.map(([symbol, name]) => <div className="tech-item" key={name}><span className="tech-symbol">{symbol}</span>{name}</div>)}
        </div>
      </div>

      <section className="section shell" data-reveal>
        <div className="section-heading">
          <div><span className="eyebrow">01 / WORK</span><h2>{d.sections.featured}</h2><p>{d.sections.featuredBody}</p></div>
          <Link className="text-link" href={`${prefix}/projects`}>{d.misc.allProjects} →</Link>
        </div>
        <div className="project-grid">{projects.map((project) => <ProjectCard key={project.id} project={project} locale={locale}/>)}</div>
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
