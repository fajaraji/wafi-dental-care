import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { services } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import ServiceForm from "../ServiceForm";

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const rows = await db.select().from(services).where(eq(services.id, Number(id)));
  const svc = rows[0];
  if (!svc) notFound();
  return (
    <div>
      <h2 className="text-xl font-extrabold text-text-primary font-display mb-6">Edit Layanan</h2>
      <ServiceForm initial={svc} />
    </div>
  );
}
