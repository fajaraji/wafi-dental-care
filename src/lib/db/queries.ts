import { db } from "./index";
import { blogPosts } from "./schema";
import { eq, and, desc } from "drizzle-orm";

export type BlogPost = {
  id: number;
  titleId: string;
  titleEn: string;
  contentId: string;
  contentEn: string | null;
  excerptId: string | null;
  excerptEn: string | null;
  slug: string;
  image: string | null;
  categoryId: string | null;
  categoryEn: string | null;
  author: string | null;
  publishedAt: string | null;
  isPublished: boolean | null;
};

function normalize(post: typeof blogPosts.$inferSelect): BlogPost {
  return {
    ...post,
    publishedAt: post.publishedAt ? post.publishedAt.toISOString() : null,
  };
}

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  const rows = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.isPublished, true))
    .orderBy(desc(blogPosts.publishedAt));
  return rows.map(normalize);
}

export async function getBlogPostBySlugFromDb(slug: string): Promise<BlogPost | null> {
  const rows = await db
    .select()
    .from(blogPosts)
    .where(and(eq(blogPosts.slug, slug), eq(blogPosts.isPublished, true)));
  const post = rows[0];
  return post ? normalize(post) : null;
}

export async function getBlogCategoriesFromDb(): Promise<string[]> {
  const posts = await getPublishedBlogPosts();
  return [...new Set(posts.map((p) => p.categoryId).filter(Boolean) as string[])];
}
