"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "motion/react";

const navLinks = [
  { key: "home", href: "/" },
  { key: "services", href: "/services" },
  { key: "about", href: "/about" },
  { key: "doctors", href: "/doctors" },
  { key: "blog", href: "/blog" },
  { key: "contact", href: "/contact" },
];

export function Header() {
  const t = useTranslations("nav");
  const ct = useTranslations("common");
  const locale = useLocale();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const switchLocale = locale === "id" ? "en" : "id";
  const switchPath = pathname.replace(`/${locale}`, `/${switchLocale}`);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        isScrolled
          ? "glass shadow-lg shadow-brand-600/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-accent-500 shadow-lg shadow-brand-600/30 transition-transform duration-300 group-hover:scale-110">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                className="text-white"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <span
              className={`text-lg font-bold font-display transition-colors duration-300 ${
                isScrolled ? "text-brand-600" : "text-white"
              }`}
            >
              {ct("logo")}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={`/${locale}${link.href === "/" ? "" : link.href}`}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  pathname === `/${locale}${link.href === "/" ? "" : link.href}`
                    ? isScrolled
                      ? "bg-brand-50 text-brand-600"
                      : "bg-white/20 text-white backdrop-blur-sm"
                    : isScrolled
                    ? "text-text-secondary hover:bg-brand-50 hover:text-brand-600"
                    : "text-white/90 hover:bg-white/10 hover:text-white"
                }`}
              >
                {t(link.key)}
              </Link>
            ))}

            {/* Language Toggle */}
            <Link
              href={switchPath}
              className={`ml-2 flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                isScrolled
                  ? "bg-accent-50 text-accent-600 hover:bg-accent-100"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              {ct(switchLocale)}
            </Link>

            {/* CTA */}
            <Link
              href={`/${locale}/booking`}
              className="ml-3 rounded-xl bg-gradient-to-r from-brand-600 to-accent-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all duration-300 hover:shadow-xl hover:shadow-brand-600/40 hover:scale-105"
            >
              {ct("bookNow")}
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className={`flex flex-col gap-1.5 lg:hidden p-2 ${
              isScrolled ? "text-brand-600" : "text-white"
            }`}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={
                isMobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }
              }
              className="block h-0.5 w-6 bg-current transition-colors"
            />
            <motion.span
              animate={isMobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block h-0.5 w-6 bg-current transition-colors"
            />
            <motion.span
              animate={
                isMobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }
              }
              className="block h-0.5 w-6 bg-current transition-colors"
            />
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass border-t border-white/20 lg:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  href={`/${locale}${link.href === "/" ? "" : link.href}`}
                  onClick={() => setIsMobileOpen(false)}
                  className={`block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    pathname === `/${locale}${link.href === "/" ? "" : link.href}`
                      ? "bg-brand-50 text-brand-600"
                      : "text-text-secondary hover:bg-brand-50 hover:text-brand-600"
                  }`}
                >
                  {t(link.key)}
                </Link>
              ))}
              <div className="flex items-center gap-3 pt-3">
                <Link
                  href={switchPath}
                  className="rounded-lg bg-accent-50 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-accent-600"
                >
                  {ct(switchLocale)}
                </Link>
                <Link
                  href={`/${locale}/booking`}
                  onClick={() => setIsMobileOpen(false)}
                  className="flex-1 rounded-xl bg-gradient-to-r from-brand-600 to-accent-500 px-5 py-2.5 text-center text-sm font-semibold text-white"
                >
                  {ct("bookNow")}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
