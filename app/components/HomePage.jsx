"use client";

import Link from "next/link";
import { useI18n } from "../providers";
import { ChevronRight, RadarIcon } from "lucide-react";
import QuickAnswersGrid from "./QuickAnswersGrid";
import GoogleReviews from "./GoogleReviews";
import BrainSlider from "./BrainSlider";
import VideoTestimonials from "./VideoTestimonials";

export default function HomePage() {
  const { t } = useI18n();
  const quickLinks = t("home.quickLinks") || [];
  const statTags = t("home.statTags") || [];
  const neuroPoints = t("home.neuro.points") || [];
  const aeoItems = t("home.aeoItems") || [];

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

        <div className="relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="max-w-4xl space-y-6">
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

              <div className="relative mx-auto w-full max-w-[18rem] sm:max-w-xs lg:hidden">
                <picture className="block w-full">
                  <source
                    media="(max-width: 640px)"
                    srcSet="/images/home/synaptica-cluj-reception-480.webp"
                    type="image/webp"
                  />
                  <source
                    media="(max-width: 1024px)"
                    srcSet="/images/home/synaptica-cluj-reception-768.webp"
                    type="image/webp"
                  />
                  <img
                    src="/images/home/synaptica-cluj-reception-768.webp"
                    alt={t("home.company.imageAlt")}
                    width={768}
                    height={969}
                    loading="lazy"
                    decoding="async"
                    className="mx-auto h-auto w-full rounded-2xl object-contain"
                  />
                </picture>
              </div>

              <p className="text-lg font-semibold text-slate-800">
                {t("home.company.subtitle")}
              </p>
              <p className="text-base leading-relaxed text-slate-700">
                {t("home.company.description")}
              </p>
            </div>
          </div>

          <div className="relative hidden min-h-0 lg:mx-0 lg:block lg:max-w-none lg:justify-self-end">
            <div className="relative overflow-hidden rounded-[1.75rem] lg:max-h-[min(72vh,34rem)] lg:[mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.08)_8%,rgba(0,0,0,0.28)_18%,rgba(0,0,0,0.55)_30%,rgba(0,0,0,0.82)_42%,black_52%,black_100%)] lg:[-webkit-mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.08)_8%,rgba(0,0,0,0.28)_18%,rgba(0,0,0,0.55)_30%,rgba(0,0,0,0.82)_42%,black_52%,black_100%)]">
              <picture className="block h-full w-full">
                <source
                  media="(max-width: 1280px)"
                  srcSet="/images/home/synaptica-cluj-reception-768.webp"
                  type="image/webp"
                />
                <img
                  src="/images/home/synaptica-cluj-reception-1024.webp"
                  alt={t("home.company.imageAlt")}
                  width={1024}
                  height={1291}
                  loading="lazy"
                  decoding="async"
                  className="h-auto max-h-[min(72vh,34rem)] w-full object-contain object-right"
                />
              </picture>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-[46%] bg-gradient-to-r from-white/95 from-0% via-slate-50/70 via-40% to-transparent to-100%" aria-hidden />
            </div>
          </div>
        </div>
      </section>

      <BrainSlider />

      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white/90 via-white/85 to-slate-100/90 px-6 py-12 shadow-2xl shadow-slate-200 sm:px-10 lg:px-12">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/3 top-[-10%] h-72 w-72 rounded-full bg-[#cdb360]/45 blur-3xl" />
          <div className="absolute right-1/4 top-1/3 h-64 w-64 rounded-full bg-[#aa995a]/30 blur-3xl" />
        </div>

        <div className="relative space-y-7">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#817e32]">
            {t("home.neuro.badge")}
          </span>

          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="relative hidden min-h-0 lg:block lg:justify-self-start">
              <div className="relative overflow-hidden rounded-[1.75rem] lg:max-h-[min(72vh,34rem)] lg:[mask-image:linear-gradient(to_right,black_0%,black_48%,rgba(0,0,0,0.82)_58%,rgba(0,0,0,0.55)_70%,rgba(0,0,0,0.28)_82%,rgba(0,0,0,0.08)_92%,transparent_100%)] lg:[-webkit-mask-image:linear-gradient(to_right,black_0%,black_48%,rgba(0,0,0,0.82)_58%,rgba(0,0,0,0.55)_70%,rgba(0,0,0,0.28)_82%,rgba(0,0,0,0.08)_92%,transparent_100%)]">
                <picture className="block h-full w-full">
                  <source
                    srcSet="/images/home/synaptica-neurofeedback-768.webp"
                    type="image/webp"
                  />
                  <img
                    src="/images/home/synaptica-neurofeedback-768.webp"
                    alt={t("home.neuro.imageAlt")}
                    width={768}
                    height={1024}
                    loading="lazy"
                    decoding="async"
                    className="h-auto max-h-[min(72vh,34rem)] w-full object-contain object-left"
                  />
                </picture>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-[46%] bg-gradient-to-l from-white/95 from-0% via-white/85 via-35% to-transparent to-100%" aria-hidden />
              </div>
            </div>

            <div className="space-y-7">
              <h2 className="max-w-[690px] text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:max-w-none">
                {t("home.neuro.titleStart")}{" "}
                <span className="bg-gradient-to-r from-[#9f8a3f] via-[#aa995a] to-[#817e32] bg-clip-text text-transparent">
                  {t("home.neuro.titleHighlight")}
                </span>
              </h2>

              <div className="relative mx-auto w-full max-w-[18rem] sm:max-w-xs lg:hidden">
                <picture className="block w-full">
                  <source
                    media="(max-width: 640px)"
                    srcSet="/images/home/synaptica-neurofeedback-480.webp"
                    type="image/webp"
                  />
                  <img
                    src="/images/home/synaptica-neurofeedback-768.webp"
                    alt={t("home.neuro.imageAlt")}
                    width={768}
                    height={1024}
                    loading="lazy"
                    decoding="async"
                    className="mx-auto h-auto w-full rounded-2xl object-contain"
                  />
                </picture>
              </div>

              <p className="text-lg font-semibold text-slate-800">{t("home.neuro.subtitle")}</p>
              <p className="max-w-2xl text-slate-700 lg:max-w-none">{t("home.neuro.description")}</p>
              <ul className="space-y-2 text-sm text-slate-700">
                {neuroPoints.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <div className="mt-0.5 items-center justify-center">
                      <RadarIcon size={18} strokeWidth={2} color="#817e32" />
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
        </div>
      </section>

      <VideoTestimonials />

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

      <section className="space-y-5 rounded-3xl border border-slate-200 bg-white/85 px-6 py-8 shadow-lg shadow-slate-200 sm:px-8">
        <h2 className="text-2xl font-semibold text-slate-900">{t("home.aeoTitle")}</h2>
        <QuickAnswersGrid items={aeoItems} gridClassName="grid gap-4 md:grid-cols-3" />
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

        <div className="grid grid-cols-2 gap-3 sm:gap-6">
          {quickLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/85 p-4 shadow-lg shadow-slate-200 transition hover:-translate-y-1 hover:border-[#cdb360]/60 sm:p-5"
            >
              <div
                className={`absolute inset-0 opacity-0 blur-3xl transition duration-300 group-hover:opacity-30 bg-gradient-to-br ${item.accent}`}
                aria-hidden
              />
              <div className="relative flex h-full flex-col gap-2 sm:gap-3">

                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-900">
                  {item.title}
                  <span className="text-slate-500">→</span>
                </div>
                <p className="line-clamp-2 text-sm leading-relaxed text-slate-700 sm:line-clamp-none">{item.description}</p>
                <span className="mt-auto text-sm font-semibold text-[#817e32] group-hover:text-[#9f8a3f]">
                  {item.buttonName}
                </span>

              </div>
            </Link>
          ))}
        </div>
      </section>

      <GoogleReviews />
    </div>
  );
}
