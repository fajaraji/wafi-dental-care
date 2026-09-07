"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export function HeroSection() {
  const locale = useLocale();
  const t = useTranslations("home");

  return (
    <section className="relative overflow-hidden bg-paper pt-28 pb-20 lg:pt-36 lg:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Text */}
          <div className="max-w-xl">
            <p className="eyebrow flex items-center gap-3">
              <span className="hairline w-10" />
              {t("hero.tagline")}
            </p>

            <h1 className="mt-6 font-display text-5xl font-medium leading-[1.05] tracking-tight text-brand-800 sm:text-6xl lg:text-7xl">
              {t("hero.title")}
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-text-secondary">
              {t("hero.subtitle")}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link href={`/${locale}/booking`} className="btn-primary">
                {t("hero.cta")}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14m-6-6l6 6-6 6" />
                </svg>
              </Link>
              <Link href={`/${locale}/services`} className="btn-ghost">
                Lihat Layanan
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-14 grid max-w-md grid-cols-3 divide-x divide-brand-600/15">
              {[
                { num: "17+", label: "Layanan Gigi" },
                { num: "10+", label: "Tahun Pengalaman" },
                { num: "5000+", label: "Pasien Puas" },
              ].map((stat) => (
                <div key={stat.label} className="px-5 first:pl-0">
                  <div className="font-display text-3xl font-semibold text-brand-700">
                    {stat.num}
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-text-muted">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="absolute -right-6 -top-6 h-28 w-28 border border-gold-400/60" />
            <div className="relative overflow-hidden">
              <img
                src="/images/home/hero-clinic.jpg"
                alt="Wafi Dental Care Clinic"
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
            <div className="absolute -bottom-5 -left-5 h-24 w-24 bg-gold-500/15" />
          </div>
        </div>
      </div>
    </section>
  );
}
