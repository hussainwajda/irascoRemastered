import type { Metadata } from "next";
import { notFound } from "next/navigation";
import L from "../../i18n/L";
import { alternatesFor, isLocale, pick } from "../../i18n/config";
import { getDictionary } from "../../i18n/dictionaries";
import { services } from "../../data/services";
import ServiceGlyph from "../../components/ServiceGlyph";
import { PageHero } from "../../components/blocks";
import { ArrowIcon } from "../../components/icons";

export async function generateMetadata({ params }: PageProps<"/[locale]/services">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return {
    title: t.meta.services.title,
    description: t.meta.services.description,
    alternates: alternatesFor("/services", locale),
  };
}

export default async function ServicesPage({ params }: PageProps<"/[locale]/services">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <>
      <PageHero eyebrow={t.services.eyebrow} title={t.services.title} lead={t.services.lead} />
      <section className="surface-light py-16 md:py-24">
        <ul className="wrap grid border-t border-(--line)">
          {services.map((service, i) => (
            <li key={service.slug} className="border-b border-(--line)">
              <L
                locale={locale}
                href={`/services/${service.slug}`}
                className="group grid items-center gap-6 py-8 md:grid-cols-[3rem_12rem_minmax(0,1fr)_auto] md:gap-10 md:py-10"
              >
                <span className="font-mono text-xs text-(--fg-muted)">S-{String(i + 1).padStart(2, "0")}</span>
                <ServiceGlyph glyph={service.glyph} className="h-24 w-auto justify-self-start" />
                <span className="grid gap-2">
                  <span className="label">{service.spec}</span>
                  <span className="display text-[clamp(1.6rem,1.2rem+1.6vw,2.6rem)] font-bold [font-stretch:104%] group-hover:text-(--accent)">
                    {pick(service.name, locale)}
                  </span>
                  <span className="max-w-[60ch] text-(--fg-muted)">{pick(service.summary, locale)}</span>
                </span>
                <ArrowIcon className="hidden size-6 transition-transform group-hover:translate-x-1 md:block" />
              </L>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
