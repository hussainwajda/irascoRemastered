import { business, telLink, whatsappLink } from "../data/business";
import type { Dictionary } from "../i18n/dictionaries";
import { PhoneIcon, WhatsAppIcon } from "./icons";

/**
 * Phone-only bar pinned to the bottom of the screen. WhatsApp and a call are
 * the two ways IRASCO's customers actually get in touch, so they stay one
 * tap away on every page.
 */
export default function ContactDock({ t }: { t: Dictionary }) {
  return (
    <div className="surface-deep fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_auto] gap-px border-t border-(--line) pb-[env(safe-area-inset-bottom,0px)] md:hidden">
      <a href={whatsappLink()} target="_blank" rel="noopener" className="btn btn-signal min-h-14 rounded-none">
        <WhatsAppIcon />
        {t.common.whatsappUs}
      </a>
      <a href={telLink} className="btn min-h-14 px-6 text-(--fg)" aria-label={`${t.common.callUs} ${business.phone.display}`}>
        <PhoneIcon />
        {t.common.callUs}
      </a>
    </div>
  );
}
