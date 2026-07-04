"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";

const galleryCategories = [
  {
    key: "clinic",
    labelId: "Bagian Depan Klinik",
    labelEn: "Clinic Front",
    images: [
      { src: "/images/gallery/clinic-1.jpg", altId: "Fasad Wafi Dental Care", altEn: "Wafi Dental Care Facade" },
      { src: "/images/gallery/clinic-2.jpg", altId: "Pintu Masuk Klinik", altEn: "Clinic Entrance" },
      { src: "/images/gallery/clinic-3.jpg", altId: "Area Resepsionis", altEn: "Reception Area" },
    ],
  },
  {
    key: "facilities",
    labelId: "Fasilitas",
    labelEn: "Facilities",
    images: [
      { src: "/images/gallery/facility-1.jpg", altId: "Ruang Tunggu", altEn: "Waiting Room" },
      { src: "/images/gallery/facility-2.jpg", altId: "Dental Unit 1", altEn: "Dental Unit 1" },
      { src: "/images/gallery/facility-3.jpg", altId: "Dental Unit 2", altEn: "Dental Unit 2" },
      { src: "/images/gallery/facility-4.jpg", altId: "Ruang Konsultasi", altEn: "Consultation Room" },
    ],
  },
  {
    key: "events",
    labelId: "Kegiatan",
    labelEn: "Events",
    images: [
      { src: "/images/gallery/event-1.jpg", altId: "Tim Dokter Wafi", altEn: "Wafi Dental Team" },
      { src: "/images/gallery/event-2.jpg", altId: "Edukasi Kesehatan Gigi", altEn: "Dental Health Education" },
    ],
  },
];

export function GalleryGrid({
  isId,
}: {
  isId: boolean;
}) {
  const t = useTranslations("gallery");
  const [activeTab, setActiveTab] = useState("clinic");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const activeImages =
    galleryCategories.find((c) => c.key === activeTab)?.images ?? [];

  return (
    <>
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Tabs */}
          <div className="flex justify-center gap-2 mb-12">
            {galleryCategories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveTab(cat.key)}
                className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  activeTab === cat.key
                    ? "bg-brand-600 text-white shadow-lg shadow-brand-600/25"
                    : "bg-gray-100 text-text-secondary hover:bg-brand-50 hover:text-brand-600"
                }`}
              >
                {isId ? cat.labelId : cat.labelEn}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {activeImages.map((img, i) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br from-brand-100 to-accent-100 shadow-md"
                onClick={() => setLightboxIndex(i)}
              >
                {/* Placeholder visual */}
                <div className="flex h-full w-full items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-12 w-12 text-brand-200"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                      strokeLinecap="round"
                    />
                    <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                    <path d="M21 15l-5-5L5 21" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="text-sm font-medium text-white">
                    {isId ? img.altId : img.altEn}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              className="absolute top-4 right-4 text-white/60 hover:text-white text-2xl"
              onClick={() => setLightboxIndex(null)}
            >
              ✕
            </button>

            <button
              className="absolute left-4 text-white/60 hover:text-white text-3xl"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(
                  (lightboxIndex - 1 + activeImages.length) %
                    activeImages.length
                );
              }}
            >
              ‹
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative aspect-[4/3] max-h-[80vh] max-w-3xl rounded-2xl bg-gradient-to-br from-brand-100 to-accent-100 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex h-full w-full items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="h-20 w-20 text-brand-200"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <p className="text-white font-medium">
                  {isId
                    ? activeImages[lightboxIndex].altId
                    : activeImages[lightboxIndex].altEn}
                </p>
              </div>
            </motion.div>

            <button
              className="absolute right-4 text-white/60 hover:text-white text-3xl"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(
                  (lightboxIndex + 1) % activeImages.length
                );
              }}
            >
              ›
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
