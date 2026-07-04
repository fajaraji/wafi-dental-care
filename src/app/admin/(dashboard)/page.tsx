import { db } from "@/lib/db";
import { bookings, patients } from "@/lib/db/schema";

export default async function AdminDashboardPage() {
  // Fetch stats
  const today = new Date().toISOString().slice(0, 10);

  const allBookings = await db.select().from(bookings);
  const todayBookings = allBookings.filter((b) => b.bookingDate === today);
  const pendingBookings = allBookings.filter((b) => b.status === "pending");
  const allPatients = await db.select().from(patients);

  const totalRevenue = allBookings
    .filter((b) => b.paymentStatus === "settlement")
    .reduce((sum, b) => sum + b.totalAmount, 0);

  const stats = [
    {
      label: "Booking Hari Ini",
      value: todayBookings.length,
      icon: "📅",
      color: "from-brand-600 to-accent-500",
    },
    {
      label: "Revenue Bulan Ini",
      value: `Rp ${(totalRevenue / 1_000_000).toFixed(1)}M`,
      icon: "💰",
      color: "from-green-500 to-emerald-600",
    },
    {
      label: "Total Pasien",
      value: allPatients.length,
      icon: "👥",
      color: "from-blue-500 to-indigo-600",
    },
    {
      label: "Booking Pending",
      value: pendingBookings.length,
      icon: "⏳",
      color: "from-yellow-500 to-orange-600",
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-extrabold text-text-primary font-display mb-6">
        Overview
      </h2>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">{stat.icon}</span>
              <span className="text-3xl font-extrabold text-text-primary">
                {stat.value}
              </span>
            </div>
            <p className="mt-3 text-sm font-semibold text-text-muted">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div className="mt-8">
        <h3 className="text-lg font-extrabold text-text-primary font-display mb-4">
          Booking Terbaru
        </h3>
        <div className="rounded-2xl bg-white border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-left">
                <th className="px-6 py-3 font-semibold text-text-muted">Kode</th>
                <th className="px-6 py-3 font-semibold text-text-muted">Tanggal</th>
                <th className="px-6 py-3 font-semibold text-text-muted">Jumlah</th>
                <th className="px-6 py-3 font-semibold text-text-muted">Status</th>
                <th className="px-6 py-3 font-semibold text-text-muted">Pembayaran</th>
              </tr>
            </thead>
            <tbody>
              {allBookings.slice(0, 10).map((b) => (
                <tr key={b.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-6 py-3 font-mono text-xs font-bold text-brand-600">
                    {b.bookingCode}
                  </td>
                  <td className="px-6 py-3 text-text-secondary">
                    {b.bookingDate} {b.timeSlot}
                  </td>
                  <td className="px-6 py-3 font-semibold text-text-primary">
                    Rp {b.totalAmount.toLocaleString("id-ID")}
                  </td>
                  <td className="px-6 py-3">
                    <StatusBadge status={b.status || "pending"} />
                  </td>
                  <td className="px-6 py-3">
                    <PaymentBadge status={b.paymentStatus || "pending"} />
                  </td>
                </tr>
              ))}
              {allBookings.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-text-muted">
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

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-green-100 text-green-700",
    in_progress: "bg-blue-100 text-blue-700",
    completed: "bg-brand-100 text-brand-700",
    cancelled: "bg-red-100 text-red-700",
  };
  const labels: Record<string, string> = {
    pending: "Pending",
    confirmed: "Confirmed",
    in_progress: "In Progress",
    completed: "Completed",
    cancelled: "Cancelled",
  };
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${colors[status] || "bg-gray-100 text-gray-700"}`}
    >
      {labels[status] || status}
    </span>
  );
}

function PaymentBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    settlement: "bg-green-100 text-green-700",
    expire: "bg-gray-100 text-gray-600",
    deny: "bg-red-100 text-red-700",
    cancel: "bg-red-100 text-red-700",
  };
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${colors[status] || "bg-gray-100 text-gray-700"}`}
    >
      {status}
    </span>
  );
}
