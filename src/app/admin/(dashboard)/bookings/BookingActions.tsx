"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function BookingActions({
  bookingId,
  currentStatus,
}: {
  bookingId: number;
  currentStatus: string;
}) {
  const router = useRouter();

  const updateStatus = useCallback(
    async (status: string) => {
      await fetch("/api/admin/bookings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: bookingId, status }),
      });
      router.refresh();
    },
    [bookingId, router]
  );

  if (currentStatus === "cancelled" || currentStatus === "completed") {
    return <span className="text-xs text-text-muted">-</span>;
  }

  return (
    <div className="flex gap-1">
      {currentStatus === "pending" && (
        <button
          onClick={() => updateStatus("confirmed")}
          className="rounded-lg bg-green-100 px-2.5 py-1 text-xs font-bold text-green-700 hover:bg-green-200 transition-colors"
        >
          Approve
        </button>
      )}
      {currentStatus === "confirmed" && (
        <button
          onClick={() => updateStatus("in_progress")}
          className="rounded-lg bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-700 hover:bg-blue-200 transition-colors"
        >
          Process
        </button>
      )}
      {currentStatus === "in_progress" && (
        <button
          onClick={() => updateStatus("completed")}
          className="rounded-lg bg-brand-100 px-2.5 py-1 text-xs font-bold text-brand-700 hover:bg-brand-200 transition-colors"
        >
          Done
        </button>
      )}
      <button
        onClick={() => updateStatus("cancelled")}
        className="rounded-lg bg-red-100 px-2.5 py-1 text-xs font-bold text-red-700 hover:bg-red-200 transition-colors"
      >
        ✕
      </button>
    </div>
  );
}
