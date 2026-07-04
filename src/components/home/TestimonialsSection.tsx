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
    <section className="py-20 sm:py-28 bg-gradient-to-b from-white to-brand-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block rounded-full bg-accent-100 px-4 py-1.5 text-sm font-semibold text-accent-700">
            Testimoni
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-text-primary sm:text-4xl lg:text-5xl">
            {t("testimonials.title")}
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-text-muted">
            {t("testimonials.subtitle")}
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dummyTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group rounded-2xl bg-white p-6 shadow-md shadow-black/5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Quote */}
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                className="mb-3 text-accent-200"
                fill="currentColor"
              >
                <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
              </svg>

              {/* Stars */}
              <div className="mb-3 flex gap-0.5">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <svg
                    key={i}
                    width="16"
                    height="16"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="text-yellow-400"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-sm leading-relaxed text-text-secondary line-clamp-6">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              <div className="mt-4 flex items-center gap-3 border-t border-gray-100 pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-accent-500 text-sm font-bold text-white">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">
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
