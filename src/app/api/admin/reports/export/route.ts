import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { bookings, patients, doctors, services } from "@/lib/db/schema";
import { auth } from "@/lib/auth/auth";

function csvCell(value: string | number | null): string {
  const s = value == null ? "" : String(value);
  return `"${s.replace(/"/g, '""')}"`;
}

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const allBookings = await db.select().from(bookings);
  const allPatients = await db.select().from(patients);
  const allDoctors = await db.select().from(doctors);
  const allServices = await db.select().from(services);

  const settled = allBookings.filter((b) => b.paymentStatus === "settlement");

  const getPatient = (id: number | null) => allPatients.find((p) => p.id === id);
  const getDoctor = (id: number | null) => allDoctors.find((d) => d.id === id);
  const getService = (id: number | null) => allServices.find((s) => s.id === id);

  const header = ["Kode", "Tanggal", "Jam", "Pasien", "Layanan", "Dokter", "Jumlah", "Status"];
  const rows = settled.map((b) => [
    b.bookingCode,
    b.bookingDate,
    b.timeSlot,
    getPatient(b.patientId)?.name ?? "",
    getService(b.serviceId)?.titleId ?? "",
    getDoctor(b.doctorId)?.name ?? "",
    b.totalAmount,
    b.paymentStatus,
  ]);

  const csv = [header, ...rows]
    .map((r) => r.map(csvCell).join(","))
    .join("\r\n");

  const bom = "\uFEFF";
  const filename = `wafi-revenue-${new Date().toISOString().slice(0, 10)}.csv`;

  return new NextResponse(bom + csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
