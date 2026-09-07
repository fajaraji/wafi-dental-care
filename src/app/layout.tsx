import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wafidentalcare.id"),
  title: {
    default: "Wafi Dental Care — Tepat Tindakanya, Jelas Biayanya",
    template: "%s — Wafi Dental Care",
  },
  description:
    "Klinik gigi profesional di Yogyakarta. Dokter berpengalaman, alat steril, layanan lengkap. Root canal, behel, implan gigi, veneer, scaling & lebih.",
  keywords: [
    "dokter gigi yogyakarta",
    "klinik gigi sleman",
    "behel gigi",
    "root canal",
    "implan gigi",
    "scaling",
    "cabut gigi",
    "dental clinic",
    "wafi dental care",
  ],
  alternates: {
    canonical: "https://wafidentalcare.id",
    languages: {
      id: "https://wafidentalcare.id/id",
      en: "https://wafidentalcare.id/en",
    },
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "id_ID",
    alternateLocale: "en_US",
    siteName: "Wafi Dental Care",
    title: "Wafi Dental Care — Tepat Tindakanya, Jelas Biayanya",
    description:
      "Klinik gigi profesional di Yogyakarta. Dokter berpengalaman, alat steril, layanan lengkap.",
    url: "https://wafidentalcare.id",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Wafi Dental Care - Klinik Gigi Yogyakarta",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wafi Dental Care — Tepat Tindakanya, Jelas Biayanya",
    description:
      "Klinik gigi profesional di Yogyakarta. Dokter berpengalaman, alat steril, layanan lengkap.",
    images: ["/og-image.png"],
  },
  verification: {
    google: "google-site-verification-placeholder",
  },
  category: "Healthcare",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: "Wafi Dental Care",
  image: "https://wafidentalcare.id/logo.png",
  "@id": "https://wafidentalcare.id",
  url: "https://wafidentalcare.id",
  telephone: "+6287726652023",
  priceRange: "Rp500,000 - Rp15,000,000",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jl. Nusa Indah No. 233H, Condongcatur",
    addressLocality: "Sleman",
    addressRegion: "DI Yogyakarta",
    postalCode: "55283",
    addressCountry: "ID",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -7.7582,
    longitude: 110.3782,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "08:00",
    closes: "21:00",
  },
  sameAs: [
    "https://instagram.com/wafidentalcare",
    "https://facebook.com/wafidentalcare",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      className={`${inter.variable} ${jakarta.variable}`}
      lang="id"
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
