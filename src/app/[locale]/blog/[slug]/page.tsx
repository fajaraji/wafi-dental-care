import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { formatDate } from "@/lib/utils/helpers";
import { getBlogPostBySlugFromDb, getPublishedBlogPosts } from "@/lib/db/queries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getBlogPostBySlugFromDb(slug);
  if (!post) return { title: "Artikel Tidak Ditemukan | Wafi Dental Care" };

  const isId = locale === "id";
  return {
    title: `${isId ? post.titleId : post.titleEn} | Wafi Dental Care Blog`,
    description: (isId ? post.excerptId : post.excerptEn)?.slice(0, 160),
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations("blog");
  const ct = await getTranslations("common");
  const isId = locale === "id";
  const post = await getBlogPostBySlugFromDb(slug);

  if (!post) notFound();

  const content = isId ? post.contentId : post.contentEn;
  const paragraphs = content?.split("\n\n").filter(Boolean) ?? [];

  const relatedPosts = (await getPublishedBlogPosts())
    .filter((p) => p.id !== post.id && p.categoryId === post.categoryId)
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="border-b border-brand-600/10 bg-paper pt-32 pb-16 lg:pt-40">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-sm font-medium text-text-muted hover:text-brand-600 transition-colors mb-6"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5m6-6l-6 6 6 6" />
            </svg>
            {ct("backToBlog")}
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="eyebrow">
              {isId ? post.categoryId : post.categoryEn}
            </span>
            <span className="h-1 w-1 rounded-full bg-gold-500" />
            <span className="text-sm text-text-muted">
              {post.publishedAt ? formatDate(post.publishedAt, locale) : ""}
            </span>
          </div>

          <h1 className="font-display text-4xl font-medium leading-tight text-brand-800 sm:text-5xl">
            {isId ? post.titleId : post.titleEn}
          </h1>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-600/25 font-display text-sm font-semibold text-brand-700">
              {post.author?.charAt(0)}
            </div>
            <span className="text-sm text-text-secondary">
              {ct("by")} {post.author}
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <article className="prose prose-lg max-w-none">
            {paragraphs.map((para, i) => {
              // Detect headings
              if (para.startsWith("## ")) {
                return (
                  <h2
                    key={i}
                    className="text-2xl font-bold text-text-primary font-display mt-10 mb-4"
                  >
                    {para.slice(3)}
                  </h2>
                );
              }
              if (para.startsWith("* ")) {
                return (
                  <ul key={i} className="list-disc pl-6 space-y-1 text-text-secondary my-4">
                    {para
                      .split("\n")
                      .filter((l) => l.startsWith("* "))
                      .map((item, j) => (
                        <li key={j}>{item.slice(2)}</li>
                      ))}
                  </ul>
                );
              }
              if (para.match(/^\d+\. /)) {
                return (
                  <ol key={i} className="list-decimal pl-6 space-y-1 text-text-secondary my-4">
                    {para
                      .split("\n")
                      .filter((l) => /^\d+\. /.test(l))
                      .map((item, j) => (
                        <li key={j}>{item.replace(/^\d+\. /, "")}</li>
                      ))}
                  </ol>
                );
              }
              return (
                <p key={i} className="text-lg leading-relaxed text-text-secondary mb-4">
                  {para}
                </p>
              );
            })}
          </article>

          {/* Share + Related */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-bold text-text-primary font-display mb-6">
              {t("relatedPosts")}
            </h3>
            <div className="grid gap-6 sm:grid-cols-3">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.id}
                  href={`/${locale}/blog/${rp.slug}`}
                  className="group rounded-xl bg-surface-light p-4 transition-all duration-300 hover:bg-brand-50"
                >
                  <span className="text-xs text-text-muted">
                    {isId ? rp.categoryId : rp.categoryEn}
                  </span>
                  <h4 className="mt-1 text-sm font-bold text-text-primary group-hover:text-brand-600 transition-colors line-clamp-2">
                    {isId ? rp.titleId : rp.titleEn}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
