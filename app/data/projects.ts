import type { ServiceSlug } from "./services";

/**
 * Case studies. Empty until the owner supplies real jobs: venue (or a
 * description if the client prefers not to be named), city, year, scope and
 * photos taken on site. The projects page shows a link-out to IRASCO's
 * Google and JustDial photos while this list is empty.
 */
export interface Project {
  slug: string;
  title: string;
  city: string;
  year: number;
  services: ServiceSlug[];
  scope: string;
  /** Paths under /public/projects/<slug>/. */
  photos: { src: string; alt: string; width: number; height: number }[];
  /** Only with the client's written permission. */
  clientName?: string;
}

export const projects: Project[] = [];
