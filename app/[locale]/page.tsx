import { notFound } from "next/navigation";
import L from "../i18n/L";
import { isLocale, pick } from "../i18n/config";
import { getDictionary } from "../i18n/dictionaries";
import { business, telLink, whatsappLink } from "../data/business";
import { getService, services, type ServiceSlug } from "../data/services";
import { reviews } from "../data/reviews";
import { industries } from "../data/industries";
import AirflowCanvas from "../components/AirflowCanvas";
import StoryFilm from "../components/story/StoryFilm";
import ServicesRun from "../components/ServicesRun";
import Manifesto from "../components/Manifesto";
import ServiceGlyph from "../components/ServiceGlyph";
import FabricationSteps from "../components/FabricationSteps";
import FabricationFilm from "../components/FabricationFilm";
import { DuctGrid, RatingBadges, ReviewCard, SectionHead } from "../components/blocks";
import { ArrowIcon, PhoneIcon, WhatsAppIcon } from "../components/icons";

/** The service each stop of the film links to. */
const storyService: Record<"cooler" | "duct" | "room", ServiceSlug> = {
  cooler: "evaporative-cooling",
  duct: "ducting-fabrication",
  room: "kitchen-exhaust",
};

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const home = t.home;
  const story = home.story;

  return (
    <>
      {/* Intake: the film. Terrace, cooler, duct, restaurant. */}
      <StoryFilm
        label={story.label}
        note={story.note}
        cue={story.cue}
        rail={story.rail}
        hero={
          <div className="wrap grid gap-5 md:gap-7">
            <p className="label flex items-center gap-3 film:text-white/70">
              <span className="h-px w-8 bg-signal" aria-hidden="true" />
              {home.hero.eyebrow}
            </p>
            <h1 className="display max-w-[13ch] text-[clamp(2.75rem,1.2rem+7.4vw,8.25rem)] font-extrabold [font-stretch:112%]">
              {home.hero.title}
            </h1>
            <div className="grid items-end gap-6 md:grid-cols-[minmax(0,1fr)_auto]">
              <p className="max-w-[44ch] text-lg text-(--fg-muted) md:text-xl film:text-white/80">{home.hero.lead}</p>
              {/* On phones the dock already carries these two while the film plays. */}
              <div className="flex flex-wrap gap-3 film:max-md:hidden">
                <a href={whatsappLink()} target="_blank" rel="noopener" className="btn btn-signal">
                  <WhatsAppIcon />
                  {t.common.whatsappUs}
                </a>
                <a href={telLink} className="btn btn-line">
                  <PhoneIcon />
                  <span className="font-mono">{business.phone.display}</span>
                </a>
              </div>
            </div>
          </div>
        }
        captions={(["cooler", "duct", "room"] as const).map((id, i) => {
          const service = getService(storyService[id])!;
          return {
            id,
            alt: story[id].alt,
            content: (
              <div className="grid gap-4">
                <p className="label flex items-center gap-3">
                  <span className="text-signal">{String(i + 1).padStart(2, "0")}</span>
                  <span className="h-px w-8 bg-current" aria-hidden="true" />
                  {story[id].eyebrow}
                </p>
                <h2 className="display max-w-[16ch] text-[clamp(1.8rem,1.2rem+2.4vw,3.2rem)] font-bold [font-stretch:104%]">{story[id].title}</h2>
                <p className="max-w-[46ch] text-(--fg-muted) md:text-lg film:text-white/80">{story[id].body}</p>
                {id === "cooler" && service.figure && (
                  <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-(--line) pt-4 film:border-white/15">
                    <span className="display text-3xl font-bold text-(--accent) [font-stretch:100%]">{service.figure.value}</span>
                    <span className="max-w-[36ch] text-sm text-(--fg-muted) film:text-white/70">{service.figure.label}</span>
                  </p>
                )}
                <L
                  locale={locale}
                  href={`/services/${service.slug}`}
                  className="group flex w-fit items-center gap-2 text-sm font-semibold text-(--accent)"
                >
                  {pick(service.name, locale)}
                  <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
                </L>
              </div>
            ),
          };
        })}
      />

      {/* The route as a section drawing, with the ratings. */}
      <section className="surface-dark relative overflow-hidden">
        <DuctGrid />
        <figure className="relative border-b border-(--line)">
          <div className="h-[clamp(150px,20vw,260px)]">
            <AirflowCanvas />
          </div>
          <figcaption className="wrap label absolute inset-x-0 bottom-2 text-right text-[0.65rem]">{home.hero.figure}</figcaption>
        </figure>
        <div className="wrap relative flex flex-wrap items-center justify-between gap-6 py-8">
          <RatingBadges t={t} />
          <p className="label">
            {t.common.since} · {t.common.location}
          </p>
        </div>
      </section>

      {/* Manifesto */}
      <section className="surface-light py-24 md:py-36">
        <div className="wrap">
          <Manifesto text={home.manifesto} />
        </div>
      </section>

      {/* Services run: one outlet per service along a trunk duct */}
      <ServicesRun
        id="services-title"
        head={<SectionHead id="services-title" eyebrow={home.services.eyebrow} title={home.services.title} lead={home.services.lead} />}
        tail={
          <L locale={locale} href="/services" className="btn btn-line w-fit">
            {t.common.allServices}
            <ArrowIcon />
          </L>
        }
      >
        {services.map((service, i) => (
          <li key={service.slug} className="service-outlet relative border-b border-r border-(--line) film:lg:w-[23rem] film:lg:shrink-0 film:lg:border film:lg:border-l-0 film:lg:first-of-type:border-l">
            <L
              locale={locale}
              href={`/services/${service.slug}`}
              className="group flex h-full flex-col items-start gap-5 p-6 transition-colors hover:bg-panel md:p-8"
            >
              <span className="hidden font-mono text-xs text-(--fg-muted) film:lg:block">
                {String(i + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
              </span>
              <ServiceGlyph glyph={service.glyph} className="h-28 w-auto transition-transform duration-500 ease-air group-hover:translate-x-1" />
              <span className="label">{service.spec}</span>
              <span className="display text-2xl font-bold [font-stretch:100%]">{pick(service.name, locale)}</span>
              <span className="text-(--fg-muted)">{pick(service.summary, locale)}</span>
              <span className="mt-auto flex items-center gap-2 pt-2 text-sm font-semibold text-(--accent)">
                {t.common.viewService}
                <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </L>
          </li>
        ))}
      </ServicesRun>

      {/* Workshop: a duct section made from flat sheet */}
      <section className="surface-dark pb-24 pt-24 md:pb-32 md:pt-32 film:pb-0 film:md:pb-0" aria-labelledby="workshop-title">
        <div className="wrap grid gap-12 film:gap-0">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
            <SectionHead id="workshop-title" eyebrow={home.workshop.eyebrow} title={home.workshop.title} />
            <p className="max-w-[52ch] text-lg text-(--fg-muted)">{home.workshop.body}</p>
          </div>
          <FabricationFilm
            steps={home.workshop.steps}
            alt={home.workshop.alt}
            fallback={<FabricationSteps steps={home.workshop.steps} />}
          />
        </div>
      </section>

      {/* How a job runs */}
      <section className="surface-light py-24 md:py-32">
        <div className="wrap grid gap-14">
          <SectionHead eyebrow={home.process.eyebrow} title={home.process.title} />
          <ol className="relative grid gap-10 md:grid-cols-5 md:gap-6">
            <span aria-hidden="true" className="absolute bottom-0 left-[0.6rem] top-2 w-px bg-(--line) md:inset-x-0 md:bottom-auto md:left-0 md:top-[0.6rem] md:h-px md:w-auto" />
            {home.process.steps.map((step, i) => (
              <li key={step.title} className="relative grid content-start gap-3 pl-10 md:pl-0 md:pt-10">
                <span aria-hidden="true" className="absolute left-0 top-0 grid size-5 place-items-center border border-(--fg) bg-(--bg) md:top-0">
                  <span className="size-1.5 bg-(--fg)" />
                </span>
                <span className="font-mono text-xs text-(--fg-muted)">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display text-xl font-bold [font-stretch:100%]">{step.title}</h3>
                <p className="text-(--fg-muted)">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Who it is for */}
      <section className="surface-light border-t border-(--line) pb-24 md:pb-32" aria-labelledby="industries-title">
        <div className="wrap grid gap-10 pt-16 md:pt-20">
          <div className="grid items-end gap-6 md:grid-cols-[minmax(0,1fr)_auto]">
            <SectionHead id="industries-title" eyebrow={t.industries.eyebrow} title={t.industries.title} lead={t.industries.lead} />
            <L locale={locale} href="/industries" className="btn btn-line w-fit">
              {t.nav.industries}
              <ArrowIcon />
            </L>
          </div>
          <ul className="grid border-l border-t border-(--line) sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <li key={industry.slug} className="border-b border-r border-(--line)">
                <L
                  locale={locale}
                  href={`/industries#${industry.slug}`}
                  className="group grid h-full content-start gap-2 p-6 transition-colors hover:bg-panel"
                >
                  <span className="display flex items-center justify-between gap-4 text-xl font-bold [font-stretch:100%]">
                    {pick(industry.name, locale)}
                    <ArrowIcon className="size-4 shrink-0 text-(--accent) transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="text-(--fg-muted)">{pick(industry.need, locale)}</span>
                </L>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Reviews */}
      <section className="surface-panel py-24 md:py-32">
        <div className="wrap grid gap-12">
          <div className="grid items-end gap-8 md:grid-cols-[minmax(0,1fr)_auto]">
            <SectionHead eyebrow={home.reviews.eyebrow} title={home.reviews.title} />
            <RatingBadges t={t} />
          </div>
          <div className="columns-1 gap-5 md:columns-2 lg:columns-3 [&>*]:mb-5 [&>*]:break-inside-avoid">
            {reviews.map((review) => (
              <ReviewCard key={review.author} review={review} locale={locale} />
            ))}
          </div>
          <p className="label">{t.common.sourcesChecked}</p>
        </div>
      </section>

      {/* Outlet */}
      <section className="surface-dark relative overflow-hidden">
        <div className="tape h-3" aria-hidden="true" />
        <div className="wrap grid gap-8 py-24 md:py-32">
          <h2 className="display max-w-[14ch] text-[clamp(2.6rem,1.4rem+5.6vw,7rem)] font-extrabold [font-stretch:112%]">
            {home.outlet.title}
          </h2>
          <p className="max-w-[50ch] text-lg text-(--fg-muted) md:text-xl">{home.outlet.body}</p>
          <div className="flex flex-wrap gap-3">
            <a href={whatsappLink()} target="_blank" rel="noopener" className="btn btn-signal">
              <WhatsAppIcon />
              {t.common.whatsappUs}
            </a>
            <a href={telLink} className="btn btn-line">
              <PhoneIcon />
              {t.common.callUs}
            </a>
            <L locale={locale} href="/contact" className="btn text-(--fg) underline decoration-(--line) underline-offset-4 hover:decoration-signal">
              {home.outlet.form}
              <ArrowIcon />
            </L>
          </div>
        </div>
      </section>
    </>
  );
}
