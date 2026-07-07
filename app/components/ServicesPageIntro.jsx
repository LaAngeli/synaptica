import {
  Radar,
  Waves,
  Hand,
  Sparkles,
  ArrowDown,
} from "lucide-react";

const SERVICE_NAV_ICONS = {
  isync: Radar,
  neuro: Waves,
  bowen: Hand,
  rejuvance: Sparkles,
};

/**
 * Hero intro for the services page — title, short copy, and anchor cards.
 */
export default function ServicesPageIntro({ t, sections }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/55 p-6 shadow-lg shadow-slate-200/40 backdrop-blur-sm sm:p-8 lg:p-10">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-[#cdb360]/35 blur-3xl" />
        <div className="absolute -right-12 bottom-[-2rem] h-52 w-52 rounded-full bg-[#9f8a3f]/25 blur-3xl" />
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgb(148 163 184 / 0.12) 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
        />
      </div>

      <div className="relative space-y-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#817e32] backdrop-blur-sm">
          {t("services.pageTitle")}
        </span>

        <div className="max-w-3xl space-y-4">
          <h1 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-[2.65rem]">
            {t("services.heroTitleStart")}{" "}
            <span className="bg-gradient-to-r from-[#9f8a3f] via-[#aa995a] to-[#817e32] bg-clip-text text-transparent">
              {t("services.heroTitleHighlight")}
            </span>
            {t("services.heroTitleEnd")}
          </h1>
          <p className="text-base leading-relaxed text-slate-700 sm:text-lg">
            {t("services.intro")}
          </p>
        </div>

        <div className="hidden space-y-3 pt-1 lg:block">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#817e32]">
            {t("services.navLabel")}
          </p>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {sections.map((section) => {
              const Icon = SERVICE_NAV_ICONS[section.key] || Radar;

              return (
                <a
                  key={section.key}
                  href={`#${section.key}`}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white/85 p-4 shadow-sm shadow-slate-200/50 transition hover:-translate-y-0.5 hover:border-[#cdb360]/50 hover:shadow-md hover:shadow-[#cdb360]/10"
                >
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#cdb360]/0 to-[#9f8a3f]/0 opacity-0 transition duration-300 group-hover:from-[#cdb360]/10 group-hover:to-[#9f8a3f]/5 group-hover:opacity-100"
                    aria-hidden
                  />
                  <div className="relative flex h-full flex-col gap-3">
                    <div className="inline-flex size-9 items-center justify-center rounded-xl border border-[#817e32]/20 bg-white text-[#817e32] shadow-sm shadow-[#817e32]/10">
                      <Icon size={18} strokeWidth={2} aria-hidden="true" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold leading-snug text-slate-900">
                        {section.badge}
                      </p>
                      <p className="text-xs leading-relaxed text-slate-600 line-clamp-2">
                        {section.highlight}
                      </p>
                    </div>
                    <span className="mt-auto inline-flex items-center gap-1 text-xs font-semibold text-[#817e32] transition group-hover:text-[#9f8a3f]">
                      {t("services.navCta")}
                      <ArrowDown
                        size={14}
                        className="transition group-hover:translate-y-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
