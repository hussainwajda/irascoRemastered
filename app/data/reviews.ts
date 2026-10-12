/**
 * Customer reviews, quoted exactly as posted. Each one was read on its source
 * listing on 11 Oct 2026. Add new ones the same way: copy the text verbatim,
 * keep the reviewer's name as shown, and link the source.
 */
export interface Review {
  author: string;
  source: "Google" | "JustDial";
  /** ISO date when the listing shows one; Google only shows relative dates. */
  date?: string;
  topic: string;
  text: string;
}

export const reviews: Review[] = [
  {
    author: "Ajay Singh Shekhawat",
    source: "Google",
    topic: "Ducting",
    text: "Their ducting service is absolutely top-notch. 👌 The professionalism is clearly visible — from the quality of materials to the precision in fitting, everything was done perfectly. The team is skilled, polite, and very cooperative.",
  },
  {
    author: "Abbas Dhinojwala",
    source: "Google",
    topic: "Restaurant ducting, Indore",
    text: "They made the ducting for our restaurant in Indore. Really good work with precision and timely follow up. The owner himself visits the site and discussed what we were expecting and gave us ideas as well. Recommended for people in Indore and nearby cities.",
  },
  {
    author: "Kutubuddin Bootwala",
    source: "JustDial",
    date: "2020-04-25",
    topic: "Turbine ventilator, Ratlam",
    text: "I need turbine ventilator for my new house in ratlam, i contact irasco n they provide very good service. the owner himself is very positive n hard working. I recommend Irasco.",
  },
  {
    author: "Sakina Kalabhai",
    source: "JustDial",
    date: "2020-05-04",
    topic: "Servicing",
    text: "Excellent service. earlier we had called other persons for servicing but no one had done this work like he did neatly and perfectly.",
  },
  {
    author: "Pragati Hotwani",
    source: "Google",
    topic: "Quality",
    text: "Great Service, with excellent quality. Thank you for such fine work",
  },
];
