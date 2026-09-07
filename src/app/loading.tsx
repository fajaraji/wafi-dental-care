export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-900">
      <div className="relative">
        {/* Animated tooth spinner */}
        <div className="h-20 w-20 animate-pulse rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/20 flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            className="h-10 w-10 animate-spin text-white/70"
            fill="none"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
              fill="currentColor"
            />
          </svg>
        </div>
        {/* Pulse rings */}
        <div className="absolute -inset-4 animate-ping rounded-full bg-white/5" />
        <div className="absolute -inset-8 animate-ping rounded-full bg-white/5" style={{ animationDelay: "0.2s" }} />
      </div>
      <p className="mt-6 text-lg font-medium text-white/80 animate-pulse">
        Memuat...
      </p>
    </div>
  );
}
