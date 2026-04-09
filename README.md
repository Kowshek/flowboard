# FlowBoard — SaaS Analytics Dashboard

A modern, full-stack SaaS analytics dashboard built with Next.js. Track revenue, manage customers, and monitor business health — with dark/light theme support and real-time filtering.

## Screenshots

> [Add screenshots]

---

## Features

- **Authentication** — Sign up / sign in with credentials or Google OAuth (NextAuth v5)
- **Dashboard analytics** — MRR, active users, churn rate, total revenue stat cards + Revenue Growth area chart + User Growth bar chart + Recent Activity feed
- **Customer management** — Search, filter by status, sort by any column, paginate (10/page), and an Add Customer flow
- **Settings** — Editable profile, notification preference toggles, danger zone with delete confirmation
- **Dark / Light theme** — Persistent theme toggle; no flash on load
- **Responsive** — Mobile-friendly sidebar, stacking grids on small screens

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router, Server Components) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Auth | NextAuth v5 (Credentials + Google OAuth) |
| ORM | Prisma 7 |
| Database | Supabase PostgreSQL |
| Charts | Recharts |
| Animations | Framer Motion |
| Icons | Lucide React |

---

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/your-username/flowboard.git
cd flowboard
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Fill in the values:

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string (e.g. from Supabase) |
| `NEXTAUTH_SECRET` | Random 32+ character secret (`openssl rand -base64 32`) |
| `NEXTAUTH_URL` | Base URL — `http://localhost:3000` in development |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID (optional) |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret (optional) |

### 3. Set up the database

```bash
npx prisma db push
```

### 4. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the landing page loads first. Sign up at `/signup` to access the dashboard.

---

## Project Structure

```
app/
  (auth)/          # Login and signup pages
  (dashboard)/     # Protected dashboard layout + pages
    dashboard/     # Overview: stat cards, charts, activity feed
    customers/     # Customer table with search/filter/sort/pagination
    settings/      # Profile, preferences, security, billing
  api/             # NextAuth + registration API routes
  page.tsx         # Landing page
components/
  dashboard/       # Sidebar, TopBar, charts, DataTable, SettingsClient
  auth/            # LoginForm, SignupForm
  sections/        # Landing page sections
  ui/              # Button, Input, Badge, Card primitives
lib/
  auth.ts          # NextAuth configuration
  prisma.ts        # Prisma client singleton
  seed-data.ts     # Fake customer + monthly metrics data
```

---

## Deployment

### Vercel + Supabase (recommended)

1. Push the repo to GitHub
2. Import the project on [Vercel](https://vercel.com)
3. Add all environment variables in Vercel project settings
4. Deploy — Vercel auto-detects Next.js

```bash
# Or deploy via CLI
npx vercel --prod
```

> Make sure `NEXTAUTH_URL` is set to your production domain in Vercel's environment variables.
