import { demoProjects } from "@/content/demo-projects";
import { hasSupabaseEnv } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Locale, Project } from "@/types/project";

export async function getPublishedProjects(): Promise<Project[]> {
  if (!hasSupabaseEnv()) return demoProjects.filter((p) => p.published);
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from("projects").select(`
    id,slug,category,status,featured,published,display_order,github_url,live_url,cover_image_path,
    project_translations(locale,title,short_description,overview,problem,solution,my_role,key_features,architecture,challenges),
    project_technologies(technologies(name))
  `).eq("published", true).order("display_order", { ascending: true });
  if (error || !data) return [];
  return data.map((row:any) => {
    const translations = Object.fromEntries(row.project_translations.map((t:any) => [t.locale, {
      title:t.title, shortDescription:t.short_description, overview:t.overview??undefined, problem:t.problem??undefined,
      solution:t.solution??undefined, myRole:t.my_role??undefined, keyFeatures:t.key_features??undefined,
      architecture:t.architecture??undefined, challenges:t.challenges??undefined
    }])) as Project["translations"];
    return {
      id:row.id, slug:row.slug, category:row.category, status:row.status, featured:row.featured, published:row.published,
      displayOrder:row.display_order, githubUrl:row.github_url??undefined, liveUrl:row.live_url??undefined,
      coverImage:row.cover_image_path??undefined,
      technologies:row.project_technologies.flatMap((pt:any)=>pt.technologies?.name?[pt.technologies.name]:[]), translations
    } as Project;
  });
}
export async function getProjectBySlug(slug:string){ const projects=await getPublishedProjects(); return projects.find((p)=>p.slug===slug)??null; }
export function getTranslation(project:Project, locale:Locale){ return project.translations[locale]??project.translations.en; }
