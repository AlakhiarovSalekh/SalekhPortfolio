import { redirect } from "next/navigation";
import { hasSupabaseEnv } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
export type AppRole="OWNER"|"EDITOR";
export async function requireRole(allowed:AppRole[]=["OWNER","EDITOR"]){
  if(!hasSupabaseEnv()) return {configured:false as const,user:null,role:null};
  const supabase=await createSupabaseServerClient();
  const {data:{user}}=await supabase.auth.getUser();
  if(!user) redirect("/admin/login");
  const {data:profile}=await supabase.from("profiles").select("role,is_active").eq("id",user.id).single();
  if(!profile?.is_active||!allowed.includes(profile.role as AppRole)) redirect("/admin/login?error=unauthorized");
  return {configured:true as const,user,role:profile.role as AppRole};
}
