import Link from "next/link";
import { db } from "@/lib/db";
import { doctors, doctorSchedules } from "@/lib/db/schema";
import { dayNames } from "@/lib/utils/helpers";
import DoctorDeleteButton from "./DoctorDeleteButton";

export default async function AdminDoctorsPage() {
  const allDoctors = await db.select().from(doctors).orderBy(doctors.id);
  const allSchedules = await db.select().from(doctorSchedules);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-extrabold text-text-primary font-display">Dokter</h2>
        <Link
          href="/admin/doctors/new"
          className="rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-700"
        >
          + Dokter Baru
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {allDoctors.map((doc) => {
          const sched = allSchedules.filter((s) => s.doctorId === doc.id);
          return (
            <div key={doc.id} className="rounded-2xl bg-white border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-brand-600/25 font-bold text-xl text-brand-700">
                  {doc.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-text-primary">{doc.name}</h3>
                  <p className="text-sm text-gold-600 font-medium">{doc.specialtyId}</p>
                </div>
                <div className="flex gap-2">
                  <Link href={`/admin/doctors/${doc.id}`} className="rounded-lg bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-600 hover:bg-brand-100">
                    Edit
                  </Link>
                  <DoctorDeleteButton id={doc.id} />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs font-semibold text-text-muted mb-2">Jadwal Praktik</p>
                <div className="flex flex-wrap gap-1.5">
                  {sched.map((s, i) => (
                    <span key={i} className="rounded-lg bg-brand-50 px-2.5 py-1 text-xs text-brand-700 font-medium">
                      {dayNames.id[s.dayOfWeek].slice(0, 3)} {s.startTime.slice(0, 5)}-{s.endTime.slice(0, 5)}
                    </span>
                  ))}
                  {sched.length === 0 && (
                    <span className="text-xs text-text-muted">Belum ada jadwal</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
