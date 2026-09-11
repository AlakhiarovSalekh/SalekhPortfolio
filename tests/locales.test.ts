import { describe,expect,it } from "vitest";
import { isLocale,localePrefix } from "@/i18n/locales";
describe("locale helpers",()=>{it("keeps English at root",()=>expect(localePrefix("en")).toBe(""));it("prefixes Azerbaijani",()=>expect(localePrefix("az")).toBe("/az"));it("rejects unsupported locale",()=>expect(isLocale("de")).toBe(false));});
