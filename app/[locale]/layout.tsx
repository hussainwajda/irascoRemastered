import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Sans_Devanagari } from "next/font/google";
import "../globals.css";

import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import ContactDock from "../components/ContactDock";
import SmoothScroll from "../components/SmoothScroll";
import { JsonLd } from "../components/blocks";
import { LocaleProvider } from "../i18n/LocaleProvider";
import { getDictionary } from "../i18n/dictionaries";
import { alternatesFor, isLocale, localeRegion, locales } from "../i18n/config";
import { SITE_URL, businessJsonLd } from "../data/site";

/* --------------------------------------------------------------------------
   Type stack

   Display — Archivo, variable on weight and width (62–125%). The width axis
             is the brand's motion: words stretch like air under pressure.
   Text    — IBM Plex Sans, engineered and plain.
   Hindi   — IBM Plex Sans Devanagari, drawn to match Plex Sans. Loaded only
             when Devanagari glyphs appear, so English pages don't pay for it.
   Data    — IBM Plex Mono, for units, specs and labels.
   -------------------------------------------------------------------------- */

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const plex = IBM_Plex_Sans({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plexDeva = IBM_Plex_Sans_Devanagari({
  variable: "--font-plex-deva",
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false,
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#101418",
  viewportFit: "cover",
};

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t.meta.home.title, template: t.meta.titleTemplate },
    description: t.meta.home.description,
    applicationName: "IRASCO",
    alternates: alternatesFor("/", locale),
    openGraph: {
      title: t.meta.home.title,
      description: t.meta.home.description,
      siteName: t.meta.siteName,
      locale: localeRegion[locale],
      type: "website",
    },
    twitter: { card: "summary_large_image" },
    formatDetection: { telephone: false },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <html
      lang={locale}
      className={[archivo.variable, plex.variable, plexDeva.variable, plexMono.variable, "antialiased"].join(" ")}
    >
      <body className="min-h-dvh">
        <JsonLd data={businessJsonLd()} />
        <LocaleProvider locale={locale} dictionary={t}>
          <SmoothScroll>
            <SiteHeader />
            <main id="main">{children}</main>
            <SiteFooter locale={locale} t={t} />
            <ContactDock t={t} />
          </SmoothScroll>
        </LocaleProvider>
      </body>
    </html>
  );
}
