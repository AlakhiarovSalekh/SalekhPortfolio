import { demoProjects } from "@/content/demo-projects";
import { hasSupabaseEnv } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Locale, Project } from "@/types/project";

export async function getPublishedProjects(): Promise<Project[]> {
  if (!hasSupabaseEnv()) return demoProjects.filter((project) => project.published);
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from("projects").select(`
    id,slug,category,status,featured,published,display_order,github_url,live_url,cover_image_path,
    project_translations(locale,title,short_description,overview,problem,solution,my_role,key_features,architecture,challenges),
    project_technologies(technologies(name)),
    project_images(storage_path,alt_text_en,alt_text_az,alt_text_ka,display_order)
  `).eq("published", true).order("display_order", { ascending: true }).order("created_at", { ascending: false });
  if (error || !data) return [];

  const mediaUrl = (path?: string | null) => path ? supabase.storage.from("portfolio-media").getPublicUrl(path).data.publicUrl : undefined;
  return data.map((row: any) => {
    const translations = Object.fromEntries(row.project_translations.map((translation: any) => [translation.locale, {
      title: translation.title,
      shortDescription: translation.short_description,
      overview: translation.overview ?? undefined,
      problem: translation.problem ?? undefined,
      solution: translation.solution ?? undefined,
      myRole: translation.my_role ?? undefined,
      keyFeatures: translation.key_features ?? undefined,
      architecture: translation.architecture ?? undefined,
      challenges: translation.challenges ?? undefined,
    }])) as Project["translations"];
    return {
      id: row.id,
      slug: row.slug,
      category: row.category,
      status: row.status,
      featured: row.featured,
      published: row.published,
      displayOrder: row.display_order,
      githubUrl: row.github_url ?? undefined,
      liveUrl: row.live_url ?? undefined,
      coverImage: mediaUrl(row.cover_image_path),
      images: (row.project_images ?? []).sort((a: any, b: any) => a.display_order - b.display_order).map((image: any) => ({
        url: mediaUrl(image.storage_path)!,
        displayOrder: image.display_order,
        altText: { en: image.alt_text_en ?? "", az: image.alt_text_az ?? "", ka: image.alt_text_ka ?? "" },
      })),
      technologies: row.project_technologies.flatMap((item: any) => item.technologies?.name ? [item.technologies.name] : []),
      translations,
    } as Project;
  });
}

export async function getProjectBySlug(slug: string) {
  const projects = await getPublishedProjects();
  return projects.find((project) => project.slug === slug) ?? null;
}

export function getTranslation(project: Project, locale: Locale) {
  return project.translations[locale] ?? project.translations.en;
}
