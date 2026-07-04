"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import { getAllBlogPosts, getBlogCategories, formatDate } from "@/lib/utils/helpers";

export function BlogList({ t }: { t: (key: string) => string }) {
  const locale = useLocale();
  const ct = useTranslations("common");
  const isId = locale === "id";
  const posts = getAllBlogPosts();
  const categories = getBlogCategories();
  const [activeCategory, setActiveCategory] = useState<string>("");

  const filtered = activeCategory
    ? posts.filter((p) => p.categoryId === activeCategory)
    : posts;

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button
            onClick={() => setActiveCategory("")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${
              activeCategory === ""
                ? "bg-brand-600 text-white shadow-lg shadow-brand-600/25"
                : "bg-gray-100 text-text-secondary hover:bg-brand-50 hover:text-brand-600"
            }`}
          >
            {ct("allCategories")}
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-brand-600 text-white shadow-lg shadow-brand-600/25"
                  : "bg-gray-100 text-text-secondary hover:bg-brand-50 hover:text-brand-600"
              }`}
            >
              {isId ? cat : posts.find((p) => p.categoryId === cat)?.categoryEn ?? cat}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((post, i) => (
              <motion.article
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <Link
                  href={`/${locale}/blog/${post.slug}`}
                  className="group block overflow-hidden rounded-2xl bg-surface-light shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  {/* Image placeholder */}
                  <div className="aspect-[16/9] bg-gradient-to-br from-brand-100 via-brand-50 to-accent-100 flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-12 w-12 text-brand-200"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M19.5 3h-15A2.25 2.25 0 002.25 5.25v10.5A2.25 2.25 0 004.5 18h15a2.25 2.25 0 002.25-2.25V5.25A2.25 2.25 0 0019.5 3zm0 12.75h-15V5.25h15v10.5z" />
                      <path d="M4.5 15.75l5.25-5.25L15 15.75" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="8.25" cy="8.25" r="1.5" fill="currentColor" />
                    </svg>
                  </div>

                  <div className="p-5">
                    {/* Category + Date */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className="rounded-full bg-brand-100 px-3 py-0.5 text-xs font-semibold text-brand-600">
                        {isId ? post.categoryId : post.categoryEn}
                      </span>
                      <span className="text-xs text-text-muted">
                        {post.publishedAt
                          ? formatDate(post.publishedAt, locale)
                          : ""}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-text-primary font-display leading-snug group-hover:text-brand-600 transition-colors line-clamp-2">
                      {isId ? post.titleId : post.titleEn}
                    </h3>

                    <p className="mt-2 text-sm text-text-secondary line-clamp-3">
                      {isId ? post.excerptId : post.excerptEn}
                    </p>

                    <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                      <span className="text-xs text-text-muted">
                        {ct("by")} {post.author}
                      </span>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition-all duration-300 group-hover:gap-2">
                        {t("readArticle")}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14m-6-6l6 6-6 6" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg text-text-muted">{ct("noResults")}</p>
          </div>
        )}
      </div>
    </section>
  );
}
