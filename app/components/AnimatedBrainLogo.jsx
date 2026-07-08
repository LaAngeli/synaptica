"use client";

import { useEffect, useRef } from "react";

// Logo animat Synaptica: creier low-poly (imagine) + rețea sinaptică (noduri + muchii + puncte).
// Portat din animația-sursă (framework Stage/useTime) pe canvas + requestAnimationFrame,
// în același stil ca BrainSlider.jsx. Spațiu logic 400×350, buclă seamless de 6s
// (toate frecvențele sunt multipli întregi ai lui w → continuitate perfectă la reluare).
const LINE = "#b0974a";
const NODE = "#7c7930";
const DOT = "#9a8636";
const W = 400;
const H = 350;
const TAU = Math.PI * 2;
const PERIOD = 6;

// Noduri conectate — [x, y, razăBază, amplitudineDrift]
const RAW_NODES = [
  [238, 12, 2.8, 1.4], [200, 30, 2.6, 1.2], [250, 48, 2.6, 2.6], [274, 46, 2.4, 3.0],
  [214, 63, 2.6, 1.3], [208, 100, 2.6, 1.3], [250, 100, 3.6, 2.8], [300, 100, 2.8, 3.2],
  [206, 133, 2.6, 1.3], [250, 152, 3.6, 2.8], [300, 130, 2.6, 3.2], [215, 176, 2.6, 1.4],
  [300, 165, 2.6, 3.2], [255, 205, 2.8, 2.6], [300, 200, 2.6, 3.2], [223, 233, 2.6, 1.4],
  [256, 248, 2.8, 1.6], [300, 250, 2.8, 3.0], [330, 60, 2.6, 3.6], [346, 92, 2.4, 3.8],
  [330, 132, 2.6, 3.6], [330, 176, 2.6, 3.6], [326, 240, 2.8, 3.6], [286, 236, 2.4, 2.8],
  [276, 110, 2.2, 3.0],
];

const EDGES = [
  [0, 1], [0, 2], [1, 2], [1, 4], [2, 3], [2, 6], [3, 6], [3, 7], [4, 5], [4, 6], [5, 6],
  [5, 8], [6, 7], [6, 9], [8, 9], [8, 11], [5, 9], [9, 11], [9, 13], [11, 13], [11, 15],
  [15, 16], [13, 16], [6, 24], [24, 7], [7, 10], [7, 18], [18, 19], [7, 19], [10, 12],
  [9, 12], [10, 20], [19, 20], [12, 20], [12, 21], [10, 21], [13, 14], [12, 14],
  [14, 17], [16, 17], [16, 23], [23, 17], [14, 23], [17, 22], [14, 22], [21, 22],
  [3, 18], [13, 17], [24, 10],
];

// Puncte pulsante izolate — [x, y, razăBază]
const RAW_DOTS = [
  [296, 15, 2.6], [320, 22, 2.4], [345, 30, 4.0], [368, 52, 2.4], [300, 86, 2.0], [276, 86, 1.8],
  [285, 60, 1.8], [382, 80, 2.6], [389, 108, 6.0], [360, 120, 1.9], [378, 150, 2.0], [330, 205, 3.0],
  [352, 232, 4.5], [338, 268, 2.8], [318, 286, 2.0],
];

export default function AnimatedBrainLogo({ className = "", alt = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const w = TAU / PERIOD;

    const brain = new Image();
    let raf = 0;
    let start = 0;
    let loaded = false;

    const draw = (t) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      if (loaded) ctx.drawImage(brain, 0, 0, W, H);

      const pos = RAW_NODES.map(([x, y, r, amp], i) => {
        const fa = 1 + (i % 2);
        const fb = 1 + ((i + 1) % 2);
        const pa = (i * 1.7) % TAU;
        const pb = (i * 2.9) % TAU;
        return {
          x: x + amp * Math.sin(w * fa * t + pa),
          y: y + amp * Math.cos(w * fb * t + pb),
          r: r + 0.5 * Math.sin(w * 2 * t + i),
        };
      });

      ctx.strokeStyle = LINE;
      ctx.lineWidth = 1.25;
      ctx.lineCap = "round";
      ctx.globalAlpha = 0.92;
      ctx.beginPath();
      for (const [a, b] of EDGES) {
        ctx.moveTo(pos[a].x, pos[a].y);
        ctx.lineTo(pos[b].x, pos[b].y);
      }
      ctx.stroke();
      ctx.globalAlpha = 1;

      ctx.fillStyle = NODE;
      for (const p of pos) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.6, p.r), 0, TAU);
        ctx.fill();
      }

      ctx.fillStyle = DOT;
      RAW_DOTS.forEach(([x, y, r], i) => {
        const ph = (i * 2.3) % TAU;
        const fk = 1 + (i % 3);
        const wave = 0.5 + 0.5 * Math.sin(w * fk * t + ph);
        const s = 0.68 + 0.32 * wave;
        ctx.globalAlpha = 0.45 + 0.55 * wave;
        ctx.beginPath();
        ctx.arc(x, y, r * s, 0, TAU);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    };

    const loop = (now) => {
      if (!start) start = now;
      draw((now - start) / 1000);
      raf = requestAnimationFrame(loop);
    };

    const begin = () => {
      if (reduce) {
        draw(0);
        return;
      }
      raf = requestAnimationFrame(loop);
    };

    brain.onload = () => {
      loaded = true;
      begin();
    };
    brain.onerror = () => {
      begin();
    };
    brain.src = "/images/brain/synaptica-brain-mesh.png";

    return () => {
      cancelAnimationFrame(raf);
      brain.onload = null;
      brain.onerror = null;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={alt}
      className={className}
      style={{ width: "100%", height: "auto", aspectRatio: `${W} / ${H}`, display: "block" }}
    />
  );
}
