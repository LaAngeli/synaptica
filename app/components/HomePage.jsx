"use client";

import Link from "next/link";
import { useI18n } from "../providers";
import { ChevronRight, RadarIcon } from "lucide-react";

export default function HomePage() {
  const { t } = useI18n();
  const quickLinks = t("home.quickLinks") || [];
  const statTags = t("home.statTags") || [];
  const neuroPoints = t("home.neuro.points") || [];

  return (
    <div className="space-y-10 text-slate-900">
      <div className="sr-only">
        <p>{t("home.seoIntro")}</p>
        <p>{t("home.seoDetail")}</p>
      </div>
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-50/60 px-6 py-12 shadow-2xl shadow-slate-200 sm:px-10 lg:px-12">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/88 to-white/70" />
          <div className="absolute left-[-6%] top-[-8%] h-64 w-64 rounded-full bg-[#cdb360]/25 blur-3xl" aria-hidden />
          <div className="absolute right-[-4%] bottom-[-12%] h-72 w-72 rounded-full bg-[#9f8a3f]/20 blur-3xl" aria-hidden />
        </div>

        <div className="relative max-w-4xl space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#817e32] backdrop-blur-sm">
            {t("home.company.badge")}
          </span>
          <div className="space-y-4">
            <h2 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
              {t("home.company.titleStart")}{" "}
              <span className="bg-gradient-to-r from-[#9f8a3f] via-[#aa995a] to-[#817e32] bg-clip-text text-transparent">
                {t("home.company.titleHighlight")}
              </span>
              {t("home.company.titleEnd")}
            </h2>
            <p className="text-lg font-semibold text-slate-800">
              {t("home.company.subtitle")}
            </p>
            <p className="text-base leading-relaxed text-slate-700">
              {t("home.company.description")}
            </p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white/90 via-white/85 to-slate-100/90 px-6 py-12 shadow-2xl shadow-slate-200 sm:px-10 lg:px-12">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-1/5 top-[-10%] h-72 w-72 rounded-full bg-[#cdb360]/45 blur-3xl" />
        </div>

        <div className="relative grid gap-10 lg:grid-cols-[1.05fr,0.95fr] lg:items-center">
          <div className="space-y-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#817e32]">
              {t("home.badge")}
            </span>
            <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
              {t("home.titleStart")}{" "}
              <span className="bg-gradient-to-r from-[#9f8a3f] via-[#aa995a] to-[#817e32] bg-clip-text text-transparent">
                {t("home.titleHighlight")}
              </span>
              {t("home.titleEnd")}
            </h1>
            <p className="max-w-2xl text-lg text-slate-700">
              {t("home.description")}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#9f8a3f] to-[#cdb360] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#cdb360]/50 transition hover:from-[#aa995a] hover:to-[#9f8a3f]"
              >
                {t("home.primaryCta")}
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-white/80"
              >
                {t("home.secondaryCta")}
              </Link>
            </div>

            <div className="grid gap-4 sm:max-w-[690px] sm:grid-cols-[1fr_1.05fr]">
              <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-inner shadow-slate-200/80 backdrop-blur">
                <p className="text-sm text-slate-600">{t("home.statSpeedLabel")}</p>
                <p className="mt-1 text-3xl font-semibold text-slate-900">{t("home.statSpeedValue")}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.20em] text-slate-500">
                  {t("home.statSpeedNote")}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-inner shadow-slate-200/80 backdrop-blur">
                <p className="text-sm text-slate-600">{t("home.statQualityLabel")}</p>
                <p className="mt-1 text-[26px] font-semibold text-slate-900 sm:text-[28px]">
                  {t("home.statQualityValue")}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <div className="pb-0">
                    {statTags.map((tag) => (
                      <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-[#817e32]">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href="/conditions"
                    aria-label={t("home.statMoreLabel")}
                    className="mt-1 items-center justify-center text-[#817e32] rounded-full font-bold border transition hover:border-[#9f8a3f] hover:text-[#9f8a3f]"
                  >
                    <ChevronRight size={18} strokeWidth={2} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white/90 via-white/85 to-slate-100/90 px-6 py-12 shadow-2xl shadow-slate-200 sm:px-10 lg:px-12">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/3 top-[-10%] h-72 w-72 rounded-full bg-[#cdb360]/45 blur-3xl" />
          <div className="absolute right-1/4 top-1/3 h-64 w-64 rounded-full bg-[#aa995a]/30 blur-3xl" />
        </div>
        <div className="relative grid gap-10 lg:grid-cols-[1.05fr,0.95fr] lg:items-center">
          <div className="space-y-7">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#817e32]">
              {t("home.neuro.badge")}
            </span>
            <h2 className="max-w-[690px] text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
              {t("home.neuro.titleStart")}{" "}
              <span className="bg-gradient-to-r from-[#9f8a3f] via-[#aa995a] to-[#817e32] bg-clip-text text-transparent">
                {t("home.neuro.titleHighlight")}
              </span>
            </h2>
            <p className="text-lg font-semibold text-slate-800">{t("home.neuro.subtitle")}</p>
            <p className="max-w-2xl text-slate-700">{t("home.neuro.description")}</p>
            <ul className="space-y-2 text-sm text-slate-700">
              {neuroPoints.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <div className="mt-0.5 items-center  justify-center">
                    <RadarIcon
                      size={18}
                      strokeWidth={2}
                      color="#817e32"
                    />
                  </div>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/services#neuro"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#9f8a3f] to-[#cdb360] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#cdb360]/50 transition hover:from-[#aa995a] hover:to-[#9f8a3f]"
              >
                {t("home.neuro.primaryCta")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-[#817e32]">{t("home.quickNavBadge")}</p>
            <h2 className="text-2xl font-semibold text-slate-900">{t("home.quickNavTitle")}</h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#817e32] hover:text-[#9f8a3f]"
          >
            {t("home.quickNavCta")}
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {quickLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/85 p-5 shadow-lg shadow-slate-200 transition hover:-translate-y-1 hover:border-[#cdb360]/60"
            >
              <div
                className={`absolute inset-0 opacity-0 blur-3xl transition duration-300 group-hover:opacity-30 bg-gradient-to-br ${item.accent}`}
                aria-hidden
              />
              <div className="relative flex h-full flex-col gap-3">

                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-900">
                  {item.title}
                  <span className="text-slate-500">→</span>
                </div>
                <p className="text-sm leading-relaxed text-slate-700">{item.description}</p>
                <span className="mt-auto text-sm font-semibold text-[#817e32] group-hover:text-[#9f8a3f]">
                  {item.buttonName}
                </span>

              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
