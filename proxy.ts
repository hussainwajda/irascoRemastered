import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "./app/i18n/config";

/**
 * English is served unprefixed (`/services`), Hindi under `/hi/services`.
 * Unprefixed requests are *rewritten* — not redirected — onto the
 * `[locale]` segment so the visitor's URL stays clean.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));
  if (hasLocale) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Everything except Next internals, API routes and files with an extension.
  matcher: ["/((?!api|_next/static|_next/image|.*\\.[\\w]+$).*)"],
};
