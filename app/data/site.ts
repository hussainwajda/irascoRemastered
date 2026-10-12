import { business } from "./business";
import { services } from "./services";

/** Set NEXT_PUBLIC_SITE_URL in each environment; production should use the real domain. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://irasco.vercel.app").replace(/\/$/, "");

/** Routes without a locale prefix, for the sitemap and hreflang. */
export const staticPaths = ["/", "/services", "/industries", "/projects", "/about", "/contact", "/privacy"];

export function allPaths() {
  return [...staticPaths, ...services.map((service) => `/services/${service.slug}`)];
}

/** schema.org description of the business, rendered once in the root layout. */
export function businessJsonLd() {
  const { address } = business;
  return {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "@id": `${SITE_URL}/#business`,
    name: business.name,
    alternateName: business.nameHi,
    slogan: business.tagline,
    url: SITE_URL,
    logo: `${SITE_URL}/brand/irasco-badge.png`,
    image: `${SITE_URL}/brand/irasco-badge.png`,
    telephone: business.phone.e164,
    email: business.email,
    foundingDate: String(business.foundedYear),
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.locality,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    hasMap: business.mapsUrl,
    areaServed: business.serviceArea.map((name) => ({ "@type": "City", name })),
    sameAs: [business.social.facebook, business.social.instagram, business.ratings.justdial.url],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name.en,
          description: service.summary.en,
          url: `${SITE_URL}/services/${service.slug}`,
        },
      })),
    },
  };
}
