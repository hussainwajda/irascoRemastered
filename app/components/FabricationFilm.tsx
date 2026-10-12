"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FILM_QUERY, STORY_VERSION } from "./story/chapters";

/** 3d/story/fabrication.py renders 120 frames; every second one ships. */
const FRAME_COUNT = 60;
const frameSrc = (i: number) => `/story/${STORY_VERSION}/fab/${String(i).padStart(3, "0")}.webp`;

/**
 * The workshop film: one duct section made from flat sheet, scrubbed by
 * scroll, with the six steps lighting up in order. Where the film cannot
 * run, `fallback` (the drawn step grid) shows instead.
 */
export default function FabricationFilm({ steps, alt, fallback }: { steps: string[]; alt: string; fallback: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas || !window.matchMedia(FILM_QUERY).matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const stepEls = Array.from(root.querySelectorAll<HTMLElement>("[data-step]"));
    const nowEl = root.querySelector<HTMLElement>("[data-now]");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const lite = Boolean(connection?.saveData) || /(^|-)2g$/.test(connection?.effectiveType ?? "");

    const frames: (HTMLImageElement | undefined)[] = new Array(FRAME_COUNT);
    let started = false;
    let alive = true;
    let near = false;
    let drawn = -1;
    let smooth = 0;
    let active = -1;

    const nearest = (i: number) => {
      if (frames[i]) return i;
      for (let d = 1; d < FRAME_COUNT; d++) {
        if (i - d >= 0 && frames[i - d]) return i - d;
        if (i + d < FRAME_COUNT && frames[i + d]) return i + d;
      }
      return -1;
    };

    const draw = (index: number, force = false) => {
      const i = nearest(index);
      if (i < 0 || (!force && i === drawn)) return;
      ctx.drawImage(frames[i]!, 0, 0, canvas.width, canvas.height);
      drawn = i;
    };

    const load = () => {
      if (started) return;
      started = true;
      const order: number[] = [];
      const seen = new Set<number>();
      for (const step of lite ? [8, 4] : [8, 4, 2, 1]) {
        for (let i = 0; i < FRAME_COUNT; i += step) {
          if (seen.has(i)) continue;
          seen.add(i);
          order.push(i);
        }
      }
      let running = 0;
      const next = () => {
        while (alive && running < 4 && order.length) {
          const i = order.shift()!;
          const img = new Image();
          img.decoding = "async";
          running++;
          img.onload = img.onerror = () => {
            running--;
            if (img.naturalWidth) {
              frames[i] = img;
              draw(Math.round(smooth * (FRAME_COUNT - 1)), true);
            }
            next();
          };
          img.src = frameSrc(i);
        }
      };
      next();
    };

    const tick = () => {
      if (!near) return;
      const rect = root.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      const target = span > 0 ? Math.min(1, Math.max(0, -rect.top / span)) : 0;
      smooth += (target - smooth) * 0.2;
      if (Math.abs(target - smooth) < 0.0005) smooth = target;
      draw(Math.round(smooth * (FRAME_COUNT - 1)));

      const step = Math.min(steps.length - 1, Math.floor(smooth * steps.length));
      if (step !== active) {
        active = step;
        stepEls.forEach((el, i) => {
          el.toggleAttribute("data-active", i === step);
          el.toggleAttribute("data-done", i < step);
        });
        if (nowEl) nowEl.textContent = `${String(step + 1).padStart(2, "0")} ${steps[step]}`;
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        near = entry.isIntersecting;
        if (near) load();
      },
      { rootMargin: "120% 0px" },
    );
    io.observe(root);
    gsap.ticker.add(tick);

    return () => {
      alive = false;
      io.disconnect();
      gsap.ticker.remove(tick);
    };
  }, [steps]);

  return (
    <>
      <div className="film:hidden">{fallback}</div>

      <div ref={rootRef} className="relative hidden film:block film:h-[340vh]">
        <div className="sticky top-0 flex h-svh flex-col justify-center gap-5 pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))] pt-20 md:pb-10 md:pt-24 lg:flex-row lg:items-center lg:gap-14">
          <div className="relative mx-auto aspect-[4/3] w-full max-w-[min(100%,calc((100svh-15rem)*4/3))] lg:order-2 lg:max-w-[min(58%,calc((100svh-9rem)*4/3))]">
            <canvas
              ref={canvasRef}
              width={800}
              height={600}
              role="img"
              aria-label={alt}
              className="block h-full w-full [mask-image:radial-gradient(ellipse_at_center,black_42%,transparent_72%)]"
            />
            <p data-now aria-hidden="true" className="display absolute left-2 top-0 text-[clamp(1.6rem,1rem+2.6vw,3rem)] font-bold text-(--fg) [font-stretch:104%] md:left-6" />
          </div>

          <ol className="grid grid-cols-6 gap-1.5 lg:order-1 lg:w-64 lg:grid-cols-1 lg:gap-0">
            {steps.map((step, i) => (
              <li
                key={step}
                data-step
                className="group grid gap-2 border-t-2 border-(--line) pt-2 transition-colors duration-300 data-active:border-signal data-done:border-(--fg-muted) lg:grid-cols-[2.5rem_1fr] lg:items-baseline lg:border-l-2 lg:border-t-0 lg:py-3 lg:pl-5 lg:pt-3"
              >
                <span className="font-mono text-[0.65rem] text-(--fg-muted) lg:text-xs">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[0.68rem] font-semibold leading-tight text-(--fg-muted) transition-colors duration-300 group-data-active:text-(--fg) sm:text-sm lg:text-xl">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}
