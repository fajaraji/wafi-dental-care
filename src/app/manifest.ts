import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

export default function manifest(): MetadataRoute.Manifest {
  // Check if logo exists for icon reference
  const hasLogo = fs.existsSync(path.join(process.cwd(), "logo.png"));

  return {
    name: "Wafi Dental Care",
    short_name: "Wafi Dental",
    description:
      "Klinik gigi profesional di Yogyakarta — Tepat Tindakanya, Jelas Biayanya",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1565C0",
    icons: hasLogo
      ? [
          {
            src: "/logo.png",
            sizes: "512x512",
            type: "image/png",
          },
        ]
      : [],
  };
}
