"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { useI18n } from "../providers";

// Video de test (Big Buck Bunny — embeddable public). Se înlocuiește cu ID-urile reale
// YouTube, în aceeași ordine ca `home.testimonials.items` din translations.js.
// Lasă string gol ca să folosească videoclipul de test.
const TEST_VIDEO_ID = "aqz-KE-bpKQ";
const VIDEO_IDS = ["", "", "", ""];

// Semnătura secțiunii: un traseu de undă cerebrală (EEG). Cel „viu" derulează
// continuu — marchează testimonialul activ. Restul stau liniștite.
function Signal({ live = false }) {
  return (
    <span className="block h-3.5 w-9 overflow-hidden" aria-hidden="true">
      <svg
        viewBox="0 0 80 14"
        className={`h-full w-[72px] ${live ? "signal-live" : ""}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M0 7 q2 -5 4 0 t4 0 t4 0 t4 0 t4 0 t4 0 t4 0 t4 0 t4 0 t4 0 t4 0 t4 0 t4 0 t4 0 t4 0 t4 0 t4 0 t4 0 t4 0 t4 0" />
      </svg>
    </span>
  );
}

export default function VideoTestimonials() {
  const { t } = useI18n();
  const items = t("home.testimonials.items") || [];
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);

  if (items.length === 0) return null;

  const current = items[active] || items[0];
  const videoId = VIDEO_IDS[active] || TEST_VIDEO_ID;

  const select = (index) => {
    setActive(index);
    setPlaying(true);
  };

  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white/90 via-white/85 to-slate-100/90 px-6 py-12 shadow-2xl shadow-slate-200 sm:px-10 lg:px-12">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-1/4 top-[-12%] h-72 w-72 rounded-full bg-[#cdb360]/40 blur-3xl" />
        <div className="absolute right-[6%] bottom-[-18%] h-64 w-64 rounded-full bg-[#9f8a3f]/20 blur-3xl" />
      </div>

      <div className="relative space-y-9">
        <div className="max-w-2xl space-y-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#817e32]">
            {t("home.testimonials.eyebrow")}
          </span>
          <h2 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
            {t("home.testimonials.titleStart")}{" "}
            <span className="bg-gradient-to-r from-[#9f8a3f] via-[#aa995a] to-[#817e32] bg-clip-text text-transparent">
              {t("home.testimonials.titleHighlight")}
            </span>
          </h2>
          <p className="text-slate-600">{t("home.testimonials.subtitle")}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-start">
          {/* Player + vocea persoanei */}
          <div>
            <div className="relative rounded-2xl bg-gradient-to-br from-[#0b1527] to-[#070d18] p-2 shadow-xl shadow-slate-900/20 ring-1 ring-[#cdb360]/20">
              <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
                {playing ? (
                  <iframe
                    key={active}
                    src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                    title={`${t("home.testimonials.playLabel")} — ${current.name}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setPlaying(true)}
                    aria-label={`${t("home.testimonials.playLabel")} — ${current.name}`}
                    className="group absolute inset-0 h-full w-full focus-visible:outline-none"
                  >
                    <span aria-hidden className="absolute inset-0 bg-gradient-to-br from-[#0b1527] via-[#0e1d33] to-[#070d18]" />
                    <span aria-hidden className="absolute right-[-8%] top-[-18%] h-48 w-48 rounded-full bg-[#cdb360]/20 blur-3xl" />
                    <span
                      aria-hidden
                      className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-[#9f8a3f] to-[#cdb360] text-white shadow-xl shadow-[#cdb360]/40 ring-4 ring-white/10 transition duration-300 group-hover:scale-110 group-focus-visible:scale-110"
                    >
                      <Play size={26} fill="currentColor" className="ml-1" />
                    </span>
                  </button>
                )}
              </div>
            </div>

            <div className="mt-5">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">{current.name}</h3>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#817e32]">
                  {current.condition}
                </span>
              </div>
              <p className="mt-3 max-w-xl text-lg leading-relaxed text-slate-700">
                <span className="mr-0.5 align-[-0.15em] text-2xl leading-none text-[#cdb360]">“</span>
                {current.quote}
                <span className="ml-0.5 align-[-0.35em] text-2xl leading-none text-[#cdb360]">”</span>
              </p>
            </div>
          </div>

          {/* Roster — semnalele */}
          <div className="lg:pt-1">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.24em] text-slate-400">
              {t("home.testimonials.rosterLabel")}
            </p>
            <div className="space-y-1">
              {items.map((item, index) => {
                const isActive = index === active;
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => select(index)}
                    aria-pressed={isActive}
                    className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#cdb360]/50 ${
                      isActive
                        ? "bg-white shadow-sm shadow-slate-200 ring-1 ring-[#cdb360]/30"
                        : "hover:bg-white/60"
                    }`}
                  >
                    <span className={isActive ? "text-[#cdb360]" : "text-slate-300 transition group-hover:text-[#cdb360]/60"}>
                      <Signal live={isActive} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={`block truncate text-sm font-semibold ${isActive ? "text-slate-900" : "text-slate-600 group-hover:text-slate-900"}`}>
                        {item.name}
                      </span>
                      <span className="mt-0.5 block font-mono text-[11px] uppercase tracking-[0.18em] text-[#817e32]">
                        {item.condition}
                      </span>
                    </span>
                    {isActive && playing && (
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#cdb360]">●</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
