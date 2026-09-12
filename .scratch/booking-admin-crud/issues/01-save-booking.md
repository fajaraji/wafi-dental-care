# 01: Simpan booking + patient ke DB

**What to build:** Saat Snap token sukses dibuat di `/api/midtrans/token`, simpan patient (upsert by phone) + baris booking ke tabel `bookings` dengan `midtrans_order_id` = orderId. Webhook lalu bisa update status. Tanpa ini admin & laporan kosong selamanya.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] Upsert pasien by phone (insert kalau belum ada)
- [ ] Insert booking: bookingCode, patientId, doctorId, serviceId, bookingDate, timeSlot, totalAmount, midtransOrderId, notes, status= pending, paymentStatus= pending
- [ ] Hanya simpan setelah `generateSnapToken` sukses
- [ ] Typecheck hijau
