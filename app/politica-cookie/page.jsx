"use client";

import { useI18n } from "../providers";

export default function CookiePolicyPage() {
  const { t } = useI18n();
  const sections = t("legal.cookies.sections") || [];

  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white/90 via-white/85 to-slate-100/90 px-6 py-12 shadow-2xl shadow-slate-200 sm:px-10 lg:px-12">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-1/5 top-[-12%] h-72 w-72 rounded-full bg-[#cdb360]/35 blur-3xl" />
        <div className="absolute left-[-10%] bottom-[-12%] h-72 w-72 rounded-full bg-[#aa995a]/25 blur-3xl" />
      </div>

      <div className="relative space-y-6">
        <div className="space-y-3">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#817e32]">
            {t("legal.cookies.badge")}
          </span>
          <h1 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">{t("legal.cookies.title")}</h1>
          <p className="text-sm font-semibold text-slate-700">{t("legal.cookies.updated")}</p>
          <p className="max-w-3xl text-slate-700">{t("legal.cookies.intro")}</p>
        </div>

        <div className="space-y-5">
          {sections.map((section) => (
            <div key={section.title} className="">
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
        </div>
      </div>
    </section>
  );
}
