import type { NextConfig } from "next";

/**
 * Old URLs that are still linked from Google, JustDial and the 2023 site.
 * The Vite build used /services/<old-slug>; the Netlify site used
 * /product_webpages/<page>. Each one lands on its closest new service page.
 */
const legacyRedirects: Record<string, string> = {
  "/services/commercial-air-conditioning": "/services/air-conditioning",
  "/services/commercial-air-coolers": "/services/evaporative-cooling",
  "/services/ductwork-ventilation": "/services/ducting-fabrication",
  "/services/kitchen-chimney-systems": "/services/kitchen-exhaust",
  "/product_webpages/aircooling": "/services/evaporative-cooling",
  "/product_webpages/commercial_chimney": "/services/kitchen-exhaust",
  "/product_webpages/airconditioning": "/services/air-conditioning",
};

const nextConfig: NextConfig = {
  // Film frames live under a versioned folder (see app/components/story/chapters.ts).
  async headers() {
    return [
      {
        source: "/story/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
  async redirects() {
    return Object.entries(legacyRedirects).map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
