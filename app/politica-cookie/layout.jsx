import { createPageMetadata } from "../../lib/seo";

export const metadata = createPageMetadata({
  title:
    "Politica cookie – funcționalitate, analiză trafic și preferințe browser",
  description:
    "Tipurile de cookie folosite pe synaptica-cluj.ro, scopul lor (esențiale, performanță, preferințe) și cum le poți controla din setările browserului, în conformitate cu practicile site-ului.",
  path: "/politica-cookie",
});

export default function PoliticaCookieLayout({ children }) {
  return children;
}
