import { getTranslations } from "next-intl/server";
import ContactForm from "./ContactForm";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("title"),
    description: t("metaDesc"),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-br from-brand-700 via-brand-600 to-accent-600 pt-32 pb-12">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-extrabold text-white sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-3 text-lg text-white/70">{t("subtitle")}</p>
        </div>
      </div>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Contact Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@wafidentalcare"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl bg-gray-50 p-8 text-center transition-all duration-300 hover:bg-gray-100 hover:shadow-lg"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-bold text-text-primary">TikTok</h3>
              <p className="mt-2 text-text-muted">@wafidentalcare</p>
              <span className="mt-3 inline-block text-sm font-semibold text-gray-700">
                {locale === "id" ? "Follow Kami" : "Follow Us"} →
              </span>
            </a>

            {/* Email */}
            <a
              href="mailto:wafidentalcare@gmail.com"
              className="group rounded-2xl bg-brand-50 p-8 text-center transition-all duration-300 hover:bg-brand-100 hover:shadow-lg"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-bold text-text-primary">Email</h3>
              <p className="mt-2 text-text-muted">wafidentalcare@gmail.com</p>
              <span className="mt-3 inline-block text-sm font-semibold text-brand-600">
                {locale === "id" ? "Kirim Email" : "Send Email"} →
              </span>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/wafidentalcare/"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl bg-pink-50 p-8 text-center transition-all duration-300 hover:bg-pink-100 hover:shadow-lg"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-purple-500 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-bold text-text-primary">Instagram</h3>
              <p className="mt-2 text-text-muted">@wafidentalcare</p>
              <span className="mt-3 inline-block text-sm font-semibold text-pink-600">
                {locale === "id" ? "Follow Kami" : "Follow Us"} →
              </span>
            </a>
          </div>

          {/* Google Maps + Contact Form */}
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <iframe
                src="https://www.google.com/maps?q=Wafi+Dental+Care+Jl+Nusa+Indah+No+233H+Condongcatur+Depok+Sleman+Yogyakarta&output=embed"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Wafi Dental Care"
              />
            </div>

            <div className="rounded-2xl bg-surface-light p-8">
              <h2 className="text-2xl font-extrabold text-text-primary font-display mb-2">
                {t("sendMessage")}
              </h2>
              <p className="text-text-muted mb-6">{t("sendMessageDesc")}</p>
              <ContactForm locale={locale} />
            </div>
          </div>

          {/* Clinic Info */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-brand-50 p-6">
              <p className="text-sm font-semibold text-brand-600">📍 {t("address")}</p>
              <p className="mt-2 text-sm text-text-secondary">
                Jl Nusa Indah No 233H, Condongcatur, Depok, Sleman, Yogyakarta 55283
              </p>
            </div>
            <div className="rounded-xl bg-brand-50 p-6">
              <p className="text-sm font-semibold text-brand-600">🕐 {t("hours")}</p>
              <p className="mt-2 text-sm text-text-secondary whitespace-pre-line">
                {locale === "id"
                  ? "Senin – Minggu: 08:00–21:00 WIB"
                  : "Monday – Sunday: 08:00–21:00 WIB"}
              </p>
            </div>
            <div className="rounded-xl bg-brand-50 p-6">
              <p className="text-sm font-semibold text-brand-600">📞 {t("phone")}</p>
              <p className="mt-2 text-sm text-text-secondary">0877-2665-2023</p>
            </div>
            <div className="rounded-xl bg-brand-50 p-6">
              <p className="text-sm font-semibold text-brand-600">
                {t("nearby")}
              </p>
              <p className="mt-2 text-sm text-text-secondary">
                UPN, FBE UII, Amikom, Pakuwon Mall
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
