"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PatientActions({ patient }: { patient: any }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(patient.name);
  const [email, setEmail] = useState(patient.email ?? "");
  const [phone, setPhone] = useState(patient.phone ?? "");

  const onSave = async () => {
    await fetch("/api/admin/patients", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: patient.id, name, email, phone }),
    });
    setEditing(false);
    router.refresh();
  };

  const onDelete = async () => {
    if (!confirm("Hapus pasien ini?")) return;
    await fetch("/api/admin/patients", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: patient.id }),
    });
    router.refresh();
  };

  if (editing) {
    return (
      <div className="flex flex-wrap gap-2">
        <input value={name} onChange={(e) => setName(e.target.value)} className="rounded border border-gray-300 px-2 py-1 text-xs w-28" />
        <input value={email} onChange={(e) => setEmail(e.target.value)} className="rounded border border-gray-300 px-2 py-1 text-xs w-28" placeholder="email" />
        <input value={phone} onChange={(e) => setPhone(e.target.value)} className="rounded border border-gray-300 px-2 py-1 text-xs w-28" placeholder="phone" />
        <button onClick={onSave} className="rounded-lg bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-600 hover:bg-brand-100">Simpan</button>
        <button onClick={() => setEditing(false)} className="rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-semibold text-text-secondary">Batal</button>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <button onClick={() => setEditing(true)} className="rounded-lg bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-600 hover:bg-brand-100">
        Edit
      </button>
      <button onClick={onDelete} className="rounded-lg bg-red-50 px-2.5 py-1 text-xs font-bold text-red-600 hover:bg-red-100">
        Hapus
      </button>
    </div>
  );
}
