"use client";

import { useRouter } from "next/navigation";

export default function MessageReadToggle({ id, isRead }: { id: number; isRead: boolean }) {
  const router = useRouter();
  const onToggle = async () => {
    await fetch("/api/admin/messages", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, isRead: !isRead }),
    });
    router.refresh();
  };
  return (
    <button onClick={onToggle} className="rounded-lg bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-600 hover:bg-brand-100">
      {isRead ? "Tandai belum dibaca" : "Tandai dibaca"}
    </button>
  );
}
