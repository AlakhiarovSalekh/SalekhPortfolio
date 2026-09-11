"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/env";
import { requireRole } from "@/lib/auth/require-role";

const slugPattern=/^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const categories=new Set(["web","mobile","desktop","full-stack","backend","other"]);
const statuses=new Set(["active","completed","in-progress","archived"]);
function text(fd:FormData,key:string,max=20000){return String(fd.get(key)??"").trim().slice(0,max);}
function checked(fd:FormData,key:string){return fd.get(key)==="on";}
function validateCore(fd:FormData){const slug=text(fd,"slug",120);const category=text(fd,"category",30);const status=text(fd,"status",30);if(!slugPattern.test(slug))throw new Error("Invalid slug");if(!categories.has(category))throw new Error("Invalid category");if(!statuses.has(status))throw new Error("Invalid status");const enTitle=text(fd,"en_title",160),enShort=text(fd,"en_short",500);if(!enTitle||!enShort)throw new Error("English title and short description are required");return {slug,category,status,enTitle,enShort};}
function translations(fd:FormData){return (["en","az","ka"] as const).map(locale=>({locale,title:text(fd,`${locale}_title`,160),short_description:text(fd,`${locale}_short`,500),overview:text(fd,`${locale}_overview`),problem:text(fd,`${locale}_problem`),solution:text(fd,`${locale}_solution`),my_role:text(fd,`${locale}_role`),key_features:text(fd,`${locale}_features`),architecture:text(fd,`${locale}_architecture`),challenges:text(fd,`${locale}_challenges`)})).filter(t=>t.locale==="en"||(t.title&&t.short_description));}

export async function createProject(fd:FormData){
  if(!hasSupabaseEnv())throw new Error("Supabase is not configured");
  const auth=await requireRole(); const core=validateCore(fd); const supabase=await createSupabaseServerClient();
  const {data:project,error}=await supabase.from("projects").insert({slug:core.slug,category:core.category,status:core.status,featured:checked(fd,"featured"),published:checked(fd,"published"),github_url:text(fd,"github",500)||null,live_url:text(fd,"live",500)||null,created_by:auth.user?.id}).select("id").single();
  if(error||!project)throw new Error(error?.message??"Project creation failed");
  const rows=translations(fd).map(t=>({...t,project_id:project.id}));
  const {error:translationError}=await supabase.from("project_translations").insert(rows);
  if(translationError){await supabase.from("projects").delete().eq("id",project.id);throw new Error(translationError.message);}
  revalidatePath("/");revalidatePath("/projects");revalidatePath("/az");revalidatePath("/ka");redirect("/admin/projects");
}

export async function updateProject(id:string,fd:FormData){
  if(!hasSupabaseEnv())throw new Error("Supabase is not configured");
  await requireRole(); const core=validateCore(fd); const supabase=await createSupabaseServerClient();
  const {error}=await supabase.from("projects").update({slug:core.slug,category:core.category,status:core.status,featured:checked(fd,"featured"),published:checked(fd,"published"),github_url:text(fd,"github",500)||null,live_url:text(fd,"live",500)||null,updated_at:new Date().toISOString()}).eq("id",id);
  if(error)throw new Error(error.message);
  const rows=translations(fd).map(t=>({...t,project_id:id,updated_at:new Date().toISOString()}));
  const {error:translationError}=await supabase.from("project_translations").upsert(rows,{onConflict:"project_id,locale"});
  if(translationError)throw new Error(translationError.message);
  revalidatePath("/");revalidatePath("/projects");revalidatePath("/az");revalidatePath("/ka");redirect("/admin/projects");
}

export async function deleteProject(fd:FormData){
  if(!hasSupabaseEnv())throw new Error("Supabase is not configured");
  await requireRole(["OWNER"]);const id=text(fd,"id",80);const supabase=await createSupabaseServerClient();const {error}=await supabase.from("projects").delete().eq("id",id);if(error)throw new Error(error.message);revalidatePath("/");revalidatePath("/projects");redirect("/admin/projects");
}
