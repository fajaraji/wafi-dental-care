"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { BlogPost } from "@/lib/db/queries";

type FormState = {
  titleId: string;
  titleEn: string;
  slug: string;
  categoryId: string;
  categoryEn: string;
  author: string;
  image: string;
  excerptId: string;
  excerptEn: string;
  contentId: string;
  contentEn: string;
  isPublished: boolean;
  publishedAt: string;
};

export default function BlogForm({ post }: { post?: BlogPost }) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    titleId: post?.titleId ?? "",
    titleEn: post?.titleEn ?? "",
    slug: post?.slug ?? "",
    categoryId: post?.categoryId ?? "",
    categoryEn: post?.categoryEn ?? "",
    author: post?.author ?? "",
    image: post?.image ?? "",
    excerptId: post?.excerptId ?? "",
    excerptEn: post?.excerptEn ?? "",
    contentId: post?.contentId ?? "",
    contentEn: post?.contentEn ?? "",
    isPublished: post?.isPublished ?? false,
    publishedAt: post?.publishedAt ? post.publishedAt.slice(0, 10) : "",
  });
  const [saving, setSaving] = useState(false);

  const set = (key: keyof FormState, value: string | boolean) =>
    setForm((f) => ({ ...f, [key]: value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/blog", {
      method: post ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post ? { id: post.id, ...form } : form),
    });
    setSaving(false);
    if (!res.ok) {
      alert("Gagal menyimpan artikel");
      return;
    }
    router.push("/admin/blog");
    router.refresh();
  };

  const inputCls =
    "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-text-primary focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/10";
  const labelCls = "block text-xs font-semibold text-text-muted mb-1";

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="rounded-2xl bg-white border border-gray-100 p-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Judul (ID) *</label>
            <input className={inputCls} value={form.titleId} onChange={(e) => set("titleId", e.target.value)} required />
          </div>
          <div>
            <label className={labelCls}>Title (EN) *</label>
            <input className={inputCls} value={form.titleEn} onChange={(e) => set("titleEn", e.target.value)} required />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Slug *</label>
            <input className={inputCls} value={form.slug} onChange={(e) => set("slug", e.target.value)} required />
          </div>
          <div>
            <label className={labelCls}>Author</label>
            <input className={inputCls} value={form.author} onChange={(e) => set("author", e.target.value)} />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Kategori (ID)</label>
            <input className={inputCls} value={form.categoryId} onChange={(e) => set("categoryId", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Category (EN)</label>
            <input className={inputCls} value={form.categoryEn} onChange={(e) => set("categoryEn", e.target.value)} />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Gambar (path)</label>
            <input className={inputCls} value={form.image} onChange={(e) => set("image", e.target.value)} placeholder="/images/blog/contoh.svg" />
          </div>
          <div>
            <label className={labelCls}>Tanggal Publikasi</label>
            <input type="date" className={inputCls} value={form.publishedAt} onChange={(e) => set("publishedAt", e.target.value)} />
          </div>
        </div>

        <div>
          <label className={labelCls}>Excerpt (ID)</label>
          <textarea className={inputCls} rows={2} value={form.excerptId} onChange={(e) => set("excerptId", e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>Excerpt (EN)</label>
          <textarea className={inputCls} rows={2} value={form.excerptEn} onChange={(e) => set("excerptEn", e.target.value)} />
        </div>

        <div>
          <label className={labelCls}>Konten (ID) — pisahkan paragraf dengan baris kosong, heading pakai `## `, bullet pakai `* `</label>
          <textarea className={inputCls} rows={10} value={form.contentId} onChange={(e) => set("contentId", e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>Content (EN)</label>
          <textarea className={inputCls} rows={10} value={form.contentEn} onChange={(e) => set("contentEn", e.target.value)} />
        </div>

        <label className="flex items-center gap-2 text-sm font-semibold text-text-primary">
          <input
            type="checkbox"
            checked={form.isPublished}
            onChange={(e) => set("isPublished", e.target.checked)}
            className="h-4 w-4 rounded border-gray-300"
          />
          Publikasikan
        </label>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-gradient-to-r from-brand-600 to-accent-500 px-6 py-2.5 text-sm font-bold text-white shadow-md disabled:opacity-60"
        >
          {saving ? "Menyimpan..." : "Simpan"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/blog")}
          className="rounded-xl bg-gray-100 px-6 py-2.5 text-sm font-semibold text-text-secondary hover:bg-gray-200"
        >
          Batal
        </button>
      </div>
    </form>
  );
}
