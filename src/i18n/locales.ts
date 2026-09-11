import type { Locale } from "@/types/project";
export const locales: Locale[] = ["en","az","ka"];
export const defaultLocale: Locale = "en";
export function localePrefix(locale:Locale){ return locale === "en" ? "" : `/${locale}`; }
export function isLocale(value:string): value is Locale { return locales.includes(value as Locale); }
