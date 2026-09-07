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
    <section className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block rounded-full bg-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-700">
            Tim Profesional
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-text-primary sm:text-4xl lg:text-5xl">
            {t("doctors.title")}
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-text-muted">
            {t("doctors.subtitle")}
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {dummyDoctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="group text-center"
            >
              {/* Photo */}
              <div className="relative mx-auto mb-5 h-48 w-48 overflow-hidden rounded-3xl bg-gradient-to-br from-brand-100 to-accent-100 shadow-lg">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg viewBox="0 0 80 80" className="h-20 w-20 text-brand-300">
                    <circle cx="40" cy="28" r="16" fill="currentColor" />
                    <ellipse cx="40" cy="70" rx="28" ry="18" fill="currentColor" />
                  </svg>
                </div>
                <img
                  src={doctor.photo}
                  alt={doctor.name}
                  className="absolute inset-0 h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-600/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end justify-center pb-4">
                  <span className="text-white text-sm font-semibold">Lihat Profil</span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-text-primary font-display">
                {doctor.name}
              </h3>
              <p className="mt-1 text-sm font-medium text-accent-600">
                {isId ? doctor.specialtyId : doctor.specialtyEn}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-text-muted line-clamp-3">
                {doctor.bioId}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
