import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { TestimonialsList } from "./components/TestimonialsList";
import { PageHero } from "@/components/layout/PageHero";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Testimoni Pasien | Wafi Dental Care - Klinik Gigi Yogyakarta",
    description:
      "Pengalaman nyata pasien Wafi Dental Care. Baca testimoni tentang pelayanan dokter gigi profesional, tempat nyaman, dan hasil perawatan memuaskan.",
  };
}

export default async function TestimonialsPage() {
  const t = await getTranslations("testimonials");

  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow="Testimoni"
        title={t("title")}
        subtitle={t("subtitle")}
        centered
      />
      <TestimonialsList />
    </div>
  );
}
