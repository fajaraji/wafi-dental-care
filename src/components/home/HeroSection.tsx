"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { motion } from "motion/react";

export function HeroSection({ t }: { t: (key: string) => string }) {
  const locale = useLocale();

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-700 via-brand-600 to-accent-600">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djJIMjR2LTJoMTJ6TTMwIDI4djJoLTZ2LTJoNnptMi0yaDJ2MmgtMnYtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />
        {/* Animated gradient blobs */}
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-accent-400/20 blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-brand-800/30 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-4 inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold text-accent-200 backdrop-blur-sm border border-white/10"
            >
              {t("hero.tagline")}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="font-display text-5xl font-extrabold leading-tight text-white sm:text-6xl lg:text-7xl"
            >
              {t("hero.title")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-4 text-xl font-medium text-accent-200 sm:text-2xl"
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mt-6 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg"
            >
              Klinik gigi profesional di Yogyakarta dengan dokter berpengalaman, peralatan modern, dan layanan lengkap untuk kesehatan gigi optimal Anda dan keluarga.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link
                href={`/${locale}/booking`}
                className="group inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-base font-bold text-brand-600 shadow-2xl shadow-black/20 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                {t("hero.cta")}
                <svg
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M5 12h14m-7-7l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href={`/${locale}/services`}
                className="rounded-xl border-2 border-white/30 px-8 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:border-white/60 hover:bg-white/10"
              >
                Lihat Layanan
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="mt-12 flex gap-8"
            >
              {[
                { num: "17+", label: "Layanan Gigi" },
                { num: "10+", label: "Tahun Pengalaman" },
                { num: "5000+", label: "Pasien Puas" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-extrabold text-white sm:text-3xl">
                    {stat.num}
                  </div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1.0, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="relative mx-auto aspect-square max-w-md">
              {/* Decorative circles */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent-400/30 to-brand-500/20 blur-2xl animate-pulse" />
              <div className="absolute inset-8 rounded-full border-2 border-dashed border-white/20" />
              <div className="absolute inset-16 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center">
                {/* Tooth Icon */}
                <svg
                  viewBox="0 0 120 120"
                  className="h-32 w-32 text-white/80"
                  fill="currentColor"
                >
                  <path d="M60 10c-15 0-28 8-35 20C18 42 12 56 12 68c0 10 6 18 14 20 4 1 8-1 10-5l4-8c2-4 6-6 10-5 3 1 5 4 5 8v20c0 5 5 10 10 10s10-5 10-10V78c0-4 2-7 5-8 4-1 8 1 10 5l4 8c2 4 6 6 10 5 8-2 14-10 14-20 0-12-6-26-13-38C87 18 74 10 60 10z" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5, y: [0, 8, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <svg width="24" height="32" viewBox="0 0 24 32" className="text-white/50">
          <rect x="2" y="2" width="20" height="28" rx="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="3" fill="currentColor" />
        </svg>
      </motion.div>
    </section>
  );
}
