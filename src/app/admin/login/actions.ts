"use server";
import { redirect } from "next/navigation";
import { hasSupabaseEnv } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
export async function login(formData:FormData){if(!hasSupabaseEnv())redirect("/admin/login?error=setup");const email=String(formData.get("email")??"").trim();const password=String(formData.get("password")??"");const supabase=await createSupabaseServerClient();const {error}=await supabase.auth.signInWithPassword({email,password});if(error)redirect("/admin/login?error=invalid");redirect("/admin");}
export async function logout(){if(hasSupabaseEnv()){const supabase=await createSupabaseServerClient();await supabase.auth.signOut();}redirect("/admin/login");}
