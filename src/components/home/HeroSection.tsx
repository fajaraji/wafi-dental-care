"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export function HeroSection() {
  const locale = useLocale();
  const t = useTranslations("home");

  return (
    <section className="relative overflow-hidden pt-36 pb-16 lg:pt-40 lg:pb-20">
      {/* Background image */}
      <img
        src="/images/home/hero-clinic.jpg"
        alt="Wafi Dental Care Clinic"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/75" />
      <div className="absolute inset-0 bg-brand-900/30 mix-blend-multiply" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow-dark flex items-center gap-3">
            <span className="hairline w-10" />
            {t("hero.tagline")}
          </p>

          <h1 className="mt-4 font-display text-5xl font-medium leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            {t("hero.title")}
          </h1>

          <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/75">
            {t("hero.subtitle")}
          </p>

          <p className="mt-3 max-w-xl text-base leading-relaxed text-white/70">
            {t("hero.description")}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href={`/${locale}/booking`} className="btn-light">
              {t("hero.cta")}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14m-6-6l6 6-6 6" />
              </svg>
            </Link>
            <Link
              href={`/${locale}/services`}
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white/80 hover:bg-white/10"
            >
              Lihat Layanan
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-10 grid max-w-md grid-cols-3 divide-x divide-white/20">
            {[
              { num: "17+", label: "Layanan Gigi" },
              { num: "10+", label: "Tahun Pengalaman" },
              { num: "5000+", label: "Pasien Puas" },
            ].map((stat) => (
              <div key={stat.label} className="px-5 first:pl-0">
                <div className="font-display text-3xl font-semibold text-white">
                  {stat.num}
                </div>
                <div className="mt-1 text-xs uppercase tracking-wider text-white/60">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}