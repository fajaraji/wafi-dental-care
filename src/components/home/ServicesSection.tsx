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
    icon: "🦷",
  },
  {
    id: "behel",
    titleId: "Behel Gigi / Orthodontic",
    titleEn: "Dental Braces / Orthodontic",
    price: 8500000,
    category: "Orthodonsi",
    icon: "😁",
  },
  {
    id: "scaling",
    titleId: "Scaling / Pembersihan Karang Gigi",
    titleEn: "Scaling / Dental Cleaning",
    price: 350000,
    category: "Umum",
    icon: "✨",
  },
  {
    id: "implan",
    titleId: "Implan Gigi / Gigi Tiruan Permanen",
    titleEn: "Dental Implant / Permanent Denture",
    price: 12000000,
    category: "Bedah",
    icon: "🔩",
  },
  {
    id: "veneer",
    titleId: "Veneer Gigi",
    titleEn: "Dental Veneer",
    price: 2500000,
    category: "Estetik",
    icon: "💎",
  },
  {
    id: "bleaching",
    titleId: "Bleaching / Pemutihan Gigi",
    titleEn: "Teeth Whitening / Bleaching",
    price: 1200000,
    category: "Estetik",
    icon: "🌟",
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
    <section className="py-20 sm:py-28 bg-surface-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block rounded-full bg-accent-100 px-4 py-1.5 text-sm font-semibold text-accent-700">
            Layanan Lengkap
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-text-primary sm:text-4xl lg:text-5xl">
            {t("services.title")}
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-text-muted">
            {t("services.subtitle")}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dummyServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-md shadow-black/5 transition-all duration-300 hover:shadow-xl hover:shadow-brand-600/10"
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-600 to-accent-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="mb-4 text-4xl">{service.icon}</div>
              <span className="inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600">
                {service.category}
              </span>
              <h3 className="mt-3 text-lg font-bold text-text-primary font-display">
                {isId ? service.titleId : service.titleEn}
              </h3>
              <p className="mt-2 text-lg font-extrabold text-accent-600">
                {formatIDR(service.price)}
              </p>
              <Link
                href={`/${locale}/services/${service.id}`}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 transition-all duration-300 group-hover:gap-3"
              >
                Detail Layanan
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14m-6-6l6 6-6 6" />
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link
            href={`/${locale}/services`}
            className="inline-flex items-center gap-2 rounded-xl border-2 border-brand-600 px-8 py-3.5 text-base font-semibold text-brand-600 transition-all duration-300 hover:bg-brand-600 hover:text-white"
          >
            {t("services.viewAll")}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14m-6-6l6 6-6 6" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
