import { getTranslations } from "next-intl/server";
import { HeroSection } from "@/components/home/HeroSection";
import { USPSection } from "@/components/home/USPSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { DoctorsSection } from "@/components/home/DoctorsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";
import { ClinicInfo } from "@/components/home/ClinicInfo";

export default async function HomePage() {
  const t = await getTranslations("home");

  return (
    <>
      <HeroSection t={t} />
      <USPSection t={t} />
      <ServicesSection t={t} />
      <DoctorsSection t={t} />
      <TestimonialsSection t={t} />
      <ClinicInfo />
      <CTASection t={t} />
    </>
  );
}
