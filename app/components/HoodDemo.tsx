"use client";

import { useEffect, useRef, useState } from "react";

type Labels = { fan: string; on: string; off: string; meter: string; caption: string };
type Smoke = { x: number; y: number; vx: number; vy: number; age: number; life: number; caught: boolean; r: number };

const C = {
  line: "#8c96a0",
  strong: "#c5cbd0",
  faint: "#2a333b",
  air: "#74a6f0",
  flame: "#f4a23a",
};

/* Scene in drawing units. The kitchen sits on the right, the dining room on the left. */
const W = 900;
const H = 600;
const FLOOR = 560;
const CEILING = 44;
const WALL = 870;
const RANGE = { x0: 590, x1: 850, top: 432 };
const POTS = [650, 725, 800];
const HOOD = { x0: 560, x1: WALL, bottom: 250, top: 182, slopeTo: 640 };
const DUCT = { x0: 735, x1: 795 };
const MOUTH = { x: 765, y: HOOD.top + 6 };

/**
 * Section drawing of a kitchen range under a hood. With the exhaust fan off,
 * smoke fills the canopy, spills out and hangs under the ceiling. With it on,
 * the hood captures the smoke and the duct carries it out through the roof.
 * A drawing of the principle, not a measurement.
 */
export default function HoodDemo({ labels, className = "" }: { labels: Labels; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fanRef = useRef(false);
  const meterRef = useRef<HTMLSpanElement>(null);
  const touchedRef = useRef(false);
  const [fan, setFan] = useState(false);

  useEffect(() => {
    fanRef.current = fan;
  }, [fan]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    let raf = 0;
    let visible = false;
    let scale = 1;
    let offsetX = 0;
    let viewW = W;
    let spin = 0;
    let frame = 0;
    let smoke: Smoke[] = [];
    let cap = 900;
    let autoTimer = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      // narrow screens show the kitchen only, so the drawing stays large
      const narrow = rect.width < 560;
      viewW = narrow ? 470 : W;
      offsetX = narrow ? W - viewW : 0;
      scale = Math.min(rect.width / viewW, rect.height / H);
      cap = narrow ? 520 : 900;
      ctx.setTransform(scale * dpr, 0, 0, scale * dpr, ((rect.width - viewW * scale) / 2 - offsetX * scale) * dpr, ((rect.height - H * scale) / 2) * dpr);
      if (reduce.matches) still();
    };

    const spawn = () => {
      const px = POTS[Math.floor(Math.random() * POTS.length)] + (Math.random() - 0.5) * 34;
      smoke.push({ x: px, y: RANGE.top - 34, vx: (Math.random() - 0.5) * 0.3, vy: -0.9 - Math.random() * 0.6, age: 0, life: 900 + Math.random() * 500, caught: false, r: 5 + Math.random() * 4 });
    };

    const step = () => {
      const on = fanRef.current;
      frame++;
      if (smoke.length < cap) {
        spawn();
        if (frame % 2 === 0) spawn();
      }
      for (const p of smoke) {
        p.age++;
        if (p.caught) {
          p.x += (MOUTH.x - p.x) * 0.2;
          p.y -= 5.5;
          continue;
        }
        p.vx += (Math.random() - 0.5) * 0.14;
        p.vy += (Math.random() - 0.5) * 0.05 - 0.045; // buoyancy
        const inCanopy = p.x > HOOD.x0 && p.y < HOOD.bottom + 6;
        if (on) {
          // draft: everything within reach is pulled to the duct mouth
          const dx = MOUTH.x - p.x;
          const dy = MOUTH.y - p.y;
          const d = Math.hypot(dx, dy) + 1;
          const reach = p.x > HOOD.x0 - 70 ? 0.34 : 0.05;
          p.vx += (dx / d) * reach;
          p.vy += (dy / d) * reach;
          if (d < 26) p.caught = true;
        } else if (inCanopy) {
          // no draft: the canopy fills, then spills out under its front edge
          p.vx -= 0.035;
          if (p.y < HOOD.top + 34) p.vy += 0.06;
        }
        if (p.y < CEILING + 10 && !(p.x > DUCT.x0 && p.x < DUCT.x1 && on)) {
          // under the ceiling smoke spreads into the room
          p.y = CEILING + 10;
          p.vy = Math.abs(p.vy) * 0.2;
          p.vx -= 0.035;
        }
        // canopy walls
        if (p.x > HOOD.x0 && p.y < HOOD.bottom && p.y > HOOD.top && p.x < HOOD.x0 + 4) p.vx = -Math.abs(p.vx) - 0.2;
        if (p.x > WALL - 8) p.vx = -Math.abs(p.vx);
        if (p.x < 26) p.vx = Math.abs(p.vx);
        if (inCanopy && p.y < HOOD.top + 8 && !on) p.y = HOOD.top + 8 + Math.random() * 16;
        p.vx *= 0.955;
        p.vy *= 0.955;
        p.x += p.vx;
        p.y += p.vy;
      }
      smoke = smoke.filter((p) => p.age < p.life && p.y > -20);
      spin += on ? 0.32 : 0;
    };

    const line = (pts: number[][], close = false) => {
      ctx.beginPath();
      pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
      if (close) ctx.closePath();
      ctx.stroke();
    };

    const draw = () => {
      const on = fanRef.current;
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
      ctx.lineJoin = "round";
      ctx.lineCap = "round";

      // room
      ctx.strokeStyle = C.faint;
      ctx.lineWidth = 1;
      for (let x = 30; x < WALL; x += 56) line([[x, CEILING], [x, FLOOR]]);
      ctx.strokeStyle = C.line;
      ctx.lineWidth = 1.5;
      line([[20, FLOOR], [WALL, FLOOR], [WALL, CEILING]]);
      line([[20, CEILING], [DUCT.x0, CEILING]]);
      line([[DUCT.x1, CEILING], [WALL, CEILING]]);

      // dining table and chairs
      ctx.strokeStyle = C.line;
      line([[150, 470], [330, 470]]);
      line([[240, 470], [240, FLOOR]]);
      line([[205, FLOOR], [275, FLOOR]]);
      for (const cx of [95, 385]) {
        const s = cx < 240 ? 1 : -1;
        line([[cx - 22 * s, 440], [cx - 22 * s, FLOOR]]);
        line([[cx - 22 * s, 508], [cx + 22 * s, 508], [cx + 22 * s, FLOOR]]);
      }

      // range, pots, flames
      ctx.strokeStyle = C.strong;
      ctx.lineWidth = 1.75;
      line([[RANGE.x0, FLOOR], [RANGE.x0, RANGE.top], [RANGE.x1, RANGE.top], [RANGE.x1, FLOOR]]);
      line([[RANGE.x0, RANGE.top + 26], [RANGE.x1, RANGE.top + 26]]);
      for (const px of POTS) {
        line([[px - 24, RANGE.top - 4], [px - 24, RANGE.top - 34], [px + 24, RANGE.top - 34], [px + 24, RANGE.top - 4], [px - 24, RANGE.top - 4]]);
        ctx.strokeStyle = C.flame;
        line([[px - 14, RANGE.top - 1], [px + 14, RANGE.top - 1]]);
        ctx.strokeStyle = C.strong;
      }

      // smoke, behind the hood linework
      for (const p of smoke) {
        const t = p.age / p.life;
        const a = (p.caught ? 0.17 : 0.13) * Math.min(1, p.age / 20) * (1 - t * t);
        ctx.fillStyle = `rgba(206, 212, 218, ${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + t * 15, 0, Math.PI * 2);
        ctx.fill();
      }

      // hood canopy, duct and fan
      ctx.strokeStyle = on ? C.air : C.strong;
      ctx.lineWidth = 2;
      line([[HOOD.x0, HOOD.bottom], [HOOD.x0, HOOD.bottom - 26], [HOOD.slopeTo, HOOD.top], [DUCT.x0, HOOD.top]]);
      line([[DUCT.x1, HOOD.top], [HOOD.x1, HOOD.top]]);
      line([[HOOD.x0, HOOD.bottom], [HOOD.x0 + 16, HOOD.bottom]]);
      line([[DUCT.x0, HOOD.top], [DUCT.x0, -10]]);
      line([[DUCT.x1, HOOD.top], [DUCT.x1, -10]]);
      ctx.lineWidth = 1;
      for (let i = 0; i < 7; i++) {
        const fx = HOOD.x0 + 44 + i * 36;
        line([[fx, HOOD.bottom - 8], [fx + 22, HOOD.bottom - 34]]);
      }
      const fy = 112;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(MOUTH.x, fy, 22, 0, Math.PI * 2);
      ctx.stroke();
      for (let b = 0; b < 3; b++) {
        const a = spin + (b * Math.PI * 2) / 3;
        line([[MOUTH.x, fy], [MOUTH.x + Math.cos(a) * 20, fy + Math.sin(a) * 20]]);
      }
      if (on) {
        ctx.strokeStyle = C.air;
        const y = 30 - ((frame * 1.4) % 26);
        for (const dy of [0, 26]) line([[MOUTH.x, y + dy + 12], [MOUTH.x, y + dy], [MOUTH.x - 6, y + dy + 7]]);
      }
    };

    const meter = () => {
      if (!meterRef.current) return;
      const loose = smoke.filter((p) => !p.caught && p.x < HOOD.x0 - 10).length;
      meterRef.current.style.transform = `scaleX(${Math.min(1, loose / (cap * 0.55)).toFixed(3)})`;
    };

    const loop = () => {
      step();
      draw();
      if (frame % 6 === 0) meter();
      raf = requestAnimationFrame(loop);
    };

    /** One settled picture of the current state, for visitors who prefer no motion. */
    const still = () => {
      smoke = [];
      frame = 0;
      for (let i = 0; i < 520; i++) step();
      draw();
      meter();
    };

    const start = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      if (reduce.matches) still();
      else if (visible) raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      start();
      // show the problem first, then switch the fan on once by itself
      if (visible && !touchedRef.current && !autoTimer && !reduce.matches) {
        autoTimer = window.setTimeout(() => {
          if (!touchedRef.current) setFan(true);
        }, 7000);
      }
    }, { threshold: 0.35 });
    io.observe(canvas);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    reduce.addEventListener("change", start);
    const onToggle = () => reduce.matches && still();
    canvas.addEventListener("hood:toggle", onToggle);
    resize();

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(autoTimer);
      io.disconnect();
      ro.disconnect();
      reduce.removeEventListener("change", start);
      canvas.removeEventListener("hood:toggle", onToggle);
    };
  }, []);

  const toggle = () => {
    touchedRef.current = true;
    fanRef.current = !fan;
    setFan(!fan);
    canvasRef.current?.dispatchEvent(new Event("hood:toggle"));
  };

  return (
    <figure className={`surface-deep relative overflow-hidden border border-(--line) ${className}`}>
      <canvas ref={canvasRef} className="block aspect-[5/6] w-full sm:aspect-[3/2]" aria-hidden="true" />
      <figcaption className="grid gap-4 border-t border-(--line) p-4 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center sm:gap-8 sm:p-5">
        <button
          type="button"
          role="switch"
          aria-checked={fan}
          onClick={toggle}
          className="group flex min-h-12 items-center gap-4 text-left"
        >
          <span className={`relative h-7 w-13 shrink-0 border transition-colors ${fan ? "border-signal bg-signal" : "border-(--fg-muted) bg-transparent"}`}>
            <span className={`absolute top-0.5 size-5.5 transition-all duration-300 ease-air ${fan ? "left-[calc(100%-1.5rem)] bg-ink" : "left-0.5 bg-(--fg-muted)"}`} />
          </span>
          <span className="grid">
            <span className="label">{labels.fan}</span>
            <span className="display text-xl font-bold [font-stretch:100%]">{fan ? labels.on : labels.off}</span>
          </span>
        </button>
        <div className="grid gap-2">
          <span className="label flex justify-between gap-4">
            <span>{labels.meter}</span>
            <span>{labels.caption}</span>
          </span>
          <span className="relative block h-1 overflow-hidden bg-(--line)">
            <span ref={meterRef} className="absolute inset-0 origin-left scale-x-0 bg-(--fg) transition-transform duration-300" />
          </span>
        </div>
      </figcaption>
    </figure>
  );
}
