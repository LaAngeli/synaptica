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
const DELAY_MS = 15000;

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
        aria-hidden="true"
        tabIndex={-1}
        onClick={dismiss}
        className="absolute inset-0 h-full w-full cursor-default bg-[#060a14]/75 backdrop-blur-sm"
      />

      <div className="relative max-h-[92dvh] w-full max-w-md overflow-x-hidden overflow-y-auto rounded-3xl border border-slate-200 bg-gradient-to-br from-white/90 via-white/85 to-slate-100/90 shadow-2xl shadow-slate-900/30">
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl" aria-hidden>
          <div className="absolute right-[12%] top-[-12%] h-72 w-72 rounded-full bg-[#cdb360]/40 blur-3xl" />
          <div className="absolute left-[-6%] bottom-[-14%] h-64 w-64 rounded-full bg-[#9f8a3f]/20 blur-3xl" />
        </div>

        <button
          type="button"
          onClick={dismiss}
          aria-label={t("offerBanner.close")}
          className="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white/70 text-slate-500 transition hover:border-slate-300 hover:text-slate-900"
        >
          <X size={16} strokeWidth={2} />
        </button>

        <div className="relative px-6 pb-7 pt-9 text-center sm:px-9 sm:pt-10">
          <div className="mx-auto w-36 drop-shadow-[0_4px_11px_rgba(129,126,50,0.32)] sm:w-40">
            <AnimatedBrainLogo alt={t("offerBanner.logoAlt")} />
          </div>

          <span className="mt-2 inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#817e32]">
            {t("offerBanner.badge")}
          </span>
          <h2 className="mt-3 text-2xl font-bold leading-tight text-slate-900 sm:text-[26px]">
            {t("offerBanner.title")}
          </h2>

          <div className="mt-3 flex flex-wrap items-baseline justify-center gap-3">
            <span className="text-lg font-semibold text-slate-400 line-through decoration-slate-400/70 decoration-2">
              {t("offerBanner.priceOld")}
            </span>
            <span className="text-3xl font-bold text-[#817e32]">
              {t("offerBanner.priceNew")}
            </span>
          </div>

          <p className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-[#cdb360]/45 bg-[#f6f0de]/60 px-3 py-1 text-xs font-semibold text-[#817e32]">
            <Clock size={13} strokeWidth={2.2} aria-hidden />
            {t("offerBanner.validity")}
          </p>

          <div className="mt-5 flex flex-col gap-3">
            <a
              href={`tel:${phone}`}
              onClick={dismiss}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#9f8a3f] to-[#cdb360] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#cdb360]/50 transition hover:from-[#aa995a] hover:to-[#9f8a3f]"
            >
              <Phone size={16} strokeWidth={2} />
              {t("offerBanner.callCta")}
            </a>
            <Link
              href="/pricing#isync"
              onClick={dismiss}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-white/80"
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
