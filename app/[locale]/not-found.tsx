"use client";

import Link from "next/link";
import { useI18n } from "../i18n/LocaleProvider";
import { DuctGrid } from "../components/blocks";
import { ArrowIcon } from "../components/icons";

export default function NotFound() {
  const { t, href } = useI18n();
  return (
    <section className="surface-dark relative grid min-h-[80dvh] place-items-center overflow-hidden px-4 pb-16 pt-32">
      <title>{`${t.meta.notFound.title} · IRASCO`}</title>
      <DuctGrid />
      <div className="relative grid max-w-xl justify-items-start gap-6">
        <p className="label">404</p>
        <h1 className="display text-[clamp(2.6rem,1.6rem+4vw,5rem)] font-extrabold [font-stretch:108%]">{t.notFound.title}</h1>
        <p className="text-lg text-(--fg-muted)">{t.notFound.body}</p>
        <Link href={href("/")} className="btn btn-signal">
          {t.notFound.home}
          <ArrowIcon />
        </Link>
      </div>
    </section>
  );
}
