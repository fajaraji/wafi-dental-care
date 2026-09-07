import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://wafidentalcare.id";

  const staticRoutes = [
    "",
    "/about",
    "/booking",
    "/blog",
    "/contact",
    "/doctors",
    "/services",
    "/testimonials",
  ];

  const locales = ["id", "en"];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of staticRoutes) {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "/blog" ? "weekly" : "monthly",
        priority: route === "" ? 1.0 : route === "/booking" ? 0.9 : 0.7,
      });
    }
  }

  return entries;
}
