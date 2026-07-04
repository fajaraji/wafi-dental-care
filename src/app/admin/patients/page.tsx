import { db } from "@/lib/db";
import { patients, bookings } from "@/lib/db/schema";

export default async function AdminPatientsPage() {
  const allPatients = await db.select().from(patients).orderBy(patients.createdAt);
  const allBookings = await db.select().from(bookings);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-extrabold text-text-primary font-display">Pasien</h2>
        <span className="text-sm text-text-muted">{allPatients.length} total</span>
      </div>
      <div className="rounded-2xl bg-white border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-left">
                <th className="px-6 py-3 font-semibold text-text-muted">Nama</th>
                <th className="px-6 py-3 font-semibold text-text-muted">Kontak</th>
                <th className="px-6 py-3 font-semibold text-text-muted">Booking</th>
                <th className="px-6 py-3 font-semibold text-text-muted">Bergabung</th>
              </tr>
            </thead>
            <tbody>
              {allPatients.map((p) => {
                const count = allBookings.filter((b) => b.patientId === p.id).length;
                return (
                  <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-6 py-3 font-semibold text-text-primary">{p.name}</td>
                    <td className="px-6 py-3 text-text-secondary">
                      {p.phone && <span className="block">{p.phone}</span>}
                      {p.email && <span className="block text-xs text-text-muted">{p.email}</span>}
                    </td>
                    <td className="px-6 py-3">
                      <span className="inline-flex rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-semibold text-brand-700">
                        {count} kunjungan
                      </span>
                    </td>
                    <td className="px-6 py-3 text-text-muted text-xs">
                      {p.createdAt?.toISOString().slice(0, 10) || "-"}
                    </td>
                  </tr>
                );
              })}
              {allPatients.length === 0 && (
                <tr><td colSpan={4} className="px-6 py-12 text-center text-text-muted">Belum ada pasien</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
