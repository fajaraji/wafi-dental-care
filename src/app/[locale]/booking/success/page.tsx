"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "motion/react";

export default function BookingSuccessPage() {
  const locale = useLocale();
  const t = useTranslations("booking");
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id") || "";
  const status = searchParams.get("status") || "settlement";

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-brand-900 pt-32 pb-12">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-medium text-white sm:text-5xl">
            {t("successTitle")}
          </h1>
          <p className="mt-3 text-lg text-white/70">{t("successSubtitle")}</p>
        </div>
      </div>

      <section className="py-16">
        <div className="mx-auto max-w-lg px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-green-100"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-14 w-14 text-green-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <motion.path
                d="M5 13l4 4L19 7"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              />
            </svg>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-extrabold text-text-primary font-display mb-3">
              {t("bookingConfirmed")}
            </h2>
            <p className="text-text-secondary mb-8">{t("bookingConfirmedDesc")}</p>

            <div className="rounded-2xl bg-surface-light p-6 mb-8">
              <div className="text-sm text-text-muted mb-1">{t("orderId")}</div>
              <p className="text-lg font-bold text-brand-600 font-mono tracking-wide">
                {orderId}
              </p>
              {status === "pending" && (
                <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                  <span className="h-2 w-2 rounded-full bg-yellow-500 animate-pulse" />
                  {t("awaitingPayment")}
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={`/${locale}`}
                className="rounded-full bg-ink px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-700"
              >
                {t("backToHome")}
              </Link>
              <a
                href={`https://wa.me/6287726652023?text=Halo%20Wafi%20Dental%20Care%2C%20saya%20baru%20melakukan%20booking%20dengan%20kode%20${orderId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-green-500 px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-green-600"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
