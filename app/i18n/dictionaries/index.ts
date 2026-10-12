import type { Locale } from "../config";
import { en, type Dictionary } from "./en";
import { hi } from "./hi";

const dictionaries: Record<Locale, Dictionary> = { en, hi };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? en;
}

export type { Dictionary };
