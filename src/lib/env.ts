export const env={
  siteUrl:process.env.NEXT_PUBLIC_SITE_URL??"http://localhost:3000",
  supabaseUrl:process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabasePublishableKey:process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  serviceRoleKey:process.env.SUPABASE_SERVICE_ROLE_KEY,
};
export function hasSupabaseEnv(){ return Boolean(env.supabaseUrl&&env.supabasePublishableKey); }
