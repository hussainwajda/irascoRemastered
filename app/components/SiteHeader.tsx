"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useI18n } from "../i18n/LocaleProvider";
import LanguageSwitcher from "../i18n/LanguageSwitcher";
import { stripLocale } from "../i18n/config";
import { whatsappLink } from "../data/business";
import { getLenis } from "./SmoothScroll";
import { BrandMark, Wordmark } from "./BrandMark";
import { WhatsAppIcon } from "./icons";

const NAV = ["services", "industries", "projects", "about", "contact"] as const;

export default function SiteHeader() {
  const { t, href } = useI18n();
  const bare = stripLocale(usePathname() || "/");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(bare);

  // Close the menu when the route changes (adjusting state during render).
  if (lastPath !== bare) {
    setLastPath(bare);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    if (open) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (key: (typeof NAV)[number]) => bare === `/${key}` || bare.startsWith(`/${key}/`);

  return (
    <header
      className={[
        "surface-dark fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top,0px)] transition-[background-color,border-color] duration-300",
        scrolled || open ? "border-b border-(--line) bg-graphite/90 backdrop-blur-md" : "border-b border-transparent bg-transparent",
      ].join(" ")}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-10 focus:bg-signal focus:px-3 focus:py-2 focus:text-ink">
        {t.nav.skip}
      </a>
      <div className="wrap flex h-16 items-center justify-between gap-6 md:h-[4.5rem]">
        <Link href={href("/")} className="flex items-center gap-2.5" aria-label="IRASCO home">
          <BrandMark className="h-8 w-auto" />
          <Wordmark />
        </Link>

        <nav aria-label={t.nav.primary} className="hidden lg:block">
          <ul className="flex items-center gap-7 text-[0.95rem]">
            {NAV.map((key) => (
              <li key={key}>
                <Link
                  href={href(`/${key}`)}
                  aria-current={isActive(key) ? "page" : undefined}
                  className={[
                    "relative py-2 transition-colors hover:text-white",
                    isActive(key) ? "text-white after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:bg-signal" : "text-(--fg-muted)",
                  ].join(" ")}
                >
                  {t.nav[key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher className="hidden sm:flex" />
          <a href={whatsappLink()} target="_blank" rel="noopener" className="btn btn-signal hidden min-h-10 px-4 py-2 text-sm md:inline-flex">
            <WhatsAppIcon className="size-4" />
            {t.nav.whatsapp}
          </a>
          <button
            type="button"
            className="grid size-11 place-items-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="relative block h-3 w-6" aria-hidden="true">
              <span className={`absolute left-0 h-0.5 w-6 bg-current transition-transform duration-300 ${open ? "top-[5px] rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-0.5 w-6 bg-current transition-transform duration-300 ${open ? "top-[5px] -rotate-45" : "top-2.5"}`} />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="surface-dark h-[calc(100dvh-4rem-env(safe-area-inset-top,0px))] overflow-y-auto border-t border-(--line) lg:hidden"
      >
        <nav aria-label={t.nav.primary} className="wrap flex min-h-full flex-col justify-between gap-10 py-8">
          <ul className="grid gap-1">
            {NAV.map((key) => (
              <li key={key} className="border-b border-(--line)">
                <Link
                  href={href(`/${key}`)}
                  aria-current={isActive(key) ? "page" : undefined}
                  className="display flex items-baseline justify-between py-4 text-[2.4rem] font-bold [font-stretch:110%]"
                >
                  {t.nav[key]}
                  {isActive(key) && <span className="size-2.5 bg-signal" aria-hidden="true" />}
                </Link>
              </li>
            ))}
          </ul>
          <div className="grid gap-4">
            <LanguageSwitcher className="w-fit" />
            <a href={whatsappLink()} target="_blank" rel="noopener" className="btn btn-signal w-full">
              <WhatsAppIcon />
              {t.common.whatsappUs}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
