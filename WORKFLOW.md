# iBake — Developer & Agent Workflow

> **This document is for developers and AI coding agents.**
> If you're a non-technical co-founder just trying to run the app, see [README.md](./README.md) instead.

This document covers everything needed to clone the repo, run the project, understand the codebase, and continue building.

---

## 1. Clone and run

```bash
git clone <repo-url>
cd ibake/web-next
npm install
cp .env.example .env.local
# Fill in NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
npm run dev        # http://localhost:3000  (uses webpack)
npm run build      # production build check
```

The app works without Supabase — demo data renders from `data/seedData.ts`.

---

## 2. Environment variables

File: `web-next/.env.local` (never committed)

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `NEXT_PUBLIC_DEMO_MODE` | `true` = use seed data, `false` = live Supabase |
| `ANTHROPIC_API_KEY` | For AI recipe enhancement (server-side only) |

Template: `web-next/.env.example`

---

## 3. Project structure

```
web-next/
├── app/                        # Next.js App Router pages
│   ├── layout.tsx              # Root layout: sidebar nav + mobile bottom nav
│   ├── page.tsx                # Redirects / → /map
│   ├── map/page.tsx            # Leaflet map + list toggle + starter cards
│   ├── recipes/
│   │   ├── page.tsx            # Recipe list (featured + grid)
│   │   ├── submit/page.tsx     # Submit a recipe form
│   │   └── [id]/page.tsx       # Recipe detail: ingredients, steps, comments, likes
│   ├── messages/
│   │   ├── page.tsx            # Conversation list
│   │   └── [id]/page.tsx       # Chat view with send
│   ├── tools/page.tsx          # Calculators: hydration, ratio, ferment timer
│   └── profile/page.tsx        # User profile + stats
│
├── components/
│   ├── Nav.tsx                 # Sidebar (desktop) + bottom bar (mobile)
│   ├── PageHeader.tsx          # Reusable page header with ornament + right slot
│   ├── StarterCard.tsx         # Starter info card used on map and list
│   └── StarterMap.tsx          # React Leaflet map (dynamic import, no SSR)
│
├── data/
│   └── seedData.ts             # All demo content: starters, recipes, comments, messages
│
├── lib/
│   ├── supabase.ts             # Supabase client (browser)
│   ├── types.ts                # TypeScript interfaces for all domain objects
│   └── localStore.ts           # localStorage helpers: recipes, comments, likes, username
│
└── public/
    └── starter-map.html        # Standalone Leaflet map (linked from /map as "Interactive Map")
```

---

## 4. Data architecture

### Demo mode (default)

All screens check `localStorage` first, then fall back to `data/seedData.ts`. Nothing hits Supabase.

| Data | Source | Persistence |
|---|---|---|
| Starters on map | `DEMO_STARTERS` in seedData | Static |
| Recipes | `SAMPLE_RECIPES` + `getLocalRecipes()` | `localStorage` |
| Comments | `DEMO_COMMENTS` + `getLocalComments()` | `localStorage` |
| Likes | `getLikes()` | `localStorage` |
| Messages | `DEMO_MESSAGES` keyed by request id | Static (sent messages in-session only) |
| Username | `getUsername()` | `localStorage` |

### Live mode (`NEXT_PUBLIC_DEMO_MODE=false`)

Replace `localStorage` calls with Supabase queries. The schema is in `supabase/migration.sql`. Pattern used throughout: fetch from Supabase, fall back to seed data if result is empty.

---

## 5. Supabase setup (for live mode)

1. Create a project at [supabase.com](https://supabase.com)
2. Open the SQL editor and run `supabase/migration.sql`
3. Optionally run `supabase/seed.sql` for initial data
4. Create two storage buckets (public): `starter-photos`, `recipe-photos`
5. Add your URL and anon key to `.env.local`
6. Set `NEXT_PUBLIC_DEMO_MODE=false`

### Key tables

| Table | Purpose |
|---|---|
| `profiles` | Extends Supabase auth users. username, avatar, location. |
| `starters` | Sourdough cultures: owner, location, hydration, availability |
| `sharing_requests` | Request to receive a starter. Status: pending/accepted/declined |
| `messages` | Chat messages tied to a sharing request |
| `recipes` | Community recipes with optional AI-enhanced JSON |
| `recipe_comments` | Comments on recipes |
| `starter_lineage` | Tracks parent→child relationships between starters (family tree) |

RLS is enabled on all tables. Policies are defined in `migration.sql`.

---

## 6. Design system

All colors are defined in `tailwind.config.ts` and used as Tailwind classes throughout. Do not introduce arbitrary hex values in components — reference the palette below.

| Token | Hex | Usage |
|---|---|---|
| `bg` | `#F2E8D9` | Page background (parchment) |
| `bg-deep` | `#EAD9C4` | Deeper sections, placeholders |
| `surface` | `#FBF6EE` | Cards, sidebar, inputs |
| `primary` | `#7B3F2B` | Buttons, headings, active nav |
| `gold` | `#B8873A` | Accents, badges, dividers |
| `accent` | `#4A6741` | Success states, "yours" badges |
| `rose` | `#B87469` | Likes, hearts |
| `text` | `#2A1A0E` | Body text |
| `text-sec` | `#5C3D2E` | Secondary text |
| `text-muted` | `#9B7B6A` | Placeholders, captions |
| `border` | `#DDD0BE` | Card borders |

Typography: `font-serif` = Georgia. Used for titles, recipe text, brand name. `font-sans` = system UI for everything else.

---

## 7. Key conventions

- **All pages are client components** (`'use client'`) because they read from `localStorage` on mount via `useEffect`. If you add server-side data fetching, keep the page as a server component and push interactivity into child client components.
- **`use(params)`** is used for dynamic route params (Next.js 15+ pattern) instead of `useParams()`.
- **Dynamic import for map**: `StarterMap` is loaded with `dynamic(() => import(...), { ssr: false })` because Leaflet requires `window`. Never import it directly.
- **`localStore.ts`** is the single place for all localStorage reads/writes. Keep it that way — it makes swapping to Supabase straightforward.
- **`PageHeader`** takes a `right` slot for action buttons. Use it consistently across all pages.

---

## 8. How to add a new feature

**New page:**
1. Create `app/<route>/page.tsx`
2. Add it to `components/Nav.tsx` links array
3. Use `PageHeader` at the top

**New data type:**
1. Add interface to `lib/types.ts`
2. Add demo data to `data/seedData.ts`
3. Add `localStorage` helpers to `lib/localStore.ts` if persistence needed

**Connecting a feature to Supabase:**
1. Import `supabase` from `lib/supabase.ts`
2. Replace the `getLocal*()` call with a Supabase query
3. Gate behind `process.env.NEXT_PUBLIC_DEMO_MODE !== 'true'` if demo fallback needed

---

## 9. The standalone demo map

`public/starter-map.html` (also at the repo root as `demo-map.html`) is a self-contained HTML file using Leaflet.js and CartoDB tiles. It has no build step and no dependencies — open it directly in a browser or link to it.

It is linked from `/map` as "Interactive Map" and opens in a new tab. To update it, edit `public/starter-map.html` and copy the result to `demo-map.html` at the repo root.

The map uses:
- 18 hardcoded Oslo-area starters with custom emoji markers
- CartoDB Light tiles
- Sidebar with cards, filter chips, request buttons
- Toast notifications

---

## 10. Deployment

The app is a standard Next.js app. Deploy to Vercel in one command:

```bash
cd web-next
npx vercel --prod
```

Set environment variables in the Vercel dashboard (same keys as `.env.local`). The `public/starter-map.html` file is served as a static asset automatically.

For other platforms (Railway, Fly, self-hosted): `npm run build && npm start`.
