# Wafi Dental Care — Product Requirements Document (PRD)

## 1. Overview

**Wafi Dental Care** adalah klinik gigi profesional yang berlokasi di Jl Nusa Indah No 233H Condongcatur, Depok, Sleman, Yogyakarta. Dengan tagline **#OnPointDentist** — *"Tepat Tindakanya, Jelas Biayanya"* — klinik ini menawarkan 17+ layanan gigi lengkap dengan tim dokter profesional, alat steril, dan fasilitas nyaman. Berlokasi strategis dekat Kampus UPN, FBE UII, Amikom, dan Pakuwon Mall.

**Tujuan Website:**
- Branding & kredibilitas online untuk Wafi Dental Care
- Menyediakan informasi lengkap layanan, dokter, dan fasilitas
- Sistem booking online dengan pembayaran terintegrasi
- Manajemen data pasien dan laporan untuk admin klinik
- Konten edukasi kesehatan gigi melalui blog

---

## 2. Requirements

### 2.1 Functional Requirements

| ID | Requirement | Priority |
|---|---|---|
| F01 | Website bilingual (Bahasa Indonesia / English) dengan toggle | High |
| F02 | Halaman homepage dengan hero, USP, layanan unggulan, dokter, testimoni | High |
| F03 | Halaman daftar layanan & detail per layanan (17 layanan) | High |
| F04 | Sistem booking online: pilih layanan → dokter → jadwal → isi data → bayar | High |
| F05 | Integrasi Midtrans Snap untuk pembayaran (QRIS, VA, e-wallet, CC) | High |
| F06 | Konfirmasi booking via WhatsApp & email otomatis | Medium |
| F07 | Database pasien dengan riwayat kunjungan | High |
| F08 | Admin dashboard: kelola booking, pasien, dokter, layanan, blog, laporan | High |
| F09 | Autentikasi admin (NextAuth.js) | High |
| F10 | Halaman profil dokter & jadwal praktik | Medium |
| F11 | Halaman galeri foto klinik | Medium |
| F12 | Halaman testimoni pasien | Medium |
| F13 | Halaman kontak dengan Google Maps & form inquiry | Medium |
| F14 | Blog artikel kesehatan gigi (CRUD via admin) | Low |
| F15 | SEO: metadata, Open Graph, Schema.org Dentist/MedicalBusiness | High |
| F16 | PWA-ready dengan offline support | Low |

### 2.2 Non-Functional Requirements

| ID | Requirement | Target |
|---|---|---|
| N01 | Performa | Lighthouse score ≥ 90 |
| N02 | Responsive | Mobile-first, support 320px–2560px |
| N03 | Accessibility | WCAG 2.1 AA |
| N04 | Security | HTTPS, CSRF protection, input sanitization |
| N05 | Availability | 99.9% uptime via Vercel |

---

## 3. Core Features

### 3.1 🏠 Public Website
- **Homepage**: Hero dengan CTA booking, USP cards (Tepat Tindakan, Biaya Jelas, Dokter Profesional, Alat Steril), layanan unggulan carousel, highlight dokter, testimoni slider, Google Maps, statistik klinik
- **Layanan**: Grid 17 layanan dengan kategori, halaman detail per layanan (deskripsi, harga, durasi)
- **Dokter**: Profil dokter dengan foto, spesialisasi, jadwal praktik
- **Galeri**: Grid foto klinik dengan lightbox
- **Testimoni**: Carousel rating pasien
- **Kontak**: Google Maps embed, jam praktik, social media links, WhatsApp CTA, contact form
- **Blog**: Artikel kesehatan gigi dengan kategori dan search

### 3.2 📅 Booking System (6-Step Flow)
1. **Pilih Layanan** — Pilih dari 17 layanan, lihat harga & durasi
2. **Pilih Dokter** — Filter dokter berdasarkan spesialisasi
3. **Pilih Tanggal & Jam** — Kalender interaktif, slot 30 menit (08:00–21:00)
4. **Isi Data Diri** — Nama, email, nomor HP, catatan (opsional)
5. **Review & Bayar** — Ringkasan booking, tombol Bayar via Midtrans Snap
6. **Konfirmasi** — Halaman sukses dengan kode booking, WhatsApp & email notifikasi

### 3.3 💳 Payment Integration (Midtrans Snap)
- **Sandbox mode** untuk development
- Mendukung: QRIS, Transfer Bank (BCA, BNI, Mandiri, BRI), E-Wallet (GoPay, OVO, ShopeePay, DANA), Kartu Kredit
- Webhook handler untuk update status pembayaran
- Halaman receipt dengan status booking

### 3.4 👨‍💼 Admin Dashboard
| Section | Fitur |
|---|---|
| **Dashboard** | Overview: booking hari ini, revenue, pasien baru, grafik booking bulanan |
| **Booking** | List/filter booking, approve/reject, lihat detail, ubah status |
| **Pasien** | Directory pasien dengan search, riwayat kunjungan per pasien |
| **Dokter** | CRUD dokter, atur jadwal & jam praktik per hari |
| **Layanan** | CRUD layanan, atur harga, durasi, kategori |
| **Blog** | CRUD artikel dengan rich text editor |
| **Laporan** | Revenue report (harian/mingguan/bulanan), export CSV |

### 3.5 🌐 Bilingual System (ID / EN)
- URL-based routing: `/id/layanan` ↔ `/en/services`
- Semua konten dari database memiliki kolom `_id` dan `_en`
- Toggle bahasa di navbar
- SEO `hreflang` tags otomatis
- Fallback ke ID jika konten EN kosong

---

## 4. User Flow

### 4.1 User Journey — Booking Appointment

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Landing di   │────▶│  Klik "Book  │────▶│  Pilih       │
│  Homepage     │     │  Appointment"│     │  Layanan     │
└──────────────┘     └──────────────┘     └──────┬───────┘
                                                  │
                    ┌──────────────┐     ┌────────┴───────┐
                    │  Isi Data    │◀────│  Pilih Tanggal │◀────┐
                    │  Diri        │     │  & Jam         │     │
                    └──────┬───────┘     └────────────────┘     │
                           │                              ┌─────┴──────┐
                           ▼                              │ Pilih      │
                    ┌──────────────┐                      │ Dokter     │
                    │  Review &    │                      └────────────┘
                    │  Bayar       │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐     ┌──────────────┐
                    │  Midtrans    │────▶│  Konfirmasi  │
                    │  Snap Popup  │     │  + Notifikasi│
                    └──────────────┘     └──────────────┘
```

### 4.2 Admin Flow

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Login       │────▶│  Dashboard   │────▶│  Kelola      │
│  /admin      │     │  Overview    │     │  Booking     │
└──────────────┘     └──────────────┘     └──────────────┘
                                                  │
                    ┌──────────────┐     ┌────────┴───────┐
                    │  Lihat        │◀────│  Approve/     │
                    │  Laporan      │     │  Reject       │
                    └──────────────┘     └────────────────┘
```

---

## 5. Architecture

### 5.1 System Architecture

```
┌──────────────────────────────────────────────────────────┐
│                     Vercel (Hosting)                       │
│                                                            │
│  ┌──────────────────────────────────────────────────────┐ │
│  │              Next.js 15 App Router                    │ │
│  │                                                       │ │
│  │  ┌──────────┐  ┌──────────┐  ┌───────────────────┐  │ │
│  │  │ Server   │  │ Client   │  │ API Routes        │  │ │
│  │  │Components│  │Components│  │ /api/bookings     │  │ │
│  │  │ (SSR/SSG)│  │ (RSC)    │  │ /api/midtrans/*   │  │ │
│  │  │          │  │          │  │ /api/admin/*       │  │ │
│  │  └────┬─────┘  └────┬─────┘  └─────────┬─────────┘  │ │
│  │       │             │                  │             │ │
│  │       └─────────────┼──────────────────┘             │ │
│  │                     │                                │ │
│  │              ┌──────┴──────┐                         │ │
│  │              │ Drizzle ORM │                         │ │
│  │              └──────┬──────┘                         │ │
│  └─────────────────────┼────────────────────────────────┘ │
└────────────────────────┼──────────────────────────────────┘
                         │
              ┌──────────┴──────────┐
              │                     │
       ┌──────┴──────┐     ┌────────┴─────────┐
       │ Neon.tech    │     │ Midtrans Gateway  │
       │ PostgreSQL   │     │ (Payment API)     │
       └─────────────┘     └──────────────────┘
```

### 5.2 Project Structure

```
wafi-dental-care/
├── src/
│   ├── app/
│   │   ├── [locale]/                    # i18n routing
│   │   │   ├── layout.tsx               # Root layout
│   │   │   ├── page.tsx                 # Homepage
│   │   │   ├── booking/
│   │   │   │   └── page.tsx             # Booking flow
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx             # Blog listing
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx         # Blog detail
│   │   │   ├── contact/
│   │   │   │   └── page.tsx
│   │   │   ├── doctors/
│   │   │   │   └── page.tsx
│   │   │   ├── gallery/
│   │   │   │   └── page.tsx
│   │   │   ├── services/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   └── testimonials/
│   │   │       └── page.tsx
│   │   ├── admin/                       # Admin dashboard
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx                 # Dashboard
│   │   │   ├── bookings/
│   │   │   ├── patients/
│   │   │   ├── doctors/
│   │   │   ├── services/
│   │   │   ├── blog/
│   │   │   └── reports/
│   │   └── api/                         # API routes
│   │       ├── bookings/
│   │       ├── midtrans/
│   │       │   ├── token/route.ts       # Generate snap token
│   │       │   └── webhook/route.ts     # Payment notification
│   │       └── contact/
│   ├── components/
│   │   ├── ui/                          # Reusable UI components
│   │   ├── layout/                      # Header, Footer, Nav
│   │   ├── booking/                     # Booking step components
│   │   ├── home/                        # Homepage sections
│   │   └── admin/                       # Admin components
│   ├── lib/
│   │   ├── db/
│   │   │   ├── schema/                  # Drizzle schema files
│   │   │   ├── migrations/              # Drizzle migrations
│   │   │   └── index.ts                 # DB connection
│   │   ├── midtrans.ts                  # Midtrans client
│   │   ├── auth.ts                      # NextAuth config
│   │   └── utils.ts                     # Helper functions
│   ├── i18n/
│   │   ├── routing.ts                   # next-intl routing config
│   │   ├── request.ts                   # next-intl request config
│   │   └── messages/
│   │       ├── id.json                  # Indonesian translations
│   │       └── en.json                  # English translations
│   └── middleware.ts                    # i18n + auth middleware
├── public/
│   ├── images/
│   └── icons/
├── .env.local                           # Environment variables
├── drizzle.config.ts
├── next.config.ts
├── tailwind.config.ts
├── package.json
└── tsconfig.json
```

---

## 6. Database Schema

### 6.1 Entity Relationship Diagram

```
┌──────────┐       ┌──────────┐       ┌──────────┐
│ patients │       │ doctors  │       │ services │
├──────────┤       ├──────────┤       ├──────────┤
│ id (PK)  │──┐    │ id (PK)  │──┐    │ id (PK)  │──┐
│ name     │  │    │ name     │  │    │ title_id │  │
│ email    │  │    │ title    │  │    │ title_en │  │
│ phone    │  │    │ specialty│  │    │ desc_id  │  │
│ dob      │  │    │ photo    │  │    │ desc_en  │  │
│ created  │  │    │ bio_id   │  │    │ price    │  │
└─────┬────┘  │    │ bio_en   │  │    │ duration │  │
      │       │    └─────┬────┘  │    │ category │  │
      │       │          │       │    │ slug     │  │
      │       │          │       │    │ is_active│  │
      │       │          │       │    └─────┬────┘  │
      │       │          │       │          │       │
      │  ┌────┴──────────┴───────┴──────────┘       │
      │  │             bookings                      │
      ├──│ id (PK)                                   │
      │  │ patient_id (FK) ──────────────────────────┘
      │  │ doctor_id (FK)
      │  │ service_id (FK)
      │  │ booking_date
      │  │ time_slot
      │  │ status (pending/confirmed/cancelled/completed)
      │  │ payment_status (pending/settlement/expired/deny)
      │  │ midtrans_order_id
      │  │ total_amount
      │  │ notes
      │  │ created_at / updated_at
      │  └────────────────────────────────
      │
      ├──────┐
      │      │
┌─────┴────┐ │  ┌──────────────┐
│ bookings │ │  │ testimonials │
│ (cont.)  │ │  ├──────────────┤
└──────────┘ │  │ id (PK)      │
             │  │ patient_name │
             │  │ rating (1-5) │
             │  │ content_id   │
             │  │ content_en   │
             │  │ photo (opt)  │
             │  │ created_at   │
             │  └──────────────┘
             │
             │  ┌──────────────┐
             │  │ blog_posts   │
             │  ├──────────────┤
             │  │ id (PK)      │
             │  │ title_id     │
             │  │ title_en     │
             │  │ content_id   │
             │  │ content_en   │
             │  │ slug         │
             │  │ image        │
             │  │ published_at │
             │  │ author       │
             │  │ created_at   │
             │  └──────────────┘
             │
             │  ┌──────────────┐
             │  │ contact_msgs │
             │  ├──────────────┤
             │  │ id (PK)      │
             │  │ name         │
             │  │ email        │
             │  │ phone        │
             │  │ message      │
             │  │ is_read      │
             │  │ created_at   │
             │  └──────────────┘
             │
             │  ┌──────────────┐
             │  │ doctor_sched │
             │  ├──────────────┤
             └──│ id (PK)      │
                │ doctor_id(FK)│
                │ day_of_week  │
                │ start_time   │
                │ end_time     │
                │ is_active    │
                └──────────────┘
```

### 6.2 Table Definitions (Drizzle ORM)

```typescript
// src/lib/db/schema/patients.ts
export const patients = pgTable("patients", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone").notNull(),
  dob: date("dob"),
  createdAt: timestamp("created_at").defaultNow(),
});

// src/lib/db/schema/doctors.ts
export const doctors = pgTable("doctors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title"), // e.g., "drg."
  specialtyId: text("specialty_id").notNull(),
  specialtyEn: text("specialty_en").notNull(),
  photo: text("photo"),
  bioId: text("bio_id"),
  bioEn: text("bio_en"),
  isActive: boolean("is_active").default(true),
});

// src/lib/db/schema/services.ts
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  titleId: text("title_id").notNull(),
  titleEn: text("title_en").notNull(),
  descId: text("desc_id"),
  descEn: text("desc_en"),
  price: integer("price").notNull(),       // in IDR
  duration: integer("duration").notNull(),  // in minutes
  category: text("category"),               // "general", "ortho", "cosmetic", etc.
  slug: text("slug").notNull().unique(),
  isActive: boolean("is_active").default(true),
});

// src/lib/db/schema/bookings.ts
export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  bookingCode: text("booking_code").notNull().unique(), // "WDC-20260704-001"
  patientId: integer("patient_id").references(() => patients.id),
  doctorId: integer("doctor_id").references(() => doctors.id),
  serviceId: integer("service_id").references(() => services.id),
  bookingDate: date("booking_date").notNull(),
  timeSlot: time("time_slot").notNull(),
  status: text("status").default("pending"),
  paymentStatus: text("payment_status").default("pending"),
  midtransOrderId: text("midtrans_order_id"),
  totalAmount: integer("total_amount").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ... testimonials, blog_posts, contact_messages, doctor_schedules
```

---

## 7. Tech Stack

| Layer | Technology | Version | Rationale |
|---|---|---|---|
| **Framework** | Next.js (App Router) | 15.x | SSR/SSG/API routes, Edge-ready, best React DX |
| **Language** | TypeScript | 5.x | Full type safety |
| **Styling** | Tailwind CSS | v4 | Utility-first, `@tailwindcss/postcss` plugin |
| **Database** | Neon.tech PostgreSQL | — | Serverless Postgres, scales to zero |
| **ORM** | Drizzle ORM | 0.x | Lightweight, type-safe, SQL-like, `@neondatabase/serverless` |
| **ORM Kit** | Drizzle Kit | 0.x | Schema generation + migrations |
| **Auth** | NextAuth.js (Auth.js) | 5.x | Credentials + JWT for admin |
| **Payment** | Midtrans Snap | — | Sandbox UI popup, QRIS/VA/e-wallet |
| **Animation** | Motion (formerly Framer Motion) | latest | `npm install motion`, import from `"motion/react"` |
| **i18n** | next-intl | latest | `defineRouting`, middleware-based, server components |
| **Deployment** | Vercel | — | Native Next.js, free tier, Edge Functions |
| **Analytics** | Vercel Analytics | — | Web vitals + traffic |

### Color Palette (Extracted from Logo)

| Role | Color | Hex | Tailwind |
|---|---|---|---|
| **Primary Blue** | Navy/Royal Blue | `#1B3A6B` | Custom |
| **Accent Teal** | Teal-Cyan | `#00A8B5` | Custom |
| **Neutral Dark** | Charcoal | `#2D3748` | `gray-800` |
| **Neutral Light** | Light Gray | `#F7FAFC` | `gray-50` |
| **White** | White | `#FFFFFF` | `white` |

---

## Dependencies

```json
{
  "dependencies": {
    "next": "^15.x",
    "react": "^19.x",
    "react-dom": "^19.x",
    "motion": "^latest",
    "next-intl": "^latest",
    "next-auth": "^5.x",
    "@auth/drizzle-adapter": "^latest",
    "@neondatabase/serverless": "^latest",
    "drizzle-orm": "^latest",
    "drizzle-kit": "^latest",
    "tailwindcss": "^4.x",
    "@tailwindcss/postcss": "^latest",
    "postcss": "^latest",
    "typescript": "^5.x",
    "zod": "^latest"
  }
}
```

---

> [!NOTE]
> **PRD Version:** 1.0 — Final | **Date:** 4 July 2026 | **Status:** Approved
>
> This PRD supersedes the implementation plan. Tech stack versions updated per Context7 latest docs.
