"use client";

import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { useI18n } from "../providers";

export default function WhatsAppFloatingCta() {
  const { t } = useI18n();
  const socials = t("contact.socials") || {};
  const whatsappHref = socials.whatsapp;
  if (!whatsappHref) return null;

  const ctaLabel = t("contact.whatsappCta.primary") || "WhatsApp";

  return (
    <div className="fixed inset-x-4 bottom-4 z-40 flex justify-center sm:inset-x-auto sm:right-6">
      <Link
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ctaLabel}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#9f8a3f] to-[#cdb360] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#cdb360]/50 transition hover:from-[#aa995a] hover:to-[#9f8a3f] sm:w-auto sm:min-w-[300px]"
      >
        <FaWhatsapp size={18} className="shrink-0" />
        <span>{ctaLabel}</span>
      </Link>
    </div>
  );
}
