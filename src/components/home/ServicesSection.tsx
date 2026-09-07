"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "motion/react";

const dummyServices = [
  {
    id: "root-canal",
    titleId: "Root Canal Treatment",
    titleEn: "Root Canal Treatment",
    price: 1500000,
    category: "Endodonsi",
  },
  {
    id: "behel",
    titleId: "Behel Gigi / Orthodontic",
    titleEn: "Dental Braces / Orthodontic",
    price: 8500000,
    category: "Orthodonsi",
  },
  {
    id: "scaling",
    titleId: "Scaling / Pembersihan Karang Gigi",
    titleEn: "Scaling / Dental Cleaning",
    price: 350000,
    category: "Umum",
  },
  {
    id: "implan",
    titleId: "Implan Gigi / Gigi Tiruan Permanen",
    titleEn: "Dental Implant / Permanent Denture",
    price: 12000000,
    category: "Bedah",
  },
  {
    id: "veneer",
    titleId: "Veneer Gigi",
    titleEn: "Dental Veneer",
    price: 2500000,
    category: "Estetik",
  },
  {
    id: "bleaching",
    titleId: "Bleaching / Pemutihan Gigi",
    titleEn: "Teeth Whitening / Bleaching",
    price: 1200000,
    category: "Estetik",
  },
];

function formatIDR(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export function ServicesSection() {
  const locale = useLocale();
  const isId = locale === "id";
  const t = useTranslations("home");

  return (
    <section className="py-20 lg:py-28 bg-paper">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <p className="eyebrow flex items-center gap-3">
              <span className="hairline w-10" />
              Layanan Lengkap
            </p>
            <h2 className="mt-5 font-display text-4xl font-medium leading-tight text-brand-800 sm:text-5xl">
              {t("services.title")}
            </h2>
          </div>
          <p className="max-w-sm text-text-muted">
            {t("services.subtitle")}
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dummyServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: (index % 3) * 0.08 }}
              className="group flex flex-col border border-brand-600/10 bg-surface-white p-8 transition-colors duration-300 hover:border-gold-500/50"
            >
              <span className="font-display text-sm text-gold-600">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="mt-6 inline-flex w-fit border border-brand-600/15 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-widest text-brand-600">
                {service.category}
              </span>
              <h3 className="mt-4 font-display text-2xl font-medium leading-snug text-brand-800">
                {isId ? service.titleId : service.titleEn}
              </h3>
              <div className="mt-auto pt-6">
                <p className="font-display text-xl text-gold-600">
                  {formatIDR(service.price)}
                </p>
                <Link
                  href={`/${locale}/services/${service.id}`}
                  className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 transition-all duration-300 group-hover:gap-3"
                >
                  Detail Layanan
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14m-6-6l6 6-6 6" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All */}
        <div className="mt-14">
          <Link href={`/${locale}/services`} className="btn-ghost">
            {t("services.viewAll")}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14m-6-6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}