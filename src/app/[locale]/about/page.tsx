import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AboutContent } from "./components/AboutContent";
import { PageHero } from "@/components/layout/PageHero";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Tentang Kami | Wafi Dental Care - Klinik Gigi Yogyakarta",
    description:
      "Wafi Dental Care — klinik gigi profesional di Yogyakarta dengan motto #OnPointDentist. Tepat tindakannya, jelas biayanya. Tim dokter spesialis berpengalaman.",
  };
}

export default async function AboutPage() {
  const t = await getTranslations("about");

  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow="#OnPointDentist"
        title={t("title")}
        subtitle={t("subtitle")}
        centered
      />
      <AboutContent />
    </div>
  );
}
