import { db } from "@/lib/db";
import { bookings, patients, doctors, services } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import BookingActions from "./BookingActions";

export default async function AdminBookingsPage() {
  const allBookings = await db.select().from(bookings).orderBy(bookings.createdAt);
  const allPatients = await db.select().from(patients);
  const allDoctors = await db.select().from(doctors);
  const allServices = await db.select().from(services);

  const getPatient = (id: number | null) => allPatients.find((p) => p.id === id);
  const getDoctor = (id: number | null) => allDoctors.find((d) => d.id === id);
  const getService = (id: number | null) => allServices.find((s) => s.id === id);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-extrabold text-text-primary font-display">
          Booking
        </h2>
        <span className="text-sm text-text-muted">
          {allBookings.length} total
        </span>
      </div>

      <div className="rounded-2xl bg-white border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-left">
                <th className="px-4 py-3 font-semibold text-text-muted">Kode</th>
                <th className="px-4 py-3 font-semibold text-text-muted">Pasien</th>
                <th className="px-4 py-3 font-semibold text-text-muted">Layanan</th>
                <th className="px-4 py-3 font-semibold text-text-muted">Dokter</th>
                <th className="px-4 py-3 font-semibold text-text-muted">Jadwal</th>
                <th className="px-4 py-3 font-semibold text-text-muted">Jumlah</th>
                <th className="px-4 py-3 font-semibold text-text-muted">Status</th>
                <th className="px-4 py-3 font-semibold text-text-muted">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {allBookings.map((b) => {
                const patient = getPatient(b.patientId);
                const doctor = getDoctor(b.doctorId);
                const service = getService(b.serviceId);
                return (
                  <tr key={b.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-xs font-bold text-brand-600">
                      {b.bookingCode}
                    </td>
                    <td className="px-4 py-3 text-text-secondary">
                      {patient?.name || "-"}
                      {patient?.phone && (
                        <span className="block text-xs text-text-muted">
                          {patient.phone}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-text-secondary text-xs">
                      {service?.titleId || `#${b.serviceId}`}
                    </td>
                    <td className="px-4 py-3 text-text-secondary text-xs">
                      {doctor?.name || `#${b.doctorId}`}
                    </td>
                    <td className="px-4 py-3 text-text-secondary text-xs">
                      {b.bookingDate}
                      <br />
                      {b.timeSlot}
                    </td>
                    <td className="px-4 py-3 font-semibold">
                      Rp {b.totalAmount.toLocaleString("id-ID")}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          b.status === "confirmed"
                            ? "bg-green-100 text-green-700"
                            : b.status === "cancelled"
                            ? "bg-red-100 text-red-700"
                            : b.status === "completed"
                            ? "bg-brand-100 text-brand-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <BookingActions
                        bookingId={b.id}
                        currentStatus={b.status || "pending"}
                      />
                    </td>
                  </tr>
                );
              })}
              {allBookings.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-text-muted">
                    Belum ada booking
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
