"use client";

import { useLocale } from "next-intl";
import { motion } from "motion/react";
import { getAllTestimonials, formatDate } from "@/lib/utils/helpers";

export function TestimonialsList({ t }: { t: (key: string) => string }) {
  const locale = useLocale();
  const isId = locale === "id";
  const testimonials = getAllTestimonials();

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group rounded-2xl bg-surface-light p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Quote icon */}
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

              {/* Content */}
              <p className="text-sm leading-relaxed text-text-secondary">
                &ldquo;{isId ? testimonial.contentId : testimonial.contentEn}&rdquo;
              </p>

              {/* Author */}
              <div className="mt-4 flex items-center gap-3 border-t border-gray-100 pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-accent-500 text-sm font-bold text-white">
                  {testimonial.patientName.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">
                    {testimonial.patientName}
                  </p>
                  <p className="text-xs text-text-muted">{t("patient")}</p>
                </div>
                <div className="ml-auto text-xs text-text-muted">
                  {testimonial.createdAt
                    ? formatDate(testimonial.createdAt, locale)
                    : ""}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
