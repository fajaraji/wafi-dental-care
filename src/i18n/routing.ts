import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["id", "en"],
  defaultLocale: "id",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/services": {
      id: "/layanan",
      en: "/services",
    },
    "/services/[slug]": {
      id: "/layanan/[slug]",
      en: "/services/[slug]",
    },
    "/about": {
      id: "/tentang-kami",
      en: "/about-us",
    },
    "/doctors": {
      id: "/dokter",
      en: "/doctors",
    },
    "/testimonials": {
      id: "/testimoni",
      en: "/testimonials",
    },
    "/booking": {
      id: "/booking",
      en: "/booking",
    },
    "/contact": {
      id: "/kontak",
      en: "/contact",
    },
    "/blog": {
      id: "/blog",
      en: "/blog",
    },
    "/blog/[slug]": {
      id: "/blog/[slug]",
      en: "/blog/[slug]",
    },
  },
});
