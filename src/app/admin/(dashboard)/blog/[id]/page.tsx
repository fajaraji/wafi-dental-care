import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import BlogForm from "../BlogForm";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const rows = await db.select().from(blogPosts).where(eq(blogPosts.id, Number(id)));
  const post = rows[0];
  if (!post) notFound();

  const normalized = {
    ...post,
    publishedAt: post.publishedAt ? post.publishedAt.toISOString() : null,
  };

  return (
    <div>
      <h2 className="text-xl font-extrabold text-text-primary font-display mb-6">
        Edit Artikel
      </h2>
      <BlogForm post={normalized} />
    </div>
  );
}
