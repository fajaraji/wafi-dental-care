"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "motion/react";
import { getAllDoctors, dayNames } from "@/lib/utils/helpers";

export function DoctorsGrid() {
  const locale = useLocale();
  const t = useTranslations("doctors");
  const ct = useTranslations("common");
  const isId = locale === "id";
  const doctors = getAllDoctors();

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12">
          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group"
            >
              <div className="grid grid-cols-[110px,1fr] gap-5 sm:grid-cols-[180px,1fr] sm:gap-6 lg:grid-cols-[180px,1fr,280px]">
                {/* Photo */}
                <div className="relative h-40 w-full overflow-hidden bg-surface-light sm:h-48 sm:w-40 lg:h-52 lg:w-44">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg viewBox="0 0 80 80" className="h-20 w-20 text-brand-200">
                      <circle cx="40" cy="28" r="16" fill="currentColor" />
                      <ellipse cx="40" cy="70" rx="28" ry="18" fill="currentColor" />
                    </svg>
                  </div>
                  <img
                    src={doctor.photo}
                    alt={doctor.name}
                    className="absolute inset-0 h-full w-full object-cover object-top"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <div className="absolute inset-0 border border-brand-600/10" />
                </div>

                {/* Bio */}
                <div>
                  <h2 className="text-2xl font-bold text-text-primary font-display">
                    {doctor.name}
                  </h2>
                  <p className="mt-1 text-base font-semibold text-accent-600">
                    {isId ? doctor.titleId : doctor.titleEn}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                    {isId ? doctor.bioId : doctor.bioEn}
                  </p>

                  <Link
                    href={`/${locale}/booking`}
                    className="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand-50 px-5 py-2.5 text-sm font-semibold text-brand-600 transition-all duration-300 hover:bg-brand-600 hover:text-white"
                  >
                    {t("bookWith", { name: doctor.name.split(",")[0] })}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14m-6-6l6 6-6 6" />
                    </svg>
                  </Link>
                </div>

                {/* Schedule */}
                <div className="border border-brand-600/10 bg-paper p-5">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-gold-600 mb-3">
                    {t("schedule")}
                  </h3>
                  <ul className="space-y-1.5">
                    {doctor.schedules.map((s, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-text-secondary font-medium min-w-[100px]">
                          {dayNames[isId ? "id" : "en"][s.dayOfWeek]}
                        </span>
                        <span className="text-brand-600 font-semibold tabular-nums">
                          {s.startTime} – {s.endTime}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Divider */}
              {index < doctors.length - 1 && (
                <div className="mt-12 border-b border-gray-100" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
