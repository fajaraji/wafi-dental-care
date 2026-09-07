import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { BlogList } from "./components/BlogList";
import { getPublishedBlogPosts, getBlogCategoriesFromDb } from "@/lib/db/queries";
import { PageHero } from "@/components/layout/PageHero";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Blog | Wafi Dental Care — Artikel Kesehatan Gigi",
    description:
      "Baca artikel dan tips seputar kesehatan gigi dan mulut dari dokter Wafi Dental Care. Informasi perawatan gigi, orthodonsi, dan estetik.",
  };
}

export default async function BlogPage() {
  const t = await getTranslations("blog");
  const posts = await getPublishedBlogPosts();
  const categories = await getBlogCategoriesFromDb();

  return (
    <div className="min-h-screen">
      <PageHero eyebrow="Blog" title={t("title")} subtitle={t("subtitle")} centered />
      <BlogList posts={posts} categories={categories} />
    </div>
  );
}
