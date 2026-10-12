"use client";

import { createContext, useContext, useMemo } from "react";
import type { Dictionary } from "./dictionaries/en";
import { localizedHref, type Locale } from "./config";

interface I18nValue {
  locale: Locale;
  /** The active dictionary. Named `t` so call sites read `t.nav.services`. */
  t: Dictionary;
  /** Prefixes an app path with the active locale. */
  href: (path: string) => string;
}

const I18nContext = createContext<I18nValue | null>(null);

export function LocaleProvider({
  locale,
  dictionary,
  children,
}: {
  locale: Locale;
  dictionary: Dictionary;
  children: React.ReactNode;
}) {
  const value = useMemo<I18nValue>(
    () => ({
      locale,
      t: dictionary,
      href: (path: string) => localizedHref(path, locale),
    }),
    [locale, dictionary],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used inside <LocaleProvider>");
  }
  return ctx;
}
