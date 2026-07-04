import { db } from "@/lib/db";
import { contactMessages } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export default async function AdminMessagesPage() {
  const messages = await db
    .select()
    .from(contactMessages)
    .orderBy(desc(contactMessages.createdAt));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-extrabold text-text-primary font-display">Pesan</h2>
        <span className="text-sm text-text-muted">{messages.length} pesan</span>
      </div>

      <div className="space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`rounded-2xl border p-6 transition-colors ${
              msg.isRead ? "bg-white border-gray-100" : "bg-brand-50 border-brand-200"
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-text-primary">{msg.name}</h3>
                <p className="text-sm text-text-muted">
                  {msg.email && `${msg.email} · `}{msg.phone}
                </p>
              </div>
              <span className="text-xs text-text-muted">
                {msg.createdAt?.toISOString().slice(0, 10)}
              </span>
            </div>
            <p className="mt-3 text-text-secondary text-sm whitespace-pre-wrap">
              {msg.message}
            </p>
          </div>
        ))}
        {messages.length === 0 && (
          <div className="rounded-2xl bg-white border border-gray-100 p-12 text-center text-text-muted">
            Belum ada pesan
          </div>
        )}
      </div>
    </div>
  );
}
