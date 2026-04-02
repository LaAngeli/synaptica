"use client";

import { useI18n } from "../providers";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function PreturiPage() {
  const { t } = useI18n();
  const groups = t("pricing.groups") || [];

  return (
    <section className=" space-y-3 relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white/90 via-white/85 to-slate-100/90 px-6 py-12 shadow-2xl shadow-slate-200 sm:px-10 lg:px-12">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-1/5 top-[-10%] h-72 w-72 rounded-full bg-[#cdb360]/45 blur-3xl" />
        <div className="absolute right-1/10 top-1/2 h-64 w-64 rounded-full bg-[#aa995a]/30 blur-3xl" />
      </div>

      {/* <div className="space-y-6 rounded-3xl border border-slate-200 bg-gradient-to-br from-white/95 via-white/90 to-[#f6f0de]/80 p-8 shadow-xl shadow-slate-200"> */}

      <span className="mb-8 inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#817e32]">
        {t("pricing.badge")}
      </span>
      <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">
        {t("pricing.title")}

      </h1>
      <p className="max-w-4xl  text-base leading-relaxed text-slate-700">
        {t("pricing.description")}
      </p>

      <div className="space-y-8">
        {groups.map((group) => (
          <div
            key={group.title}
            className="mt-10"
          >
            <h2 className="text-2xl font-bold text-slate-900">{group.title}</h2>
            <div className="mt-4 space-y-6">
              {(group.items || []).map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white/95 via-white/90 to-[#f6f0de]/50 p-5 shadow-inner shadow-slate-200/80"
                >
                  <div className="flex flex-col gap-1">
                    <p className="text-xl font-bold text-slate-900">{item.label}</p>
                    {/* <p className="text-2xl font-bold text-[#817e32]">{item.price}</p> */}

                    {item.price &&
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
                      ))}

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
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-3 mt-10">
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
    </section>
  );
}
