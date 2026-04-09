import { createPageMetadata } from "../../lib/seo";

export const metadata = createPageMetadata({
  title:
    "Afecțiuni și simptome abordate prin neurofeedback și brainmapping Cluj",
  description:
    "Context clinic pentru tulburări de somn, anxietate, ADHD, demență și alte tipare abordate cu evaluare EEG și neurofeedback la Cluj. Informații orientative, fără a înlocui consultul medical.",
  path: "/conditions",
});

export default function AfectiuniLayout({ children }) {
  return children;
}
