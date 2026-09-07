"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

const dummyTestimonials = [
  {
    id: 1,
    name: "Dewi Anggraini",
    rating: 5,
    content:
      "Pelayanan sangat profesional dan ramah! Dokternya telaten menjelaskan setiap tahap perawatan. Scaling gigi saya hasilnya bersih banget. Recommended!",
  },
  {
    id: 2,
    name: "Rizki Pratama",
    rating: 5,
    content:
      "Awalnya takut cabut gigi, tapi ternyata prosesnya cepat dan hampir ga kerasa sakit. Dokternya keren! Tempatnya juga bersih dan nyaman.",
  },
  {
    id: 3,
    name: "Sarah Wijaya",
    rating: 5,
    content:
      "Pasang behel di Wafi Dental Care, hasilnya memuaskan! Dokternya detail banget dan selalu ingetin jadwal kontrol. Harga juga transparan.",
  },
  {
    id: 4,
    name: "Bapak Haryono",
    rating: 5,
    content:
      "Saya pasien senior, takut ke dokter gigi. Tapi tim Wafi sangat sabar dan pengertian. Sekarang rajin kontrol 6 bulan sekali. Terima kasih!",
  },
];

export function TestimonialsSection() {
  const t = useTranslations("home");
  return (
    <section className="py-20 lg:py-28 bg-surface-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <p className="eyebrow flex items-center gap-3">
              <span className="hairline w-10" />
              Testimoni
            </p>
            <h2 className="mt-5 font-display text-4xl font-medium leading-tight text-brand-800 sm:text-5xl">
              {t("testimonials.title")}
            </h2>
          </div>
          <p className="max-w-sm text-text-muted">
            {t("testimonials.subtitle")}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dummyTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="flex flex-col bg-paper p-8"
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                className="text-gold-500"
                fill="currentColor"
              >
                <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
              </svg>

              <div className="mt-5 flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 20 20" fill="currentColor" className="text-gold-500">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="mt-5 font-display text-lg leading-relaxed text-text-secondary">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              <div className="mt-6 flex items-center gap-3 border-t border-brand-600/10 pt-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-600/20 font-display text-sm font-semibold text-brand-700">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-brand-800">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-text-muted">Pasien Wafi Dental Care</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}