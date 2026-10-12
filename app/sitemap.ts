import type { MetadataRoute } from "next";
import { localizedHref, locales } from "./i18n/config";
import { SITE_URL, allPaths } from "./data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return allPaths().map((path) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : path.startsWith("/services") ? 0.8 : 0.6,
    alternates: {
      languages: Object.fromEntries(locales.map((locale) => [locale, `${SITE_URL}${localizedHref(path, locale)}`])),
    },
  }));
}
