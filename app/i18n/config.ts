export const locales = ["en", "hi"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Short label for the switcher, always written in its own script. */
export const localeLabel: Record<Locale, string> = {
  en: "EN",
  hi: "हिं",
};

export const localeName: Record<Locale, string> = {
  en: "English",
  hi: "हिन्दी",
};

/** BCP 47 tag for Open Graph and number formatting. */
export const localeRegion: Record<Locale, string> = {
  en: "en_IN",
  hi: "hi_IN",
};

/**
 * English is served without a prefix (`/services`), Hindi lives under
 * `/hi/services`. The proxy rewrites unprefixed paths onto the `[locale]`
 * segment, so this is the only place that knows the rule.
 */
export function localizedHref(href: string, locale: Locale): string {
  if (!href.startsWith("/")) return href;
  if (locale === defaultLocale) return href;
  return href === "/" ? `/${locale}` : `/${locale}${href}`;
}

/** Strips any locale prefix off a browser pathname. */
export function stripLocale(pathname: string): string {
  for (const locale of locales) {
    if (pathname === `/${locale}`) return "/";
    if (pathname.startsWith(`/${locale}/`)) return pathname.slice(locale.length + 1);
  }
  return pathname || "/";
}

/** hreflang + canonical for one page. `path` is the bare route, e.g. `/services`. */
export function alternatesFor(path: string, locale: Locale) {
  return {
    canonical: localizedHref(path, locale),
    languages: {
      ...Object.fromEntries(locales.map((code) => [code, localizedHref(path, code)])),
      "x-default": path,
    },
  };
}

/** Text that may have a Hindi version. English is the fallback. */
export type Localized = { en: string; hi?: string };

export function pick(text: Localized, locale: Locale): string {
  return (locale === "hi" && text.hi) || text.en;
}
