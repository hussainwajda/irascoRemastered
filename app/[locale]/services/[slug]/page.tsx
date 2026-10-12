import type { Metadata } from "next";
import { notFound } from "next/navigation";
import L from "../../../i18n/L";
import { alternatesFor, isLocale, pick } from "../../../i18n/config";
import { getDictionary } from "../../../i18n/dictionaries";
import { getService, services } from "../../../data/services";
import { industries } from "../../../data/industries";
import { business, telLink, whatsappLink } from "../../../data/business";
import { SITE_URL } from "../../../data/site";
import ServiceGlyph from "../../../components/ServiceGlyph";
import HoodDemo from "../../../components/HoodDemo";
import { DuctGrid, JsonLd } from "../../../components/blocks";
import { ArrowIcon, PhoneIcon, WhatsAppIcon } from "../../../components/icons";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/[locale]/services/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getService(slug);
  if (!isLocale(locale) || !service) return {};
  return {
    title: pick(service.name, locale),
    description: pick(service.summary, locale),
    alternates: alternatesFor(`/services/${service.slug}`, locale),
  };
}

export default async function ServicePage({ params }: PageProps<"/[locale]/services/[slug]">) {
  const { locale, slug } = await params;
  const service = getService(slug);
  if (!isLocale(locale) || !service) notFound();
  const t = getDictionary(locale);
  const name = pick(service.name, locale);
  const usedIn = industries.filter((industry) => service.industries.includes(industry.slug));
  const others = services.filter((other) => other.slug !== service.slug);
  // Pick a column count the items fill, so no card sits alone in a row.
  const n = service.includes.length;
  const includeCols = n % 3 === 0 ? "lg:grid-cols-3" : n % 2 === 0 ? "lg:grid-cols-2" : "lg:grid-cols-3";

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.name.en,
          description: service.summary.en,
          serviceType: service.name.en,
          url: `${SITE_URL}/services/${service.slug}`,
          provider: { "@id": `${SITE_URL}/#business` },
          areaServed: business.serviceArea.map((city) => ({ "@type": "City", name: city })),
        }}
      />

      <section className="surface-dark relative overflow-hidden pb-16 pt-32 md:pb-20 md:pt-44">
        <DuctGrid />
        <div className="wrap relative grid items-end gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <div className="grid gap-6">
            <nav aria-label="Breadcrumb" className="label">
              <L locale={locale} href="/services" className="hover:text-signal">
                {t.nav.services}
              </L>
              <span aria-hidden="true"> / </span>
              <span>{service.spec}</span>
            </nav>
            <h1 className="display text-[clamp(2.6rem,1.4rem+5vw,6rem)] font-extrabold [font-stretch:108%]">{name}</h1>
            <p className="max-w-[52ch] text-lg text-(--fg-muted) md:text-xl">{pick(service.summary, locale)}</p>
            <div className="flex flex-wrap gap-3">
              <a href={whatsappLink(service.enquiry)} target="_blank" rel="noopener" className="btn btn-signal">
                <WhatsAppIcon />
                {t.common.whatsappUs}
              </a>
              <a href={telLink} className="btn btn-line">
                <PhoneIcon />
                <span className="font-mono">{business.phone.display}</span>
              </a>
            </div>
          </div>
          <ServiceGlyph glyph={service.glyph} className="hidden h-auto w-full max-w-md justify-self-end lg:block" />
        </div>
      </section>

      <section className="surface-light py-16 md:py-24">
        <div className="wrap grid gap-16">
          {t.common.englishOnly && (
            <p className="max-w-[60ch] border-l-2 border-signal pl-4 text-(--fg-muted)">{t.common.englishOnly}</p>
          )}

          <p lang="en" className="max-w-[60ch] text-xl leading-relaxed md:text-2xl">
            {service.intro}
          </p>

          {service.slug === "kitchen-exhaust" && (
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-14">
              <div className="grid gap-4">
                <p className="label flex items-center gap-3">
                  <span className="h-px w-8 bg-current" aria-hidden="true" />
                  {t.services.hood.eyebrow}
                </p>
                <h2 className="display text-[clamp(1.8rem,1.3rem+2vw,3rem)] font-bold [font-stretch:104%]">{t.services.hood.title}</h2>
                <p className="max-w-[46ch] text-lg text-(--fg-muted)">{t.services.hood.body}</p>
              </div>
              <HoodDemo labels={t.services.hood} />
            </div>
          )}

          <div className="grid gap-8">
            <h2 className="label">{t.services.includes}</h2>
            <ul lang="en" className={`grid border-l border-t border-(--line) sm:grid-cols-2 ${includeCols}`}>
              {service.includes.map((item) => (
                <li key={item.title} className="grid content-start gap-2 border-b border-r border-(--line) p-6">
                  <h3 className="display text-xl font-bold [font-stretch:100%]">{item.title}</h3>
                  <p className="text-(--fg-muted)">{item.detail}</p>
                </li>
              ))}
            </ul>
          </div>

          {service.figure && (
            <figure className="grid gap-3 border-y border-(--line) py-10 md:grid-cols-[auto_minmax(0,1fr)] md:items-end md:gap-10">
              <p className="display text-[clamp(3rem,2rem+5vw,6rem)] font-extrabold tabular-nums [font-stretch:90%]">
                {service.figure.value}
              </p>
              <figcaption className="grid gap-2 pb-2" lang="en">
                <span className="text-lg">{service.figure.label}</span>
                <span className="label">
                  {t.services.figureNote} · {service.figure.source}
                </span>
              </figcaption>
            </figure>
          )}

          <div className="grid gap-6">
            <h2 className="label">{t.services.usedIn}</h2>
            <ul className="flex flex-wrap gap-2">
              {usedIn.map((industry) => (
                <li key={industry.slug}>
                  <L
                    locale={locale}
                    href={`/industries#${industry.slug}`}
                    className="inline-block border border-(--line) px-4 py-2 hover:border-(--accent) hover:text-(--accent)"
                  >
                    {pick(industry.name, locale)}
                  </L>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="surface-dark">
        <div className="tape h-3" aria-hidden="true" />
        <div className="wrap grid gap-6 py-20 md:py-24">
          <h2 className="display text-[clamp(2.2rem,1.4rem+3.6vw,4.4rem)] font-extrabold [font-stretch:108%]">{t.services.ctaTitle}</h2>
          <p className="max-w-[52ch] text-lg text-(--fg-muted)">{t.services.ctaBody}</p>
          <div className="flex flex-wrap gap-3">
            <a href={whatsappLink(service.enquiry)} target="_blank" rel="noopener" className="btn btn-signal">
              <WhatsAppIcon />
              {t.common.whatsappUs}
            </a>
            <L locale={locale} href="/contact" className="btn btn-line">
              {t.home.outlet.form}
              <ArrowIcon />
            </L>
          </div>
        </div>
      </section>

      <section className="surface-light py-16 md:py-20">
        <div className="wrap grid gap-6">
          <h2 className="label">{t.services.otherServices}</h2>
          <ul className="grid border-l border-t border-(--line) sm:grid-cols-2 lg:grid-cols-5">
            {others.map((other) => (
              <li key={other.slug} className="border-b border-r border-(--line)">
                <L locale={locale} href={`/services/${other.slug}`} className="group grid h-full content-between gap-4 p-5 hover:bg-panel">
                  <ServiceGlyph glyph={other.glyph} className="h-16 w-auto justify-self-start" />
                  <span className="flex items-center justify-between gap-3 font-semibold">
                    {pick(other.name, locale)}
                    <ArrowIcon className="size-4 shrink-0 transition-transform group-hover:translate-x-1" />
                  </span>
                </L>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
