"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Phone, ArrowRight, Clock, X } from "lucide-react";
import { useI18n } from "../providers";
import { businessContact } from "../../lib/businessContact";
import AnimatedBrainLogo from "./AnimatedBrainLogo";

const STORAGE_KEY = "synaptica-brainmapping-offer";
// Oferta rulează 14 zile (8–22 iulie 2026). După 22 iulie bannerul nu mai apare, automat.
const DEADLINE = new Date(2026, 6, 23, 0, 0, 0).getTime();
const DELAY_MS = 30000;

export default function OfferBanner() {
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (Date.now() >= DEADLINE) return;
    let dismissed = false;
    try {
      dismissed = localStorage.getItem(STORAGE_KEY) === "dismissed";
    } catch {}
    if (dismissed) return;
    timerRef.current = window.setTimeout(() => setVisible(true), DELAY_MS);
    return () => window.clearTimeout(timerRef.current);
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, "dismissed");
    } catch {}
  };

  useEffect(() => {
    if (!visible) return;
    const onKey = (e) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible]);

  if (!visible) return null;

  const phone = businessContact.telephoneE164;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t("offerBanner.title")}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
    >
      <button
        type="button"
        aria-label={t("offerBanner.close")}
        onClick={dismiss}
        className="absolute inset-0 h-full w-full cursor-default bg-[#060a14]/75 backdrop-blur-sm"
      />

      <div className="relative flex max-h-[92dvh] w-full max-w-lg flex-col overflow-y-auto rounded-3xl border border-[#cdb360]/30 bg-gradient-to-br from-[#0b1527] via-[#0e1d33] to-[#070d18] shadow-2xl shadow-black/60 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={dismiss}
          aria-label={t("offerBanner.close")}
          className="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-slate-300 transition hover:border-[#cdb360]/50 hover:text-white"
        >
          <X size={16} strokeWidth={2} />
        </button>

        <div className="relative flex shrink-0 items-center justify-center px-8 pt-8 sm:w-[42%] sm:px-5 sm:py-8">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#cdb360]/20 blur-3xl"
          />
          <AnimatedBrainLogo
            alt={t("offerBanner.logoAlt")}
            className="relative w-40 max-w-[200px] sm:w-full"
          />
        </div>

        <div className="flex-1 px-6 pb-7 pt-4 text-center sm:py-8 sm:pr-8 sm:text-left">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#cdb360]/90">
            Synaptica Cluj
          </p>
          <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-[#cdb360]/35 bg-[#cdb360]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#e7dcb4]">
            {t("offerBanner.badge")}
          </span>
          <h2 className="mt-3 text-2xl font-bold leading-tight text-white sm:text-[26px]">
            {t("offerBanner.title")}
          </h2>

          <div className="mt-3 flex items-baseline justify-center gap-3 sm:justify-start">
            <span className="text-lg font-semibold text-slate-400 line-through">
              {t("offerBanner.priceOld")}
            </span>
            <span className="text-3xl font-bold text-[#cdb360]">
              {t("offerBanner.priceNew")}
            </span>
          </div>

          <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-slate-300/90">
            <Clock size={14} strokeWidth={2} className="text-[#cdb360]" />
            {t("offerBanner.validity")}
          </p>

          <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
            <a
              href={`tel:${phone}`}
              onClick={dismiss}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#9f8a3f] to-[#cdb360] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#cdb360]/40 transition hover:from-[#aa995a] hover:to-[#9f8a3f]"
            >
              <Phone size={16} strokeWidth={2} />
              {t("offerBanner.callCta")}
            </a>
            <Link
              href="/pricing#isync"
              onClick={dismiss}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#cdb360]/45 px-5 py-3 text-sm font-semibold text-[#e7dcb4] transition hover:border-[#cdb360] hover:bg-[#cdb360]/10 hover:text-white"
            >
              {t("offerBanner.offerCta")}
              <ArrowRight size={15} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
