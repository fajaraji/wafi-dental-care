import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { DoctorsGrid } from "./components/DoctorsGrid";
import { PageHero } from "@/components/layout/PageHero";

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
      <PageHero
        eyebrow="Tim Profesional"
        title={t("title")}
        subtitle={t("subtitle")}
        centered
      />
      <DoctorsGrid />
    </div>
  );
}
