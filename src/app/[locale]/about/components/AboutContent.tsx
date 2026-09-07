"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

const values = [
  { key: "value1", color: "from-brand-600 to-brand-700" },
  { key: "value2", color: "from-accent-500 to-accent-600" },
  { key: "value3", color: "from-brand-500 to-brand-600" },
  { key: "value4", color: "from-accent-400 to-accent-500" },
];

const facilities = [
  { key: "facility1", icon: "🛋️" },
  { key: "facility2", icon: "🏥" },
  { key: "facility3", icon: "🧹" },
  { key: "facility4", icon: "🩻" },
  { key: "facility5", icon: "🅿️" },
  { key: "facility6", icon: "👨‍⚕️" },
];

export function AboutContent() {
  const t = useTranslations("about");
  return (
    <>
      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block rounded-full bg-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-700 mb-4">
                {t("story")}
              </span>
              <h2 className="text-3xl font-extrabold text-text-primary font-display sm:text-4xl">
                {t("title")}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-text-secondary">
                {t("storyContent")}
              </p>
              <p className="mt-4 text-lg leading-relaxed text-text-secondary">
                {t("storyContent2")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-3xl bg-gradient-to-br from-brand-100 via-accent-100 to-brand-50 shadow-xl overflow-hidden">
                <div className="flex h-full items-center justify-center">
                  <svg viewBox="0 0 200 120" className="w-48 h-auto text-brand-200">
                    <path d="M100 20c-25 0-47 13-58 33C30 68 20 92 20 112c0 14 10 8 23 8l7-14c3-7 10-3 17-3 5 0 8 7 8 14v14c0 9 8-1 17-1s17 1 17-1V90c0-7 3-14 8-14 7 0 14-4 17 3l7 14c3 0 23 6 23-8 0-20-10-44-22-63C189 33 167 20 142 20H100z" fill="currentColor" />
                    <path d="M130 20c-19 0-35 10-43 25-9 16-17 32-17 48 0 8 5 8 12 8l4-9c2-5 6-3 11-3 3 0 5 5 5 9v20c0 6 5 0 11 0s11 0 11 0V78c0-5 2-9 5-9 5 0 9-3 11 3l4 9c3 0 12 0 12-8 0-16-8-32-17-48-8-15-24-25-43-25h-12z" fill="currentColor" opacity="0.6" />
                    <text x="100" y="85" textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="bold" opacity="0.8">#OnPointDentist</text>
                  </svg>
                </div>
                <img
                  src="/images/about/clinic-reception.jpg"
                  alt="Wafi Dental Care Clinic"
                  className="absolute inset-0 h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-2xl bg-gradient-to-br from-accent-400 to-brand-600 opacity-20 blur-xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-surface-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl font-extrabold text-text-primary font-display sm:text-4xl">
              {t("values")}
            </h2>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <motion.div
                key={v.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-2xl bg-white p-6 shadow-md text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div
                  className={`mx-auto mb-4 h-3 w-12 rounded-full bg-gradient-to-r ${v.color}`}
                />
                <h3 className="text-lg font-bold text-text-primary font-display">
                  {t(`${v.key}Title`)}
                </h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                  {t(`${v.key}Desc`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl font-extrabold text-text-primary font-display sm:text-4xl">
              {t("facilities")}
            </h2>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((f, i) => (
              <motion.div
                key={f.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 rounded-2xl bg-surface-light p-5 transition-all duration-300 hover:bg-brand-50"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white text-2xl shadow-sm">
                  {f.icon}
                </div>
                <div>
                  <h3 className="text-base font-bold text-text-primary font-display">
                    {t(`${f.key}Title`)}
                  </h3>
                  <p className="mt-1 text-sm text-text-secondary leading-relaxed">
                    {t(`${f.key}Desc`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
