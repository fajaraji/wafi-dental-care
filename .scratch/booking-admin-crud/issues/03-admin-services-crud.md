# 03: Admin CRUD Layanan

**What to build:** Admin bisa kelola layanan (list + buat + edit + hapus + toggle aktif) via `/admin/services`. Pola: server page baca DB, form client → `/api/admin/services` (POST/PUT/DELETE) dengan guard `auth()`.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] API route `/api/admin/services` (POST/PUT/DELETE)
- [ ] Tambah tombol buat/edit/hapus di page services
- [ ] Form client `ServiceForm` (titleId/titleEn, descId/descEn, price, duration, category, slug, isActive)
- [ ] Rute `/admin/services/new` + `/admin/services/[id]`
- [ ] Typecheck hijau
