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
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
              >
                <Link
                  href={`/${locale}/services/${service.slug}`}
                  className="group block h-full"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-surface-light p-6 shadow-md shadow-black/5 transition-all duration-300 h-full group-hover:shadow-xl group-hover:shadow-brand-600/10 group-hover:-translate-y-1">
                    {/* Top accent line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-600 to-accent-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    {/* Category badge */}
                    <span className="inline-block rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-600 mb-4">
                      {service.category}
                    </span>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-text-primary font-display group-hover:text-brand-600 transition-colors">
                      {isId ? service.titleId : service.titleEn}
                    </h2>

                    {/* Short desc */}
                    <p className="mt-2 text-sm text-text-muted line-clamp-2">
                      {isId ? service.descId : service.descEn}
                    </p>

                    {/* Price + Duration */}
                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-text-muted">
                          {ct("price")}
                        </span>
                        <p className="text-lg font-extrabold text-accent-600">
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
