# 01: Blog publik baca dari DB

**What to build:** Halaman blog publik (list + detail) mengambil data dari tabel `blog_posts` di PostgreSQL, bukan dari `blogSeed` static. Setelah ini, admin CRUD blog bisa langsung memengaruhi situs.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] Tambah query layer async (getPublishedBlogPosts, getBlogPostBySlugFromDb, getBlogCategoriesFromDb) baca tabel blogPosts, publishedAt dinormalisasi ke ISO string
- [ ] `blog/page.tsx` (server) fetch posts + categories, teruskan ke `<BlogList />` sebagai props
- [ ] `BlogList.tsx` terima props `posts` + `categories`, hapus import `getAllBlogPosts`/`getBlogCategories`
- [ ] `blog/[slug]/page.tsx` pakai query DB (detail + relatedPosts), `getBlogPostBySlug`/`getAllBlogPosts` diganti
- [ ] `npm run db:seed-db` dijalankan supaya blog_posts terisi
