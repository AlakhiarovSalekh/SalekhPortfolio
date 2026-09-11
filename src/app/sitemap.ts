import type { MetadataRoute } from "next";
import { env } from "@/lib/env";
export default function sitemap():MetadataRoute.Sitemap{const base=env.siteUrl.replace(/\/$/,"");return ["","/projects","/az","/az/projects","/ka","/ka/projects"].map((route)=>({url:`${base}${route}`,lastModified:new Date(),changeFrequency:route.includes("projects")?"weekly":"monthly",priority:route===""?1:.8}));}
