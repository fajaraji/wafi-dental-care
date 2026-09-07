# 02: Admin Blog CRUD

**What to build:** Admin bisa kelola artikel blog (list, buat, edit, hapus, toggle publish) dari `/admin/blog`, menulis ke tabel `blog_posts`. Ikuti pola mutasi yang ada: client form → `fetch("/api/admin/blog")` → `router.refresh()`, auth wajib.

**Blocked by:** 01-blog-db-read

**Status:** ready-for-agent

- [ ] API route `/api/admin/blog` (POST buat, PUT update, DELETE hapus) dengan guard `auth()`
- [ ] Halaman list `/admin/blog` (server, baca DB, tombol hapus + link buat/edit)
- [ ] Halaman form `/admin/blog/new` dan `/admin/blog/[id]` pakai `BlogForm` (client)
- [ ] `BlogForm` isi semua field: titleId/titleEn, contentId/contentEn, excerptId/excerptEn, slug, image, categoryId/categoryEn, author, isPublished, publishedAt
- [ ] Tambah item "Blog" + "Laporan" di `AdminLayoutClient` menu
