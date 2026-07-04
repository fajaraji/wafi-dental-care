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
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "id_ID",
    alternateLocale: "en_US",
    siteName: "Wafi Dental Care",
    title: "Wafi Dental Care — Tepat Tindakanya, Jelas Biayanya",
    description:
      "Klinik gigi profesional di Yogyakarta. Dokter berpengalaman, alat steril, layanan lengkap.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${inter.variable} ${jakarta.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
