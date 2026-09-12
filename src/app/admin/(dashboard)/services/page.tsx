import Link from "next/link";
import { db } from "@/lib/db";
import { services } from "@/lib/db/schema";
import ServiceDeleteButton from "./ServiceDeleteButton";

export default async function AdminServicesPage() {
  const allServices = await db.select().from(services).orderBy(services.id);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-extrabold text-text-primary font-display">Layanan</h2>
        <Link
          href="/admin/services/new"
          className="rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-700"
        >
          + Layanan Baru
        </Link>
      </div>

      <div className="rounded-2xl bg-white border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-left">
                <th className="px-6 py-3 font-semibold text-text-muted">Layanan</th>
                <th className="px-6 py-3 font-semibold text-text-muted">Kategori</th>
                <th className="px-6 py-3 font-semibold text-text-muted">Harga</th>
                <th className="px-6 py-3 font-semibold text-text-muted">Durasi</th>
                <th className="px-6 py-3 font-semibold text-text-muted">Status</th>
                <th className="px-6 py-3 font-semibold text-text-muted">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {allServices.map((svc) => (
                <tr key={svc.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-6 py-3">
                    <p className="font-semibold text-text-primary">{svc.titleId}</p>
                    <p className="text-xs text-text-muted">{svc.slug}</p>
                  </td>
                  <td className="px-6 py-3">
                    <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-text-secondary">
                      {svc.category}
                    </span>
                  </td>
                  <td className="px-6 py-3 font-semibold text-text-primary">
                    Rp {svc.price.toLocaleString("id-ID")}
                  </td>
                  <td className="px-6 py-3 text-text-secondary">{svc.duration} menit</td>
                  <td className="px-6 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${svc.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {svc.isActive ? "Aktif" : "Nonaktif"}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex gap-2">
                      <Link href={`/admin/services/${svc.id}`} className="rounded-lg bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-600 hover:bg-brand-100">
                        Edit
                      </Link>
                      <ServiceDeleteButton id={svc.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
