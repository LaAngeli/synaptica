"use client";
import Link from "next/link";
import { useI18n } from "../providers";
import QuickAnswersGrid from "../components/QuickAnswersGrid";
import ServiceSectionMedia from "../components/ServiceSectionMedia";
import ServicesPageIntro from "../components/ServicesPageIntro";
import {
  SERVICE_IMAGE_ASSETS,
  SERVICE_INCLUDES_IMAGE_ASSETS,
  defaultServiceImagePosition,
} from "../../lib/service-images";
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
  Hand,
  Moon,
  HeartPulse,
  Droplets,
  Smile,
  Flower2,
  Leaf,
} from "lucide-react";

/**
 * @returns {JSX.Element}
 */
export default function ServiciiPage() {
  const { t } = useI18n();
  const sections = t("services.sections") || [];
  const includesTitle = t("services.includesTitle");
  const aeoTitle = t("services.aeoTitle");
  const aeoItems = t("services.aeoItems") || [];
  const ICONS_BY_SERVICE = {
    isync: [Radar, FileText, Sparkles, Activity],
    neuro: [Waves, Headphones, Gauge, Zap],
    bowen: [Hand, Waves, Moon, HeartPulse, Droplets],
    rejuvance: [Hand, Sparkles, Smile, Flower2, Leaf],
  };

  return (
    <section className="space-y-3 relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white/90 via-white/85 to-slate-100/90 px-6 py-12 shadow-2xl shadow-slate-200 sm:px-10 lg:px-12">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-[-6%] top-[-10%] h-72 w-72 rounded-full bg-[#cdb360]/30 blur-3xl" />
        <div className="absolute right-1/4 top-[-10%] h-72 w-72 rounded-full bg-[#cdb360]/45 blur-3xl" />
        <div className="absolute right-[-4%] bottom-[-8%] h-64 w-64 rounded-full bg-[#9f8a3f]/20 blur-3xl" />
      </div>

      <p className="sr-only">{t("services.stackIntro")}</p>

      <ServicesPageIntro t={t} sections={sections} />

      {sections.map((section, index) => {
        const imageAsset = SERVICE_IMAGE_ASSETS[section.key];
        const hasImage = Boolean(imageAsset && section.imageAlt);
        const imagePosition =
          section.imagePosition ||
          imageAsset?.position ||
          defaultServiceImagePosition(index);
        const textFirstOnDesktop = imagePosition === "right";
        const includesAsset = SERVICE_INCLUDES_IMAGE_ASSETS[section.key];
        const hasIncludesImage = Boolean(includesAsset && section.includesImageAlt);
        const includesPosition = includesAsset?.position || "left";

        return (
          <div
            key={section.key}
            id={section.key}
            className={`relative mb-15 scroll-mt-28 ${
              index > 0 ? "border-t border-slate-200/60 pt-14" : "pt-6"
            }`}
          >
            <div
              className={
                hasImage
                  ? "space-y-4 lg:space-y-6"
                  : "space-y-4"
              }
            >
              <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
                {section.badge}
              </h1>

              {hasImage ? (
                <>
                  <ServiceSectionMedia
                    variant="mobile"
                    position={imagePosition}
                    basePath={imageAsset.basePath}
                    alt={section.imageAlt}
                    width={imageAsset.width}
                    height={imageAsset.height}
                  />

                  <div
                    className={`grid gap-8 lg:items-center lg:gap-10 ${
                      textFirstOnDesktop
                        ? "lg:grid-cols-[1.05fr_0.95fr]"
                        : "lg:grid-cols-[0.95fr_1.05fr]"
                    }`}
                  >
                    <div
                      className={`space-y-4 ${
                        textFirstOnDesktop ? "lg:order-1" : "lg:order-2"
                      }`}
                    >
                      {(section.details || []).map((para) => (
                        <p key={para} className="text-md text-slate-700">
                          {para}
                        </p>
                      ))}
                    </div>

                    <div
                      className={
                        textFirstOnDesktop
                          ? "hidden lg:order-2 lg:block lg:justify-self-end lg:self-center"
                          : "hidden lg:order-1 lg:block lg:justify-self-start lg:self-center"
                      }
                    >
                      <ServiceSectionMedia
                        variant="desktop"
                        position={imagePosition}
                        basePath={imageAsset.basePath}
                        alt={section.imageAlt}
                        width={imageAsset.width}
                        height={imageAsset.height}
                      />
                    </div>
                  </div>
                </>
              ) : (
                (section.details || []).map((para) => (
                  <p key={para} className="text-md text-slate-700">
                    {para}
                  </p>
                ))
              )}
            </div>

            <div className="mt-10">
              <div className="flex items-end justify-between gap-4">
                <h2 className="text-md font-semibold uppercase tracking-[0.22em] text-[#817e32]">
                  {includesTitle}
                </h2>
              </div>

              {hasIncludesImage && (
                <div className="mt-5 lg:hidden">
                  <ServiceSectionMedia
                    variant="mobile"
                    position={includesPosition}
                    size="compact"
                    basePath={includesAsset.basePath}
                    alt={section.includesImageAlt}
                    width={includesAsset.width}
                    height={includesAsset.height}
                  />
                </div>
              )}

              <div
                className={
                  hasIncludesImage
                    ? "mt-5 grid gap-5 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-center lg:gap-4"
                    : "mt-5"
                }
              >
                {hasIncludesImage && (
                  <ServiceSectionMedia
                    variant="desktop"
                    position={includesPosition}
                    size="compact"
                    basePath={includesAsset.basePath}
                    alt={section.includesImageAlt}
                    width={includesAsset.width}
                    height={includesAsset.height}
                  />
                )}

                <div className="grid gap-3 lg:self-center">
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
            </div>
          </div>
        );
      })}

      <div className="relative mt-10 space-y-4 rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm shadow-slate-200/60">
        <h2 className="text-lg font-semibold text-slate-900">{aeoTitle}</h2>
        <QuickAnswersGrid items={aeoItems} />
      </div>

      <div className="relative mt-10 flex flex-wrap gap-3">
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
