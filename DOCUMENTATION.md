# Editors Room — Technical Documentation

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Project Structure](#3-project-structure)
4. [Getting Started](#4-getting-started)
5. [Environment Variables](#5-environment-variables)
6. [Architecture](#6-architecture)
7. [Frontend](#7-frontend)
8. [Admin Dashboard](#8-admin-dashboard)
9. [Authentication](#9-authentication)
10. [Database Schema](#10-database-schema)
11. [Storage](#11-storage)
12. [API Reference](#12-api-reference)
13. [Routing](#13-routing)
14. [Theming](#14-theming)
15. [Deployment](#15-deployment)

---

## 1. Project Overview

Editors Room is a full-stack agency web application for a premium IT services company. It serves two audiences:

- **Public visitors** — a marketing site showcasing services, projects, team, testimonials, and a booking system for discovery calls.
- **Admins** — a protected dashboard for managing all site content, bookings, contacts, and users via a full CRUD interface.

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 6 |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui + Radix UI primitives |
| Animations | Motion (Framer Motion v12) |
| Routing | React Router DOM v7 |
| Backend/Auth | Supabase (PostgreSQL + Auth + Storage) |
| Server | Express.js (via `server.ts`) |
| Charts | Recharts |
| Forms | React Hook Form + Zod |
| AI | Google Gemini (`@google/genai`) |
| Icons | Lucide React |

---

## 3. Project Structure

```
/
├── src/
│   ├── assets/images/          # Static assets (logo, etc.)
│   ├── components/
│   │   ├── admin/              # Admin layout shell
│   │   ├── animations/         # Reusable animation components
│   │   ├── layout/             # Public-facing page sections
│   │   └── ui/                 # Custom UI components
│   ├── context/
│   │   └── ThemeContext.tsx    # Dark/light theme provider
│   ├── lib/
│   │   ├── supabase.ts         # Supabase client initialization
│   │   ├── storage.ts          # Supabase Storage helpers
│   │   └── utils.ts            # Shared utility functions
│   ├── pages/
│   │   ├── admin/              # All admin panel pages
│   │   ├── LoginPage.tsx       # Admin authentication page
│   │   └── ProjectsPage.tsx    # Public projects listing page
│   ├── services/
│   │   └── projectService.ts   # Data access layer for projects
│   ├── types.ts                # Global TypeScript interfaces
│   ├── App.tsx                 # Root component + route definitions
│   ├── main.tsx                # Application entry point
│   └── index.css               # Global styles
├── components/ui/              # shadcn/ui generated components
├── lib/utils.ts                # shadcn/ui utility (cn helper)
├── server.ts                   # Express dev/prod server
├── supabase-schema.sql         # Full database schema + RLS policies
├── vite.config.ts
├── tsconfig.json
├── .env.example
└── package.json
```

---

## 4. Getting Started

### Prerequisites

- Node.js 18+
- A Supabase project
- A Google Gemini API key

### Installation

```bash
npm install
```

### Database Setup

1. Open your Supabase project's SQL editor.
2. Copy the contents of `supabase-schema.sql` and run it. This creates all tables, RLS policies, indexes, and storage buckets.

### Running Locally

```bash
npm run dev
```

The app runs on `http://localhost:3000` via the Express + Vite middleware server.

### Building for Production

```bash
npm run build
```

The compiled output is placed in `dist/`. The Express server in `server.ts` serves it statically in production mode.

---

## 5. Environment Variables

Copy `.env.example` to `.env.local` and fill in the values.

| Variable | Required | Description |
|---|---|---|
| `GEMINI_API_KEY` | Yes | Google Gemini API key for AI features |
| `VITE_SUPABASE_URL` | Yes | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Yes | Your Supabase anonymous (public) key |
| `APP_URL` | Optional | Deployed app URL for self-referential links |

> `VITE_` prefixed variables are exposed to the browser bundle by Vite. Never put secret/service-role keys in `VITE_` variables.

---

## 6. Architecture

```
Browser
  └── React SPA (Vite)
        ├── Public Routes  →  Supabase (read-only via anon key + RLS)
        └── Admin Routes   →  Supabase (read/write via authenticated session)

Express Server (server.ts)
  ├── /api/*          →  REST endpoints (slots, trusted companies)
  └── Vite Middleware  →  Dev HMR / Static files in production
```

The application is a Single Page Application (SPA). All data fetching happens client-side directly against the Supabase REST API. The Express server handles a small number of custom API routes and serves the Vite dev server in development or the static build in production.

---

## 7. Frontend

### Public Sections

The homepage (`/`) is composed of the following section components rendered in order:

| Component | Description |
|---|---|
| `Hero` | Full-screen landing section with headline and CTA |
| `Services` | Grid of offered IT services |
| `About` | Company stats and description |
| `Projects` | Featured project showcase |
| `Team` | Team member cards |
| `Testimonials` | Client testimonials carousel |
| `Process` | Step-by-step engagement process |
| `CTA` | Call-to-action with booking prompt |
| `Contact` | Contact form (submits to `contact_submissions` table) |

### Animation Components (`src/components/animations/`)

| Component | Purpose |
|---|---|
| `BlurText` | Animates text in with a blur-to-clear effect |
| `SplitText` | Splits text into characters/words for staggered animation |
| `ScrollReveal` | Wraps children in a scroll-triggered reveal animation |
| `CountUp` | Animates a number counting up from 0 to a target value |

### Custom UI Components (`src/components/ui/`)

| Component | Purpose |
|---|---|
| `CustomCursor` | Replaces the default cursor with a branded animated cursor |
| `BookCallModal` | Modal dialog for booking a discovery call |
| `ProjectCard` | Card component for displaying a single project |
| `GradientCard` | Reusable card with gradient border/background effect |
| `Marquee` | Horizontally scrolling ticker for logos or text |

---

## 8. Admin Dashboard

The admin panel is accessible at `/admin` and is protected by Supabase Auth. All admin routes are nested under the `AdminLayout` component.

### Admin Pages

| Route | Page | Description |
|---|---|---|
| `/admin` | Dashboard | Overview with stats, charts, recent bookings, and system alerts |
| `/admin/users` | UsersManagement | View and manage registered user accounts |
| `/admin/about` | AboutManagement | Edit the About section content and stats |
| `/admin/services` | ServicesManagement | Create, edit, reorder, and delete services |
| `/admin/projects` | ProjectsManagement | Manage portfolio projects with image uploads |
| `/admin/team` | TeamManagement | Manage team member profiles and social links |
| `/admin/testimonials` | TestimonialsManagement | Approve, edit, and delete client testimonials |
| `/admin/bookings` | BookingsManagement | View and update booking statuses |
| `/admin/contacts` | ContactsManagement | Read contact form submissions |
| `/admin/settings` | Settings | Application and account settings |

### Dashboard Metrics

The Dashboard page fetches live counts from Supabase for:
- Total projects
- Total services
- Total registered users (from `profiles` table)
- Total bookings

It also displays static chart data (revenue/growth area chart, service usage pie chart) and a recent bookings table.

---

## 9. Authentication

Authentication is handled entirely by Supabase Auth.

### Flow

1. Admin navigates to `/login`.
2. Submits email and password via `supabase.auth.signInWithPassword()`.
3. On success, the app queries the `profiles` table to check the user's `role`.
4. If `role === 'admin'`, the user is redirected to `/admin`. Otherwise, they are redirected to `/`.

### Role Check

```ts
const { data: profile } = await supabase
  .from('profiles')
  .select('role')
  .eq('id', data.user.id)
  .single();
```

> Ensure your `profiles` table has a `role` column and that a trigger or manual insert sets `role = 'admin'` for admin users.

### RLS Enforcement

All write operations on protected tables require `auth.role() = 'authenticated'`. Unauthenticated users can only read public data or insert into public-facing tables (contact submissions, bookings, newsletter).

---

## 10. Database Schema

All tables use UUID primary keys generated by `uuid_generate_v4()`. Row Level Security (RLS) is enabled on every table.

### Tables

#### `projects`
| Column | Type | Notes |
|---|---|---|
| `id` | UUID | Primary key |
| `display_id` | TEXT | Human-readable ID (e.g., "01") |
| `title` | TEXT | Required |
| `category` | TEXT | Required |
| `image_url` | TEXT | Required |
| `year` | TEXT | |
| `description` | TEXT | |
| `tags` | TEXT[] | Array of tag strings |
| `github_url` | TEXT | |
| `live_url` | TEXT | |
| `is_featured` | BOOLEAN | Default: false |
| `sort_order` | INTEGER | Default: 0 |
| `created_at` | TIMESTAMPTZ | Auto-set |

#### `team_members`
| Column | Type | Notes |
|---|---|---|
| `id` | UUID | Primary key |
| `name` | TEXT | Required |
| `role` | TEXT | Required |
| `bio` | TEXT | |
| `image_url` | TEXT | Required |
| `linkedin_url` | TEXT | |
| `twitter_url` | TEXT | |
| `github_url` | TEXT | |
| `sort_order` | INTEGER | Default: 0 |

#### `testimonials`
| Column | Type | Notes |
|---|---|---|
| `id` | UUID | Primary key |
| `name` | TEXT | Required |
| `role` | TEXT | Required |
| `company` | TEXT | |
| `content` | TEXT | Required |
| `avatar_url` | TEXT | Required |
| `rating` | INTEGER | 1–5, default: 5 |
| `sort_order` | INTEGER | Default: 0 |

#### `services`
| Column | Type | Notes |
|---|---|---|
| `id` | UUID | Primary key |
| `title` | TEXT | Required |
| `description` | TEXT | Required |
| `icon_name` | TEXT | Lucide icon name, default: "Target" |
| `color_class` | TEXT | Tailwind color class |
| `sort_order` | INTEGER | Default: 0 |

#### `bookings`
| Column | Type | Notes |
|---|---|---|
| `id` | UUID | Primary key |
| `name` | TEXT | Required |
| `email` | TEXT | Required |
| `phone` | TEXT | Required |
| `company` | TEXT | Required |
| `message` | TEXT | |
| `booking_date` | DATE | Required |
| `slot_id` | UUID | FK → `time_slots.id` |
| `status` | ENUM | `pending` / `confirmed` / `cancelled` |
| `created_at` | TIMESTAMPTZ | Auto-set |

> A `UNIQUE(booking_date, slot_id)` constraint prevents double-booking.

#### `time_slots`
| Column | Type | Notes |
|---|---|---|
| `id` | UUID | Primary key |
| `slot_time` | TIME | Unique |
| `is_active` | BOOLEAN | Admins deactivate instead of deleting |

#### `contact_submissions`
| Column | Type | Notes |
|---|---|---|
| `id` | UUID | Primary key |
| `name` | TEXT | Required |
| `email` | TEXT | Required |
| `service` | TEXT | |
| `message` | TEXT | Required |
| `is_read` | BOOLEAN | Default: false |

#### `about`
| Column | Type | Notes |
|---|---|---|
| `id` | UUID | Primary key |
| `title` | TEXT | Required |
| `description` | TEXT | Required |
| `image_url` | TEXT | Required |
| `projects_completed` | INTEGER | |
| `happy_clients` | INTEGER | |
| `countries_served` | INTEGER | |

#### Other Tables
- `stats` — Configurable stat counters displayed on the site.
- `newsletter_subscriptions` — Email newsletter signups.
- `trusted_companies` — Logos displayed in the marquee/trust bar.

### RLS Policy Summary

| Table | Public | Authenticated Admin |
|---|---|---|
| projects | SELECT | ALL |
| team_members | SELECT | ALL |
| testimonials | SELECT | ALL |
| services | SELECT | ALL |
| about | SELECT | ALL |
| stats | SELECT | ALL |
| time_slots | SELECT (active only) | ALL |
| bookings | INSERT | ALL |
| contact_submissions | INSERT | SELECT |
| newsletter_subscriptions | INSERT | SELECT |
| trusted_companies | SELECT | ALL |

---

## 11. Storage

Supabase Storage is used for all user-uploaded images. The following public buckets are created by the schema:

| Bucket | Used For |
|---|---|
| `projects` | Project cover images |
| `team` | Team member profile photos |
| `testimonials` | Client avatar images |
| `blog` | Blog/article images (future use) |
| `uploads` | General purpose uploads |

### Storage Helpers (`src/lib/storage.ts`)

**`uploadFile(bucket, filePath, file)`**
Uploads a file to the specified bucket with `upsert: true` and returns the public URL.

**`generateUniqueFilePath(fileName, folder?)`**
Generates a collision-safe file path using a timestamp and random string suffix.

**`deleteFile(bucket, filePath)`**
Removes a file from the specified bucket.

**`extractFilePathFromUrl(url, bucket)`**
Parses a Supabase public URL and returns the relative file path within the bucket. Useful before calling `deleteFile`.

**`getOptimizedImageUrl(url, options?)`**
Returns an optimized image URL. Supports `picsum.photos` URLs natively. Supabase image transformation is disabled by default (requires a Pro/Enterprise plan) — set `ENABLE_SUPABASE_OPTIMIZATION = true` in `storage.ts` to enable it.

---

## 12. API Reference

The Express server (`server.ts`) exposes the following endpoints:

### `GET /api/slots`

Returns available time slots for a given date.

**Query Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `date` | string | Yes | The date to check availability for |

**Response**

```json
[
  { "time": "09:00 AM", "available": true },
  { "time": "10:00 AM", "available": false }
]
```

Availability is currently seeded deterministically from the date string. Replace with a real database query against the `bookings` table for production use.

---

### `POST /api/trusted-companies`

Submits a new trusted company entry.

**Request Body**

```json
{
  "name": "Company Name",
  "logo_url": "https://example.com/logo.png"
}
```

**Response**

```json
{ "success": true, "message": "Company submitted successfully (Server received)" }
```

> This endpoint currently logs the submission server-side but does not persist to the database. To enable persistence, add a Supabase service role key and uncomment the insert logic in `server.ts`.

---

## 13. Routing

All routes are defined in `App.tsx` using React Router DOM v7.

```
/                   →  HomePage (Hero, Services, About, Projects, Team, Testimonials, Process, CTA, Contact)
/projects           →  ProjectsPage (full project listing)
/login              →  LoginPage (admin authentication)
/admin              →  Dashboard
/admin/users        →  UsersManagement
/admin/about        →  AboutManagement
/admin/services     →  ServicesManagement
/admin/projects     →  ProjectsManagement
/admin/team         →  TeamManagement
/admin/testimonials →  TestimonialsManagement
/admin/bookings     →  BookingsManagement
/admin/contacts     →  ContactsManagement
/admin/settings     →  Settings
```

### Layout Wrappers

- `MainLayout` — Wraps all public routes. Renders `Navbar`, `CustomCursor`, ambient background blobs, a noise texture overlay, and `Footer`.
- `AdminLayout` — Wraps all `/admin/*` routes. Renders the admin sidebar navigation and the page content area.

---

## 14. Theming

Theme management is handled by `ThemeContext.tsx`.

### Usage

```tsx
import { useTheme } from '@/src/context/ThemeContext';

const { theme, setTheme } = useTheme();

setTheme('dark');   // 'light' | 'dark' | 'system'
```

The selected theme is persisted to `localStorage` under the key `editors-room-theme`. On load, the provider reads this value and applies the corresponding class (`light` or `dark`) to the `<html>` element, enabling Tailwind's dark mode variant.

When set to `system`, the provider respects the user's OS-level `prefers-color-scheme` media query.

---

## 15. Deployment

### Environment

The app is designed to run on any Node.js hosting platform (e.g., Railway, Render, Fly.io, AWS App Runner, Google Cloud Run).

### Production Server

`server.ts` handles both development (Vite middleware + HMR) and production (static file serving from `dist/`):

```ts
if (process.env.NODE_ENV !== 'production') {
  // Vite dev middleware
} else {
  app.use(express.static('dist'));
  app.get('*', (req, res) => res.sendFile('dist/index.html'));
}
```

### Steps

1. Set all required environment variables on your hosting platform.
2. Run `npm run build` to generate the `dist/` folder.
3. Start the server with `node --loader tsx server.ts` or configure your platform to run `npm run dev` (which uses `tsx server.ts`).
4. The server listens on `0.0.0.0:3000`.

### Supabase Checklist

- [ ] Run `supabase-schema.sql` in the SQL editor
- [ ] Confirm RLS is enabled on all tables
- [ ] Create storage buckets (`projects`, `team`, `testimonials`, `uploads`)
- [ ] Create an admin user via Supabase Auth and set `role = 'admin'` in the `profiles` table
- [ ] Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to your environment
