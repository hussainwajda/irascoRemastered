"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  CAPTION_WINDOWS,
  FILM_QUERY,
  FRAME_COUNT,
  FRAME_SIZE,
  RAIL,
  WIND_WINDOW,
  frameAt,
  frameSrc,
  stillSrc,
  windowValue,
  type ChapterId,
  type FrameSet,
} from "./chapters";

type Caption = {
  id: Exclude<ChapterId, "terrace">;
  /** Alt text for the still shown when the film is off. */
  alt: string;
  content: React.ReactNode;
};

type Props = {
  label: string;
  hero: React.ReactNode;
  captions: Caption[];
  rail: Record<ChapterId, string>;
  note: string;
  cue: string;
};

/** Coarse passes first, so scrubbing anywhere shows something almost at once. */
function loadOrder(lite: boolean) {
  const order: number[] = [];
  const seen = new Set<number>();
  for (const step of lite ? [16, 8] : [16, 8, 4, 2, 1]) {
    for (let i = 0; i < FRAME_COUNT; i += step) {
      if (!seen.has(i)) {
        seen.add(i);
        order.push(i);
      }
    }
  }
  if (!seen.has(FRAME_COUNT - 1)) order.push(FRAME_COUNT - 1);
  return order;
}

/**
 * "Follow the air": the home page's opening film.
 *
 * A Blender-rendered image sequence is pinned to the screen and scrubbed by
 * scroll: terrace, into the cooler, down the duct, out into a restaurant.
 * Captions fade in over it at each stop.
 *
 * With scripting off, on old browsers, or when the visitor prefers reduced
 * motion, none of this runs: the `film:` classes do not apply and the same
 * content sits in normal page flow with one still per chapter.
 */
export default function StoryFilm({ label, hero, captions, rail, note, cue }: Props) {
  const rootRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fxRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;
    const film = window.matchMedia(FILM_QUERY);
    if (!film.matches) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const stage = canvas.parentElement as HTMLElement;
    const captionEls = Array.from(root.querySelectorAll<HTMLElement>("[data-caption]"));
    const railEls = Array.from(root.querySelectorAll<HTMLElement>("[data-rail]"));
    const cueEl = root.querySelector<HTMLElement>("[data-cue]");

    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const lite = Boolean(connection?.saveData) || /(^|-)2g$/.test(connection?.effectiveType ?? "");

    let set: FrameSet = "l";
    let frames: (HTMLImageElement | undefined)[] = [];
    let generation = 0;
    let drawn = -1;
    let smooth = 0;
    let visible = true;
    let cw = 0;
    let ch = 0;
    const last = new Map<HTMLElement, string>();

    // Live air over the duct chapter: streaks from the vanishing point that
    // move as fast as the visitor scrolls, and vanish when they stop to read.
    const fx = fxRef.current;
    const fctx = fx?.getContext("2d") ?? null;
    const streaks = Array.from({ length: 46 }, () => ({ a: Math.random() * Math.PI * 2, r: Math.random(), v: 0.5 + Math.random() }));
    let fw = 0;
    let fh = 0;
    let wind = 0;
    let prevTarget = 0;
    let fxClear = true;

    const write = (el: HTMLElement, key: string, apply: () => void) => {
      if (last.get(el) === key) return;
      last.set(el, key);
      apply();
    };

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
      const img = frames[i]!;
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
      drawn = i;
    };

    const load = () => {
      const mine = ++generation;
      frames = new Array(FRAME_COUNT);
      drawn = -1;
      const queue = loadOrder(lite);
      let active = 0;
      const next = () => {
        while (active < 6 && queue.length && mine === generation) {
          const i = queue.shift()!;
          const img = new Image();
          img.decoding = "async";
          active++;
          const done = (ok: boolean) => {
            active--;
            if (mine !== generation) return;
            if (ok) {
              frames[i] = img;
              // a better frame for the current position may just have arrived
              const want = Math.round(frameAt(smooth));
              if (Math.abs(i - want) < Math.abs(drawn - want) || drawn < 0) draw(want, true);
            }
            next();
          };
          img.onload = () => done(true);
          img.onerror = () => done(false);
          img.src = frameSrc(set, i);
        }
      };
      next();
    };

    const resize = () => {
      const rect = stage.getBoundingClientRect();
      const wanted: FrameSet = rect.width / rect.height < 0.9 ? "p" : "l";
      const [sourceWidth] = FRAME_SIZE[wanted];
      // no point painting more pixels than about 1.5x the source
      const scale = Math.min(window.devicePixelRatio || 1, 2, (sourceWidth * 1.5) / rect.width);
      cw = Math.max(1, Math.round(rect.width * scale));
      ch = Math.max(1, Math.round(rect.height * scale));
      canvas.width = cw;
      canvas.height = ch;
      ctx.imageSmoothingQuality = "high";
      if (fx) {
        const fs = Math.min(window.devicePixelRatio || 1, 1.5);
        fw = fx.width = Math.round(rect.width * fs);
        fh = fx.height = Math.round(rect.height * fs);
        fxClear = true;
      }
      if (wanted !== set || frames.length === 0) {
        set = wanted;
        load();
      } else {
        draw(Math.round(frameAt(smooth)), true);
      }
    };

    const tick = () => {
      if (!visible) return;
      const rect = root.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      const target = span > 0 ? Math.min(1, Math.max(0, -rect.top / span)) : 0;
      smooth += (target - smooth) * 0.2;
      if (Math.abs(target - smooth) < 0.0005) smooth = target;

      draw(Math.round(frameAt(smooth)));

      wind += ((target - prevTarget) * 900 - wind) * 0.18;
      prevTarget = target;
      const air = windowValue(smooth, WIND_WINDOW) * Math.min(1, Math.abs(wind));
      if (fctx && air > 0.02) {
        fctx.clearRect(0, 0, fw, fh);
        const cx = fw / 2;
        const cy = fh * (set === "p" ? 0.45 : 0.5);
        const reach = Math.hypot(fw, fh) / 2;
        const dir = Math.sign(wind) || 1;
        fctx.lineCap = "round";
        fctx.lineWidth = Math.max(1, fw / 900);
        for (const st of streaks) {
          st.r += wind * 0.012 * st.v * (0.35 + st.r);
          if (st.r > 1.05 || st.r < 0.04) {
            st.r = dir > 0 ? 0.06 + Math.random() * 0.1 : 1;
            st.a = Math.random() * Math.PI * 2;
          }
          const len = Math.min(0.22, Math.abs(wind) * 0.05) * (0.3 + st.r);
          const r0 = st.r * reach;
          const r1 = Math.max(0, st.r - dir * len) * reach;
          const cos = Math.cos(st.a);
          const sin = Math.sin(st.a);
          fctx.strokeStyle = `rgba(150, 200, 255, ${(air * 0.55 * Math.min(1, st.r)).toFixed(3)})`;
          fctx.beginPath();
          fctx.moveTo(cx + cos * r0, cy + sin * r0);
          fctx.lineTo(cx + cos * r1, cy + sin * r1);
          fctx.stroke();
        }
        fxClear = false;
      } else if (fctx && !fxClear) {
        fctx.clearRect(0, 0, fw, fh);
        fxClear = true;
      }

      for (const el of captionEls) {
        const id = el.dataset.caption as keyof typeof CAPTION_WINDOWS;
        const o = windowValue(smooth, CAPTION_WINDOWS[id]);
        const key = o.toFixed(2);
        write(el, key, () => {
          el.style.opacity = key;
          el.style.transform = `translate3d(0, ${((1 - o) * 28).toFixed(1)}px, 0)`;
          el.style.pointerEvents = o > 0.6 ? "auto" : "none";
        });
      }
      for (const el of railEls) {
        const [, a, b] = RAIL.find(([id]) => id === el.dataset.rail)!;
        const fill = Math.min(1, Math.max(0, (smooth - a) / (b - a)));
        const key = fill.toFixed(3);
        write(el, key, () => {
          el.style.setProperty("--fill", key);
          el.toggleAttribute("data-active", smooth >= a && smooth < b);
        });
      }
      if (cueEl) {
        const key = Math.max(0, 1 - smooth / 0.03).toFixed(2);
        write(cueEl, key, () => (cueEl.style.opacity = key));
      }
    };

    // Keyboard users tabbing into a caption get scrolled to where it is visible.
    const onFocus = (event: FocusEvent) => {
      const el = (event.target as HTMLElement).closest<HTMLElement>("[data-caption]");
      if (!el) return;
      const [, b, c] = CAPTION_WINDOWS[el.dataset.caption as keyof typeof CAPTION_WINDOWS];
      const at = Math.max(0, (b + Math.min(c, 1)) / 2);
      const rect = root.getBoundingClientRect();
      window.scrollTo({ top: window.scrollY + rect.top + at * (rect.height - window.innerHeight) });
    };

    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), { rootMargin: "20% 0px" });
    io.observe(root);
    const ro = new ResizeObserver(resize);
    ro.observe(stage);
    root.addEventListener("focusin", onFocus);
    gsap.ticker.add(tick);
    root.dataset.film = "on";

    return () => {
      generation++;
      gsap.ticker.remove(tick);
      io.disconnect();
      ro.disconnect();
      root.removeEventListener("focusin", onFocus);
      delete root.dataset.film;
    };
  }, []);

  return (
    <section ref={rootRef} aria-label={label} className="surface-deep relative film:h-[560vh] film:md:h-[640vh]">
      <div className="relative film:sticky film:top-0 film:h-lvh film:overflow-hidden">
        {/* Film layer: the canvas paints over the poster once frames arrive. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-1 hidden film:block">
          <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />
          <canvas ref={fxRef} className="absolute inset-0 block h-full w-full" />
          <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-graphite-deep/75 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[62%] bg-linear-to-t from-graphite-deep/90 via-graphite-deep/45 to-transparent md:h-[55%]" />
        </div>

        {/* Captions sit in the small viewport, so the phone URL bar never covers them. */}
        <div className="relative film:absolute film:inset-x-0 film:top-0 film:h-svh">
          <div
            data-caption="hero"
            className="relative pb-10 pt-28 md:pt-36 film:absolute film:inset-x-0 film:bottom-[calc(5.25rem+env(safe-area-inset-bottom,0px))] film:z-10 film:pb-0 film:pt-0 film:will-change-[opacity,transform] film:md:bottom-14 film:md:pt-0"
          >
            {hero}
          </div>

          {/* Poster: first frame of the film, and the page's largest paint. */}
          <picture className="relative block aspect-video film:absolute film:inset-x-0 film:top-0 film:z-0 film:aspect-auto film:h-lvh">
            <source media={`(orientation: portrait) and ${FILM_QUERY}`} srcSet={frameSrc("p", 0)} width={540} height={960} />
            {/* A plain img: this pre-sized frame has to match the canvas pixel for pixel. */}
            <img
              src={frameSrc("l", 0)}
              width={1280}
              height={720}
              alt={note}
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </picture>

          {captions.map((caption) => (
            <article
              key={caption.id}
              data-caption={caption.id}
              className="wrap grid gap-8 border-t border-(--line) py-14 md:grid-cols-2 md:items-center md:gap-14 md:py-20 film:absolute film:inset-x-0 film:bottom-[calc(5.25rem+env(safe-area-inset-bottom,0px))] film:z-10 film:block film:border-0 film:py-0 film:opacity-0 film:pointer-events-none film:will-change-[opacity,transform] film:md:bottom-14 film:md:py-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized still from public/ */}
              <img
                src={stillSrc(caption.id)}
                width={1280}
                height={720}
                alt={caption.alt}
                loading="lazy"
                decoding="async"
                className="aspect-video w-full object-cover film:hidden"
              />
              <div className="film:max-w-[34rem] film:border film:border-white/10 film:bg-graphite-deep/80 film:p-5 film:md:p-7">
                {caption.content}
              </div>
            </article>
          ))}

          <p className="wrap label py-4 film:absolute film:right-0 film:top-20 film:z-10 film:w-auto film:py-0 film:text-[0.62rem] film:text-white/55 film:md:top-24">
            {note}
          </p>

          <p
            data-cue
            aria-hidden="true"
            className="label absolute right-[clamp(1rem,4vw,2.5rem)] top-1/2 z-10 hidden -translate-y-1/2 items-center gap-3 text-white/70 [writing-mode:vertical-rl] film:md:flex"
          >
            {cue}
            <span className="relative block h-10 w-px overflow-hidden bg-white/20">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-[cue_1.8s_var(--ease-air)_infinite] bg-signal" />
            </span>
          </p>
        </div>

        {/* Rail: where the air is along its route. */}
        <ol
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 z-20 hidden grid-cols-4 gap-1.5 px-[clamp(1rem,4vw,2.5rem)] pb-[calc(4.4rem+env(safe-area-inset-bottom,0px))] film:grid film:md:pb-5"
        >
          {RAIL.map(([id], i) => (
            <li key={id} data-rail={id} className="group grid gap-1.5">
              <span className="relative block h-0.5 overflow-hidden bg-white/20">
                <span className="absolute inset-0 origin-left bg-signal [transform:scaleX(var(--fill,0))]" />
              </span>
              <span className="hidden font-mono text-[0.62rem] uppercase tracking-[0.08em] text-white/45 transition-colors group-data-active:text-white md:block">
                {String(i + 1).padStart(2, "0")} {rail[id]}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
