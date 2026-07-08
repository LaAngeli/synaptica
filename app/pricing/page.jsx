"use client";

import { useI18n } from "../providers";
import { CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";
import QuickAnswersGrid from "../components/QuickAnswersGrid";
import PricingPageIntro from "../components/PricingPageIntro";
import SectionCard from "../components/SectionCard";

export default function PreturiPage() {
  const { t } = useI18n();
  const groups = t("pricing.groups") || [];
  const aeoTitle = t("pricing.aeoTitle");
  const aeoItems = t("pricing.aeoItems") || [];

  return (
    <div className="space-y-10 text-slate-900">
      <p className="sr-only">
        {t("pricing.description")} {t("pricing.seoIntro")}
      </p>

      <PricingPageIntro t={t} groups={groups} />

      {groups.map((group) => (
        <SectionCard
          key={group.key || group.title}
          id={group.key}
          className="scroll-mt-28"
          contentClassName="space-y-4"
        >
          <h2 className="text-2xl font-bold text-slate-900">{group.title}</h2>
          <div className="space-y-6">
              {(group.items || []).map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white/95 via-white/90 to-[#f6f0de]/50 p-5 shadow-inner shadow-slate-200/80"
                >
                  <div className="flex flex-col gap-1">
                    <p className="text-xl font-bold text-slate-900">{item.label}</p>
                    {/* <p className="text-2xl font-bold text-[#817e32]">{item.price}</p> */}

                    {item.offer ? (
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="text-lg font-semibold text-slate-400 line-through decoration-slate-400/70 decoration-2">
                            {item.offer.original}
                          </span>
                          <span className="inline-flex items-center rounded-full bg-gradient-to-r from-[#9f8a3f] to-[#cdb360] px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-white shadow-sm shadow-[#cdb360]/40">
                            {item.offer.discountLabel}
                          </span>
                        </div>
                        <p className="text-3xl font-bold text-[#817e32]">{item.offer.discounted}</p>
                        <p className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-full border border-[#cdb360]/45 bg-[#f6f0de]/60 px-3 py-1 text-xs font-semibold text-[#817e32]">
                          <Clock size={13} strokeWidth={2.2} aria-hidden />
                          {item.offer.validity}
                        </p>
                      </div>
                    ) : (
                      item.price &&
                      item.price.map((price, idx) => (
                        <div key={`${item.label}-price-${idx}`} className="">
                          <p className="mb-0 text-2xl font-bold text-[#817e32]">
                            {price.price}
                          </p>
                          <p
                            className="text-sm text-[#817e32] whitespace-pre-line leading-tight"
                          >
                            {price.label}
                          </p>
                          {/* <span className="ml-2 text-sm font-medium text-slate-700">{extra.label}</span> */}
                        </div>
                      ))
                    )}

                    {item.extraPrices &&
                      item.extraPrices.map((extra, idx) => (
                        <div key={`${item.label}-extra-${idx}`} className="mt-2">
                          <p className="text-2xl font-bold text-[#817e32]">
                            {extra.price}
                          </p>
                          <p className="text-sm text-[#817e32] font-height">
                            {extra.label}
                          </p>
                          {/* <span className="ml-2 text-sm font-medium text-slate-700">{extra.label}</span> */}
                        </div>
                      ))}
                  </div>

                  {item.description && (
                    <div className="mt-4 space-y-1">
                      <p className="text-sm font-semibold text-slate-900">{t("pricing.descriptionTitle")}</p>
                      <p className="text-sm text-slate-700 whitespace-pre-line">{item.description}</p>
                    </div>
                  )}

                  {item.benefits && item.benefits.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <p className="text-sm font-semibold text-slate-900">{t("pricing.benefitsTitle")}</p>
                      <ul className="space-y-1 text-sm text-slate-700">
                        {item.benefits.map((benefit) => (
                          <li key={benefit} className="flex items-start gap-2">
                            <div>
                              <CheckCircle2 size={14} className="mt-[2px] text-[#817e32]" aria-hidden />
                            </div>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
        </SectionCard>
      ))}

      <SectionCard variant="plain" contentClassName="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">{aeoTitle}</h2>
        <QuickAnswersGrid items={aeoItems} />
      </SectionCard>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#9f8a3f] to-[#cdb360] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#cdb360]/50 transition hover:from-[#aa995a] hover:to-[#9f8a3f]"
        >
          {t("conditions.contactCta")}
        </Link>
        <Link
          href="/conditions"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-white/80"
        >
          {t("home.neuro.secondaryCta")}
        </Link>
      </div>
    </div>
  );
}
