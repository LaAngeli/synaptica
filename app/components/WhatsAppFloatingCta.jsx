"use client";

import { useEffect, useRef } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useI18n } from "../providers";

/**
 * Buton flotant WhatsApp care se deformează „fluid": când, la scroll spre subsol,
 * ajunge peste linia „Created by AdVista", muchia de sus crește un golf concav
 * neted (cu fund plat mai lat decât textul), iar conținutul alunecă în banda de jos.
 * `clip-path` scoate zona golfului din aria de click, ca link-ul din credit să fie
 * accesibil; umbra e un strat separat (box-shadow), deci morph-ul nu recalculează
 * niciun filtru — animația rămâne fluidă. Reversibil și elastic.
 */

const BAY_HEIGHT = 46; // înălțimea pill-ului (constantă)
const BAY_DEPTH = 23; // adâncimea golfului la deschidere maximă (px)
const FLAT_PAD = 13; // cât depășește fundul plat jumătatea textului (px)
const SLOPE = 26; // lățimea fiecărui mal înclinat al golfului (px)
const CONTENT_SHIFT = 11; // cât coboară icon+label la deschidere (px)
const STIFFNESS = 210;
const DAMPING = 24;

export default function WhatsAppFloatingCta() {
  const { t } = useI18n();
  const socials = t("contact.socials") || {};
  const whatsappHref = socials.whatsapp;
  const ctaLabel = t("contact.whatsappCta.primary") || "WhatsApp";

  const linkRef = useRef(null);
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const contentRef = useRef(null);

  const openRef = useRef(0);
  const velRef = useRef(0);
  const targetRef = useRef(0);

  useEffect(() => {
    if (!whatsappHref) return undefined;
    const link = linkRef.current;
    const svg = svgRef.current;
    const path = pathRef.current;
    const content = contentRef.current;
    if (!link || !svg || !path) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const credit = document.querySelector("[data-footer-credit]");
    const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

    let raf = 0;
    let last = 0;
    let running = false;
    let near = false;

    // Metrici cache-uite (se schimbă doar la resize / limbă) — NU la fiecare frame.
    let btnW = link.getBoundingClientRect().width;
    let textW = 110;
    let textCxRel = null;

    const remeasure = () => {
      const rect = link.getBoundingClientRect();
      btnW = rect.width;
      if (credit) {
        const range = document.createRange();
        range.selectNodeContents(credit);
        const r = range.getBoundingClientRect();
        textW = r.width;
        textCxRel = r.left + r.width / 2 - rect.left;
      }
      svg.setAttribute("viewBox", `0 0 ${btnW} ${BAY_HEIGHT}`);
    };

    const pillPath = (W, H) => {
      const R = H / 2;
      return `M ${R},0 L ${W - R},0 A ${R},${R} 0 0 1 ${W - R},${H} L ${R},${H} A ${R},${R} 0 0 1 ${R},0 Z`;
    };

    const bayPath = (W, H, d, flatHalf, cx) => {
      const R = H / 2;
      const fl = cx - flatHalf;
      const fr = cx + flatHalf;
      const lx = fl - SLOPE;
      const rx = fr + SLOPE;
      const k = SLOPE * 0.5;
      return [
        `M ${R},0`,
        `L ${lx.toFixed(2)},0`,
        `C ${(lx + k).toFixed(2)},0 ${(fl - k).toFixed(2)},${d.toFixed(2)} ${fl.toFixed(2)},${d.toFixed(2)}`,
        `L ${fr.toFixed(2)},${d.toFixed(2)}`,
        `C ${(fr + k).toFixed(2)},${d.toFixed(2)} ${(rx - k).toFixed(2)},0 ${rx.toFixed(2)},0`,
        `L ${W - R},0`,
        `A ${R},${R} 0 0 1 ${W - R},${H}`,
        `L ${R},${H}`,
        `A ${R},${R} 0 0 1 ${R},0`,
        `Z`,
      ].join(" ");
    };

    const apply = () => {
      const open = Math.max(0, openRef.current);
      const W = btnW;
      const H = BAY_HEIGHT;
      let d;
      if (open < 0.004) {
        d = pillPath(W, H);
      } else {
        const R = H / 2;
        const flatHalf = Math.min(textW / 2 + FLAT_PAD, W / 2 - R - SLOPE - 6);
        const half = flatHalf + SLOPE;
        const cx = textCxRel == null ? W / 2 : clamp(textCxRel, R + half, W - R - half);
        d = bayPath(W, H, BAY_DEPTH * Math.min(1.06, open), flatHalf, cx);
      }
      path.setAttribute("d", d);
      // clip-path scoate golful din aria de click a butonului.
      link.style.clipPath = `path("${d}")`;
      if (content) {
        content.style.transform = `translateY(${(CONTENT_SHIFT * Math.min(1, open)).toFixed(2)}px)`;
      }
    };

    const measureTarget = () => {
      if (!credit) {
        targetRef.current = 0;
        return;
      }
      const b = link.getBoundingClientRect();
      const c = credit.getBoundingClientRect();
      const cCx = c.left + c.width / 2;
      const inX = cCx > b.left + 28 && cCx < b.right - 28;
      const ov = Math.max(0, Math.min(b.bottom, c.bottom) - Math.max(b.top, c.top));
      const ratio = c.height > 0 ? Math.min(1, ov / c.height) : 0;
      targetRef.current = inX ? ratio : 0;
    };

    const frame = (now) => {
      const dt = Math.min(0.032, (now - (last || now)) / 1000) || 0.016;
      last = now;
      measureTarget();

      if (reduced) {
        openRef.current = targetRef.current;
        velRef.current = 0;
      } else {
        const a =
          -STIFFNESS * (openRef.current - targetRef.current) - DAMPING * velRef.current;
        velRef.current += a * dt;
        openRef.current += velRef.current * dt;
      }
      apply();

      if (near || openRef.current > 0.004 || Math.abs(velRef.current) > 0.01) {
        raf = requestAnimationFrame(frame);
      } else {
        running = false;
        openRef.current = 0;
        velRef.current = 0;
        apply();
      }
    };

    const start = () => {
      if (running) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(
      (entries) => {
        const wasNear = near;
        near = entries.some((e) => e.isIntersecting);
        if (near && !wasNear) remeasure();
        if (near) start();
      },
      { rootMargin: "140px 0px 80px 0px", threshold: 0 }
    );
    if (credit) io.observe(credit);

    const onResize = () => {
      remeasure();
      start();
    };

    remeasure();
    apply();
    start();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [whatsappHref]);

  if (!whatsappHref) return null;

  return (
    <div className="pointer-events-none fixed inset-x-4 bottom-4 z-40 flex justify-center sm:inset-x-auto sm:right-6">
      <div className="group pointer-events-none relative flex w-full justify-center sm:w-auto sm:min-w-[300px]">
        {/* Umbra: strat separat (pill static) — nu se recalculează la morph. */}
        <span
          aria-hidden="true"
          style={{ height: `${BAY_HEIGHT}px` }}
          className="pointer-events-none absolute inset-x-0 top-0 rounded-full shadow-lg shadow-[#cdb360]/50 transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-[#cdb360]/60"
        />
        <a
          ref={linkRef}
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ctaLabel}
          style={{ height: `${BAY_HEIGHT}px` }}
          className="pointer-events-auto relative inline-flex w-full items-center justify-center rounded-full px-5 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#cdb360] focus-visible:ring-offset-2 focus-visible:ring-offset-[#eef3f7] sm:w-auto sm:min-w-[300px]"
        >
          <svg
            ref={svgRef}
            className="pointer-events-none absolute inset-0 h-full w-full"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="wa-fill" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#9f8a3f" />
                <stop offset="100%" stopColor="#cdb360" />
              </linearGradient>
            </defs>
            <path ref={pathRef} fill="url(#wa-fill)" d="" />
          </svg>

          <span
            ref={contentRef}
            className="pointer-events-none relative z-10 inline-flex items-center gap-2 will-change-transform"
          >
            <FaWhatsapp size={18} className="shrink-0" />
            <span>{ctaLabel}</span>
          </span>
        </a>
      </div>
    </div>
  );
}
