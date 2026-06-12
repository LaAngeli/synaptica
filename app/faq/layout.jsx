import { createPageMetadata } from "../../lib/seo";

export const metadata = createPageMetadata({
  title:
    "FAQ Cluj-Napoca: neurofeedback, brainmapping, Terapia Bowen și Rejuvance",
  description:
    "Întrebări frecvente despre brainmapping EEG, neurofeedback, Terapia Bowen, Rejuvance, număr de ședințe, prețuri, programări și localizarea clinicii Synaptica Cluj.",
  path: "/faq",
});

export default function FaqLayout({ children }) {
  return children;
}
