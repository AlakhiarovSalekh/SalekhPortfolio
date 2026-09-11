"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/types/project";
function pathFor(pathname:string,locale:Locale){const stripped=pathname.replace(/^\/(az|ka)(?=\/|$)/,"")||"/";return locale==="en"?stripped:`/${locale}${stripped==="/"?"":stripped}`;}
export function LocaleSwitcher({current}:{current:Locale}){const pathname=usePathname();return <div className="locale-switcher" aria-label="Language selector">{(["en","az","ka"] as Locale[]).map((locale)=><Link key={locale} href={pathFor(pathname,locale)} className={current===locale?"active":""}>{locale.toUpperCase()}</Link>)}</div>;}
