-- Salekh Portfolio: secure initial schema + RLS + media bucket
create extension if not exists pgcrypto;

create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to anon, authenticated;

do $$ begin
  create type public.app_role as enum ('OWNER','EDITOR');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.project_status as enum ('active','completed','in-progress','archived');
exception when duplicate_object then null; end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  role public.app_role not null default 'EDITOR',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  category text not null check (category in ('web','mobile','desktop','full-stack','backend','other')),
  status public.project_status not null default 'in-progress',
  featured boolean not null default false,
  published boolean not null default false,
  display_order integer not null default 0,
  github_url text,
  live_url text,
  cover_image_path text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.project_translations (
  project_id uuid not null references public.projects(id) on delete cascade,
  locale text not null check (locale in ('en','az','ka')),
  title text not null check (char_length(title) between 1 and 160),
  short_description text not null check (char_length(short_description) between 1 and 500),
  overview text,
  problem text,
  solution text,
  my_role text,
  key_features text,
  architecture text,
  challenges text,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (project_id, locale)
);

create table if not exists public.project_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  storage_path text not null,
  alt_text_en text,
  alt_text_az text,
  alt_text_ka text,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.technologies (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

create table if not exists public.project_technologies (
  project_id uuid not null references public.projects(id) on delete cascade,
  technology_id uuid not null references public.technologies(id) on delete cascade,
  primary key (project_id, technology_id)
);

create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

create index if not exists projects_public_order_idx on public.projects (published, featured, display_order);
create index if not exists project_translations_locale_idx on public.project_translations (locale);
create index if not exists project_images_project_idx on public.project_images (project_id, display_order);
create index if not exists projects_created_by_idx on public.projects (created_by);

create or replace function private.current_user_role()
returns public.app_role
language sql
stable
security definer
set search_path = ''
as $$
  select p.role from public.profiles p
  where p.id = (select auth.uid()) and p.is_active = true
$$;
revoke all on function private.current_user_role() from public;
grant execute on function private.current_user_role() to anon, authenticated;

alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.project_translations enable row level security;
alter table public.project_images enable row level security;
alter table public.technologies enable row level security;
alter table public.project_technologies enable row level security;
alter table public.site_settings enable row level security;

revoke all on public.profiles, public.projects, public.project_translations, public.project_images, public.technologies, public.project_technologies, public.site_settings from anon, authenticated;
grant select on public.projects, public.project_translations, public.project_images, public.technologies, public.project_technologies to anon;
grant select on public.profiles, public.projects, public.project_translations, public.project_images, public.technologies, public.project_technologies, public.site_settings to authenticated;
grant insert, update, delete on public.profiles, public.projects, public.project_translations, public.project_images, public.technologies, public.project_technologies, public.site_settings to authenticated;

create policy "public read published projects" on public.projects for select to anon, authenticated
using (published = true or (select private.current_user_role()) in ('OWNER','EDITOR'));
create policy "public read translations for published projects" on public.project_translations for select to anon, authenticated
using (exists (select 1 from public.projects p where p.id = project_id and (p.published = true or (select private.current_user_role()) in ('OWNER','EDITOR'))));
create policy "public read images for published projects" on public.project_images for select to anon, authenticated
using (exists (select 1 from public.projects p where p.id = project_id and (p.published = true or (select private.current_user_role()) in ('OWNER','EDITOR'))));
create policy "public read technologies" on public.technologies for select to anon, authenticated using (true);
create policy "public read project technologies" on public.project_technologies for select to anon, authenticated
using (exists (select 1 from public.projects p where p.id = project_id and (p.published = true or (select private.current_user_role()) in ('OWNER','EDITOR'))));

create policy "staff insert projects" on public.projects for insert to authenticated
with check ((select private.current_user_role()) in ('OWNER','EDITOR'));
create policy "staff update projects" on public.projects for update to authenticated
using ((select private.current_user_role()) in ('OWNER','EDITOR')) with check ((select private.current_user_role()) in ('OWNER','EDITOR'));
create policy "owner delete projects" on public.projects for delete to authenticated
using ((select private.current_user_role()) = 'OWNER');
create policy "staff manage translations" on public.project_translations for all to authenticated
using ((select private.current_user_role()) in ('OWNER','EDITOR')) with check ((select private.current_user_role()) in ('OWNER','EDITOR'));
create policy "staff manage images" on public.project_images for all to authenticated
using ((select private.current_user_role()) in ('OWNER','EDITOR')) with check ((select private.current_user_role()) in ('OWNER','EDITOR'));
create policy "staff manage technologies" on public.technologies for all to authenticated
using ((select private.current_user_role()) in ('OWNER','EDITOR')) with check ((select private.current_user_role()) in ('OWNER','EDITOR'));
create policy "staff manage project technologies" on public.project_technologies for all to authenticated
using ((select private.current_user_role()) in ('OWNER','EDITOR')) with check ((select private.current_user_role()) in ('OWNER','EDITOR'));

create policy "user read own profile" on public.profiles for select to authenticated
using (id = (select auth.uid()) or (select private.current_user_role()) = 'OWNER');
create policy "owner insert profiles" on public.profiles for insert to authenticated
with check ((select private.current_user_role()) = 'OWNER');
create policy "owner update profiles" on public.profiles for update to authenticated
using ((select private.current_user_role()) = 'OWNER') with check ((select private.current_user_role()) = 'OWNER');
create policy "owner delete profiles" on public.profiles for delete to authenticated
using ((select private.current_user_role()) = 'OWNER');
create policy "owner read settings" on public.site_settings for select to authenticated
using ((select private.current_user_role()) = 'OWNER');
create policy "owner manage settings" on public.site_settings for all to authenticated
using ((select private.current_user_role()) = 'OWNER') with check ((select private.current_user_role()) = 'OWNER');

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('portfolio-media', 'portfolio-media', true, 8388608, array['image/jpeg','image/png','image/webp','image/avif'])
on conflict (id) do update set public=excluded.public, file_size_limit=excluded.file_size_limit, allowed_mime_types=excluded.allowed_mime_types;

create policy "portfolio staff list media" on storage.objects for select to authenticated
using (bucket_id = 'portfolio-media' and (select private.current_user_role()) in ('OWNER','EDITOR'));
create policy "portfolio staff upload media" on storage.objects for insert to authenticated
with check (bucket_id = 'portfolio-media' and (select private.current_user_role()) in ('OWNER','EDITOR'));
create policy "portfolio staff update media" on storage.objects for update to authenticated
using (bucket_id = 'portfolio-media' and (select private.current_user_role()) in ('OWNER','EDITOR'))
with check (bucket_id = 'portfolio-media' and (select private.current_user_role()) in ('OWNER','EDITOR'));
create policy "portfolio staff delete media" on storage.objects for delete to authenticated
using (bucket_id = 'portfolio-media' and (select private.current_user_role()) in ('OWNER','EDITOR'));
