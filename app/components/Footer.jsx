"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Music2 } from "lucide-react";
import { useI18n } from "../providers";

const companyLinks = [
  { labelKey: "legal.links.gdpr", href: "/gdpr" },
  { labelKey: "legal.links.terms", href: "/terms-and-conditions" },
  { labelKey: "legal.links.cookies", href: "/politica-cookie" },
];

const usefulLinks = [
  { labelKey: "legal.links.home", href: "/" },
  { labelKey: "legal.links.services", href: "/services" },
  { labelKey: "legal.links.pricing", href: "/pricing" },
  { labelKey: "legal.links.conditions", href: "/conditions" },
  { labelKey: "legal.links.contact", href: "/contact" },
];

export default function Footer() {
  const { t } = useI18n();
  const socials = t("contact.socials") || {};

  return (
    <footer className="relative mt-0 bg-transparent text-[#7f733c]">
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative mx-auto overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white/90 via-white/85 to-slate-100/90 px-4 pb-10 pt-10 shadow-2xl shadow-slate-200 sm:px-6">

          <div className="pointer-events-none absolute inset-0">
            <div className="absolute right-1 top-[-10%] h-72 w-72 rounded-full bg-[#cdb360]/45 blur-3xl" />
            <div className="absolute left-1 top-1/2 h-64 w-64 rounded-full bg-[#aa995a]/30 blur-3xl" />
          </div>

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <Image
              src="/synaptica_logo.png"
              alt="Synaptica logo"
              width={280}
              height={280}
              className="opacity-20"
              priority
            />
          </div>

          <div className="relative flex flex-col gap-10 lg:flex-row lg:items-stretch lg:justify-between lg:gap-8">
            <div className="min-w-0 flex-1 space-y-0 text-left text-sm lg:max-w-xl">
              <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-1">
                <span className="font-semibold text-[#7f733c]">{t("contact.phoneLabel")}:</span>
                <span className="break-all text-[#7f733c] sm:break-normal">{t("contact.phone")}</span>
              </div>
              <div className="mt-2 flex flex-wrap items-baseline gap-x-1.5 gap-y-1">
                <span className="font-semibold text-[#7f733c]">{t("contact.emailLabel")}:</span>
                <span className="min-w-0 break-all text-[#7f733c]">{t("contact.email")}</span>
              </div>
              <div className="mt-2 flex flex-wrap items-baseline gap-x-1.5 gap-y-1">
                <span className="shrink-0 font-semibold text-[#7f733c]">{t("contact.addressLabel")}:</span>
                <span className="min-w-0 text-[#7f733c]">{t("contact.address")}</span>
              </div>

              <div className="mt-6 space-y-1 text-center lg:text-left">
                <p className="font-semibold text-[#7f733c]">{t("legal.links.legalInfo")}</p>
                <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-sm lg:justify-start">
                  {companyLinks.map((link, idx) => (
                    <span key={link.href} className="inline-flex flex-wrap items-center gap-2">
                      <Link href={link.href} className="text-[#7f733c] underline hover:text-[#9f8a3f]">
                        {t(link.labelKey)}
                      </Link>
                      {idx < companyLinks.length - 1 && <span className="text-[#7f733c]" aria-hidden>|</span>}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 space-y-1 text-center lg:text-left">
                <p className="font-semibold text-[#7f733c]">{t("legal.links.useful")}</p>
                <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-sm lg:justify-start">
                  {usefulLinks.map((link, idx) => (
                    <span key={link.href} className="inline-flex flex-wrap items-center gap-2">
                      <Link href={link.href} className="text-[#7f733c] underline hover:text-[#9f8a3f]">
                        {t(link.labelKey)}
                      </Link>
                      {idx < usefulLinks.length - 1 && <span className="text-[#7f733c]" aria-hidden>|</span>}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div
              className={
                "flex min-w-0 w-full max-w-full shrink-0 flex-col items-center gap-4 border-t border-[#7f733c]/15 pt-8 text-center text-sm text-slate-800 " +
                "lg:mt-0 lg:max-w-sm lg:flex-shrink-0 lg:border-t-0 lg:pt-0 lg:min-h-full lg:justify-end lg:items-end lg:text-right"
              }
            >
              <div className="flex w-full flex-wrap items-center justify-center gap-3 sm:gap-4 lg:w-full lg:flex-nowrap lg:justify-end">
                {socials.instagram && (
                  <Link
                    href={socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-xl border border-[#7f733c]/60 p-2 transition hover:border-[#9f8a3f] hover:text-[#9f8a3f]"
                  >
                    <Instagram size={20} strokeWidth={2} className="shrink-0" />
                  </Link>
                )}
                {socials.facebook && (
                  <Link
                    href={socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-xl border border-[#7f733c]/60 p-2 transition hover:border-[#9f8a3f] hover:text-[#9f8a3f]"
                  >
                    <Facebook size={20} strokeWidth={2} className="shrink-0" />
                  </Link>
                )}
                {socials.tiktok && (
                  <Link
                    href={socials.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                    className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-xl border border-[#7f733c]/60 p-2 transition hover:border-[#9f8a3f] hover:text-[#9f8a3f]"
                  >
                    <Music2 size={20} strokeWidth={2} className="shrink-0" />
                  </Link>
                )}
              </div>

              <div className="flex w-full max-w-lg flex-col gap-2 lg:max-w-none lg:items-end">
                <p className="w-full text-pretty text-sm text-[#7f733c] lg:max-w-sm">
                  © 2026 - Synaptica Cluj. {t("legal.links.rights")}
                </p>
                <p className="w-full text-pretty text-xs leading-relaxed text-[#7f733c]/80 lg:max-w-sm">
                  Serenity Zen SRL · CUI 51778830 ·
                </p>
                <p className="w-full text-pretty text-xs leading-relaxed text-[#7f733c]/90 lg:max-w-sm">
                  {t("legal.links.maintainedBy")}{" "}
                  <Link
                    href="https://advista.marketing/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#817e32] underline decoration-[#cdb360]/70 underline-offset-2 transition-colors hover:text-[#9f8a3f]"
                  >
                    AdVista
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
