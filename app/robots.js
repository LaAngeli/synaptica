import { SITE_URL } from "../lib/seo";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Resurse de build (JS/CSS/fonturi cu hash) — nu sunt pagini; hash-ul se schimbă la deploy.
        disallow: "/_next/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
