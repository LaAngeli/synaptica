"use client";

import Link from "next/link";
import { useI18n } from "../providers";

export default function NotFoundContent() {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white/90 via-white/85 to-slate-100/90 px-6 py-12 shadow-2xl shadow-slate-200 sm:px-10 lg:px-12">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-1/5 top-[-10%] h-72 w-72 rounded-full bg-[#cdb360]/35 blur-3xl" />
        <div className="absolute left-[-8%] bottom-[-12%] h-72 w-72 rounded-full bg-[#aa995a]/25 blur-3xl" />
      </div>

      <div className="relative grid gap-8 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
        <div className="space-y-6">

          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#817e32]">
            {t("notFound.badge")}
          </span>
          <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">
            {t("notFound.title")}
          </h1>
          <p className="max-w-4xl  text-base leading-relaxed text-slate-700">
            {t("notFound.description")}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#9f8a3f] to-[#cdb360] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#cdb360]/50 transition hover:from-[#aa995a] hover:to-[#9f8a3f]"
            >
              {t("notFound.homeCta")}
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-white/80"
            >
              {t("notFound.contactCta")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
