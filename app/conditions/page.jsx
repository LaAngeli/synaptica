"use client";

import Link from "next/link";
import {
  Activity,
  Brain,
  CloudFog,
  HeartPulse,
  Moon,
  Puzzle,
  Shield,
  Target,
} from "lucide-react";
import { useI18n } from "../providers";

export default function AfectiuniPage() {
  const { t } = useI18n();
  const items = t("conditions.items") || [];
  const iconByTitle = {
    adhd: Activity,
    "alzheimer’s": Brain,
    "alzheimer's": Brain,
    alzheimer: Brain,
    autism: Puzzle,
    dementia: Shield,
    dementa: Shield,
    "sleep issues": Moon,
    "lipsa somnului": Moon,
    anxiety: HeartPulse,
    anxietate: HeartPulse,
    depression: CloudFog,
    depresie: CloudFog,
    focus: Target,
    "puterea de concentrare": Target,
  };

  return (
     <section className=" space-y-3 relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white/90 via-white/85 to-slate-100/90 px-6 py-12 shadow-2xl shadow-slate-200 sm:px-10 lg:px-12">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-1/5 top-[-10%] h-72 w-72 rounded-full bg-[#cdb360]/45 blur-3xl" />
        <div className="absolute right-1/10 top-1/2 h-64 w-64 rounded-full bg-[#aa995a]/30 blur-3xl" />
      </div>
      
      <span className="mb-8 inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#817e32]">
        {t("conditions.badge")}
      </span>
      <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">
        {t("conditions.title")}

      </h1>
      <p className="max-w-4xl  text-base leading-relaxed text-slate-700">
        {t("conditions.description")}
      </p>
      
     

        <div className="grid gap-4 lg:grid-cols-2 mt-10">
          {items.map((item) => {
            const key = (item.title || "").toLowerCase();
            const Icon = iconByTitle[key] || Brain;
            return (
              <div
                key={item.title}
                className="flex gap-4 rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-inner shadow-slate-200/70"
              >
                <span className="mt-1 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f6f0de] via-white to-[#e7dec5] text-[#817e32]">
                  <Icon size={22} strokeWidth={2.1} />
                </span>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">{item.body}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-3 mt-10">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#9f8a3f] to-[#cdb360] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#cdb360]/50 transition hover:from-[#aa995a] hover:to-[#9f8a3f]"
          >
            {t("conditions.contactCta")}
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-white/80"
          >
            {t("conditions.servicesCta")}
          </Link>
        </div>
    </section>
  );
}
