import { db } from "./index";
import {
  blogPosts,
  services,
  doctors,
  doctorSchedules,
  testimonials,
} from "./schema";
import { eq, and, desc } from "drizzle-orm";

export type BlogPost = {
  id: number;
  titleId: string;
  titleEn: string;
  contentId: string;
  contentEn: string | null;
  excerptId: string | null;
  excerptEn: string | null;
  slug: string;
  image: string | null;
  categoryId: string | null;
  categoryEn: string | null;
  author: string | null;
  publishedAt: string | null;
  isPublished: boolean | null;
};

function normalizeBlog(post: typeof blogPosts.$inferSelect): BlogPost {
  return {
    ...post,
    publishedAt: post.publishedAt ? post.publishedAt.toISOString() : null,
  };
}

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  const rows = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.isPublished, true))
    .orderBy(desc(blogPosts.publishedAt));
  return rows.map(normalizeBlog);
}

export async function getBlogPostBySlugFromDb(slug: string): Promise<BlogPost | null> {
  const rows = await db
    .select()
    .from(blogPosts)
    .where(and(eq(blogPosts.slug, slug), eq(blogPosts.isPublished, true)));
  const post = rows[0];
  return post ? normalizeBlog(post) : null;
}

export async function getBlogCategoriesFromDb(): Promise<string[]> {
  const posts = await getPublishedBlogPosts();
  return [...new Set(posts.map((p) => p.categoryId).filter(Boolean) as string[])];
}

// ─── Services ─────────────────────────────────────────────────

export type Service = typeof services.$inferSelect;

export async function getServicesFromDb(): Promise<Service[]> {
  return db.select().from(services).where(eq(services.isActive, true)).orderBy(services.id);
}

export async function getServiceBySlugFromDb(slug: string): Promise<Service | null> {
  const rows = await db
    .select()
    .from(services)
    .where(and(eq(services.slug, slug), eq(services.isActive, true)));
  return rows[0] ?? null;
}

export async function getServiceByIdFromDb(id: number): Promise<Service | null> {
  const rows = await db.select().from(services).where(eq(services.id, id));
  return rows[0] ?? null;
}

export async function getServiceCategoriesFromDb(): Promise<string[]> {
  const rows = await getServicesFromDb();
  return [...new Set(rows.map((s) => s.category))];
}

// ─── Doctors ─────────────────────────────────────────────────

export type Doctor = typeof doctors.$inferSelect;
export type DoctorSchedule = typeof doctorSchedules.$inferSelect;

export async function getDoctorsFromDb(): Promise<(Doctor & { schedules: DoctorSchedule[] })[]> {
  const docs = await db.select().from(doctors).where(eq(doctors.isActive, true)).orderBy(doctors.id);
  const scheds = await db.select().from(doctorSchedules).where(eq(doctorSchedules.isActive, true));
  return docs.map((d) => ({
    ...d,
    schedules: scheds
      .filter((s) => s.doctorId === d.id)
      .map((s) => ({
        ...s,
        startTime: s.startTime.slice(0, 5),
        endTime: s.endTime.slice(0, 5),
      })),
  }));
}

export async function getDoctorByIdFromDb(id: number): Promise<(Doctor & { schedules: DoctorSchedule[] }) | null> {
  const rows = await db.select().from(doctors).where(and(eq(doctors.id, id), eq(doctors.isActive, true)));
  const d = rows[0];
  if (!d) return null;
  const scheds = await db
    .select()
    .from(doctorSchedules)
    .where(and(eq(doctorSchedules.doctorId, id), eq(doctorSchedules.isActive, true)));
  return {
    ...d,
    schedules: scheds.map((s) => ({
      ...s,
      startTime: s.startTime.slice(0, 5),
      endTime: s.endTime.slice(0, 5),
    })),
  };
}

// ─── Testimonials ────────────────────────────────────────────

export type Testimonial = typeof testimonials.$inferSelect;

export async function getTestimonialsFromDb(): Promise<Testimonial[]> {
  return db
    .select()
    .from(testimonials)
    .where(eq(testimonials.isActive, true))
    .orderBy(testimonials.id);
}
