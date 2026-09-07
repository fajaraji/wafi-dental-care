import Link from "next/link";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import BlogDeleteButton from "./BlogDeleteButton";

export default async function AdminBlogPage() {
  const posts = await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-extrabold text-text-primary font-display">Blog</h2>
        <Link
          href="/admin/blog/new"
          className="rounded-xl bg-gradient-to-r from-brand-600 to-accent-500 px-5 py-2.5 text-sm font-bold text-white shadow-md hover:scale-105 transition-transform"
        >
          + Artikel Baru
        </Link>
      </div>

      <div className="rounded-2xl bg-white border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-left">
                <th className="px-6 py-3 font-semibold text-text-muted">Judul</th>
                <th className="px-6 py-3 font-semibold text-text-muted">Slug</th>
                <th className="px-6 py-3 font-semibold text-text-muted">Author</th>
                <th className="px-6 py-3 font-semibold text-text-muted">Status</th>
                <th className="px-6 py-3 font-semibold text-text-muted">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-6 py-3 font-semibold text-text-primary max-w-xs truncate">
                    {p.titleId}
                  </td>
                  <td className="px-6 py-3 text-xs text-text-muted">{p.slug}</td>
                  <td className="px-6 py-3 text-text-secondary">{p.author || "-"}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        p.isPublished ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {p.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/blog/${p.id}`}
                        className="rounded-lg bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-600 hover:bg-brand-100"
                      >
                        Edit
                      </Link>
                      <BlogDeleteButton id={p.id} />
                    </div>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-text-muted">
                    Belum ada artikel
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
