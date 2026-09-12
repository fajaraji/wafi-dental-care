"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TestimonialForm({ initial }: { initial?: any }) {
  const router = useRouter();
  const [form, setForm] = useState({
    patientName: initial?.patientName ?? "",
    rating: initial?.rating != null ? String(initial.rating) : "5",
    contentId: initial?.contentId ?? "",
    contentEn: initial?.contentEn ?? "",
    isActive: initial?.isActive ?? true,
  });
  const [saving, setSaving] = useState(false);

  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/testimonials", {
      method: initial ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(initial ? { id: initial.id, ...form } : form),
    });
    setSaving(false);
    if (!res.ok) return alert("Gagal menyimpan");
    router.push("/admin/testimonials");
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
            <label className={label}>Nama Pasien *</label>
            <input className={cls} value={form.patientName} onChange={(e) => set("patientName", e.target.value)} required />
          </div>
          <div>
            <label className={label}>Rating (1-5)</label>
            <input className={cls} type="number" min={1} max={5} value={form.rating} onChange={(e) => set("rating", e.target.value)} />
          </div>
        </div>
        <div>
          <label className={label}>Testimoni (ID) *</label>
          <textarea className={cls} rows={3} value={form.contentId} onChange={(e) => set("contentId", e.target.value)} required />
        </div>
        <div>
          <label className={label}>Testimonial (EN)</label>
          <textarea className={cls} rows={3} value={form.contentEn} onChange={(e) => set("contentEn", e.target.value)} />
        </div>
        <label className="flex items-center gap-2 text-sm font-semibold text-text-primary">
          <input type="checkbox" checked={form.isActive} onChange={(e) => set("isActive", e.target.checked)} className="h-4 w-4" />
          Tampilkan
        </label>
      </div>
      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="rounded-full bg-ink px-6 py-2.5 text-sm font-bold text-white disabled:opacity-60">
          {saving ? "Menyimpan..." : "Simpan"}
        </button>
        <button type="button" onClick={() => router.push("/admin/testimonials")} className="rounded-full bg-gray-100 px-6 py-2.5 text-sm font-semibold text-text-secondary hover:bg-gray-200">
          Batal
        </button>
      </div>
    </form>
  );
}
