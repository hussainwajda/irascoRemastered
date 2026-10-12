import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { alternatesFor, isLocale } from "../../i18n/config";
import { getDictionary } from "../../i18n/dictionaries";
import { business } from "../../data/business";
import { PageHero } from "../../components/blocks";

export async function generateMetadata({ params }: PageProps<"/[locale]/privacy">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return {
    title: t.meta.privacy.title,
    description: t.meta.privacy.description,
    alternates: alternatesFor("/privacy", locale),
  };
}

/* TODO: have the owner confirm this matches how enquiries are actually handled. */
const SECTIONS = [
  {
    title: "What we collect",
    body: "When you send an enquiry through this website we receive your name, phone number, city, the service you chose and your message. We don't use cookies for advertising or tracking.",
  },
  {
    title: "Why we collect it",
    body: "Only to reply to your enquiry, visit your site and prepare a quotation.",
  },
  {
    title: "Where it goes",
    body: "Enquiries are delivered to IRASCO's business email. If you choose WhatsApp, your message goes through WhatsApp under its own terms. We don't sell or share your details with anyone else.",
  },
  {
    title: "How long we keep it",
    body: "As long as needed to handle your enquiry and any work that follows, and as required for business records.",
  },
  {
    title: "Your choices",
    body: `To see, correct or delete the details we hold about you, email ${business.email} or call ${business.phone.display}.`,
  },
];

export default async function PrivacyPage({ params }: PageProps<"/[locale]/privacy">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <>
      <PageHero eyebrow={t.meta.siteName} title={t.meta.privacy.title} lead={t.meta.privacy.description} />
      <section className="surface-light py-16 md:py-24">
        <div className="wrap grid max-w-3xl gap-10">
          {t.common.englishOnly && <p className="border-l-2 border-signal pl-4 text-(--fg-muted)">{t.common.englishOnly}</p>}
          {SECTIONS.map((section) => (
            <div key={section.title} lang="en" className="grid gap-2 border-t border-(--line) pt-6">
              <h2 className="display text-2xl font-bold [font-stretch:100%]">{section.title}</h2>
              <p className="text-lg text-(--fg-muted)">{section.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
