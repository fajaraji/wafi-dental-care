"use client";

import { useState, useCallback } from "react";

const WA_NUMBER = "6287726652023";

export default function ContactForm({ locale }: { locale: string }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  const isId = locale === "id";

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setStatus("sending");

      try {
        // Save lead to Neon DB
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, message }),
        });
        if (!res.ok) throw new Error("Failed");

        // Compose WhatsApp message
        const waMessage = encodeURIComponent(
          `Halo Wafi Dental Care,\n\nNama: ${name}\n\nPesan:\n${message}`
        );

        // Redirect to WhatsApp
        window.open(`https://wa.me/${WA_NUMBER}?text=${waMessage}`, "_blank");

        // Reset form
        setName("");
        setMessage("");
        setStatus("idle");
      } catch {
        setStatus("error");
      }
    },
    [name, message]
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-1">
          {isId ? "Nama Lengkap" : "Full Name"} *
        </label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-text-primary focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/10 transition-all"
          placeholder={isId ? "Masukkan nama Anda" : "Enter your name"}
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-1">
          {isId ? "Pesan" : "Message"} *
        </label>
        <textarea
          rows={4}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-text-primary focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/10 transition-all resize-none"
          placeholder={isId ? "Tulis pesan atau pertanyaan Anda..." : "Write your message or question..."}
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-xl bg-gradient-to-r from-brand-600 to-accent-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-600/25 transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-60 disabled:hover:scale-100"
      >
        {status === "sending"
          ? isId ? "Mengirim..." : "Sending..."
          : isId ? "Kirim via WhatsApp" : "Send via WhatsApp"}
      </button>

      {status === "error" && (
        <p className="text-sm text-red-600 text-center">
          {isId ? "Gagal mengirim. Coba lagi." : "Failed to send. Try again."}
        </p>
      )}
    </form>
  );
}
