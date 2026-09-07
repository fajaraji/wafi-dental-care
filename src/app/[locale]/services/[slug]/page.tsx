import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getServiceBySlug, getAllServices, formatIDR } from "@/lib/utils/helpers";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Layanan Tidak Ditemukan | Wafi Dental Care" };

  const isId = locale === "id";
  return {
    title: `${isId ? service.titleId : service.titleEn} | Wafi Dental Care`,
    description: (isId ? service.descId : service.descEn)?.slice(0, 160),
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations("services");
  const ct = await getTranslations("common");
  const isId = locale === "id";
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  const categories = [
    ...new Set(getAllServices().map((s) => s.category)),
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="border-b border-brand-600/10 bg-paper pt-32 pb-16 lg:pt-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href={`/${locale}/services`}
            className="inline-flex items-center gap-2 text-sm font-medium text-text-muted hover:text-brand-600 transition-colors mb-6"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5m6-6l-6 6 6 6" />
            </svg>
            {ct("backToServices")}
          </Link>
          <p className="eyebrow flex items-center gap-3">
            <span className="hairline w-10" />
            {service.category}
          </p>
          <h1 className="mt-5 font-display text-4xl font-medium leading-tight text-brand-800 sm:text-5xl lg:text-6xl">
            {isId ? service.titleId : service.titleEn}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main content */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-text-primary font-display mb-4">
                {t("description")}
              </h2>
              <div className="prose prose-lg max-w-none text-text-secondary leading-relaxed">
                <p>{isId ? service.descId : service.descEn}</p>
              </div>

              {/* Booking CTA */}
              <Link
                href={`/${locale}/booking`}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-8 py-3.5 text-base font-bold text-white transition-colors hover:bg-brand-700"
              >
                {t("bookThisService")}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14m-6-6l6 6-6 6" />
                </svg>
              </Link>
            </div>

            {/* Sidebar */}
            <div>
              <div className="sticky top-28 rounded-2xl bg-surface-light p-6 shadow-md">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-4">
                  {ct("category")}
                </h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {categories.map((cat) => (
                    <Link
                      key={cat}
                      href={`/${locale}/services`}
                      className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                        cat === service.category
                          ? "bg-brand-600 text-white"
                          : "bg-white text-text-secondary hover:bg-brand-50"
                      }`}
                    >
                      {cat}
                    </Link>
                  ))}
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-200">
                  <div>
                    <span className="text-xs text-text-muted">{ct("price")}</span>
                    <p className="text-2xl font-extrabold text-accent-600">
                      {formatIDR(service.price)}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-text-muted">{ct("duration")}</span>
                    <p className="text-lg font-semibold text-text-primary">
                      {service.duration} {t("minutes")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
