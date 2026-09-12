function clean(value: string | undefined) {
  const v = value?.trim();
  return v ? v : undefined;
}
function asUrl(value: string | undefined) {
  if (!value) return undefined;
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

const vercelHost = clean(process.env.VERCEL_PROJECT_PRODUCTION_URL) ?? clean(process.env.VERCEL_URL);

export const env = {
  siteUrl: clean(process.env.NEXT_PUBLIC_SITE_URL) ?? asUrl(vercelHost) ?? "http://localhost:3000",
  supabaseUrl: clean(process.env.NEXT_PUBLIC_SUPABASE_URL),
  supabasePublishableKey: clean(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY),
  serviceRoleKey: clean(process.env.SUPABASE_SERVICE_ROLE_KEY),
};

export function hasSupabaseEnv() {
  return Boolean(env.supabaseUrl && env.supabasePublishableKey);
}
