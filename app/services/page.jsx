"use client";
import Link from "next/link";
import { useI18n } from "../providers";
import {
  Radar,
  FileText,
  Sparkles,
  Activity,
  Waves,
  Headphones,
  Gauge,
  Zap,
  CheckCircle2,
} from "lucide-react";


/**
 * @returns {JSX.Element}
 */
export default function ServiciiPage() {
  const { t } = useI18n();
  const sections = t("services.sections") || [];
  const includesTitle = t("services.includesTitle");
  const ICONS_BY_SERVICE = {
    isync: [Radar, FileText, Sparkles, Activity],
    neuro: [Waves, Headphones, Gauge, Zap],
  };

  return (
    <section className="space-y-3 relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white/90 via-white/85 to-slate-100/90 px-6 py-12 shadow-2xl shadow-slate-200 sm:px-10 lg:px-12">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-1/4 top-[-10%] h-72 w-72 rounded-full bg-[#cdb360]/45 blur-3xl" />
        {/* <div className="absolute right-1/10 top-1/2 h-64 w-64 rounded-full bg-[#aa995a]/30 blur-3xl" /> */}
      </div>
      {/* <div className=" rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-lg shadow-slate-200/70 sm:p-8"> */}

      <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#817e32]">
        {t("services.pageTitle")}
      </span>

      {sections.map((section) => (
        <div
          key={section.key}
          id={section.key}
          className="mb-15 scroll-mt-28"
        >
          <div className="space-y-4">
            {/* <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#817e32]">
              {section.highlight}
            </span> */}

            <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
              {section.badge}
            </h1>
            {/* <p className="text-lg font-semibold uppercase text-[#817e32]">
                {section.highlight}
              </p> */}

            {(section.details || []).map((para) => (
              <p key={para} className="text-md text-slate-700">
                {para}
              </p>
            ))}

            {/* Only "Ce include serviciul" */}
            {/* <div className="rounded-3xl border border-slate-200/80 bg-gradient-to-br from-white/95 via-white/90 to-[#f6f0de]/60 p-6 shadow-inner shadow-slate-200/60 sm:p-7"> */}
            <div className="mt-10">

              <div className="flex items-end justify-between gap-4">
                <h2 className="text-md font-semibold uppercase tracking-[0.22em] text-[#817e32]">
                  {includesTitle}
                </h2>
              </div>




              <div className="mt-5 grid gap-3 sm:grid-cols-1">
                {(section.bullets || []).map((bullet, idx) => {
                  const icons = ICONS_BY_SERVICE[section.key] || [];
                  const Icon = icons[idx] || CheckCircle2;

                  return (
                    <div
                      key={`${section.key}-include-${idx}`}
                      className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-sm shadow-slate-200/50"
                    >
                      <div className="mt-[2px] inline-flex size-9 shrink-0 items-center justify-center rounded-xl border border-[#817e32]/25 bg-white text-[#817e32] shadow-sm shadow-[#817e32]/10">
                        <Icon size={18} strokeWidth={2} className="block" aria-hidden="true" />
                      </div>

                      <p className="text-sm font-semibold leading-snug text-slate-900">
                        {bullet}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>


            {/* Removed: steps + buttons */}
          </div>
        </div>
      ))}
       <div className="flex flex-wrap gap-3 mt-10">
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#9f8a3f] to-[#cdb360] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#cdb360]/50 transition hover:from-[#aa995a] hover:to-[#9f8a3f]"
        >
          {t("conditions.contactCta")}
        </Link>
        <Link
          href="/pricing"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-white/80"
        >
          {t("home.secondaryCta")}
        </Link>
      </div>
    </section>
  );
}
