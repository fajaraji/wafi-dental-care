"use client";

import { useState, useCallback } from "react";

export default function ContactForm({ locale }: { locale: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const isId = locale === "id";

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setStatus("sending");
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, phone, message }),
        });
        if (!res.ok) throw new Error("Failed");
        setStatus("sent");
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } catch {
        setStatus("error");
      }
    },
    [name, email, phone, message]
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
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-text-primary focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/10 transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-1">
            {isId ? "Telepon" : "Phone"} *
          </label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-text-primary focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/10 transition-all"
          />
        </div>
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
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending" || status === "sent"}
        className="w-full rounded-xl bg-gradient-to-r from-brand-600 to-accent-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-600/25 transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-60 disabled:hover:scale-100"
      >
        {status === "sending"
          ? isId ? "Mengirim..." : "Sending..."
          : status === "sent"
          ? isId ? "✅ Terkirim!" : "✅ Sent!"
          : isId ? "Kirim Pesan" : "Send Message"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-600 text-center">
          {isId ? "Gagal mengirim. Coba lagi." : "Failed to send. Try again."}
        </p>
      )}
    </form>
  );
}
