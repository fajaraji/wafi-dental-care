export default function ContactPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-extrabold text-text-primary text-center">
          Kontak Kami
        </h1>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {/* WhatsApp */}
          <a
            href="https://wa.me/6287726652023"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl bg-green-50 p-8 text-center transition-all duration-300 hover:bg-green-100 hover:shadow-lg"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-500 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-bold text-text-primary">WhatsApp</h3>
            <p className="mt-2 text-text-muted">0877-2665-2023</p>
            <span className="mt-3 inline-block text-sm font-semibold text-green-600">
              Chat Sekarang →
            </span>
          </a>

          {/* Email */}
          <a
            href="mailto:wafidentalcare@gmail.com"
            className="group rounded-2xl bg-brand-50 p-8 text-center transition-all duration-300 hover:bg-brand-100 hover:shadow-lg"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-bold text-text-primary">Email</h3>
            <p className="mt-2 text-text-muted">wafidentalcare@gmail.com</p>
            <span className="mt-3 inline-block text-sm font-semibold text-brand-600">
              Kirim Email →
            </span>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/wafidentalcare/"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl bg-pink-50 p-8 text-center transition-all duration-300 hover:bg-pink-100 hover:shadow-lg"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-purple-500 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-bold text-text-primary">Instagram</h3>
            <p className="mt-2 text-text-muted">@wafidentalcare</p>
            <span className="mt-3 inline-block text-sm font-semibold text-pink-600">
              Follow Kami →
            </span>
          </a>
        </div>

        {/* Map */}
        <div className="mt-12 overflow-hidden rounded-2xl shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.0!2d110.39!3d-7.77!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sCondongcatur%2C%20Depok%2C%20Sleman!5e0!3m2!1sid!2sid!4v1700000000000"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Wafi Dental Care Location"
          />
        </div>
      </div>
    </div>
  );
}
