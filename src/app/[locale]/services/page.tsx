import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ServicesGrid } from "./components/ServicesGrid";
import { PageHero } from "@/components/layout/PageHero";

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
      <PageHero
        eyebrow="17+ Layanan Gigi"
        title={t("title")}
        subtitle={t("subtitle")}
        centered
      />
      <ServicesGrid />
    </div>
  );
}
