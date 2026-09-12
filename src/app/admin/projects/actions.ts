"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireRole } from "@/lib/auth/require-role";
import { hasSupabaseEnv } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type ProjectActionState = { error?: string };
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const categories = new Set(["web", "mobile", "desktop", "full-stack", "backend", "other"]);
const statuses = new Set(["active", "completed", "in-progress", "archived"]);

function text(fd: FormData, key: string, max = 20000) {
  return String(fd.get(key) ?? "").trim().slice(0, max);
}
function checked(fd: FormData, key: string) { return fd.get(key) === "on"; }
function number(fd: FormData, key: string) {
  const value = Number.parseInt(text(fd, key, 12), 10);
  return Number.isFinite(value) ? Math.max(-9999, Math.min(9999, value)) : 0;
}
function optionalUrl(fd: FormData, key: string) {
  const value = text(fd, key, 500);
  if (!value) return null;
  const parsed = new URL(value);
  if (!["http:", "https:"].includes(parsed.protocol)) throw new Error(`${key} must use http or https.`);
  return parsed.toString();
}
function validateCore(fd: FormData) {
  const slug = text(fd, "slug", 120).toLowerCase();
  const category = text(fd, "category", 30);
  const status = text(fd, "status", 30);
  const enTitle = text(fd, "en_title", 160);
  const enShort = text(fd, "en_short", 500);
  if (!slugPattern.test(slug)) throw new Error("Slug may contain only lowercase letters, numbers and hyphens.");
  if (!categories.has(category)) throw new Error("Invalid category.");
  if (!statuses.has(status)) throw new Error("Invalid status.");
  if (!enTitle || !enShort) throw new Error("English title and short description are required.");
  return { slug, category, status, enTitle, enShort };
}
function translationRows(fd: FormData) {
  return (["en", "az", "ka"] as const).map((locale) => ({
    locale,
    title: text(fd, `${locale}_title`, 160),
    short_description: text(fd, `${locale}_short`, 500),
    overview: text(fd, `${locale}_overview`) || null,
    problem: text(fd, `${locale}_problem`) || null,
    solution: text(fd, `${locale}_solution`) || null,
    my_role: text(fd, `${locale}_role`) || null,
    key_features: text(fd, `${locale}_features`) || null,
    architecture: text(fd, `${locale}_architecture`) || null,
    challenges: text(fd, `${locale}_challenges`) || null,
  })).filter((row) => row.locale === "en" || (row.title && row.short_description));
}
function technologyNames(fd: FormData) {
  return [...new Set(text(fd, "technologies", 1200).split(",").map((x) => x.trim()).filter(Boolean))].slice(0, 30);
}
function techSlug(name: string) {
  return name.toLowerCase().replace(/\+/g, "-plus").replace(/#/g, "-sharp").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80) || "technology";
}
async function syncTechnologies(supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>, projectId: string, names: string[]) {
  const { error: clearError } = await supabase.from("project_technologies").delete().eq("project_id", projectId);
  if (clearError) throw clearError;
  if (!names.length) return;
  const ids: string[] = [];
  for (const name of names) {
    const slug = techSlug(name);
    let { data, error } = await supabase.from("technologies").upsert({ name, slug }, { onConflict: "slug" }).select("id").single();
    if (error || !data) {
      const fallback = await supabase.from("technologies").select("id").eq("name", name).maybeSingle();
      if (fallback.error || !fallback.data) throw error ?? fallback.error ?? new Error(`Could not save technology: ${name}`);
      data = fallback.data;
    }
    ids.push(data.id);
  }
  const { error } = await supabase.from("project_technologies").insert(ids.map((technology_id) => ({ project_id: projectId, technology_id })));
  if (error) throw error;
}
function refreshPublic() {
  ["/", "/projects", "/az", "/az/projects", "/ka", "/ka/projects", "/admin", "/admin/projects"].forEach((path) => revalidatePath(path));
}

export async function createProject(_previous: ProjectActionState, fd: FormData): Promise<ProjectActionState> {
  if (!hasSupabaseEnv()) return { error: "Supabase is not configured." };
  const auth = await requireRole();
  let createdId: string | null = null;
  try {
    const core = validateCore(fd);
    const supabase = await createSupabaseServerClient();
    const { data: project, error } = await supabase.from("projects").insert({
      slug: core.slug,
      category: core.category,
      status: core.status,
      featured: checked(fd, "featured"),
      published: checked(fd, "published"),
      display_order: number(fd, "display_order"),
      github_url: optionalUrl(fd, "github"),
      live_url: optionalUrl(fd, "live"),
      created_by: auth.user?.id,
    }).select("id").single();
    if (error || !project) throw error ?? new Error("Project creation failed.");
    createdId = project.id;
    const rows = translationRows(fd).map((row) => ({ ...row, project_id: project.id }));
    const translations = await supabase.from("project_translations").insert(rows);
    if (translations.error) throw translations.error;
    await syncTechnologies(supabase, project.id, technologyNames(fd));
  } catch (error) {
    if (createdId) {
      const supabase = await createSupabaseServerClient();
      await supabase.from("projects").delete().eq("id", createdId);
    }
    return { error: error instanceof Error ? error.message : "Could not create project." };
  }
  refreshPublic();
  redirect(`/admin/projects/${createdId}/edit?created=1`);
}

export async function updateProject(id: string, _previous: ProjectActionState, fd: FormData): Promise<ProjectActionState> {
  if (!hasSupabaseEnv()) return { error: "Supabase is not configured." };
  await requireRole();
  try {
    const core = validateCore(fd);
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.from("projects").update({
      slug: core.slug,
      category: core.category,
      status: core.status,
      featured: checked(fd, "featured"),
      published: checked(fd, "published"),
      display_order: number(fd, "display_order"),
      github_url: optionalUrl(fd, "github"),
      live_url: optionalUrl(fd, "live"),
      updated_at: new Date().toISOString(),
    }).eq("id", id);
    if (error) throw error;
    const rows = translationRows(fd).map((row) => ({ ...row, project_id: id, updated_at: new Date().toISOString() }));
    const translations = await supabase.from("project_translations").upsert(rows, { onConflict: "project_id,locale" });
    if (translations.error) throw translations.error;
    await syncTechnologies(supabase, id, technologyNames(fd));
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Could not save project." };
  }
  refreshPublic();
  redirect(`/admin/projects/${id}/edit?saved=1`);
}

export async function deleteProject(fd: FormData) {
  if (!hasSupabaseEnv()) redirect("/admin/projects?error=setup");
  await requireRole(["OWNER"]);
  const id = text(fd, "id", 80);
  const supabase = await createSupabaseServerClient();
  const { data: project } = await supabase.from("projects").select("cover_image_path,project_images(storage_path)").eq("id", id).single();
  const paths = [project?.cover_image_path, ...(project?.project_images?.map((image: { storage_path: string }) => image.storage_path) ?? [])].filter(Boolean) as string[];
  if (paths.length) await supabase.storage.from("portfolio-media").remove(paths);
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) redirect(`/admin/projects?error=${encodeURIComponent(error.message)}`);
  refreshPublic();
  redirect("/admin/projects?deleted=1");
}
