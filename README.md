# Wafi Dental Care

A bilingual (Indonesian / English) dental clinic website and admin dashboard for **Wafi Dental Care** — a dental clinic in Yogyakarta, Indonesia. Includes a public marketing site, an online 5-step booking flow with **Midtrans Snap** payment, and a full admin dashboard for managing clinic operations.

## Features

- **Public website** — homepage, services (17+), doctors & schedules, blog, testimonials, about, and contact pages.
- **Bilingual** — URL-based routing (`/id` and `/en`) powered by `next-intl`.
- **Booking system** — 5-step flow: service → doctor → schedule → details → review & pay.
- **Payments** — Midtrans Snap (sandbox + production) with webhook handling and signature verification.
- **Admin dashboard** — manage bookings, patients, doctors & schedules, services, blog posts, testimonials, contact messages, and revenue reports (with CSV export).
- **Auth** — NextAuth.js credentials authentication for admin access.
- **SEO** — sitemap, robots, manifest, Open Graph, and Schema.org `Dentist` structured data.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | Neon.tech PostgreSQL (serverless) |
| ORM | Drizzle ORM |
| Auth | NextAuth.js v5 (Auth.js) |
| Payments | Midtrans Snap |
| i18n | next-intl |
| Animation | Motion |
| Deployment | Vercel |

## Getting Started

### Prerequisites

- Node.js 18.18+ (or 20+)
- A Neon PostgreSQL database (or any Postgres)
- Midtrans sandbox account (for payments)

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string (Neon) |
| `MIDTRANS_SERVER_KEY` | Midtrans server key |
| `MIDTRANS_CLIENT_KEY` | Midtrans client key |
| `NEXT_PUBLIC_MIDTRANS_CLIENT_KEY` | Client key exposed to browser for Snap |
| `MIDTRANS_IS_PRODUCTION` | `true` for production, `false` for sandbox |
| `AUTH_SECRET` | NextAuth secret (`openssl rand -base64 32`) |
| `AUTH_URL` | Base URL of the app |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Default admin credentials (seeded) |

### Database Setup

1. Create a Neon database and set `DATABASE_URL`.
2. Push the schema (dev) or run migrations:

```bash
npm run db:push
# or
npm run db:generate
npm run db:migrate
```

3. Seed master data (services, doctors, testimonials, blog, admin user):

```bash
npm run db:seed-db
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). It redirects to `/id` by default.

- **Admin panel:** http://localhost:3000/admin/login
- Default login: `admin@wafidentalcare.com` / `admin123` (change in production)

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Lint the codebase |
| `npm run db:generate` | Generate Drizzle migrations |
| `npm run db:migrate` | Apply Drizzle migrations |
| `npm run db:push` | Push schema directly (dev) |
| `npm run db:studio` | Open Drizzle Studio |
| `npm run db:seed` | Run seed script |
| `npm run db:seed-db` | Seed PostgreSQL database |

## Project Structure

```
src/
├── app/
│   ├── [locale]/            # i18n public pages (id / en)
│   ├── admin/               # Admin dashboard (login + CRUD)
│   └── api/                 # API routes (midtrans, admin, contact, auth)
├── components/
│   ├── home/                # Homepage sections
│   ├── layout/              # Header, Footer, PageHero
│   └── AdminLayoutClient.tsx
├── lib/
│   ├── db/                  # Drizzle schema, queries, seed
│   ├── auth/                # NextAuth config
│   ├── midtrans.ts          # Midtrans Snap client
│   └── utils/helpers.ts     # Shared helpers
└── i18n/
    ├── routing.ts
    ├── request.ts
    └── messages/            # id.json, en.json
```

## Database Schema

- `patients` — patient records
- `doctors` + `doctor_schedules` — doctors and their weekly schedules
- `services` — dental services with bilingual title/description, price, duration
- `bookings` — appointment bookings with payment status
- `testimonials` — patient testimonials
- `blog_posts` — blog articles
- `contact_messages` — messages from the contact form
- `admin_users` — admin accounts

## Deployment

Deploy to Vercel:

1. Push this repository to GitHub.
2. Import the repo in Vercel.
3. Add all environment variables from `.env.example`.
4. Deploy.

The database is serverless (Neon), so no extra database setup is needed on Vercel.

## License

Private project.
