import { createPageMetadata } from "../../lib/seo";

export const metadata = createPageMetadata({
  title:
    "Termeni și condiții utilizare site web și servicii clinice la Cluj",
  description:
    "Condițiile de utilizare a platformei synaptica-cluj.ro și a serviciilor (brainmapping, neurofeedback): obligații, proprietate intelectuală, limitări de răspundere și lege aplicabilă în România.",
  path: "/terms-and-conditions",
});

export default function TermsLayout({ children }) {
  return children;
}
