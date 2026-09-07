"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import { getAllServices, getServiceCategories, formatIDR } from "@/lib/utils/helpers";

export function ServicesGrid() {
  const locale = useLocale();
  const t = useTranslations("services");
  const ct = useTranslations("common");
  const isId = locale === "id";
  const services = getAllServices();
  const categories = getServiceCategories();
  const [activeCategory, setActiveCategory] = useState<string>("");

  const filtered = activeCategory
    ? services.filter((s) => s.category === activeCategory)
    : services;

  return (
    <section className="py-20 lg:py-28 bg-paper">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button
            onClick={() => setActiveCategory("")}
            className={`rounded-full border px-5 py-2 text-sm font-semibold transition-colors duration-200 ${
              activeCategory === ""
                ? "border-ink bg-ink text-white"
                : "border-brand-600/20 text-text-secondary hover:border-brand-600 hover:text-brand-600"
            }`}
          >
            {ct("allCategories")}
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full border px-5 py-2 text-sm font-semibold transition-colors duration-200 ${
                activeCategory === cat
                  ? "border-ink bg-ink text-white"
                  : "border-brand-600/20 text-text-secondary hover:border-brand-600 hover:text-brand-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((service, index) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.4 }}
              >
                <Link
                  href={`/${locale}/services/${service.slug}`}
                  className="group block h-full"
                >
                  <div className="flex h-full flex-col border border-brand-600/10 bg-surface-white p-8 transition-colors duration-300 group-hover:border-gold-500/60">
                    {/* Category label */}
                    <span className="inline-flex w-fit text-[0.65rem] font-semibold uppercase tracking-widest text-gold-600">
                      {service.category}
                    </span>

                    {/* Title */}
                    <h2 className="mt-4 font-display text-2xl font-medium leading-snug text-brand-800 group-hover:text-brand-600 transition-colors">
                      {isId ? service.titleId : service.titleEn}
                    </h2>

                    {/* Short desc */}
                    <p className="mt-2 text-sm text-text-muted line-clamp-2">
                      {isId ? service.descId : service.descEn}
                    </p>

                    {/* Price + Duration */}
                    <div className="mt-auto flex items-center justify-between pt-6">
                      <div>
                        <span className="text-xs text-text-muted">
                          {ct("price")}
                        </span>
                        <p className="font-display text-lg text-gold-600">
                          {formatIDR(service.price)}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-text-muted">
                          {ct("duration")}
                        </span>
                        <p className="text-sm font-semibold text-text-secondary">
                          {service.duration} {t("minutes")}
                        </p>
                      </div>
                    </div>

                    {/* CTA arrow */}
                    <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-brand-600 transition-all duration-300 group-hover:gap-3">
                      {t("detail")}
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M5 12h14m-6-6l6 6-6 6" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
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
