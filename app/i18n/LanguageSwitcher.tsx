"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "./LocaleProvider";
import { localeLabel, localeName, localizedHref, locales, stripLocale } from "./config";

/**
 * EN / हिं toggle. Keeps the visitor on the page they are reading, so
 * switching language on a service page lands on that same service page.
 */
export default function LanguageSwitcher({
  className = "",
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  const { locale, t } = useI18n();
  const bare = stripLocale(usePathname() || "/");

  return (
    <div className={`flex items-center border border-current/25 ${className}`} role="group" aria-label={t.nav.language}>
      {locales.map((code) => {
        const active = code === locale;
        return (
          <Link
            key={code}
            href={localizedHref(bare, code)}
            hrefLang={code}
            lang={code}
            aria-current={active ? "true" : undefined}
            title={localeName[code]}
            onClick={onNavigate}
            className={[
              "min-w-9 px-2.5 py-1.5 text-center font-mono text-[11px] uppercase leading-none tracking-wider transition-colors",
              active ? "bg-signal text-ink" : "opacity-70 hover:opacity-100",
            ].join(" ")}
          >
            {localeLabel[code]}
          </Link>
        );
      })}
    </div>
  );
}
