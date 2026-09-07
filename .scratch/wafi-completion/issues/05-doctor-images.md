# 05: Gambar dokter

**What to build:** Foto dokter tampil di homepage (`DoctorsSection`) dan halaman `/doctors` (`DoctorsGrid`), bukan ikon orang SVG. Generate gambar placeholder lokal ke `public/images/doctors/`.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] Generate SVG gambar dr1..dr5 ke `public/images/doctors/*.svg`
- [ ] Update `seed.ts` `doctorsSeed` photo path `.jpg` → `.svg`
- [ ] `DoctorsSection.tsx` (homepage) render `doctor.photo` dengan onError fallback ke ikon
- [ ] `DoctorsGrid.tsx` render `doctor.photo` dengan onError fallback ke ikon
