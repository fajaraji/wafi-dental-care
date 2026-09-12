import Link from "next/link";
import { db } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";
import TestimonialDeleteButton from "./TestimonialDeleteButton";

export default async function AdminTestimonialsPage() {
  const items = await db.select().from(testimonials).orderBy(testimonials.id);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-extrabold text-text-primary font-display">Testimoni</h2>
        <Link href="/admin/testimonials/new" className="rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-700">
          + Testimoni Baru
        </Link>
      </div>

      <div className="space-y-3">
        {items.map((t) => (
          <div key={t.id} className="flex items-start justify-between gap-4 rounded-2xl bg-white border border-gray-100 p-5">
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <h3 className="font-bold text-text-primary">{t.patientName}</h3>
                <span className="text-gold-500 text-xs">{"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}</span>
              </div>
              <p className="mt-2 text-sm text-text-secondary line-clamp-3">{t.contentId}</p>
              <span className={`mt-2 inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${t.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                {t.isActive ? "Aktif" : "Nonaktif"}
              </span>
            </div>
            <div className="flex flex-shrink-0 gap-2">
              <Link href={`/admin/testimonials/${t.id}`} className="rounded-lg bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-600 hover:bg-brand-100">Edit</Link>
              <TestimonialDeleteButton id={t.id} />
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="rounded-2xl bg-white border border-gray-100 p-12 text-center text-text-muted">Belum ada testimoni</div>
        )}
      </div>
    </div>
  );
}
