"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "motion/react";

const dummyDoctors = [
  {
    id: 1,
    name: "drg. Siti Nuraini, Sp.KG",
    specialtyId: "Spesialis Konservasi Gigi (Endodonsi)",
    specialtyEn: "Conservative Dentistry Specialist (Endodontics)",
    photo: "/images/doctors/dr1.jpg",
    bioId: "Lulusan FKG Universitas Gadjah Mada dengan pengalaman lebih dari 8 tahun di bidang perawatan saluran akar.",
  },
  {
    id: 2,
    name: "drg. Ahmad Fauzi, Sp.Ort",
    specialtyId: "Spesialis Orthodonsi",
    specialtyEn: "Orthodontics Specialist",
    photo: "/images/doctors/dr2.jpg",
    bioId: "Berpengalaman menangani berbagai kasus behel dan aligner dengan pendekatan yang nyaman dan estetik.",
  },
  {
    id: 3,
    name: "drg. Ratna Dewi",
    specialtyId: "Dokter Gigi Umum",
    specialtyEn: "General Dentist",
    photo: "/images/doctors/dr3.jpg",
    bioId: "Fokus pada perawatan gigi preventif dan estetik dengan sentuhan yang lembut dan ramah untuk semua usia.",
  },
  {
    id: 4,
    name: "drg. Budi Santoso, Sp.BM",
    specialtyId: "Spesialis Bedah Mulut",
    specialtyEn: "Oral Surgery Specialist",
    photo: "/images/doctors/dr4.jpg",
    bioId: "Ahli dalam prosedur odontektomi dan implan gigi dengan teknik minimal invasif untuk pemulihan cepat.",
  },
];

export function DoctorsSection() {
  const locale = useLocale();
  const isId = locale === "id";
  const t = useTranslations("home");

  return (
    <section className="py-20 sm:py-28 bg-surface-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <p className="eyebrow flex items-center gap-3">
              <span className="hairline w-10" />
              Tim Profesional
            </p>
            <h2 className="mt-5 font-display text-4xl font-medium leading-tight text-brand-800 sm:text-5xl">
              {t("doctors.title")}
            </h2>
          </div>
          <p className="max-w-sm text-text-muted">
            {t("doctors.subtitle")}
          </p>
        </div>

        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
          {dummyDoctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: (index % 2) * 0.08 }}
              className="group flex gap-6"
            >
              {/* Portrait */}
              <div className="relative h-40 w-32 flex-shrink-0 overflow-hidden rounded-2xl bg-surface-light lg:h-44 lg:w-36">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg viewBox="0 0 80 80" className="h-16 w-16 text-brand-200">
                    <circle cx="40" cy="28" r="16" fill="currentColor" />
                    <ellipse cx="40" cy="70" rx="28" ry="18" fill="currentColor" />
                  </svg>
                </div>
                <img
                  src={doctor.photo}
                  alt={doctor.name}
                  className="absolute inset-0 h-full w-full object-cover object-top"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <div className="absolute inset-0 border border-brand-600/10 transition-colors duration-300 group-hover:border-gold-500/50" />
              </div>

              {/* Text */}
              <div>
                <h3 className="font-display text-xl font-medium leading-snug text-brand-800">
                  {doctor.name}
                </h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-gold-600">
                  {isId ? doctor.specialtyId : doctor.specialtyEn}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-text-muted line-clamp-3">
                  {doctor.bioId}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
