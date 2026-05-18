import { createPageMetadata } from "../../lib/seo";

export const metadata = createPageMetadata({
  title:
    "Neurofeedback pentru somn, anxietate, ADHD și concentrare | Cluj",
  description:
    "Neurofeedback și antrenament cerebral în Cluj-Napoca pentru somn, anxietate, ADHD, stres și concentrare. Informații orientative, cu evaluare EEG și abordare prudentă.",
  path: "/conditions",
});

export default function AfectiuniLayout({ children }) {
  return children;
}
