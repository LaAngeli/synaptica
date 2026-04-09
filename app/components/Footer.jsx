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
        <div className="relative mx-auto overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white/90 via-white/85 to-slate-100/90 px-4 pb-10 pt-10 shadow-2xl shadow-slate-200">

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

          <div className="relative flex flex-col gap-10 lg:flex-row lg:items-stretch lg:justify-between">
            <div className="space-y-0 text-left text-sm lg:max-w-xl">
              <div className=" flex">
                <p className="font-semibold text-[#7f733c]">{t("contact.phoneLabel")}:&nbsp;</p>
                <p className=" text-[#7f733c] ">{t("contact.phone")}</p>
              </div>
              <div className=" flex">
                <p className="font-semibold text-[#7f733c]">{t("contact.emailLabel")}:&nbsp;</p>
                <p className=" text-[#7f733c]">{t("contact.email")}</p>
              </div>
              <div className=" flex">
                <p className="font-semibold text-[#7f733c]">{t("contact.addressLabel")}:&nbsp;</p>
                <p className=" text-[#7f733c]">{t("contact.address")}</p>
              </div>

              <div className="mt-1 ">
                {companyLinks.map((link) => (
                  <div key={link.href}>
                    <Link href={link.href} className="text-[#7f733c] underline hover:text-[#9f8a3f]">
                      {t(link.labelKey)}
                    </Link>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-1 text-center lg:text-left">
                <p className="font-semibold text-[#7f733c]">{t("legal.links.useful")}</p>
                <div className="flex flex-wrap items-center justify-center gap-2 text-sm lg:justify-start">
                  {usefulLinks.map((link, idx) => (
                    <span key={link.href} className="flex items-center gap-2">
                      <Link href={link.href} className="text-[#7f733c] underline hover:text-[#9f8a3f]">
                        {t(link.labelKey)}
                      </Link>
                      {idx < usefulLinks.length - 1 && <span className="text-[#7f733c]">|</span>}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative flex w-full max-w-sm flex-col items-center justify-end gap-2 text-center text-sm text-slate-800 lg:mt-0 lg:min-h-full lg:items-end lg:text-right">
              <div className="-translate-y-2 flex items-center justify-center gap-3 text-[#7f733c] lg:translate-y-0 lg:justify-end">
                {socials.instagram && (
                  <Link
                    href={socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-xl border border-[#7f733c]/60 p-2 transition hover:border-[#9f8a3f] hover:text-[#9f8a3f]"
                  >
                    <Instagram size={18} />
                  </Link>
                )}
                {socials.facebook && (
                  <Link
                    href={socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-xl border border-[#7f733c]/60 p-2 transition hover:border-[#9f8a3f] hover:text-[#9f8a3f]"
                  >
                    <Facebook size={18} />
                  </Link>
                )}
                {socials.tiktok && (
                  <Link
                    href={socials.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-xl border border-[#7f733c]/60 p-2 transition hover:border-[#9f8a3f] hover:text-[#9f8a3f]"
                  >
                    <Music2 size={18} />
                  </Link>
                )}
              </div>
              <p className="text-sm text-[#7f733c]">
                © 2026 - Synaptica Cluj. {t("legal.links.rights")}
              </p>
              <p className="max-w-xs text-xs text-[#7f733c]/80">
                Serenity Zen SRL · CUI 51778830 · 
              </p>
              <p className="max-w-xs text-xs text-[#7f733c]/90">
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
    </footer>
  );
}
