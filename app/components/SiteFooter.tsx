import L from "../i18n/L";
import type { Locale } from "../i18n/config";
import type { Dictionary } from "../i18n/dictionaries";
import { business, mailLink, telLink, whatsappLink } from "../data/business";
import { BrandMark } from "./BrandMark";
import { FacebookIcon, InstagramIcon } from "./icons";

export default function SiteFooter({ locale, t }: { locale: Locale; t: Dictionary }) {
  const explore = [
    ["/services", t.nav.services],
    ["/industries", t.nav.industries],
    ["/projects", t.nav.projects],
    ["/about", t.nav.about],
    ["/contact", t.nav.contact],
  ] as const;

  return (
    <footer className="surface-deep overflow-hidden pb-24 md:pb-10">
      <div className="wrap grid gap-12 pt-16 md:grid-cols-[1.4fr_1fr_1.2fr_0.8fr] md:gap-8">
        <div className="grid content-start gap-4">
          <BrandMark className="h-12 w-auto" />
          <p className="max-w-[32ch] text-(--fg-muted)">{t.footer.blurb}</p>
        </div>

        <nav aria-label={t.footer.explore}>
          <h2 className="label mb-4">{t.footer.explore}</h2>
          <ul className="grid gap-2">
            {explore.map(([path, label]) => (
              <li key={path}>
                <L locale={locale} href={path} className="hover:text-signal">
                  {label}
                </L>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="label mb-4">{t.footer.reach}</h2>
          <address className="grid gap-2 not-italic">
            <a href={telLink} className="font-mono hover:text-signal">
              {business.phone.display}
            </a>
            <a href={whatsappLink()} target="_blank" rel="noopener" className="hover:text-signal">
              WhatsApp
            </a>
            <a href={mailLink} className="font-mono text-sm hover:text-signal">
              {business.email}
            </a>
            <a href={business.mapsUrl} target="_blank" rel="noopener" className="text-(--fg-muted) hover:text-signal">
              {business.address.street}, {business.address.locality} {business.address.postalCode}
            </a>
          </address>
        </div>

        <div>
          <h2 className="label mb-4">{t.footer.follow}</h2>
          <ul className="flex gap-3">
            <li>
              <a href={business.social.instagram} target="_blank" rel="noopener" aria-label="Instagram" className="grid size-11 place-items-center border border-(--line) hover:border-signal hover:text-signal">
                <InstagramIcon />
              </a>
            </li>
            <li>
              <a href={business.social.facebook} target="_blank" rel="noopener" aria-label="Facebook" className="grid size-11 place-items-center border border-(--line) hover:border-signal hover:text-signal">
                <FacebookIcon />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="display pointer-events-none mt-16 select-none whitespace-nowrap text-center text-[25vw] font-black leading-[0.8] tracking-[-0.03em] text-transparent [-webkit-text-stroke:1px_#2f3942] [font-stretch:125%]"
      >
        IRASCO
      </p>

      <div className="wrap mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-(--line) pt-6 text-sm text-(--fg-muted)">
        <span>
          © {new Date().getFullYear()} IRASCO, {business.address.locality}. {t.footer.rights}
        </span>
        <L locale={locale} href="/privacy" className="hover:text-signal">
          {t.footer.privacy}
        </L>
      </div>
    </footer>
  );
}
