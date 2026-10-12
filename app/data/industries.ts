import type { Localized } from "../i18n/config";
import type { ServiceSlug } from "./services";

export interface Industry {
  slug: string;
  name: Localized;
  need: Localized;
  services: ServiceSlug[];
  /** Why this sector is listed: a review, a listing or IRASCO's own posts. */
  evidence: string;
}

export const industries: Industry[] = [
  {
    slug: "restaurants",
    name: { en: "Restaurants & cloud kitchens", hi: "रेस्टोरेंट और क्लाउड किचन" },
    need: {
      en: "Smoke and heat out of the kitchen, cool air in the dining room.",
      hi: "किचन से धुआँ और गर्मी बाहर, डाइनिंग में ठंडी हवा।",
    },
    services: ["kitchen-exhaust", "ducting-fabrication", "air-conditioning"],
    evidence: "Google reviews from restaurant owners in Indore and Ratlam",
  },
  {
    slug: "hospitals",
    name: { en: "Hospitals & clinics", hi: "अस्पताल और क्लिनिक" },
    need: {
      en: "Reliable air conditioning and exhaust in wards, kitchens and service areas.",
      hi: "वार्ड, किचन और सर्विस एरिया में भरोसेमंद AC और एग्ज़ॉस्ट।",
    },
    services: ["air-conditioning", "ducting-fabrication", "kitchen-exhaust"],
    evidence: "Named in Google review highlights",
  },
  {
    slug: "factories",
    name: { en: "Factories & warehouses", hi: "फ़ैक्ट्री और गोदाम" },
    need: {
      en: "Large floors cooled and ventilated without AC-level power bills.",
      hi: "बड़े फ़्लोर की कूलिंग और वेंटिलेशन, AC जितने बिजली बिल के बिना।",
    },
    services: ["evaporative-cooling", "hvls-fans", "industrial-ventilation", "ducting-fabrication"],
    evidence: "JustDial listing (industrial) and IRASCO product range",
  },
  {
    slug: "shops-offices",
    name: { en: "Shops, offices & showrooms", hi: "दुकान, ऑफ़िस और शोरूम" },
    need: {
      en: "Comfortable customers and staff through the summer.",
      hi: "पूरी गर्मी ग्राहक और स्टाफ़ आराम से।",
    },
    services: ["air-conditioning", "evaporative-cooling", "ducting-fabrication"],
    evidence: "IRASCO posts on retail and office cooling",
  },
  {
    slug: "poultry",
    name: { en: "Poultry farms", hi: "पोल्ट्री फ़ार्म" },
    need: {
      en: "Steady airflow through sheds to keep birds cool.",
      hi: "पक्षियों को ठंडा रखने के लिए शेड में लगातार हवा।",
    },
    services: ["industrial-ventilation", "evaporative-cooling"],
    evidence: "Poultry fans in IRASCO's product range",
  },
  {
    slug: "homes",
    name: { en: "Homes", hi: "घर" },
    need: {
      en: "AC service, kitchen chimneys and roof ventilators.",
      hi: "AC सर्विस, किचन चिमनी और छत के वेंटिलेटर।",
    },
    services: ["air-conditioning", "industrial-ventilation", "kitchen-exhaust"],
    evidence: "JustDial and Google reviews from homeowners in Ratlam",
  },
];
