"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ServiceFormState = {
  titleId: string;
  titleEn: string;
  slug: string;
  category: string;
  price: string;
  duration: string;
  descId: string;
  descEn: string;
  isActive: boolean;
};

export default function ServiceForm({ initial }: { initial?: any }) {
  const router = useRouter();
  const [form, setForm] = useState<ServiceFormState>({
    titleId: initial?.titleId ?? "",
    titleEn: initial?.titleEn ?? "",
    slug: initial?.slug ?? "",
    category: initial?.category ?? "Umum",
    price: initial?.price != null ? String(initial.price) : "",
    duration: initial?.duration != null ? String(initial.duration) : "",
    descId: initial?.descId ?? "",
    descEn: initial?.descEn ?? "",
    isActive: initial?.isActive ?? true,
  });
  const [saving, setSaving] = useState(false);

  const set = (k: keyof ServiceFormState, v: string | boolean) =>
    setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/services", {
      method: initial ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(initial ? { id: initial.id, ...form } : form),
    });
    setSaving(false);
    if (!res.ok) return alert("Gagal menyimpan");
    router.push("/admin/services");
    router.refresh();
  };

  const cls =
    "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-text-primary focus:border-brand-600 focus:outline-none";
  const label = "block text-xs font-semibold text-text-muted mb-1";

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="rounded-2xl bg-white border border-gray-100 p-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={label}>Nama (ID) *</label>
            <input className={cls} value={form.titleId} onChange={(e) => set("titleId", e.target.value)} required />
          </div>
          <div>
            <label className={label}>Name (EN) *</label>
            <input className={cls} value={form.titleEn} onChange={(e) => set("titleEn", e.target.value)} required />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={label}>Slug *</label>
            <input className={cls} value={form.slug} onChange={(e) => set("slug", e.target.value)} required />
          </div>
          <div>
            <label className={label}>Kategori</label>
            <input className={cls} value={form.category} onChange={(e) => set("category", e.target.value)} />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={label}>Harga (IDR) *</label>
            <input className={cls} type="number" value={form.price} onChange={(e) => set("price", e.target.value)} required />
          </div>
          <div>
            <label className={label}>Durasi (menit) *</label>
            <input className={cls} type="number" value={form.duration} onChange={(e) => set("duration", e.target.value)} required />
          </div>
        </div>
        <div>
          <label className={label}>Deskripsi (ID)</label>
          <textarea className={cls} rows={3} value={form.descId} onChange={(e) => set("descId", e.target.value)} />
        </div>
        <div>
          <label className={label}>Description (EN)</label>
          <textarea className={cls} rows={3} value={form.descEn} onChange={(e) => set("descEn", e.target.value)} />
        </div>
        <label className="flex items-center gap-2 text-sm font-semibold text-text-primary">
          <input type="checkbox" checked={form.isActive} onChange={(e) => set("isActive", e.target.checked)} className="h-4 w-4" />
          Aktif
        </label>
      </div>
      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="rounded-full bg-ink px-6 py-2.5 text-sm font-bold text-white disabled:opacity-60">
          {saving ? "Menyimpan..." : "Simpan"}
        </button>
        <button type="button" onClick={() => router.push("/admin/services")} className="rounded-full bg-gray-100 px-6 py-2.5 text-sm font-semibold text-text-secondary hover:bg-gray-200">
          Batal
        </button>
      </div>
    </form>
  );
}
