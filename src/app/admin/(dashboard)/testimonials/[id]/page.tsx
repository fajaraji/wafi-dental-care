import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import TestimonialForm from "../TestimonialForm";

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const rows = await db.select().from(testimonials).where(eq(testimonials.id, Number(id)));
  const t = rows[0];
  if (!t) notFound();
  return (
    <div>
      <h2 className="text-xl font-extrabold text-text-primary font-display mb-6">Edit Testimoni</h2>
      <TestimonialForm initial={t} />
    </div>
  );
}
