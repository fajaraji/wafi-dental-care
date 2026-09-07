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
    <section className="py-20 sm:py-28 bg-surface-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Map & Address */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="eyebrow flex items-center gap-3">
              <span className="hairline w-10" />
              Lokasi Kami
            </p>
            <h2 className="mt-4 font-display text-4xl font-medium leading-tight text-brand-800">
              Sangat Strategis &amp; Mudah Diakses
            </h2>
            <p className="mt-3 text-text-muted">
              Dekat dari Kampus UPN, FBE UII, Amikom, dan Pakuwon Mall
            </p>

            {/* Address Card */}
            <div className="mt-6 border border-brand-600/10 bg-paper p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-brand-600/25 text-brand-600">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display text-lg font-medium text-brand-800">Wafi Dental Care</h3>
                  <p className="mt-1 text-text-muted leading-relaxed">
                    Jl Nusa Indah No 233H<br />
                    Condongcatur, Depok, Sleman<br />
                    Yogyakarta
                  </p>
                  <a
                    href="https://maps.app.goo.gl/3tAWSV5JY7nrmVPA6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-gold-600"
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
                src="https://maps.google.com/maps?q=Wafi%20Dental%20Care%20Jl%20Nusa%20Indah%20No%20233H%20Condongcatur%20Depok%20Sleman%20Yogyakarta&z=16&output=embed"
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
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="eyebrow flex items-center gap-3">
              <span className="hairline w-10" />
              Jam Praktik
            </p>
            <h2 className="mt-4 font-display text-4xl font-medium leading-tight text-brand-800">
              Buka Setiap Hari
            </h2>
            <p className="mt-3 text-text-muted">
              Melayani pasien 7 hari seminggu dengan jam praktik yang panjang
            </p>

            {/* Hours Table */}
            <div className="mt-6 overflow-hidden border border-brand-600/10 bg-paper">
              <div className="divide-y divide-brand-600/8">
                {workingDays.map((schedule, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between px-6 py-4 ${
                      index === new Date().getDay() - 1
                        ? "bg-brand-50 border-l-2 border-gold-500"
                        : ""
                    }`}
                  >
                    <span className="text-sm font-medium text-text-secondary">
                      {schedule.day}
                    </span>
                    <span className="text-sm font-semibold text-brand-700">
                      {schedule.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nearby Landmarks */}
            <div className="mt-8">
              <h3 className="font-display text-lg font-medium text-brand-800 mb-4">
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
                    className="flex items-center gap-3 border border-brand-600/10 bg-paper px-4 py-3"
                  >
                    <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold-500" />
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
