import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { alternatesFor, isLocale } from "../../i18n/config";
import { getDictionary } from "../../i18n/dictionaries";
import { business, mailLink, telLink, whatsappLink } from "../../data/business";
import EnquiryForm from "../../components/EnquiryForm";
import { PageHero } from "../../components/blocks";
import { ArrowIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "../../components/icons";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return {
    title: t.meta.contact.title,
    description: t.meta.contact.description,
    alternates: alternatesFor("/contact", locale),
  };
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const c = t.contact;

  const channels = [
    {
      href: whatsappLink(),
      external: true,
      icon: <WhatsAppIcon className="size-6" />,
      title: c.whatsappTitle,
      value: business.phone.display,
      note: c.whatsappBody,
      primary: true,
    },
    { href: telLink, icon: <PhoneIcon className="size-6" />, title: c.callTitle, value: business.phone.display },
    { href: mailLink, icon: <MailIcon className="size-6" />, title: c.emailTitle, value: business.email },
  ];

  return (
    <>
      <PageHero eyebrow={c.eyebrow} title={c.title} lead={c.lead} />

      <section className="surface-light py-16 md:py-24">
        <div className="wrap grid gap-16">
          <ul className="grid border-l border-t border-(--line) md:grid-cols-3">
            {channels.map((channel) => (
              <li key={channel.title} className="border-b border-r border-(--line)">
                <a
                  href={channel.href}
                  {...(channel.external ? { target: "_blank", rel: "noopener" } : {})}
                  className={[
                    "group grid h-full content-between gap-8 p-7",
                    channel.primary ? "bg-signal text-ink" : "hover:bg-panel",
                  ].join(" ")}
                >
                  <span className="flex items-center justify-between">
                    {channel.icon}
                    <ArrowIcon className="size-5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="grid gap-1">
                    <span className="label !text-current opacity-70">{channel.title}</span>
                    <span className="break-all font-mono text-lg font-medium md:text-xl">{channel.value}</span>
                    {channel.note && <span className="text-sm opacity-80">{channel.note}</span>}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-20">
            <div className="grid content-start gap-10">
              <div className="grid gap-3">
                <h2 className="label">{c.visitTitle}</h2>
                <address className="flex gap-3 text-lg not-italic">
                  <PinIcon className="mt-1 size-5 shrink-0" />
                  <span>
                    IRASCO
                    <br />
                    {business.address.street}
                    <br />
                    {business.address.locality} {business.address.postalCode}, {business.address.region}
                  </span>
                </address>
                <a href={business.mapsUrl} target="_blank" rel="noopener" className="btn btn-line mt-2 w-fit">
                  {t.common.directions}
                  <ArrowIcon />
                </a>
              </div>
              <div className="grid gap-3">
                <h2 className="label">{c.hoursTitle}</h2>
                <p className="text-lg">{c.hoursValue}</p>
              </div>
            </div>

            <div className="surface-panel grid gap-6 border border-(--line) p-6 md:p-10">
              <div className="grid gap-2">
                <h2 className="display text-3xl font-bold [font-stretch:104%]">{c.formTitle}</h2>
                <p className="text-(--fg-muted)">{c.formLead}</p>
              </div>
              <EnquiryForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
