"use client";

import { useState } from "react";
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
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const switchLocale = locale === "id" ? "en" : "id";
  const switchPath = pathname.replace(`/${locale}`, `/${switchLocale}`);

  const isActive = (href: string) =>
    pathname === `/${locale}${href === "/" ? "" : href}`;

  return (
    <header className="fixed top-0 z-50 w-full glass">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center">
            <img src="/logo.png" alt="Wafi Dental Care" className="h-11 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={`/${locale}${link.href === "/" ? "" : link.href}`}
                className={`relative text-sm font-medium transition-colors duration-200 ${
                  isActive(link.href)
                    ? "text-brand-600"
                    : "text-text-secondary hover:text-brand-600"
                }`}
              >
                {t(link.key)}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-gold-500 transition-all duration-300 ${
                    isActive(link.href) ? "w-full" : "w-0"
                  }`}
                />
              </Link>
            ))}

            {/* Language Toggle */}
            <Link
              href={switchPath}
              className="text-xs font-semibold uppercase tracking-widest text-text-muted transition-colors hover:text-brand-600"
            >
              {ct(switchLocale)}
            </Link>

            <Link href={`/${locale}/booking`} className="btn-primary">
              {ct("bookNow")}
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="flex flex-col gap-1.5 p-2 text-brand-700 lg:hidden"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={isMobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-6 bg-current"
            />
            <motion.span
              animate={isMobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block h-0.5 w-6 bg-current"
            />
            <motion.span
              animate={isMobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-6 bg-current"
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
            className="border-t border-brand-600/10 bg-white lg:hidden"
          >
            <div className="space-y-1 px-6 py-5">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  href={`/${locale}${link.href === "/" ? "" : link.href}`}
                  onClick={() => setIsMobileOpen(false)}
                  className={`block border-b border-brand-600/5 py-3 font-display text-lg transition-colors ${
                    isActive(link.href)
                      ? "text-brand-600"
                      : "text-text-secondary hover:text-brand-600"
                  }`}
                >
                  {t(link.key)}
                </Link>
              ))}
              <div className="flex items-center gap-3 pt-5">
                <Link
                  href={switchPath}
                  className="text-xs font-semibold uppercase tracking-widest text-text-muted"
                >
                  {ct(switchLocale)}
                </Link>
                <Link
                  href={`/${locale}/booking`}
                  onClick={() => setIsMobileOpen(false)}
                  className="flex-1 rounded-full bg-ink px-5 py-3 text-center text-sm font-semibold text-white"
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
