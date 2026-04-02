"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useI18n } from "../providers";

const CONSENT_STORAGE_KEY = "synaptica-cookie-consent";

export default function CookieConsentBanner() {
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored =
      typeof window !== "undefined" ? window.localStorage.getItem(CONSENT_STORAGE_KEY) : "accepted";
    setVisible(stored !== "accepted");
  }, []);

  const handleAccept = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, "accepted");
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 px-4">
      <div className="relative mx-auto flex max-w-4xl flex-col gap-4 overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-r from-white/95 via-white/90 to-[#f6f0de]/90 p-5 shadow-2xl shadow-slate-200/70 backdrop-blur-xl sm:flex-row sm:items-center sm:gap-6 sm:p-6">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-15%] top-[-40%] h-40 w-40 rounded-full bg-[#cdb360]/35 blur-3xl" />
          <div className="absolute right-[-12%] bottom-[-30%] h-32 w-32 rounded-full bg-[#9f8a3f]/25 blur-3xl" />
        </div>

        <div className="relative space-y-2 text-sm">
          <p className="font-semibold text-slate-900">{t("legal.cookies.banner.title")}</p>
          <p className="text-slate-700">{t("legal.cookies.banner.description")}</p>
          <Link
            href="/politica-cookie"
            className="inline-flex w-fit items-center gap-2 font-semibold text-[#817e32] underline-offset-4 hover:underline"
          >
            <span>{t("legal.cookies.banner.link")}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m9 5 7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 sm:justify-end w-full">
          <button
            type="button"
            onClick={handleAccept}
            className="w-full min-w-[200px] rounded-full bg-gradient-to-r from-[#9f8a3f] to-[#cdb360] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-200 transition hover:brightness-[1.03] sm:w-auto"
          >
            {t("legal.cookies.banner.accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
