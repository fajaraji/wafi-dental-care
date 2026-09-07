# 04: Gambar blog

**What to build:** Artikel blog menampilkan gambar (bukan SVG placeholder ikon). Generate file gambar placeholder lokal ke `public/images/blog/` dan render `post.image` di `BlogList` (fallback ke ikon kalau file belum ada).

**Blocked by:** 01-blog-db-read

**Status:** ready-for-agent

- [ ] Generate SVG gambar untuk tiap slug blog (cavity-headache, scaling-guide, braces-vs-aligner, fasting-dental-care) ke `public/images/blog/*.svg`
- [ ] Update `seed.ts` `blogSeed` image path `.jpg` → `.svg`
- [ ] `BlogList.tsx` render `<img src={post.image}>` dengan onError fallback ke ikon existing
