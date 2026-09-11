import "server-only";
import { createClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";
export function createSupabaseAdminClient(){ if(!env.supabaseUrl||!env.serviceRoleKey) throw new Error("Supabase admin environment variables are not configured."); return createClient(env.supabaseUrl,env.serviceRoleKey,{auth:{autoRefreshToken:false,persistSession:false}}); }
