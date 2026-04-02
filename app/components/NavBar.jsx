"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useI18n } from "../providers";
import { brandPalette } from "../i18n/branding";

const linkBaseStyles =
  "rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200";

export default function NavBar() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useI18n();
  const [open, setOpen] = useState(false);
  const languages = ["en", "ro"];

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const navLinks = (t("nav.links") || []).map((link) => {
    if (link.href === "/servicii") return { ...link, href: "/services" };
    if (link.href === "/preturi") return { ...link, href: "/pricing" };
    if (link.href === "/afectiuni") return { ...link, href: "/conditions" };
    return link;
  });
  const renderLink = (link) => {
    const active = isActive(link.href);

    return (
      <Link
        key={link.href}
        href={link.href}
        className={`${linkBaseStyles} ${
          active
            ? "bg-gradient-to-r from-[#9f8a3f] to-[#cdb360] text-white shadow-lg shadow-slate-300/30"
            : "text-slate-800 hover:bg-white/60 hover:text-slate-900"
        }`}
        onClick={() => setOpen(false)}
      >
        {link.label}
      </Link>
    );
  };

  return (
    <header className="fixed left-0 top-0 z-40 w-full">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#cdb360]/15 via-[#aa995a]/10 to-transparent blur-3xl"
        aria-hidden
      />
      <div className="mx-auto max-w-6xl px-4">
        <div
          className=" bg-gradient-to-br from-[#f6f0de]/30 via-white/90 to-[#f6f0de]/60 mt-4 flex h-16 items-center justify-between rounded-full border border-slate-200/80 px-4 shadow-lg shadow-slate-200/70 backdrop-blur-xl"
          style={{
            boxShadow: `0 20px 60px ${brandPalette.primary}12`,
            // background:
            //   "linear-gradient(90deg, rgba(243,246,251,0.9) 25% , rgba(243,246,251,0.9) 45%, rgba(255,255,255,0.85) 100%)",
          }}
        >
          <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <Image
              src="/synaptica_logo_text.png"
              alt="Synaptica Cluj logo"
              width={140}
              height={40}
              priority
              className="h-13 w-auto"
            />
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => renderLink(link))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-2 text-xs font-semibold text-slate-900 md:inline-flex">
              {/* <span className="text-slate-500">{t("nav.languageLabel")}:</span> */}
              <div className="flex items-center gap-1">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setLanguage(lang)}
                    className={`rounded-full px-2 py-1 transition ${
                      language === lang
                        ? "bg-gradient-to-r from-[#9f8a3f] to-[#cdb360] text-white shadow-sm shadow-slate-300"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#9f8a3f] / %40 text-[#9f8a3f] transition hover:border-[#9f8a3f] md:hidden"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-label="Toggle navigation"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        <div
          className={`md:hidden ${
            open ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden transition-all duration-300 ease-out`}
        >
          <div className="mt-2 rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-lg shadow-slate-200/60 backdrop-blur-xl">
            <div className="flex flex-col gap-2">{navLinks.map((link) => renderLink(link))}</div>
            <div className="mt-3 flex items-center justify-between rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-xs font-semibold text-slate-900">
              <span className="text-slate-600">{t("nav.languageLabel")}:</span>
              <div className="flex items-center gap-1">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => {
                      setLanguage(lang);
                      setOpen(false);
                    }}
                    className={`rounded-full px-2 py-1 transition ${
                      language === lang
                        ? "bg-gradient-to-r from-[#9f8a3f] to-[#cdb360] text-white shadow-sm shadow-slate-200"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
