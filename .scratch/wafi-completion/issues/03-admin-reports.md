# 03: Admin Reports (revenue + CSV)

**What to build:** Halaman `/admin/reports` menampilkan ringkasan revenue (hari ini / minggu ini / bulan ini / total) dari booking dengan `paymentStatus = "settlement"`, daftar booking settlement terbaru, dan tombol export CSV.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] Halaman `/admin/reports` (server) hitung revenue per periode dari tabel bookings
- [ ] Tampilkan stat cards + tabel booking settlement
- [ ] API route `/api/admin/reports/export` return CSV (booking settlement) untuk diunduh
- [ ] Tombol "Export CSV" (client) trigger download, guard `auth()`
