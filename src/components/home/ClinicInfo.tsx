"use client";

import { motion } from "motion/react";

const workingDays = [
  { day: "Senin / Monday", time: "08:00 - 21:00" },
  { day: "Selasa / Tuesday", time: "08:00 - 21:00" },
  { day: "Rabu / Wednesday", time: "08:00 - 21:00" },
  { day: "Kamis / Thursday", time: "08:00 - 21:00" },
  { day: "Jumat / Friday", time: "08:00 - 21:00" },
  { day: "Sabtu / Saturday", time: "08:00 - 21:00" },
  { day: "Minggu / Sunday", time: "08:00 - 21:00" },
];

export function ClinicInfo() {
  return (
    <section className="py-20 sm:py-28 bg-surface-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Map & Address */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block rounded-full bg-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-700 mb-4">
              Lokasi Kami
            </span>
            <h2 className="font-display text-3xl font-extrabold text-text-primary sm:text-4xl">
              Sangat Strategis & Mudah Diakses
            </h2>
            <p className="mt-3 text-lg text-text-muted">
              Dekat dari Kampus UPN, FBE UII, Amikom, dan Pakuwon Mall
            </p>

            {/* Address Card */}
            <div className="mt-6 rounded-2xl bg-white p-6 shadow-md">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-accent-500 text-white shadow-lg">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-primary">Wafi Dental Care</h3>
                  <p className="mt-1 text-text-muted leading-relaxed">
                    Jl Nusa Indah No 233H<br />
                    Condongcatur, Depok, Sleman<br />
                    Yogyakarta
                  </p>
                  <a
                    href="https://maps.app.goo.gl/3tAWSV5JY7nrmVPA6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-accent-600 hover:text-accent-700"
                  >
                    Buka di Google Maps
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6m4-3h6v6m-11 5L21 3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="mt-6 overflow-hidden rounded-2xl shadow-lg">
              <iframe
                src="https://www.google.com/maps?q=Wafi+Dental+Care+Jl+Nusa+Indah+No+233H+Condongcatur+Depok+Sleman+Yogyakarta&output=embed"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Wafi Dental Care Location"
                className="w-full"
              />
            </div>
          </motion.div>

          {/* Operating Hours */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block rounded-full bg-accent-100 px-4 py-1.5 text-sm font-semibold text-accent-700 mb-4">
              Jam Praktik
            </span>
            <h2 className="font-display text-3xl font-extrabold text-text-primary sm:text-4xl">
              Buka Setiap Hari
            </h2>
            <p className="mt-3 text-lg text-text-muted">
              Melayani pasien 7 hari seminggu dengan jam praktik yang panjang
            </p>

            {/* Hours Table */}
            <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-md">
              <div className="divide-y divide-gray-100">
                {workingDays.map((schedule, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between px-6 py-4 ${
                      index === new Date().getDay() - 1
                        ? "bg-brand-50 border-l-4 border-accent-500"
                        : ""
                    }`}
                  >
                    <span className="text-sm font-medium text-text-secondary">
                      {schedule.day}
                    </span>
                    <span className="text-sm font-bold text-brand-600">
                      {schedule.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nearby Landmarks */}
            <div className="mt-8">
              <h3 className="text-lg font-bold text-text-primary font-display mb-4">
                Dekat Dengan:
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "Kampus UPN Yogyakarta",
                  "Kampus FBE UII",
                  "Kampus Amikom",
                  "Pakuwon Mall",
                ].map((place) => (
                  <div
                    key={place}
                    className="flex items-center gap-2 rounded-xl bg-white p-3 shadow-sm"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-accent-500 flex-shrink-0"
                    >
                      <path d="M5 12h14m-7-7l7 7-7 7" />
                    </svg>
                    <span className="text-sm font-medium text-text-secondary">
                      {place}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
