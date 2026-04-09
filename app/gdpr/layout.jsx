import { createPageMetadata } from "../../lib/seo";

export const metadata = createPageMetadata({
  title:
    "Politica GDPR și protecția datelor personale pacienți – informare legală",
  description:
    "Cum prelucrăm datele cu caracter personal la Synaptica Cluj: temei legal, drepturile tale (acces, rectificare, ștergere), stocare și modalități de contact pentru întrebări GDPR.",
  path: "/gdpr",
});

export default function GdprLayout({ children }) {
  return children;
}
