import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  centered = false,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  centered?: boolean;
}) {
  return (
    <section className="border-b border-brand-600/10 bg-paper pt-32 pb-16 lg:pt-40 lg:pb-20">
      <div
        className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${
          centered ? "text-center" : ""
        }`}
      >
        <p
          className={`eyebrow flex items-center gap-3 ${
            centered ? "justify-center" : ""
          }`}
        >
          <span className="hairline w-10" />
          {eyebrow}
          {centered && <span className="hairline w-10" />}
        </p>
        <h1 className="mt-5 font-display text-4xl font-medium leading-tight text-brand-800 sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p
            className={`mt-4 max-w-2xl text-lg leading-relaxed text-text-muted ${
              centered ? "mx-auto" : ""
            }`}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}