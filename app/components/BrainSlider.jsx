"use client";

import { useEffect, useRef } from "react";
import { useI18n } from "../providers";
import SectionCard from "./SectionCard";

const GOLD = [205, 179, 96];
const BRAIN_SRC = "/images/brain/brain-base.webp";

/**
 * Secțiune interactivă „brainmapping": trage bara peste harta cerebrală, iar rețeaua
 * neuronală (noduri + conexiuni + impulsuri) se „aprinde" auriu în zona dezvăluită —
 * metaforă pentru o sesiune de neurofeedback (până la → după).
 * Rețeaua e generată din luminanța imaginii de bază (nodurile aterizează pe liniile aprinse).
 * Portat din designul original la stack-ul site-ului (React + canvas 2D).
 */
export default function BrainSlider() {
  const { t } = useI18n();
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const canvasRef = useRef(null);
  const handleRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const img = imgRef.current;
    const canvas = canvasRef.current;
    const handle = handleRef.current;
    if (!container || !img || !canvas) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const [gr, gg, gb] = GOLD;

    const S = {
      // Centrul orizontal al creierului din imagine (0.506), nu centrul geometric al
      // containerului (0.5) — imaginea are creierul ușor descentrat.
      split: 0.506,
      nodes: [],
      edges: [],
      impulses: [],
      drawRect: { dx: 0, dy: 0, dw: 0, dh: 0 },
      W: 0,
      H: 0,
      dpr: 1,
      dragging: false,
      last: 0,
      raf: 0,
    };

    const lerp = (a, b, t) => a + (b - a) * t;
    const smooth = (a, b, x) => {
      const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
      return t * t * (3 - 2 * t);
    };
    const mapX = (nx) => S.drawRect.dx + nx * S.drawRect.dw;
    const mapY = (ny) => S.drawRect.dy + ny * S.drawRect.dh;

    function applyAspect() {
      const narrow = window.innerWidth < 640;
      const w = container.clientWidth || 1;
      let h = narrow ? w * 1.25 : w * 0.5625;
      h = Math.min(h, window.innerHeight * 0.82);
      container.style.height = `${h}px`;
    }

    function newImpulse() {
      const e = Math.floor(Math.random() * S.edges.length);
      return { e, t: Math.random(), dir: Math.random() < 0.5 ? 1 : -1, sp: 0.28 + Math.random() * 0.5 };
    }

    function buildGraph() {
      if (!img.naturalWidth) return;
      const sw = 300;
      const sh = Math.max(1, Math.round((sw * img.naturalHeight) / img.naturalWidth));
      const oc = document.createElement("canvas");
      oc.width = sw;
      oc.height = sh;
      const octx = oc.getContext("2d");
      octx.drawImage(img, 0, 0, sw, sh);
      const data = octx.getImageData(0, 0, sw, sh).data;
      const lum = (x, y) => {
        const i = (y * sw + x) * 4;
        return (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
      };

      const nodes = [];
      const minD = 0.028;
      let attempts = 0;
      while (nodes.length < 190 && attempts < 14000) {
        attempts++;
        const x = 1 + Math.floor(Math.random() * (sw - 2));
        const y = 1 + Math.floor(Math.random() * (sh - 2));
        const l = lum(x, y);
        if (l < 0.1) continue;
        if (Math.random() > Math.pow(l, 1.4)) continue;
        const nx = x / sw;
        const ny = y / sh;
        let ok = true;
        for (const n of nodes) {
          const ddx = n.nx - nx;
          const ddy = n.ny - ny;
          if (ddx * ddx + ddy * ddy < minD * minD) {
            ok = false;
            break;
          }
        }
        if (!ok) continue;
        nodes.push({ nx, ny, l: Math.min(1, l * 1.15), ph: Math.random() * Math.PI * 2, sp: 0.7 + Math.random() * 1.6 });
      }

      const edges = [];
      const seen = {};
      const maxD = 0.085;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        const near = [];
        for (let j = 0; j < nodes.length; j++) {
          if (i === j) continue;
          const b = nodes[j];
          const d = Math.hypot(a.nx - b.nx, a.ny - b.ny);
          if (d < maxD) near.push({ j, d });
        }
        near.sort((p, q) => p.d - q.d);
        const k = Math.min(3, near.length);
        for (let m = 0; m < k; m++) {
          const j = near[m].j;
          const key = i < j ? `${i}-${j}` : `${j}-${i}`;
          if (seen[key]) continue;
          seen[key] = 1;
          edges.push([i, j, near[m].d]);
        }
      }

      S.nodes = nodes;
      S.edges = edges;
      S.impulses = [];
      const N = Math.min(44, Math.max(10, Math.floor(edges.length * 0.14)));
      for (let i = 0; i < N; i++) S.impulses.push(newImpulse());
    }

    function resize() {
      const W = container.clientWidth;
      const H = container.clientHeight;
      if (!W || !H) return;
      S.dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(W * S.dpr);
      canvas.height = Math.round(H * S.dpr);
      S.W = W;
      S.H = H;
      const iw = img.naturalWidth || 16;
      const ih = img.naturalHeight || 9;
      const scale = Math.min(W / iw, H / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      S.drawRect = { dx: (W - dw) / 2, dy: (H - dh) / 2, dw, dh };
    }

    function setSplitFromEvent(e) {
      const r = container.getBoundingClientRect();
      S.split = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
    }

    const onDown = (e) => {
      S.dragging = true;
      setSplitFromEvent(e);
    };
    const onMove = (e) => {
      if (S.dragging) setSplitFromEvent(e);
    };
    const onUp = () => {
      S.dragging = false;
    };

    function loop(now) {
      S.raf = requestAnimationFrame(loop);
      const dt = Math.min(0.05, (now - (S.last || now)) / 1000);
      S.last = now;
      const ctx = canvas.getContext("2d");
      const { W, H, dpr } = S;
      if (!W || !H) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      const splitX = S.split * W;
      const band = Math.max(38, W * 0.05);
      const act = (x) => smooth(splitX - band, splitX + band, x);
      const breath = reduceMotion ? 1 : 1 + 0.14 * Math.sin(now * 0.0011);

      const veil = ctx.createLinearGradient(0, 0, W, 0);
      const sL = Math.max(0, (splitX - band) / W);
      const sR = Math.min(1, (splitX + band) / W);
      veil.addColorStop(0, "rgba(3,3,2,0.16)");
      veil.addColorStop(Math.max(0.0001, sL), "rgba(3,3,2,0.16)");
      veil.addColorStop(Math.min(0.9999, sR), "rgba(3,3,2,0)");
      veil.addColorStop(1, "rgba(3,3,2,0)");
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = veil;
      ctx.fillRect(0, 0, W, H);

      ctx.globalCompositeOperation = "lighter";

      for (let k = 0; k < S.edges.length; k++) {
        const [ia, ib] = S.edges[k];
        const a = S.nodes[ia];
        const b = S.nodes[ib];
        const ax = mapX(a.nx);
        const ay = mapY(a.ny);
        const bx = mapX(b.nx);
        const by = mapY(b.ny);
        const aMid = act((ax + bx) / 2);
        ctx.strokeStyle = `rgba(${gr},${gg},${gb},${lerp(0.1, 0.17, aMid)})`;
        ctx.lineWidth = lerp(0.5, 1, aMid);
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.stroke();
      }

      for (const n of S.nodes) {
        const x = mapX(n.nx);
        const y = mapY(n.ny);
        const a = act(x);
        if (!reduceMotion) n.ph += dt * n.sp * lerp(0.4, 2.2, a);
        const flick = 1 + Math.sin(n.ph) * lerp(0.06, 0.55, a);
        const bright = lerp(0.62, 1, a) * n.l * flick * breath;
        const rad = lerp(0.7, 2.2, a) * (0.7 + n.l * 0.9);
        const halo = rad * lerp(2.4, 5.5, a);
        const g = ctx.createRadialGradient(x, y, 0, x, y, halo);
        g.addColorStop(0, `rgba(${gr},${gg},${gb},${0.5 * bright})`);
        g.addColorStop(1, `rgba(${gr},${gg},${gb},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, halo, 0, 7);
        ctx.fill();
        ctx.fillStyle = `rgba(${Math.min(255, gr + 40)},${Math.min(255, gg + 50)},${Math.min(255, gb + 90)},${Math.min(1, bright)})`;
        ctx.beginPath();
        ctx.arc(x, y, rad, 0, 7);
        ctx.fill();
      }

      for (const im of S.impulses) {
        const edge = S.edges[im.e];
        if (!edge) {
          Object.assign(im, newImpulse());
          continue;
        }
        const a = S.nodes[edge[0]];
        const b = S.nodes[edge[1]];
        const ax = mapX(a.nx);
        const ay = mapY(a.ny);
        const bx = mapX(b.nx);
        const by = mapY(b.ny);
        const hx = lerp(ax, bx, im.dir > 0 ? im.t : 1 - im.t);
        const hy = lerp(ay, by, im.dir > 0 ? im.t : 1 - im.t);
        const aH = act(hx);
        if (!reduceMotion) im.t += dt * im.sp * lerp(0.18, 1, aH);
        if (im.t >= 1) {
          Object.assign(im, newImpulse());
          im.t = 0;
          continue;
        }
        const tl = 0.34;
        const tt = Math.max(0, (im.dir > 0 ? im.t : 1 - im.t) - im.dir * tl);
        const tx = lerp(ax, bx, tt);
        const ty = lerp(ay, by, tt);
        const grad = ctx.createLinearGradient(tx, ty, hx, hy);
        grad.addColorStop(0, `rgba(${gr},${gg},${gb},0)`);
        grad.addColorStop(1, `rgba(${gr},${gg},${gb},${lerp(0.12, 0.7, aH)})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = lerp(0.8, 2, aH);
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(hx, hy);
        ctx.stroke();
        const hb = lerp(0.55, 1, aH) * (0.85 + 0.15 * Math.sin(now * 0.02 + im.e));
        const hr = lerp(1.6, 4.2, aH);
        const hg = ctx.createRadialGradient(hx, hy, 0, hx, hy, hr * 3.2);
        hg.addColorStop(0, `rgba(255,246,214,${0.85 * hb})`);
        hg.addColorStop(0.35, `rgba(${gr},${gg},${gb},${0.55 * hb})`);
        hg.addColorStop(1, `rgba(${gr},${gg},${gb},0)`);
        ctx.fillStyle = hg;
        ctx.beginPath();
        ctx.arc(hx, hy, hr * 3.2, 0, 7);
        ctx.fill();
        ctx.fillStyle = `rgba(255,250,232,${Math.min(1, hb)})`;
        ctx.beginPath();
        ctx.arc(hx, hy, hr * 0.55, 0, 7);
        ctx.fill();
      }

      const seam = ctx.createLinearGradient(splitX - band * 1.6, 0, splitX + band * 1.6, 0);
      seam.addColorStop(0, `rgba(${gr},${gg},${gb},0)`);
      seam.addColorStop(0.5, `rgba(${gr},${gg},${gb},${0.1 * breath})`);
      seam.addColorStop(1, `rgba(${gr},${gg},${gb},0)`);
      ctx.fillStyle = seam;
      ctx.fillRect(splitX - band * 1.6, 0, band * 3.2, H);

      if (handle) handle.style.left = `${S.split * 100}%`;
    }

    const start = () => {
      buildGraph();
      resize();
      S.raf = requestAnimationFrame(loop);
    };
    if (img.complete && img.naturalWidth) start();
    else img.addEventListener("load", start, { once: true });

    const ro = new ResizeObserver(() => resize());
    ro.observe(container);
    const onWinResize = () => applyAspect();
    window.addEventListener("resize", onWinResize);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    container.addEventListener("pointerdown", onDown);
    applyAspect();

    return () => {
      cancelAnimationFrame(S.raf);
      ro.disconnect();
      window.removeEventListener("resize", onWinResize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      container.removeEventListener("pointerdown", onDown);
    };
  }, []);

  return (
    <SectionCard contentClassName="space-y-6">
      <div className="space-y-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#817e32]">
          {t("home.brainSlider.eyebrow")}
        </span>
        <h2 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
          {t("home.brainSlider.titleStart")}{" "}
          <span className="bg-gradient-to-r from-[#9f8a3f] via-[#aa995a] to-[#817e32] bg-clip-text text-transparent">
            {t("home.brainSlider.titleHighlight")}
          </span>
        </h2>
        <p className="max-w-2xl text-base leading-relaxed text-slate-700">
          {t("home.brainSlider.paragraph")}
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative w-full select-none overflow-hidden rounded-2xl border border-[#cdb360]/20 bg-black shadow-xl shadow-slate-300/50"
        style={{ cursor: "ew-resize", touchAction: "none" }}
      >
        <img
          ref={imgRef}
          src={BRAIN_SRC}
          alt={t("home.brainSlider.imageAlt")}
          draggable="false"
          className="pointer-events-none absolute inset-0 h-full w-full object-contain"
          style={{ filter: "brightness(.78) contrast(1.04)" }}
        />
        <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />

        <span className="pointer-events-none absolute left-[18px] top-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/40">
          {t("home.brainSlider.before")}
        </span>
        <span
          className="pointer-events-none absolute right-[18px] top-4 text-[11px] font-bold uppercase tracking-[0.24em] text-[#cdb360]"
          style={{ textShadow: "0 0 12px rgba(205,179,96,.6)" }}
        >
          {t("home.brainSlider.after")}
        </span>

        <div
          ref={handleRef}
          className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2"
          style={{
            width: "2.3px",
            background:
              "linear-gradient(180deg,rgba(205,179,96,0),rgba(205,179,96,.85) 16%,rgba(205,179,96,.85) 41%,rgba(205,179,96,0) 45%,rgba(205,179,96,0) 55%,rgba(205,179,96,.85) 59%,rgba(205,179,96,.85) 84%,rgba(205,179,96,0))",
          }}
        >
          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2.5">
            <span
              className="text-base font-semibold leading-none text-[#cdb360]"
              style={{ filter: "drop-shadow(0 0 6px rgba(205,179,96,.55))" }}
              aria-hidden="true"
            >
              ‹
            </span>
            <div
              className="flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-[#cdb360]/90 bg-[#0b1527]"
              style={{ boxShadow: "0 0 22px rgba(205,179,96,.45),inset 0 0 12px rgba(205,179,96,.22)" }}
            >
              <img
                src="/synaptica_logo.png"
                alt=""
                className="h-6 w-auto object-contain"
                style={{ filter: "drop-shadow(0 0 5px rgba(205,179,96,.4))" }}
              />
            </div>
            <span
              className="text-base font-semibold leading-none text-[#cdb360]"
              style={{ filter: "drop-shadow(0 0 6px rgba(205,179,96,.55))" }}
              aria-hidden="true"
            >
              ›
            </span>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-3.5 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.14em] text-[#cdb360]/70">
          <span className="bs-hint relative inline-block">
            {t("home.brainSlider.drag")}
            <span aria-hidden="true" className="absolute left-full top-1/2 ml-2 -translate-y-1/2">
              →
            </span>
          </span>
        </div>
      </div>
    </SectionCard>
  );
}
