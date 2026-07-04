import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ServicesGrid } from "./components/ServicesGrid";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Layanan | Wafi Dental Care - Klinik Gigi Yogyakarta",
    description:
      "17+ layanan gigi lengkap di Wafi Dental Care: root canal, behel, implan, veneer, scaling, bleaching, dan banyak lagi. Melayani seluruh keluarga.",
  };
}

export default async function ServicesPage() {
  const t = await getTranslations("services");

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-700 via-brand-600 to-accent-600 pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold text-accent-200 backdrop-blur-sm border border-white/10">
            17+ Layanan Gigi
          </span>
          <h1 className="mt-4 font-display text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-white/70 sm:text-xl">
            {t("subtitle")}
          </p>
        </div>
      </section>

      <ServicesGrid />
    </div>
  );
}
