# 04: Admin CRUD Dokter + jadwal

**What to build:** Admin kelola dokter (list + buat + edit + hapus + toggle aktif) + jadwal praktik. Form → `/api/admin/doctors` (POST/PUT/DELETE) + `/api/admin/doctors/schedules`.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] API `/api/admin/doctors` (POST/PUT/DELETE)
- [ ] Form `DoctorForm` (name, title, specialtyId/En, photo, bioId/bioEn, isActive) + jadwal (dayOfWeek, start, end)
- [ ] Rute `/admin/doctors/new` + `/admin/doctors/[id]`
- [ ] Hapus/update jadwal bersamaan
- [ ] Typecheck hijau
