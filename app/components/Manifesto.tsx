"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * One sentence whose words widen on Archivo's width axis as they scroll into
 * view, as if air were pushing them open.
 *
 * Each word gets a fixed box measured at its final width first, so lines
 * never re-wrap mid-animation. Without JS or with reduced motion the text
 * simply renders at its final width.
 */
export default function Manifesto({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const words = Array.from(el.querySelectorAll<HTMLSpanElement>("[data-word]"));
    let tween: gsap.core.Tween | null = null;

    const measure = () => {
      tween?.scrollTrigger?.kill();
      tween?.kill();
      words.forEach((word) => {
        word.style.width = "";
        word.style.setProperty("--w", "100");
      });
      words.forEach((word) => {
        word.style.width = `${word.getBoundingClientRect().width}px`;
      });
      tween = gsap.fromTo(
        words,
        { "--w": 62, opacity: 0.22 },
        {
          "--w": 100,
          opacity: 1,
          ease: "none",
          stagger: 0.12,
          scrollTrigger: { trigger: el, start: "top 85%", end: "bottom 50%", scrub: 0.6 },
        },
      );
    };

    let timer = 0;
    const onResize = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(measure, 150);
    };

    document.fonts.ready.then(measure);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.clearTimeout(timer);
      tween?.scrollTrigger?.kill();
      tween?.kill();
    };
  }, []);

  return (
    <p ref={ref} className="display text-[clamp(2.1rem,1.2rem+4.4vw,5.4rem)] font-bold leading-[1.02]">
      {text.split(" ").map((word, i) => (
        <span key={i}>
          <span data-word className="inline-block whitespace-nowrap [--w:100] [font-stretch:calc(var(--w)*1%)]">
            {word}
          </span>{" "}
        </span>
      ))}
    </p>
  );
}
