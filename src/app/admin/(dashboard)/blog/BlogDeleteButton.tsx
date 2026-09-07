"use client";

import { useRouter } from "next/navigation";

export default function BlogDeleteButton({ id }: { id: number }) {
  const router = useRouter();

  const onDelete = async () => {
    if (!confirm("Hapus artikel ini?")) return;
    await fetch("/api/admin/blog", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    router.refresh();
  };

  return (
    <button
      onClick={onDelete}
      className="rounded-lg bg-red-50 px-2.5 py-1 text-xs font-bold text-red-600 hover:bg-red-100"
    >
      Hapus
    </button>
  );
}
