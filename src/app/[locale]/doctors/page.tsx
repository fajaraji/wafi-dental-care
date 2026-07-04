import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { DoctorsGrid } from "./components/DoctorsGrid";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Tim Dokter | Wafi Dental Care - Dokter Gigi Profesional Yogyakarta",
    description:
      "Tim dokter gigi profesional Wafi Dental Care: spesialis endodonsi, orthodonsi, bedah mulut, dan dokter gigi umum. Berpengalaman dan bersertifikasi.",
  };
}

export default async function DoctorsPage() {
  const t = await getTranslations("doctors");

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-700 via-brand-600 to-accent-600 pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold text-accent-200 backdrop-blur-sm border border-white/10">
            Tim Profesional
          </span>
          <h1 className="mt-4 font-display text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-white/70 sm:text-xl">
            {t("subtitle")}
          </p>
        </div>
      </section>

      <DoctorsGrid t={t} />
    </div>
  );
}
