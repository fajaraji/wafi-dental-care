import { getTranslations } from "next-intl/server";
import { HeroSection } from "@/components/home/HeroSection";
import { USPSection } from "@/components/home/USPSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { DoctorsSection } from "@/components/home/DoctorsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";
import { ClinicInfo } from "@/components/home/ClinicInfo";
import { getServicesFromDb, getDoctorsFromDb, getTestimonialsFromDb } from "@/lib/db/queries";

export default async function HomePage() {
  const t = await getTranslations("home");
  const [services, doctors, testimonials] = await Promise.all([
    getServicesFromDb(),
    getDoctorsFromDb(),
    getTestimonialsFromDb(),
  ]);

  return (
    <>
      <HeroSection />
      <USPSection />
      <ServicesSection services={services} />
      <DoctorsSection doctors={doctors} />
      <TestimonialsSection testimonials={testimonials} />
      <ClinicInfo />
      <CTASection />
    </>
  );
}
