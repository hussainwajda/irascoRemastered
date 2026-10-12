"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number; nx: number; ny: number };
type Particle = { s: number; o: number; v: number; len: number };

const COLORS = {
  wall: "#8c96a0",
  centre: "#38424b",
  flange: "#c5cbd0",
  dim: "#8c96a0",
  air: "#9cc3ff",
  label: "#f4c21f",
};

/** Corner-cutting to turn the duct's polyline into a smooth centreline. */
function chaikin(points: [number, number][], passes: number) {
  let p = points;
  for (let k = 0; k < passes; k++) {
    const out: [number, number][] = [p[0]];
    for (let i = 0; i < p.length - 1; i++) {
      const [ax, ay] = p[i];
      const [bx, by] = p[i + 1];
      out.push([ax * 0.75 + bx * 0.25, ay * 0.75 + by * 0.25]);
      out.push([ax * 0.25 + bx * 0.75, ay * 0.25 + by * 0.75]);
    }
    out.push(p[p.length - 1]);
    p = out;
  }
  return p;
}

/**
 * Section drawing of a GI duct with a 45° offset, with air moving through it.
 * Particles follow a laminar velocity profile (fastest on the centreline,
 * slowest at the walls) and speed up while the page is being scrolled.
 *
 * It sits in the band under the home page film (see story/StoryFilm.tsx).
 */
export default function AirflowCanvas({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const STEP = 2;
    let W = 0;
    let H = 0;
    let half = 0;
    let total = 0;
    let pts: Point[] = [];
    let flanges: number[] = [];
    let particles: Particle[] = [];
    let raf = 0;
    let visible = true;
    let boost = 0;
    let lastY = window.scrollY;
    const mono =
      getComputedStyle(document.documentElement).getPropertyValue("--font-plex-mono").trim() || "ui-monospace, monospace";

    const spawn = (s: number): Particle => {
      const o = (Math.random() * 2 - 1) * 0.92;
      return { s, o, v: 1 - o * o * 0.85, len: 8 + Math.random() * 18 };
    };

    const at = (s: number, o: number): [number, number] => {
      const i = Math.max(0, Math.min(pts.length - 1, Math.round(s / STEP)));
      const p = pts[i];
      return [p.x + p.nx * o * half, p.y + p.ny * o * half];
    };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = rect.width;
      H = rect.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      half = Math.max(18, H * 0.16);
      const yLow = H * 0.7;
      const yHigh = H * 0.32;
      const rise = yLow - yHigh;
      const xa = W * (W < 640 ? 0.3 : 0.46);
      const smooth = chaikin(
        [
          [-40, yLow],
          [xa, yLow],
          [xa + rise, yHigh],
          [W + 40, yHigh],
        ],
        4,
      );

      const seg: number[] = [];
      total = 0;
      for (let i = 0; i < smooth.length - 1; i++) {
        const l = Math.hypot(smooth[i + 1][0] - smooth[i][0], smooth[i + 1][1] - smooth[i][1]);
        seg.push(l);
        total += l;
      }

      pts = [];
      let idx = 0;
      let run = 0;
      for (let s = 0; s <= total; s += STEP) {
        while (idx < seg.length - 1 && run + seg[idx] < s) {
          run += seg[idx];
          idx++;
        }
        const t = seg[idx] ? (s - run) / seg[idx] : 0;
        const [ax, ay] = smooth[idx];
        const [bx, by] = smooth[idx + 1];
        const tl = Math.hypot(bx - ax, by - ay) || 1;
        pts.push({ x: ax + (bx - ax) * t, y: ay + (by - ay) * t, nx: -(by - ay) / tl, ny: (bx - ax) / tl });
      }

      flanges = [];
      for (let f = 110; f < total - 40; f += 170) flanges.push(f);

      const count = Math.round(Math.min(260, W / 4.5));
      particles = Array.from({ length: count }, () => spawn(Math.random() * total));
    };

    const drawDuct = () => {
      ctx.clearRect(0, 0, W, H);

      ctx.lineWidth = 1.25;
      ctx.strokeStyle = COLORS.wall;
      for (const side of [-1, 1]) {
        ctx.beginPath();
        pts.forEach((p, i) => {
          const x = p.x + p.nx * side * half;
          const y = p.y + p.ny * side * half;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.stroke();
      }

      ctx.setLineDash([12, 4, 2, 4]);
      ctx.strokeStyle = COLORS.centre;
      ctx.lineWidth = 1;
      ctx.beginPath();
      pts.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.strokeStyle = COLORS.flange;
      ctx.lineWidth = 2;
      for (const s of flanges) {
        const [ax, ay] = at(s, -1.22);
        const [bx, by] = at(s, 1.22);
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.stroke();
      }

      // Duct depth dimension.
      const ds = Math.min(total * 0.1, 90);
      const [tx, ty] = at(ds, -1);
      const [, by] = at(ds, 1);
      ctx.strokeStyle = COLORS.dim;
      ctx.fillStyle = COLORS.dim;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(tx, ty + 6);
      ctx.lineTo(tx, by - 6);
      ctx.stroke();
      for (const [y, dir] of [
        [ty + 1, 1],
        [by - 1, -1],
      ] as const) {
        ctx.beginPath();
        ctx.moveTo(tx, y);
        ctx.lineTo(tx - 3, y + 6 * dir);
        ctx.lineTo(tx + 3, y + 6 * dir);
        ctx.closePath();
        ctx.fill();
      }
      ctx.font = `500 10px ${mono}`;
      ctx.textBaseline = "middle";
      ctx.fillText("300", tx + 7, (ty + by) / 2);

      // Flow label sits below the upper run, where the drawing has room.
      const [lx, ly] = at(total * 0.8, 1.9);
      ctx.fillStyle = COLORS.label;
      ctx.fillText("AIRFLOW →", Math.min(lx, W - 86), Math.min(Math.max(ly, 12), H - 28));
    };

    const drawAir = (advance: boolean) => {
      ctx.strokeStyle = COLORS.air;
      ctx.lineCap = "round";
      ctx.lineWidth = 1.2;
      const speed = 1.7 + boost;
      for (let i = 0; i < particles.length; i++) {
        let q = particles[i];
        if (advance) {
          q.s += q.v * speed;
          if (q.s > total) particles[i] = q = spawn(0);
        }
        const [ax, ay] = at(q.s, q.o);
        const [bx, by] = at(Math.max(0, q.s - q.len * q.v * (1 + boost * 0.4)), q.o);
        ctx.globalAlpha = 0.2 + q.v * 0.65;
        ctx.beginPath();
        ctx.moveTo(bx, by);
        ctx.lineTo(ax, ay);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    const frame = () => {
      const y = window.scrollY;
      boost = Math.min(6, boost * 0.92 + Math.abs(y - lastY) * 0.04);
      lastY = y;
      drawDuct();
      drawAir(true);
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      build();
      if (reduce.matches || !visible) {
        drawDuct();
        drawAir(false);
      } else {
        raf = requestAnimationFrame(frame);
      }
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (!raf && !reduce.matches) {
        raf = requestAnimationFrame(frame);
      }
    });
    io.observe(canvas);

    let resizeTimer = 0;
    const ro = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(start, 100);
    });
    ro.observe(canvas);
    reduce.addEventListener("change", start);
    start();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.clearTimeout(resizeTimer);
      reduce.removeEventListener("change", start);
    };
  }, []);

  return <canvas ref={ref} className={`block h-full w-full ${className}`} aria-hidden="true" />;
}
