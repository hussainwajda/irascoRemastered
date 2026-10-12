import type { Metadata } from "next";
import { notFound } from "next/navigation";
import L from "../../i18n/L";
import { alternatesFor, isLocale, pick } from "../../i18n/config";
import { getDictionary } from "../../i18n/dictionaries";
import { industries } from "../../data/industries";
import { getService } from "../../data/services";
import { PageHero } from "../../components/blocks";
import { ArrowIcon } from "../../components/icons";

export async function generateMetadata({ params }: PageProps<"/[locale]/industries">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return {
    title: t.meta.industries.title,
    description: t.meta.industries.description,
    alternates: alternatesFor("/industries", locale),
  };
}

export default async function IndustriesPage({ params }: PageProps<"/[locale]/industries">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <>
      <PageHero eyebrow={t.industries.eyebrow} title={t.industries.title} lead={t.industries.lead} />
      <section className="surface-light py-16 md:py-24">
        <ul className="wrap grid border-t border-(--line)">
          {industries.map((industry) => (
            <li
              key={industry.slug}
              id={industry.slug}
              className="grid scroll-mt-24 gap-6 border-b border-(--line) py-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:gap-12"
            >
              <div className="grid content-start gap-3">
                <h2 className="display text-[clamp(1.8rem,1.3rem+2vw,3rem)] font-bold [font-stretch:104%]">{pick(industry.name, locale)}</h2>
                <p className="max-w-[44ch] text-lg text-(--fg-muted)">{pick(industry.need, locale)}</p>
              </div>
              <div className="grid content-start gap-3">
                <h3 className="label">{t.industries.relevant}</h3>
                <ul className="grid gap-px">
                  {industry.services.map((slug) => {
                    const service = getService(slug);
                    if (!service) return null;
                    return (
                      <li key={slug}>
                        <L
                          locale={locale}
                          href={`/services/${slug}`}
                          className="group flex items-center justify-between gap-4 border-b border-(--line) py-3 hover:text-(--accent)"
                        >
                          {pick(service.name, locale)}
                          <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
                        </L>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
