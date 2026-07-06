"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useI18n } from "../providers";

function GoogleG({ className = "size-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#4285F4" d="M23.5 12.27c0-.8-.07-1.57-.2-2.3H12v4.35h6.46a5.5 5.5 0 0 1-2.4 3.6v3h3.87c2.27-2.1 3.57-5.18 3.57-8.65z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.96-1.08 7.94-2.9l-3.87-3c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.28v3.1A12 12 0 0 0 12 24z" />
      <path fill="#FBBC05" d="M5.27 14.29a7.2 7.2 0 0 1 0-4.58v-3.1H1.28a12 12 0 0 0 0 10.78l3.99-3.1z" />
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42A11.98 11.98 0 0 0 12 0 12 12 0 0 0 1.28 6.6l3.99 3.1C6.22 6.86 8.87 4.75 12 4.75z" />
    </svg>
  );
}

function Stars({ value = 5, className = "" }) {
  const filled = Math.round(value);
  return (
    <span className={`inline-flex gap-0.5 ${className}`} role="img" aria-label={`${value} / 5`}>
      {[1, 2, 3, 4, 5].map((index) => (
        <span
          key={index}
          aria-hidden="true"
          className="leading-none"
          style={{ color: index <= filled ? "#fbbc04" : "#d8dee7" }}
        >
          ★
        </span>
      ))}
    </span>
  );
}

export default function GoogleReviews({ showHeading = true, className = "" }) {
  const { t, language } = useI18n();
  const [status, setStatus] = useState("loading");
  const [data, setData] = useState(null);
  const trackRef = useRef(null);
  const dragRef = useRef({ down: false, startX: 0, startLeft: 0 });

  const handlePointerDown = (event) => {
    if (event.pointerType !== "mouse") return;
    const track = trackRef.current;
    if (!track) return;
    dragRef.current = { down: true, startX: event.clientX, startLeft: track.scrollLeft };
  };

  const handlePointerMove = (event) => {
    const drag = dragRef.current;
    const track = trackRef.current;
    if (!drag.down || !track) return;
    track.scrollLeft = drag.startLeft - (event.clientX - drag.startX);
  };

  const handlePointerUp = () => {
    dragRef.current.down = false;
  };

  useEffect(() => {
    let active = true;
    fetch("/api/reviews")
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error("reviews"))))
      .then((payload) => {
        if (active) {
          setData(payload);
          setStatus("ready");
        }
      })
      .catch(() => {
        if (active) setStatus("error");
      });
    return () => {
      active = false;
    };
  }, []);

  if (status === "error") return null;

  const reviews = data?.reviews || [];
  if (status === "ready" && reviews.length === 0) return null;

  const ratingText =
    typeof data?.rating === "number"
      ? data.rating.toFixed(1).replace(".", language === "en" ? "." : ",")
      : "—";

  const scrollByStep = (direction) => {
    const track = trackRef.current;
    if (track) {
      track.scrollBy({ left: direction * track.clientWidth * 0.85, behavior: "smooth" });
    }
  };

  return (
    <section
      className={`relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white/90 via-white/85 to-slate-100/90 px-6 py-8 shadow-lg shadow-slate-200 sm:px-8 ${className}`}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[8%] top-[-30%] h-56 w-56 rounded-full bg-[#cdb360]/30 blur-3xl" />
      </div>

      <div className="relative min-w-0 space-y-6">
        {showHeading && (
          <div className="space-y-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#817e32]">
              <GoogleG className="size-3.5" />
              {t("reviews.eyebrow")}
            </span>
            <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">{t("reviews.title")}</h2>
            <p className="max-w-2xl text-sm text-slate-600">{t("reviews.subtitle")}</p>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-4xl font-bold leading-none text-slate-900">{ratingText}</span>
            <div className="space-y-1">
              <Stars value={typeof data?.rating === "number" ? data.rating : 5} className="text-lg" />
              <span className="flex items-center gap-1.5 text-sm text-slate-600">
                <GoogleG className="size-4" />
                {data?.total} {t("reviews.onGoogle")}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollByStep(-1)}
              aria-label={t("reviews.prev")}
              className="hidden size-9 items-center justify-center rounded-full border border-slate-200 bg-white/70 text-slate-600 transition hover:border-[#9f8a3f] hover:text-[#9f8a3f] sm:inline-flex"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => scrollByStep(1)}
              aria-label={t("reviews.next")}
              className="hidden size-9 items-center justify-center rounded-full border border-slate-200 bg-white/70 text-slate-600 transition hover:border-[#9f8a3f] hover:text-[#9f8a3f] sm:inline-flex"
            >
              <ChevronRight size={18} />
            </button>
            {data?.writeReviewUrl && (
              <a
                href={data.writeReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-white/80"
              >
                {t("reviews.writeCta")}
              </a>
            )}
            {data?.mapsUrl && (
              <a
                href={data.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#9f8a3f] to-[#cdb360] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#cdb360]/50 transition hover:from-[#aa995a] hover:to-[#9f8a3f]"
              >
                {t("reviews.seeAllCta")}
                <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </div>

        <div
          ref={trackRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="flex cursor-grab select-none snap-x snap-proximity gap-4 overflow-x-auto pb-3 active:cursor-grabbing [scrollbar-color:#cdb360_transparent] [scrollbar-width:thin]"
        >
          {status === "loading"
            ? [0, 1, 2, 3].map((index) => (
                <div
                  key={index}
                  className="w-[80%] shrink-0 snap-start rounded-2xl border border-slate-200 bg-white/70 p-4 sm:w-[330px]"
                >
                  <div className="flex items-center gap-3">
                    <div className="size-10 animate-pulse rounded-full bg-slate-200" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 w-24 animate-pulse rounded bg-slate-200" />
                      <div className="h-2.5 w-16 animate-pulse rounded bg-slate-100" />
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="h-2.5 w-full animate-pulse rounded bg-slate-100" />
                    <div className="h-2.5 w-full animate-pulse rounded bg-slate-100" />
                    <div className="h-2.5 w-2/3 animate-pulse rounded bg-slate-100" />
                  </div>
                </div>
              ))
            : reviews.map((review, index) => (
                <article
                  key={index}
                  className="flex w-[80%] shrink-0 snap-start flex-col rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm shadow-slate-200/60 sm:w-[330px]"
                >
                  <div className="flex items-center gap-3">
                    {review.photo ? (
                      <img
                        src={review.photo}
                        alt=""
                        width={40}
                        height={40}
                        loading="lazy"
                        className="size-10 rounded-full object-cover"
                      />
                    ) : (
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#cdb360]/40 bg-[#cdb360]/15 text-sm font-semibold text-[#817e32]">
                        {review.initials}
                      </span>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-slate-900">{review.author}</p>
                      {review.time && <p className="text-xs text-slate-500">{review.time}</p>}
                    </div>
                    <GoogleG className="size-4 shrink-0" />
                  </div>
                  <Stars value={review.rating} className="mt-3 text-base" />
                  <p className="mt-2 text-sm leading-relaxed text-slate-700 line-clamp-5">{review.text}</p>
                </article>
              ))}
        </div>

        {data?.source === "fallback" && (
          <p className="text-xs text-slate-400">{t("reviews.demoNote")}</p>
        )}
      </div>
    </section>
  );
}
