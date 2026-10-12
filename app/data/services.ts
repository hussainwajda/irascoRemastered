import type { Localized } from "../i18n/config";

export type ServiceSlug =
  | "ducting-fabrication"
  | "kitchen-exhaust"
  | "air-conditioning"
  | "evaporative-cooling"
  | "hvls-fans"
  | "industrial-ventilation";

export type GlyphKey = "duct" | "hood" | "ac" | "cooler" | "hvls" | "ventilation";

export interface Service {
  slug: ServiceSlug;
  glyph: GlyphKey;
  name: Localized;
  /** One line for cards and meta descriptions. */
  summary: Localized;
  /** Materials or product types, shown as a spec tag on cards. */
  spec: string;
  /** Opening paragraph on the service page. English only for now. */
  intro: string;
  /** What the job covers. Every item is something IRASCO lists or shows in its own work. */
  includes: { title: string; detail: string }[];
  /** Where this is used. Slugs from industries.ts. */
  industries: string[];
  /** A published figure from IRASCO's own material, with where it came from. */
  figure?: { value: string; label: string; source: string };
  /** Prefilled WhatsApp message. */
  enquiry: string;
}

export const services: Service[] = [
  {
    slug: "ducting-fabrication",
    glyph: "duct",
    name: { en: "Ducting & fabrication", hi: "डक्टिंग और फ़ैब्रिकेशन" },
    summary: {
      en: "GI, stainless and spiral ducts, cut and folded in our workshop to your site's measurements.",
      hi: "GI, स्टेनलेस और स्पाइरल डक्ट, आपकी साइट के नाप से हमारी वर्कशॉप में बने।",
    },
    spec: "GI · SS · Spiral · Insulation",
    intro:
      "Every duct we install starts as flat sheet in our Sajjan Mill workshop. We measure the site, cut and fold GI or stainless sheet to fit it, and insulate runs that carry cooled air or need to stay quiet.",
    includes: [
      { title: "Air conditioning ducts", detail: "Supply and return runs for ducted and central AC." },
      { title: "Air cooling ducts", detail: "Distribution ducting for ductable and evaporative coolers." },
      { title: "Exhaust ducts", detail: "Stainless and GI runs that carry smoke, heat and fumes out of the building." },
      { title: "Spiral ducts", detail: "Round spiral ducting for exposed ceilings and long straight runs." },
      { title: "Insulation", detail: "Thermal and sound insulation wrapped on site." },
      { title: "Fabrication to drawing", detail: "Custom sheet-metal pieces made to your measurements." },
    ],
    industries: ["restaurants", "factories", "shops-offices", "hospitals"],
    enquiry: "Hi IRASCO, I need ducting work. Site location: ",
  },
  {
    slug: "kitchen-exhaust",
    glyph: "hood",
    name: { en: "Commercial kitchen exhaust", hi: "कमर्शियल किचन एग्ज़ॉस्ट" },
    summary: {
      en: "Stainless steel hoods and chimney ducting for restaurants, hotels and cloud kitchens.",
      hi: "रेस्टोरेंट, होटल और क्लाउड किचन के लिए स्टेनलेस स्टील हुड और चिमनी डक्टिंग।",
    },
    spec: "SS hoods · Exhaust ducting · Fans",
    intro:
      "A busy kitchen needs smoke and heat gone before it reaches the dining room. We build stainless steel hoods to the length of your cooking line, run the exhaust duct out of the building, and fit a fan sized for the job.",
    includes: [
      { title: "Stainless steel hoods", detail: "Made to the length and layout of your cooking range." },
      { title: "Exhaust ducting", detail: "Stainless or GI duct from the hood to the outside." },
      { title: "Exhaust fans", detail: "Axial, belt-drive or direct-drive, chosen for the duct run." },
      { title: "Low-noise setups", detail: "Insulated ducts and mounted fans to keep kitchen noise down." },
    ],
    industries: ["restaurants", "hospitals", "homes"],
    enquiry: "Hi IRASCO, I need a kitchen hood / chimney setup. Kitchen location: ",
  },
  {
    slug: "air-conditioning",
    glyph: "ac",
    name: { en: "Air conditioning", hi: "एयर कंडीशनिंग" },
    summary: {
      en: "Installation, repair, gas charging and shifting for split, ducted and central AC.",
      hi: "स्प्लिट, डक्टेड और सेंट्रल AC की फ़िटिंग, रिपेयर, गैस चार्जिंग और शिफ़्टिंग।",
    },
    spec: "Split · Ducted · Central",
    intro:
      "We install, service and move air conditioners for homes, shops and offices, and design the ducting for central systems that cool a whole floor.",
    includes: [
      { title: "AC installation", detail: "Split and ducted units, with neat piping and drain lines." },
      { title: "AC repair and service", detail: "Cleaning, fault-finding and part replacement." },
      { title: "Gas charging", detail: "Leak check and refrigerant top-up." },
      { title: "Uninstall and shifting", detail: "Safe removal and refitting when you move." },
      { title: "Central air conditioning", detail: "Ducted systems for larger floors, with ducting made in-house." },
    ],
    industries: ["shops-offices", "homes", "hospitals"],
    enquiry: "Hi IRASCO, I need AC work (install / repair / gas / shifting). Location: ",
  },
  {
    slug: "evaporative-cooling",
    glyph: "cooler",
    name: { en: "Ductable & evaporative coolers", hi: "डक्टेबल और इवैपोरेटिव कूलर" },
    summary: {
      en: "Central air cooling for factories, warehouses, shops and halls where AC costs too much to run.",
      hi: "फ़ैक्ट्री, गोदाम, दुकान और हॉल के लिए सेंट्रल एयर कूलिंग, जहाँ AC चलाना महँगा पड़ता है।",
    },
    spec: "Ductable · Industrial · Venti-cooling",
    intro:
      "Evaporative coolers push large volumes of fresh, cooled air through a space. With ducting they reach every corner of a factory floor, warehouse or showroom. We start with a free site survey and size the system from it.",
    includes: [
      { title: "Free site survey", detail: "We measure the space and suggest unit size and duct layout." },
      { title: "Ductable coolers", detail: "Roof or wall mounted units with GI distribution ducting." },
      { title: "Industrial coolers", detail: "High-volume units for factories and warehouses." },
      { title: "Cooling with ventilation", detail: "Fresh air in, stale air out, for retail and halls." },
    ],
    industries: ["factories", "shops-offices", "poultry"],
    figure: {
      value: "25,000 CMH",
      label: "air delivery from a single 1.5 kW cooler, for about 1,600 sq ft",
      source: "IRASCO product listing, 2023",
    },
    enquiry: "Hi IRASCO, I want air cooling for my space. Area (sq ft) and city: ",
  },
  {
    slug: "hvls-fans",
    glyph: "hvls",
    name: { en: "HVLS fans", hi: "HVLS पंखे" },
    summary: {
      en: "Big, slow ceiling fans that move a whole hall's air. One can replace many small fans.",
      hi: "बड़े, धीमे सीलिंग पंखे जो पूरे हॉल की हवा चलाते हैं। एक पंखा कई छोटे पंखों की जगह ले सकता है।",
    },
    spec: "High volume · Low speed",
    intro:
      "High-volume, low-speed fans use very long blades turning slowly to move a large column of air across a big floor. They suit factories, warehouses and halls with high ceilings.",
    includes: [
      { title: "Supply and installation", detail: "Fan, mounting and electrical hookup." },
      { title: "Placement planning", detail: "Fan count and positions from your floor plan and ceiling height." },
      { title: "Pairing with cooling", detail: "Combined with evaporative coolers to spread cooled air further." },
    ],
    industries: ["factories", "shops-offices"],
    enquiry: "Hi IRASCO, I want HVLS fans. Hall size and ceiling height: ",
  },
  {
    slug: "industrial-ventilation",
    glyph: "ventilation",
    name: { en: "Industrial ventilation", hi: "इंडस्ट्रियल वेंटिलेशन" },
    summary: {
      en: "Exhaust fans, turbine ventilators, poultry fans and blowers to move heat and fumes out.",
      hi: "गर्मी और धुएँ को बाहर निकालने के लिए एग्ज़ॉस्ट फ़ैन, टर्बाइन वेंटिलेटर, पोल्ट्री फ़ैन और ब्लोअर।",
    },
    spec: "Axial · Turbine · Blower",
    intro:
      "Hot air, fumes and humidity need a way out. We supply and install the fans and ventilators that give them one, from a single roof turbine on a house to banks of exhaust fans in a shed.",
    includes: [
      { title: "Axial fans", detail: "Wall and duct mounted, for general exhaust." },
      { title: "Belt-drive and direct-drive fans", detail: "Heavier exhaust duty for sheds and workshops." },
      { title: "Turbine ventilators", detail: "Wind-driven roof ventilators with no running cost." },
      { title: "Poultry farm fans", detail: "Exhaust fans for poultry sheds." },
      { title: "Ring blowers", detail: "Compact blowers for process air." },
      { title: "Man coolers", detail: "Portable spot cooling for work areas." },
    ],
    industries: ["factories", "poultry", "homes"],
    enquiry: "Hi IRASCO, I need ventilation / exhaust fans. Space and city: ",
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
