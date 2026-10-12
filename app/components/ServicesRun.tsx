"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FILM_QUERY } from "./story/chapters";

/**
 * The home page services, hung from one long duct.
 *
 * On wide screens with motion allowed, the section pins and vertical scroll
 * carries the visitor sideways along the duct, one outlet per service. On
 * phones, with reduced motion, or without scripts it is the plain grid: the
 * `film:lg:` classes simply do not apply.
 */
export default function ServicesRun({
  id,
  head,
  children,
  tail,
}: {
  id: string;
  head: React.ReactNode;
  children: React.ReactNode;
  tail?: React.ReactNode;
}) {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    const bar = barRef.current;
    if (!root || !track) return;
    const stage = track.parentElement as HTMLElement;
    const wide = window.matchMedia(`${FILM_QUERY} and (min-width: 64rem)`);

    let active = false;
    let distance = 0;
    let smooth = 0;
    let lastX = "";

    const measure = () => {
      active = wide.matches;
      if (!active) {
        root.style.height = "";
        track.style.transform = "";
        lastX = "";
        return;
      }
      distance = Math.max(0, track.scrollWidth - stage.clientWidth);
      root.style.height = `${window.innerHeight + distance}px`;
    };

    const tick = () => {
      if (!active) return;
      const rect = root.getBoundingClientRect();
      if (rect.bottom < -200 || rect.top > window.innerHeight + 200) return;
      const span = rect.height - window.innerHeight;
      const target = span > 0 ? Math.min(1, Math.max(0, -rect.top / span)) : 0;
      smooth += (target - smooth) * 0.25;
      if (Math.abs(target - smooth) < 0.0005) smooth = target;
      const x = (-smooth * distance).toFixed(1);
      if (x === lastX) return;
      lastX = x;
      track.style.transform = `translate3d(${x}px, 0, 0)`;
      if (bar) bar.style.transform = `scaleX(${smooth.toFixed(4)})`;
    };

    const ro = new ResizeObserver(measure);
    ro.observe(track);
    ro.observe(stage);
    wide.addEventListener("change", measure);
    window.addEventListener("resize", measure);
    gsap.ticker.add(tick);
    measure();

    return () => {
      ro.disconnect();
      wide.removeEventListener("change", measure);
      window.removeEventListener("resize", measure);
      gsap.ticker.remove(tick);
      root.style.height = "";
      track.style.transform = "";
    };
  }, []);

  return (
    <section ref={rootRef} className="surface-light relative pb-24 md:pb-32 film:lg:pb-0" aria-labelledby={id}>
      <div className="film:lg:sticky film:lg:top-0 film:lg:flex film:lg:h-screen film:lg:flex-col film:lg:justify-center film:lg:overflow-hidden">
        <div
          ref={trackRef}
          className="wrap grid gap-12 film:lg:flex film:lg:w-max film:lg:max-w-none film:lg:items-stretch film:lg:gap-0 film:lg:px-[max(2.5rem,calc((100vw-82rem)/2+2.5rem))] film:lg:will-change-transform"
        >
          <div className="film:lg:flex film:lg:w-[30rem] film:lg:shrink-0 film:lg:flex-col film:lg:justify-center film:lg:pr-16">{head}</div>

          <ul className="services-run relative grid border-l border-t border-(--line) sm:grid-cols-2 lg:grid-cols-3 film:lg:flex film:lg:border-0 film:lg:pt-24">
            {/* the trunk duct the outlets hang from */}
            <li aria-hidden="true" className="services-duct pointer-events-none absolute inset-x-0 top-0 hidden h-9 border-y-[1.5px] border-(--fg) film:lg:block">
              <span className="absolute inset-y-0 left-0 w-[calc(100%+3rem)] opacity-70 [animation:duct-air_1.1s_linear_infinite] [background:repeating-linear-gradient(90deg,transparent_0_30px,var(--color-ir-blue)_30px_48px)_center/auto_2px_no-repeat]" />
              <span className="absolute -right-px inset-y-[-5px] w-[3px] bg-(--fg)" />
            </li>
            {children}
          </ul>

          {tail && <div className="film:lg:flex film:lg:shrink-0 film:lg:items-center film:lg:pl-16 film:lg:pt-24">{tail}</div>}
        </div>

        <span aria-hidden="true" className="absolute inset-x-0 bottom-0 hidden h-0.5 bg-(--line) film:lg:block">
          <span ref={barRef} className="absolute inset-0 origin-left scale-x-0 bg-(--accent)" />
        </span>
      </div>
    </section>
  );
}
