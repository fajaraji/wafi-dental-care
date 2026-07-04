import { db } from "@/lib/db";
import { doctors, doctorSchedules } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { dayNames } from "@/lib/utils/helpers";

export default async function AdminDoctorsPage() {
  const allDoctors = await db.select().from(doctors).orderBy(doctors.id);
  const allSchedules = await db.select().from(doctorSchedules);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-extrabold text-text-primary font-display">Dokter</h2>
        <span className="text-sm text-text-muted">{allDoctors.length} dokter</span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {allDoctors.map((doc) => {
          const sched = allSchedules.filter((s) => s.doctorId === doc.id);
          return (
            <div key={doc.id} className="rounded-2xl bg-white border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-accent-500 text-white font-bold text-xl shadow-lg">
                  {doc.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-text-primary">{doc.name}</h3>
                  <p className="text-sm text-accent-600 font-medium">{doc.specialtyId}</p>
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
