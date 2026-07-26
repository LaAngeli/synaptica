"use client";

import { useEffect, useRef } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useI18n } from "../providers";

/**
 * Buton flotant WhatsApp care se deformează „fluid": când, la scroll spre subsol,
 * ajunge peste linia „Created by AdVista", muchia de sus crește un golf concav
 * neted (cu fund plat mai lat decât textul, ca textul să rămână complet vizibil),
 * iar conținutul alunecă elastic în banda de jos. Forma rămâne una singură și
 * continuă; totul e reversibil.
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

    const textMetrics = () => {
      if (!credit) return { w: 110, cx: null };
      const range = document.createRange();
      range.selectNodeContents(credit);
      const r = range.getBoundingClientRect();
      return { w: r.width, cx: r.left + r.width / 2 };
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
      const rect = link.getBoundingClientRect();
      const W = rect.width;
      const H = BAY_HEIGHT;
      const R = H / 2;
      svg.setAttribute("viewBox", `0 0 ${W} ${H}`);

      if (open < 0.004) {
        path.setAttribute("d", pillPath(W, H));
      } else {
        const { w: textW, cx: cxAbs } = textMetrics();
        const flatHalf = Math.min(textW / 2 + FLAT_PAD, W / 2 - R - SLOPE - 6);
        const half = flatHalf + SLOPE;
        const cx =
          cxAbs == null ? W / 2 : clamp(cxAbs - rect.left, R + half, W - R - half);
        const d = BAY_DEPTH * Math.min(1.06, open);
        path.setAttribute("d", bayPath(W, H, d, flatHalf, cx));
      }

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
        near = entries.some((e) => e.isIntersecting);
        if (near) start();
      },
      { rootMargin: "140px 0px 80px 0px", threshold: 0 }
    );
    if (credit) io.observe(credit);

    apply();
    start();
    const onResize = () => start();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [whatsappHref]);

  if (!whatsappHref) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-40 flex justify-center sm:inset-x-auto sm:right-6">
      <a
        ref={linkRef}
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ctaLabel}
        style={{ height: `${BAY_HEIGHT}px` }}
        className="group relative inline-flex w-full items-center justify-center rounded-full px-5 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#cdb360] focus-visible:ring-offset-2 focus-visible:ring-offset-[#eef3f7] sm:w-auto sm:min-w-[300px]"
      >
        <svg
          ref={svgRef}
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible transition-[filter] duration-300 [filter:drop-shadow(0_10px_18px_rgba(205,179,96,0.45))] group-hover:[filter:drop-shadow(0_12px_22px_rgba(205,179,96,0.6))]"
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
          className="relative z-10 inline-flex items-center gap-2 will-change-transform"
        >
          <FaWhatsapp size={18} className="shrink-0" />
          <span>{ctaLabel}</span>
        </span>
      </a>
    </div>
  );
}
