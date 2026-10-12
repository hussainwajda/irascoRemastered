import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { alternatesFor, isLocale, pick } from "../../i18n/config";
import { getDictionary } from "../../i18n/dictionaries";
import { business } from "../../data/business";
import { projects } from "../../data/projects";
import { getService } from "../../data/services";
import { PageHero } from "../../components/blocks";
import { ArrowIcon, InstagramIcon } from "../../components/icons";

export async function generateMetadata({ params }: PageProps<"/[locale]/projects">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return {
    title: t.meta.projects.title,
    description: t.meta.projects.description,
    alternates: alternatesFor("/projects", locale),
  };
}

export default async function ProjectsPage({ params }: PageProps<"/[locale]/projects">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  const photoSources = [
    { href: business.ratings.google.url, count: `${business.photos.google}+`, label: t.projects.googlePhotos },
    { href: business.photos.justdialGallery, count: String(business.photos.justdial), label: t.projects.justdialPhotos },
  ];

  return (
    <>
      <PageHero eyebrow={t.projects.eyebrow} title={t.projects.title} lead={projects.length ? undefined : t.projects.lead} />
      <section className="surface-light py-16 md:py-24">
        <div className="wrap grid gap-10">
          {projects.length > 0 ? (
            <ul className="grid gap-8 md:grid-cols-2">
              {projects.map((project) => (
                <li key={project.slug} className="grid gap-4">
                  {project.photos[0] && (
                    <Image
                      src={project.photos[0].src}
                      alt={project.photos[0].alt}
                      width={project.photos[0].width}
                      height={project.photos[0].height}
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="aspect-[4/3] w-full object-cover"
                    />
                  )}
                  <p className="label">
                    {project.city} · {project.year} ·{" "}
                    {project.services
                      .map((slug) => {
                        const service = getService(slug);
                        return service ? pick(service.name, locale) : slug;
                      })
                      .join(", ")}
                  </p>
                  <h2 className="display text-2xl font-bold">{project.title}</h2>
                  <p className="text-(--fg-muted)">{project.scope}</p>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="grid border-l border-t border-(--line) md:grid-cols-3">
              {photoSources.map((source) => (
                <li key={source.href} className="border-b border-r border-(--line)">
                  <a href={source.href} target="_blank" rel="noopener" className="group grid h-full content-between gap-10 p-8 hover:bg-panel">
                    <span className="display text-[clamp(3.5rem,2.5rem+4vw,6rem)] font-extrabold tabular-nums [font-stretch:90%]">{source.count}</span>
                    <span className="flex items-center justify-between gap-4 text-lg font-semibold">
                      {source.label}
                      <ArrowIcon className="size-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </a>
                </li>
              ))}
              <li className="border-b border-r border-(--line)">
                <a href={business.social.instagram} target="_blank" rel="noopener" className="group grid h-full content-between gap-10 p-8 hover:bg-panel">
                  <InstagramIcon className="size-14" />
                  <span className="flex items-center justify-between gap-4 text-lg font-semibold">
                    @irascoindia
                    <ArrowIcon className="size-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
              </li>
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
