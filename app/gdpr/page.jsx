"use client";

import { useI18n } from "../providers";
import SectionCard from "../components/SectionCard";

export default function GdprPage() {
  const { t } = useI18n();
  const sections = t("legal.gdpr.sections") || [];

  return (
    <div className="space-y-10 text-slate-900">
      <SectionCard contentClassName="space-y-3">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#817e32]">
          {t("legal.gdpr.badge")}
        </span>
        <h1 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">{t("legal.gdpr.title")}</h1>
        <p className="text-sm font-semibold text-slate-700">{t("legal.gdpr.updated")}</p>
        <p className="max-w-3xl text-slate-700">{t("legal.gdpr.intro")}</p>
      </SectionCard>

      <SectionCard variant="plain" contentClassName="space-y-5">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="text-lg font-semibold text-slate-900">{section.title}</h2>
            {section.body && <p className="mt-2 text-sm text-slate-700 whitespace-pre-line">{section.body}</p>}
            {section.bullets && (
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {section.bullets.map((bullet, idx) => (
                  <li key={`${section.title}-bullet-${idx}`} className="leading-relaxed">
                    {bullet}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </SectionCard>
    </div>
  );
}
