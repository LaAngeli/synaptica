import { createPageMetadata } from "../../lib/seo";

export const metadata = createPageMetadata({
  title:
    "FAQ neurofeedback și brainmapping Cluj - întrebări frecvente despre evaluare și programări",
  description:
    "Întrebări frecvente despre brainmapping EEG, neurofeedback, număr de ședințe, programări și localizarea clinicii Synaptica Cluj. Răspunsuri clare pentru decizii informate.",
  path: "/faq",
});

export default function FaqLayout({ children }) {
  return children;
}
