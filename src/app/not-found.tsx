import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="id">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-brand-700 via-brand-600 to-accent-600 px-4 text-center">
          <div className="glass rounded-3xl p-12 backdrop-blur-md max-w-md">
            <div className="mb-6 text-8xl">🦷</div>
            <h1 className="font-display text-6xl font-extrabold text-white">404</h1>
            <p className="mt-4 text-xl font-medium text-white/70">
              Halaman tidak ditemukan
            </p>
            <p className="mt-2 text-sm text-white/50">
              Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
            </p>
            <Link
              href="/"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-brand-600 shadow-xl shadow-black/20 transition-all duration-300 hover:scale-105"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5m7-7l-7 7 7 7" />
              </svg>
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
