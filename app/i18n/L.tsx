import Link from "next/link";
import type { ComponentProps } from "react";
import { localizedHref, type Locale } from "./config";

type LProps = Omit<ComponentProps<typeof Link>, "href"> & { href: string; locale: Locale };

/**
 * Locale-aware <Link> for Server Components. Every internal link goes through
 * this (or `useI18n().href` on the client) so a Hindi visitor never gets
 * dropped back into English.
 */
export default function L({ href, locale, ...rest }: LProps) {
  return <Link href={localizedHref(href, locale)} {...rest} />;
}
