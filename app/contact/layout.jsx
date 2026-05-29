import { createPageMetadata } from "../../lib/seo";

export const metadata = createPageMetadata({
  title:
    "Contact și programări neurofeedback în Cluj-Napoca",
  description:
    "Contactează Synaptica Cluj pentru programări la brainmapping EEG, neurofeedback și antrenament cerebral. Ne găsești pe Str. Robert Koch Nr. 7, Cluj-Napoca.",
  path: "/contact",
});

export default function ContactLayout({ children }) {
  return children;
}
