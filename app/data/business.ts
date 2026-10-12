/**
 * The single source of truth for facts about IRASCO.
 *
 * Every value here was checked against a public source on 11 Oct 2026
 * (Google Maps, JustDial, IRASCO's own posts and the 2023 website). Anything
 * not yet confirmed by the owner is `null` or marked TODO and is not rendered,
 * so the site never states a guess as fact.
 */
export const business = {
  name: "IRASCO",
  nameHi: "इरास्को",
  tagline: "Ducting & Ventilation Work",
  foundedYear: 2017,

  phone: { display: "+91 96308 59889", e164: "+919630859889" },
  whatsapp: "919630859889",
  email: "irascoindia@gmail.com",

  address: {
    street: "Shri Sajjan Mills, Sailana Road, Sajjan Mill",
    locality: "Ratlam",
    region: "Madhya Pradesh",
    postalCode: "457001",
    country: "IN",
    plusCode: "82RH+4F Ratlam",
  },

  /** Google Maps listing (customer id from the old embed). */
  mapsUrl: "https://maps.google.com/?cid=15443344855444368060",

  ratings: {
    checkedOn: "2026-10-11",
    google: {
      value: 4.5,
      count: 51,
      url: "https://maps.google.com/?cid=15443344855444368060",
    },
    justdial: {
      value: 5.0,
      count: 55,
      url: "https://www.justdial.com/Ratlam/IRASCO-Shri-Sajjan-Mills-Sajjan-Mill/9999P7412-7412-180627054305-H7T3_BZDET",
    },
  },

  photos: {
    google: 131,
    justdial: 44,
    justdialGallery:
      "https://www.justdial.com/Ratlam/IRASCO-Shri-Sajjan-Mills-Sajjan-Mill/9999P7412-7412-180627054305-H7T3_BZDET/gallery?tab=all",
  },

  social: {
    facebook: "https://www.facebook.com/irascoindia",
    instagram: "https://www.instagram.com/irascoindia/",
  },

  /**
   * Google and JustDial both show a 9 am opening and Sunday closed. The
   * closing time is not published anywhere yet. TODO: confirm with the owner.
   */
  hours: { days: "Mon–Sat", opens: "09:00", closes: null as string | null },

  /** Cities named in reviews and listings. TODO: confirm the full area. */
  serviceArea: ["Ratlam", "Indore"],
} as const;

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${business.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const telLink = `tel:${business.phone.e164}`;
export const mailLink = `mailto:${business.email}`;
