import { db } from "@/lib/db";
import { bookings, patients, doctors, services } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import ExportCsvButton from "./ExportCsvButton";

export default async function AdminReportsPage() {
  const allBookings = await db.select().from(bookings).orderBy(desc(bookings.createdAt));
  const allPatients = await db.select().from(patients);
  const allDoctors = await db.select().from(doctors);
  const allServices = await db.select().from(services);

  const settled = allBookings.filter((b) => b.paymentStatus === "settlement");

  const today = new Date().toISOString().slice(0, 10);
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  const monthPrefix = today.slice(0, 7);

  const revenueToday = settled
    .filter((b) => b.bookingDate === today)
    .reduce((s, b) => s + b.totalAmount, 0);
  const revenueWeek = settled
    .filter((b) => new Date(b.bookingDate) >= startOfWeek)
    .reduce((s, b) => s + b.totalAmount, 0);
  const revenueMonth = settled
    .filter((b) => b.bookingDate.startsWith(monthPrefix))
    .reduce((s, b) => s + b.totalAmount, 0);
  const revenueTotal = settled.reduce((s, b) => s + b.totalAmount, 0);

  const stats = [
    { label: "Hari Ini", value: revenueToday, color: "from-brand-600 to-accent-500" },
    { label: "Minggu Ini", value: revenueWeek, color: "from-green-500 to-emerald-600" },
    { label: "Bulan Ini", value: revenueMonth, color: "from-blue-500 to-indigo-600" },
    { label: "Total", value: revenueTotal, color: "from-purple-500 to-pink-600" },
  ];

  const getPatient = (id: number | null) => allPatients.find((p) => p.id === id);
  const getDoctor = (id: number | null) => allDoctors.find((d) => d.id === id);
  const getService = (id: number | null) => allServices.find((s) => s.id === id);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-extrabold text-text-primary font-display">Laporan</h2>
        <ExportCsvButton />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
            <div className={`mb-3 h-1.5 w-10 rounded-full bg-gradient-to-r ${s.color}`} />
            <p className="text-sm font-semibold text-text-muted">{s.label}</p>
            <p className="mt-2 text-2xl font-extrabold text-text-primary">
              Rp {s.value.toLocaleString("id-ID")}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-extrabold text-text-primary font-display mb-4">
          Booking Settlement ({settled.length})
        </h3>
        <div className="rounded-2xl bg-white border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-left">
                  <th className="px-6 py-3 font-semibold text-text-muted">Kode</th>
                  <th className="px-6 py-3 font-semibold text-text-muted">Pasien</th>
                  <th className="px-6 py-3 font-semibold text-text-muted">Layanan</th>
                  <th className="px-6 py-3 font-semibold text-text-muted">Dokter</th>
                  <th className="px-6 py-3 font-semibold text-text-muted">Tanggal</th>
                  <th className="px-6 py-3 font-semibold text-text-muted">Jumlah</th>
                </tr>
              </thead>
              <tbody>
                {settled.map((b) => (
                  <tr key={b.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-6 py-3 font-mono text-xs font-bold text-brand-600">
                      {b.bookingCode}
                    </td>
                    <td className="px-6 py-3 text-text-secondary">
                      {getPatient(b.patientId)?.name || "-"}
                    </td>
                    <td className="px-6 py-3 text-text-secondary text-xs">
                      {getService(b.serviceId)?.titleId || `#${b.serviceId}`}
                    </td>
                    <td className="px-6 py-3 text-text-secondary text-xs">
                      {getDoctor(b.doctorId)?.name || `#${b.doctorId}`}
                    </td>
                    <td className="px-6 py-3 text-text-secondary text-xs">
                      {b.bookingDate}
                    </td>
                    <td className="px-6 py-3 font-semibold text-text-primary">
                      Rp {b.totalAmount.toLocaleString("id-ID")}
                    </td>
                  </tr>
                ))}
                {settled.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-text-muted">
                      Belum ada booking settlement
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
