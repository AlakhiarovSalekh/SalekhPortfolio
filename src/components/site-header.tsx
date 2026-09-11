import Link from "next/link";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { siteConfig } from "@/content/site";
import { getDictionary } from "@/i18n/dictionaries";
import { localePrefix } from "@/i18n/locales";
import type { Locale } from "@/types/project";

export function SiteHeader({locale}:{locale:Locale}){
  const d=getDictionary(locale);
  const prefix=localePrefix(locale);
  return <header className="site-header">
    <div className="shell nav-shell">
      <Link className="brand" href={prefix||"/"}>{siteConfig.brand}</Link>
      <nav aria-label="Primary navigation">
        <Link href={`${prefix}/#home`}>{d.nav.home}</Link>
        <Link href={`${prefix}/#about`}>{d.nav.about}</Link>
        <Link href={`${prefix}/projects`}>{d.nav.projects}</Link>
        <Link href={`${prefix}/#skills`}>{d.nav.skills}</Link>
        <Link href={`${prefix}/#contact`}>{d.nav.contact}</Link>
      </nav>
      <div className="nav-actions">
        <LocaleSwitcher current={locale}/>
        {siteConfig.resume&&<a className="small-button" href={siteConfig.resume}>{d.nav.resume}</a>}
      </div>
    </div>
  </header>;
}
