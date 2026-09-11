# Alakhiarov Salekh Portfolio

A premium, multilingual developer portfolio foundation built for performance, SEO, secure content management, and long-term maintainability.

## Included in this starter

- Next.js 16.3.3 + React + TypeScript strict mode
- Dark-first responsive public portfolio
- English at `/`, Azerbaijani at `/az`, Georgian at `/ka`
- Locale-aware project pages and a language switcher that preserves the current route
- Featured projects + detailed case-study pages
- Private `/admin` area with Owner/Editor authorization architecture
- Supabase Auth/PostgreSQL/Storage integration points
- Database migration with Row Level Security
- No public admin registration
- Sitemap, robots rules, security headers, AVIF/WebP image configuration
- Mobile/tablet/desktop responsive layout
- Demo fallback content so the public site can be previewed before Supabase is connected

## Site identity

The public contact details are configured in `src/content/site.ts`. Email, LinkedIn and GitHub are already set. Resume URL, final production domain, and any still-unconfirmed personal content should be added before deployment.

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

The portfolio can run in preview mode without Supabase keys. Admin writes are intentionally disabled until the backend is configured.

## Supabase setup

1. Create a Supabase project.
2. Run `supabase/migrations/0001_initial_schema.sql` in the SQL editor or migration workflow.
3. Create a Storage bucket named `portfolio-media`.
4. Add the project URL and public/anon key to `.env.local`.
5. Keep `SUPABASE_SERVICE_ROLE_KEY` server-only; never prefix it with `NEXT_PUBLIC_`.
6. Create the first Auth user manually in the Supabase dashboard.
7. Insert that user's UUID into `public.profiles` with `role = 'OWNER'` once. There is deliberately no public Owner registration flow.
8. After the first Owner exists, Editor accounts should be invited through a server-only Owner workflow.

## Access model

- **Visitor:** read only, published projects only.
- **EDITOR:** create/update project content, translations, technologies, and media.
- **OWNER:** all Editor capabilities plus delete projects, manage staff profiles, and manage protected settings.

RLS is the final authorization boundary; UI hiding alone is never treated as security.

## Routing

```text
/                     English home
/projects             English projects
/projects/[slug]      English case study
/az                   Azerbaijani home
/az/projects          Azerbaijani projects
/ka                   Georgian home
/ka/projects          Georgian projects
/admin                private dashboard
/admin/login          private login
/admin/projects       content management
/admin/users          Owner-only access management
```

## Admin subdomain

The app works with `/admin` immediately. In production, `admin.yourdomain.com` can be routed to the same deployment and rewritten to `/admin`, or split into a dedicated deployment later. A second paid domain is not required.

## Cloudflare

For a future full-stack Next.js deployment on Cloudflare Workers, evaluate the current Cloudflare-recommended Next.js path at deployment time. Keep deployment concerns separate from application code so the portfolio is not locked to one host.

## Before production

- Connect Supabase and replace preview/demo project data with database content.
- Implement validated project create/edit/delete Server Actions after the real project is connected.
- Add secure Owner-only Editor invitation/disable actions using the server-only Admin client.
- Configure Storage RLS policies and file/MIME/size validation.
- Add real project screenshots and optimized image rendering.
- Add final localized metadata, canonical/hreflang tags, and JSON-LD.
- Add the final Resume URL/file and production domain when they are available.
- Run `npm run typecheck`, `npm run lint`, `npm run test`, and `npm run build` in a network-enabled environment.

## Design direction

The UI intentionally avoids beginner-portfolio conventions such as skill percentages, noisy neon effects, huge icon walls, and fake loading screens. The visual system uses restrained navy/indigo surfaces, strong typography, generous whitespace, subtle depth, and product-oriented project presentation.

## Connected Supabase project
This package is already configured for the connected Supabase project using its public project URL and publishable key in `.env.local`. The publishable key is safe for client use and is protected by RLS. No service-role/secret key is included.

### First OWNER account
1. In Supabase Dashboard -> Authentication -> Users, create the first user with your admin email and a password you choose.
2. After the user exists, promote that user to `OWNER` in `public.profiles` using a trusted server/admin workflow. Do not create a public sign-up page.
