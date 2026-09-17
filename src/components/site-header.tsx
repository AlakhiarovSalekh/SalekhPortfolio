import Link from "next/link";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { siteConfig } from "@/content/site";
import { getDictionary } from "@/i18n/dictionaries";
import { localePrefix } from "@/i18n/locales";
import type { Locale } from "@/types/project";

export function SiteHeader({locale}:{locale:Locale}){
  const d=getDictionary(locale);
  const prefix=localePrefix(locale);
  return <header className="site-header reference-header">
    <div className="shell nav-shell reference-nav-shell">
      <Link className="brand reference-brand" href={prefix||"/"}>
        <span className="reference-brand-mark">AS</span>
        <span className="reference-brand-name">{siteConfig.name}</span>
      </Link>
      <nav aria-label="Primary navigation" className="reference-nav">
        <Link href={`${prefix}/#home`}>{d.nav.home}</Link>
        <Link href={`${prefix}/projects`}>{d.nav.projects}</Link>
        <Link href={`${prefix}/#about`}>{d.nav.about}</Link>
        <Link href={`${prefix}/#skills`}>{d.nav.skills}</Link>
        <Link href={`${prefix}/#contact`}>{d.nav.contact}</Link>
      </nav>
      <div className="nav-actions reference-nav-actions">
        <LocaleSwitcher current={locale}/>
        <a className="reference-header-cta" href={`${prefix}/#contact`}>Let&apos;s Work Together <span>→</span></a>
      </div>
    </div>
  </header>;
}
