import { business } from "../data/business";
import type { Review } from "../data/reviews";
import type { Dictionary } from "../i18n/dictionaries";
import type { Locale } from "../i18n/config";
import { StarIcon } from "./icons";

/** Eyebrow, title and lead used at the top of most sections. */
export function SectionHead({
  eyebrow,
  title,
  lead,
  id,
  className = "",
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  id?: string;
  className?: string;
}) {
  return (
    <div className={`grid gap-4 ${className}`}>
      <p className="label flex items-center gap-3">
        <span className="h-px w-8 bg-current" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 id={id} className="display max-w-[18ch] text-[clamp(2rem,1.3rem+3vw,3.6rem)] font-bold [font-stretch:104%]">{title}</h2>
      {lead && <p className="max-w-[58ch] text-lg text-(--fg-muted)">{lead}</p>}
    </div>
  );
}

/** Dark band at the top of every inner page. Sits under the fixed header. */
export function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="surface-dark relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-44">
      <DuctGrid />
      <div className="wrap relative grid gap-6">
        <p className="label flex items-center gap-3">
          <span className="h-px w-8 bg-signal" aria-hidden="true" />
          {eyebrow}
        </p>
        <h1 className="display max-w-[16ch] text-[clamp(2.6rem,1.4rem+5.4vw,6.2rem)] font-extrabold [font-stretch:108%]">{title}</h1>
        {lead && <p className="max-w-[56ch] text-lg text-(--fg-muted) md:text-xl">{lead}</p>}
        {children}
      </div>
    </section>
  );
}

/** Faint drawing-sheet grid behind dark heroes. */
export function DuctGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_70%_20%,black,transparent_70%)]"
    />
  );
}

/** Google and JustDial ratings, each linked to its listing. */
export function RatingBadges({ t, className = "" }: { t: Dictionary; className?: string }) {
  const items = [
    { ...business.ratings.google, where: t.common.googleRating, unit: t.common.reviews },
    { ...business.ratings.justdial, where: t.common.justdialRating, unit: t.common.ratings },
  ];
  return (
    <ul className={`flex flex-wrap gap-x-8 gap-y-4 ${className}`}>
      {items.map((item) => (
        <li key={item.url}>
          <a href={item.url} target="_blank" rel="noopener" className="group flex items-center gap-3">
            <span className="display text-4xl font-bold tabular-nums [font-stretch:90%]">{item.value.toFixed(1)}</span>
            <span className="grid gap-0.5 text-sm leading-tight">
              <span className="flex text-signal" aria-hidden="true">
                {Array.from({ length: 5 }, (_, i) => (
                  <StarIcon key={i} className={`size-3.5 ${i >= Math.floor(item.value + 0.25) ? "opacity-35" : ""}`} />
                ))}
              </span>
              <span className="text-(--fg-muted) group-hover:text-(--fg)">
                {item.where} · {item.count} {item.unit}
              </span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function ReviewCard({ review, locale }: { review: Review; locale: Locale }) {
  const date = review.date
    ? new Date(review.date).toLocaleDateString(locale === "hi" ? "hi-IN" : "en-IN", { month: "short", year: "numeric" })
    : null;
  return (
    <figure className="grid h-full content-between gap-6 border border-(--line) bg-(--bg) p-6">
      <blockquote className="text-[1.05rem] leading-relaxed" lang="en">
        “{review.text}”
      </blockquote>
      <figcaption className="grid gap-1 border-t border-(--line) pt-4 text-sm">
        <span className="font-semibold">{review.author}</span>
        <span className="text-(--fg-muted)">
          {review.topic} · {review.source}
          {date ? ` · ${date}` : ""}
        </span>
      </figcaption>
    </figure>
  );
}

/** Renders schema.org JSON-LD, escaping `<` as the Next.js guide advises. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
