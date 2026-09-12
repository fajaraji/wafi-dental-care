import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { doctors, doctorSchedules } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import DoctorForm from "../DoctorForm";

export default async function EditDoctorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const rows = await db.select().from(doctors).where(eq(doctors.id, Number(id)));
  const doc = rows[0];
  if (!doc) notFound();
  const schedules = await db.select().from(doctorSchedules).where(eq(doctorSchedules.doctorId, doc.id));

  return (
    <div>
      <h2 className="text-xl font-extrabold text-text-primary font-display mb-6">Edit Dokter</h2>
      <DoctorForm initial={{ ...doc, schedules }} />
    </div>
  );
}
