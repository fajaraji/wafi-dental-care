// ─── Seed script — inserts master data into PostgreSQL ───
import { config } from "dotenv";
import path from "path";

config({ path: path.resolve(process.cwd(), ".env.local") });
import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";
import * as schema from "./schema";
import {
  servicesSeed,
  doctorsSeed,
  testimonialsSeed,
  blogSeed,
} from "../data/seed";
import { hashPassword } from "../auth/auth";

async function seed() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL! });
  const db = drizzle({ client: pool, schema });

  console.log("🌱 Seeding database...\n");

  // ─── Admin user ──────────────────────────────────────
  const adminEmail = process.env.ADMIN_EMAIL || "admin@wafidentalcare.com";
  const adminPass = process.env.ADMIN_PASSWORD || "admin123";

  await db.insert(schema.adminUsers).values({
    email: adminEmail,
    passwordHash: hashPassword(adminPass),
    name: "Admin Wafi",
    role: "admin",
    isActive: true,
  }).onConflictDoNothing();
  console.log(`  ✓ Admin: ${adminEmail}`);

  // ─── Services ─────────────────────────────────────────
  for (const s of servicesSeed) {
    await db.insert(schema.services).values({
      id: s.id,
      titleId: s.titleId,
      titleEn: s.titleEn,
      descId: s.descId,
      descEn: s.descEn,
      price: s.price,
      duration: s.duration,
      category: s.category,
      slug: s.slug,
      isActive: s.isActive,
    }).onConflictDoNothing();
  }
  console.log(`  ✓ Services: ${servicesSeed.length} items`);

  // ─── Doctors ──────────────────────────────────────────
  for (const d of doctorsSeed) {
    await db.insert(schema.doctors).values({
      id: d.id,
      name: d.name,
      title: "drg.",
      specialtyId: d.titleId,
      specialtyEn: d.titleEn,
      bioId: d.bioId,
      bioEn: d.bioEn,
      photo: d.photo,
      isActive: d.isActive,
    }).onConflictDoNothing();

    for (const sc of d.schedules) {
      await db.insert(schema.doctorSchedules).values({
        doctorId: d.id,
        dayOfWeek: sc.dayOfWeek,
        startTime: sc.startTime,
        endTime: sc.endTime,
        isActive: true,
      }).onConflictDoNothing();
    }
  }
  console.log(`  ✓ Doctors: ${doctorsSeed.length} items`);

  // ─── Testimonials ─────────────────────────────────────
  for (const t of testimonialsSeed) {
    await db.insert(schema.testimonials).values({
      patientName: t.patientName,
      rating: t.rating,
      contentId: t.contentId,
      contentEn: t.contentEn,
      isActive: t.isActive,
    }).onConflictDoNothing();
  }
  console.log(`  ✓ Testimonials: ${testimonialsSeed.length} items`);

  // ─── Blog Posts ───────────────────────────────────────
  for (const b of blogSeed) {
    await db.insert(schema.blogPosts).values({
      id: b.id,
      titleId: b.titleId,
      titleEn: b.titleEn,
      contentId: b.contentId,
      contentEn: b.contentEn,
      excerptId: b.excerptId,
      excerptEn: b.excerptEn,
      slug: b.slug,
      image: b.image,
      categoryId: b.categoryId,
      categoryEn: b.categoryEn,
      author: b.author,
      publishedAt: new Date(b.publishedAt!),
      isPublished: b.isPublished,
    }).onConflictDoNothing();
  }
  console.log(`  ✓ Blog: ${blogSeed.length} items`);

  console.log("\n✅ Seed complete!");
  await pool.end();
}

seed().catch((e) => {
  console.error("❌ Seed failed:", e);
  process.exit(1);
});
