"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const DAYS = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

type Schedule = { dayOfWeek: number; startTime: string; endTime: string };

export default function DoctorForm({ initial }: { initial?: any }) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: initial?.name ?? "",
    title: initial?.title ?? "drg.",
    specialtyId: initial?.specialtyId ?? "",
    specialtyEn: initial?.specialtyEn ?? "",
    photo: initial?.photo ?? "",
    bioId: initial?.bioId ?? "",
    bioEn: initial?.bioEn ?? "",
    isActive: initial?.isActive ?? true,
  });
  const [schedules, setSchedules] = useState<Schedule[]>(
    initial?.schedules?.length
      ? initial.schedules.map((s: any) => ({
          dayOfWeek: s.dayOfWeek,
          startTime: s.startTime?.slice(0, 5),
          endTime: s.endTime?.slice(0, 5),
        }))
      : [{ dayOfWeek: 1, startTime: "08:00", endTime: "16:00" }]
  );
  const [saving, setSaving] = useState(false);

  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/doctors", {
      method: initial ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(initial ? { id: initial.id, ...form, schedules } : { ...form, schedules }),
    });
    setSaving(false);
    if (!res.ok) return alert("Gagal menyimpan");
    router.push("/admin/doctors");
    router.refresh();
  };

  const cls =
    "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-text-primary focus:border-brand-600 focus:outline-none";
  const label = "block text-xs font-semibold text-text-muted mb-1";

  const updSched = (i: number, k: keyof Schedule, v: any) =>
    setSchedules((s) => s.map((x, j) => (j === i ? { ...x, [k]: v } : x)));

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="rounded-2xl bg-white border border-gray-100 p-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={label}>Nama *</label>
            <input className={cls} value={form.name} onChange={(e) => set("name", e.target.value)} required />
          </div>
          <div>
            <label className={label}>Gelar</label>
            <input className={cls} value={form.title} onChange={(e) => set("title", e.target.value)} />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={label}>Spesialisasi (ID)</label>
            <input className={cls} value={form.specialtyId} onChange={(e) => set("specialtyId", e.target.value)} />
          </div>
          <div>
            <label className={label}>Specialty (EN)</label>
            <input className={cls} value={form.specialtyEn} onChange={(e) => set("specialtyEn", e.target.value)} />
          </div>
        </div>
        <div>
          <label className={label}>Foto (path)</label>
          <input className={cls} value={form.photo} onChange={(e) => set("photo", e.target.value)} placeholder="/images/doctors/dr1.jpg" />
        </div>
        <div>
          <label className={label}>Bio (ID)</label>
          <textarea className={cls} rows={2} value={form.bioId} onChange={(e) => set("bioId", e.target.value)} />
        </div>
        <div>
          <label className={label}>Bio (EN)</label>
          <textarea className={cls} rows={2} value={form.bioEn} onChange={(e) => set("bioEn", e.target.value)} />
        </div>
        <label className="flex items-center gap-2 text-sm font-semibold text-text-primary">
          <input type="checkbox" checked={form.isActive} onChange={(e) => set("isActive", e.target.checked)} className="h-4 w-4" />
          Aktif
        </label>

        <div className="pt-2 border-t border-gray-100">
          <p className="text-sm font-semibold text-text-primary mb-2">Jadwal Praktik</p>
          <div className="space-y-2">
            {schedules.map((s, i) => (
              <div key={i} className="flex gap-2">
                <select
                  className={cls}
                  value={s.dayOfWeek}
                  onChange={(e) => updSched(i, "dayOfWeek", Number(e.target.value))}
                >
                  {DAYS.map((d, idx) => (
                    <option key={idx} value={idx}>{d}</option>
                  ))}
                </select>
                <input className={cls} type="time" value={s.startTime} onChange={(e) => updSched(i, "startTime", e.target.value)} />
                <input className={cls} type="time" value={s.endTime} onChange={(e) => updSched(i, "endTime", e.target.value)} />
                <button
                  type="button"
                  onClick={() => setSchedules((x) => x.filter((_, j) => j !== i))}
                  className="px-2 text-red-500 text-sm"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setSchedules((s) => [...s, { dayOfWeek: 1, startTime: "08:00", endTime: "16:00" }])}
            className="mt-2 text-sm font-semibold text-brand-600"
          >
            + Tambah jadwal
          </button>
        </div>
      </div>
      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="rounded-full bg-ink px-6 py-2.5 text-sm font-bold text-white disabled:opacity-60">
          {saving ? "Menyimpan..." : "Simpan"}
        </button>
        <button type="button" onClick={() => router.push("/admin/doctors")} className="rounded-full bg-gray-100 px-6 py-2.5 text-sm font-semibold text-text-secondary hover:bg-gray-200">
          Batal
        </button>
      </div>
    </form>
  );
}
