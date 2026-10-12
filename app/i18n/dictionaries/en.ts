/**
 * English source dictionary.
 *
 * This is the shape of record for the whole site — `hi.ts` is typed against
 * it, so a missing Hindi string is a compile error rather than a page that
 * quietly falls back to English.
 */
export const en = {
  meta: {
    siteName: "IRASCO",
    titleTemplate: "%s · IRASCO",
    home: {
      title: "IRASCO · Ducting, kitchen exhaust and cooling in Ratlam",
      description:
        "Ducting, commercial kitchen hoods, air conditioning, evaporative cooling and ventilation. Fabricated in our Ratlam workshop since 2017, installed across Ratlam and Indore.",
    },
    services: {
      title: "Services",
      description:
        "Ducting and fabrication, kitchen exhaust, air conditioning, ductable coolers, HVLS fans and industrial ventilation from IRASCO, Ratlam.",
    },
    industries: {
      title: "Industries",
      description: "Restaurants, hospitals, factories, shops, poultry farms and homes served by IRASCO.",
    },
    projects: {
      title: "Projects",
      description: "Ducting, kitchen exhaust and cooling jobs by IRASCO across Ratlam and Indore.",
    },
    about: {
      title: "About",
      description: "IRASCO is a ducting and ventilation contractor in Sajjan Mill, Ratlam, working since 2017.",
    },
    contact: {
      title: "Contact",
      description: "WhatsApp or call IRASCO on +91 96308 59889, or visit us at Sajjan Mill, Ratlam.",
    },
    privacy: {
      title: "Privacy",
      description: "How IRASCO handles the details you send through this website.",
    },
    notFound: {
      title: "Page not found",
    },
  },

  nav: {
    home: "Home",
    services: "Services",
    industries: "Industries",
    projects: "Projects",
    about: "About",
    contact: "Contact",
    whatsapp: "WhatsApp",
    call: "Call",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
    skip: "Skip to content",
    primary: "Main",
  },

  common: {
    since: "Since 2017",
    googleRating: "on Google",
    justdialRating: "on JustDial",
    reviews: "reviews",
    ratings: "ratings",
    whatsappUs: "WhatsApp us",
    callUs: "Call",
    emailUs: "Email",
    directions: "Get directions",
    allServices: "All services",
    viewService: "View service",
    readMore: "Read more",
    englishOnly: "",
    sourcesChecked: "Ratings checked on 11 Oct 2026.",
    location: "Sajjan Mill, Ratlam",
  },

  home: {
    hero: {
      eyebrow: "Ducting & ventilation · Ratlam · Since 2017",
      title: "Air, engineered in Ratlam.",
      lead: "We fabricate ducts, kitchen hoods and cooling systems in our own workshop, then install them across Ratlam, Indore and nearby cities.",
      figure: "600 × 300 GI duct · 45° offset · air moves fastest at the centre",
    },
    story: {
      label: "Follow the air through a building",
      note: "3D illustration of a typical install",
      cue: "Scroll to follow the air",
      rail: { terrace: "Terrace", cooler: "Cooler", duct: "Duct", room: "Room" },
      cooler: {
        eyebrow: "Evaporative cooling",
        title: "Hot air in. Cool air out.",
        body: "Outside air is pulled through wet honeycomb pads. The water takes the heat, and the fan pushes cooled air into the duct.",
        alt: "3D illustration: a roof-mounted evaporative cooler shown see-through, with its pads, fan and water tank.",
      },
      duct: {
        eyebrow: "Ducting and fabrication",
        title: "Every metre made to measure.",
        body: "We cut, fold and seam GI sheet in our own workshop in Ratlam, then join it flange to flange on site.",
        alt: "3D illustration: the inside of a galvanized duct with flanged joints, air moving along it.",
      },
      room: {
        eyebrow: "Cooling and kitchen exhaust",
        title: "Fresh air in. Smoke and heat out.",
        body: "Cooled air drops over the tables from the duct above. At the far end, a stainless hood pulls cooking smoke up and out through the roof.",
        alt: "3D illustration: a restaurant with an exposed supply duct over the tables and a stainless hood over the kitchen range.",
      },
    },
    manifesto: "Every kitchen, factory and office breathes through something. We build it.",
    services: {
      eyebrow: "What we build",
      title: "Six ways air moves through a building",
      lead: "From a single AC service to a full factory cooling system. Most of it is fabricated in-house.",
    },
    workshop: {
      eyebrow: "Made in Sajjan Mill",
      title: "Our ducts start as flat sheet",
      body: "We measure your site, then cut, fold and seam GI or stainless sheet to fit it. Parts are made for your building, so they go up quickly and seal properly.",
      steps: ["Sheet", "Cut", "Fold", "Seam", "Flange", "Insulate"],
      alt: "3D illustration: a flat galvanized sheet is cut, folded into a rectangular duct, seamed, fitted with flanges and wrapped in foil insulation.",
    },
    process: {
      eyebrow: "How a job runs",
      title: "From first call to running air",
      steps: [
        { title: "Free site survey", body: "We visit, measure and understand what the space needs." },
        { title: "Design & quote", body: "A clear quotation with the layout and equipment." },
        { title: "Fabrication", body: "Ducts and hoods made in our workshop to your measurements." },
        { title: "Installation", body: "Our own team installs, tests and hands over." },
        { title: "Service", body: "Cleaning, repairs and gas charging when you need them." },
      ],
    },
    reviews: {
      eyebrow: "Reviews",
      title: "What customers say",
    },
    outlet: {
      title: "Tell us about your space.",
      body: "Send a photo or the size of the area on WhatsApp. We'll tell you what it needs and arrange a site visit.",
      form: "Send an enquiry",
    },
  },

  services: {
    eyebrow: "Services",
    title: "Ducting, exhaust, cooling and ventilation",
    lead: "Six services, one team. Pick the closest match, or tell us what you're dealing with and we'll suggest the right setup.",
    includes: "What's included",
    usedIn: "Where it's used",
    figureNote: "Published figure",
    otherServices: "Other services",
    ctaTitle: "Get a quote for this",
    ctaBody: "Message us with your location and a photo of the space. We usually suggest a site visit before quoting.",
    hood: {
      eyebrow: "See it work",
      title: "What the hood does",
      body: "A hood only clears a kitchen when the fan and the duct pull enough air through it. Switch the fan on and watch where the smoke goes.",
      fan: "Exhaust fan",
      on: "On",
      off: "Off",
      meter: "Smoke in the room",
      caption: "Drawing, not to scale",
    },
  },

  industries: {
    eyebrow: "Industries",
    title: "Who we work for",
    lead: "The same team handles a restaurant hood, a factory cooling system and a home AC service.",
    relevant: "Relevant services",
  },

  projects: {
    eyebrow: "Projects",
    title: "Work on site",
    lead: "Write-ups of recent jobs are on the way. Until then, IRASCO's photos from real sites are on Google and JustDial.",
    googlePhotos: "photos on Google",
    justdialPhotos: "photos on JustDial",
  },

  about: {
    eyebrow: "About",
    title: "A ducting contractor that makes its own ducts",
    body: [
      "IRASCO is a ducting and ventilation contractor based at Shri Sajjan Mills, Sailana Road, Ratlam. Since 2017 we have fabricated and installed ducting, kitchen exhaust, cooling and ventilation for restaurants, hospitals, factories, shops and homes.",
      "We are a small team. Customers mention the same things in their reviews: the owner comes to the site, the fitting is precise, and the quotation is easy to understand.",
    ],
    factsTitle: "At a glance",
    facts: {
      founded: "Founded",
      base: "Workshop",
      area: "Working in",
      ratings: "Ratings",
    },
    valuesTitle: "What customers notice",
    values: [
      { title: "Owner on site", body: "The person who quotes the job comes to see it." },
      { title: "Precise fitting", body: "Ducts made to measure, so joints line up and seal." },
      { title: "Clear quotes", body: "A quotation you can read without calling us to explain it." },
      { title: "Made in-house", body: "Fabrication in our own workshop at Sajjan Mill." },
    ],
  },

  contact: {
    eyebrow: "Contact",
    title: "Talk to IRASCO",
    lead: "WhatsApp is the fastest way to reach us. Send a photo of the space and your location.",
    whatsappTitle: "WhatsApp",
    whatsappBody: "Photos, sizes and site location, all in one chat.",
    callTitle: "Call",
    emailTitle: "Email",
    visitTitle: "Visit",
    hoursTitle: "Hours",
    hoursValue: "Monday to Saturday, from 9 am. Closed Sunday.",
    formTitle: "Send an enquiry",
    formLead: "We'll call you back on the number you give.",
    fields: {
      name: "Your name",
      phone: "Phone number",
      city: "City",
      service: "What do you need?",
      servicePlaceholder: "Choose a service",
      serviceOther: "Something else",
      message: "Tell us about the space",
      messagePlaceholder: "Size of the area, type of business, anything you've already tried.",
    },
    send: "Send enquiry",
    sending: "Sending…",
    sendWhatsapp: "Send on WhatsApp instead",
    success: "Thanks. Your enquiry reached IRASCO. Expect a call on",
    errors: {
      name: "Enter your name.",
      phone: "Enter a 10-digit mobile number.",
      notConfigured: "The online form isn't connected yet. Send the same message on WhatsApp and it reaches us right away.",
      failed: "That didn't go through. Check your connection and try again, or send it on WhatsApp.",
    },
  },

  footer: {
    blurb: "Ducting & ventilation work. Fabricated in Ratlam since 2017.",
    explore: "Explore",
    reach: "Reach us",
    follow: "Follow",
    privacy: "Privacy",
    rights: "All rights reserved.",
  },

  notFound: {
    title: "This duct goes nowhere.",
    body: "The page you were looking for has moved or never existed.",
    home: "Back to home",
  },
};

export type Dictionary = typeof en;
