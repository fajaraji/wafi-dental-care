import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { BlogList } from "./components/BlogList";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Blog | Wafi Dental Care — Artikel Kesehatan Gigi",
    description:
      "Baca artikel dan tips seputar kesehatan gigi dan mulut dari dokter Wafi Dental Care. Informasi perawatan gigi, orthodonsi, dan estetik.",
  };
}

export default async function BlogPage() {
  const t = await getTranslations("blog");

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-700 via-brand-600 to-accent-600 pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold text-accent-200 backdrop-blur-sm border border-white/10">
            Blog
          </span>
          <h1 className="mt-4 font-display text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-white/70 sm:text-xl">
            {t("subtitle")}
          </p>
        </div>
      </section>

      <BlogList />
    </div>
  );
}
