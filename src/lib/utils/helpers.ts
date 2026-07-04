// ─── Utility helpers ───

export function formatIDR(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export const dayNames = {
  id: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"],
  en: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
};

export function formatDate(dateStr: string, locale: string): string {
  return new Date(dateStr).toLocaleDateString(
    locale === "id" ? "id-ID" : "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );
}

// ─── Data access layer (reads from seed.ts) ───
import {
  servicesSeed,
  doctorsSeed,
  testimonialsSeed,
  blogSeed,
} from "../data/seed";

// Services
export function getAllServices() {
  return servicesSeed.filter((s) => s.isActive);
}

export function getServiceBySlug(slug: string) {
  return servicesSeed.find((s) => s.slug === slug && s.isActive) ?? null;
}

export function getServiceCategories() {
  return [...new Set(servicesSeed.filter((s) => s.isActive).map((s) => s.category))];
}

// Doctors
export function getAllDoctors() {
  return doctorsSeed.filter((d) => d.isActive);
}

export function getDoctorById(id: number) {
  return doctorsSeed.find((d) => d.id === id && d.isActive) ?? null;
}

// Testimonials
export function getAllTestimonials() {
  return testimonialsSeed.filter((t) => t.isActive);
}

// Blog
export function getAllBlogPosts() {
  return blogSeed
    .filter((b) => b.isPublished)
    .sort(
      (a, b) =>
        new Date(b.publishedAt!).getTime() -
        new Date(a.publishedAt!).getTime()
    );
}

export function getBlogPostBySlug(slug: string) {
  return blogSeed.find((b) => b.slug === slug && b.isPublished) ?? null;
}

export function getBlogCategories() {
  return [...new Set(blogSeed.filter((b) => b.isPublished).map((b) => b.categoryId))];
}
