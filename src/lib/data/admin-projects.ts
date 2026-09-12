import { hasSupabaseEnv } from "@/lib/env";
import { demoProjects } from "@/content/demo-projects";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const select = `
  id,slug,category,status,featured,published,display_order,github_url,live_url,cover_image_path,created_at,updated_at,
  project_translations(locale,title,short_description,overview,problem,solution,my_role,key_features,architecture,challenges),
  project_technologies(technology_id,technologies(id,name,slug)),
  project_images(id,storage_path,alt_text_en,alt_text_az,alt_text_ka,display_order)
`;

export async function getAdminProjects() {
  if (!hasSupabaseEnv()) return demoProjects;
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from("projects").select(select).order("updated_at", { ascending: false });
  if (error) throw new Error(`Could not load admin projects: ${error.message}`);
  return data ?? [];
}

export async function getAdminProject(id: string) {
  if (!hasSupabaseEnv()) return null;
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from("projects").select(select).eq("id", id).single();
  if (error) return null;
  return data;
}
