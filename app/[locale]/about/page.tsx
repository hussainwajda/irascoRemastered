import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import L from "../../i18n/L";
import { alternatesFor, isLocale } from "../../i18n/config";
import { getDictionary } from "../../i18n/dictionaries";
import { business } from "../../data/business";
import { PageHero, RatingBadges } from "../../components/blocks";
import { ArrowIcon } from "../../components/icons";
import badge from "../../../public/brand/irasco-badge.png";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return {
    title: t.meta.about.title,
    description: t.meta.about.description,
    alternates: alternatesFor("/about", locale),
  };
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const a = t.about;

  return (
    <>
      <PageHero eyebrow={a.eyebrow} title={a.title} />

      <section className="surface-light py-16 md:py-24">
        <div className="wrap grid gap-14 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-20">
          <div className="grid content-start gap-6">
            {a.body.map((paragraph) => (
              <p key={paragraph} className="max-w-[60ch] text-xl leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="grid content-start gap-6">
            <h2 className="label">{a.factsTitle}</h2>
            <dl className="grid grid-cols-[auto_minmax(0,1fr)] border-t border-(--line)">
              <dt className="label border-b border-(--line) py-4 pr-6">{a.facts.founded}</dt>
              <dd className="border-b border-(--line) py-4 font-mono">{business.foundedYear}</dd>
              <dt className="label border-b border-(--line) py-4 pr-6">{a.facts.base}</dt>
              <dd className="border-b border-(--line) py-4">
                {business.address.street}, {business.address.locality}
              </dd>
              <dt className="label border-b border-(--line) py-4 pr-6">{a.facts.area}</dt>
              <dd className="border-b border-(--line) py-4">{business.serviceArea.join(", ")}</dd>
              <dt className="label border-b border-(--line) py-4 pr-6">{a.facts.ratings}</dt>
              <dd className="border-b border-(--line) py-4">
                <RatingBadges t={t} className="gap-y-3" />
              </dd>
            </dl>
            <Image src={badge} alt="IRASCO badge: Ducting & Ventilation Work" className="mt-4 h-auto w-40" sizes="160px" />
          </div>
        </div>
      </section>

      <section className="surface-panel py-16 md:py-24">
        <div className="wrap grid gap-10">
          <h2 className="display text-[clamp(2rem,1.3rem+3vw,3.6rem)] font-bold [font-stretch:104%]">{a.valuesTitle}</h2>
          <ul className="grid border-l border-t border-(--line) sm:grid-cols-2 lg:grid-cols-4">
            {a.values.map((value) => (
              <li key={value.title} className="grid content-start gap-3 border-b border-r border-(--line) p-6">
                <h3 className="display text-xl font-bold [font-stretch:100%]">{value.title}</h3>
                <p className="text-(--fg-muted)">{value.body}</p>
              </li>
            ))}
          </ul>
          <L locale={locale} href="/contact" className="btn btn-line w-fit">
            {t.nav.contact}
            <ArrowIcon />
          </L>
        </div>
      </section>
    </>
  );
}
