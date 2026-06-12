import { createPageMetadata } from "../../lib/seo";

export const metadata = createPageMetadata({
  title:
    "Servicii Cluj-Napoca: neurofeedback, brainmapping EEG, Terapia Bowen și Rejuvance",
  description:
    "Servicii în Cluj-Napoca la Synaptica Cluj: neurofeedback NeurOptimal, brainmapping EEG, iSyncMe, Terapia Bowen și lifting facial natural Rejuvance, abordări non-invazive.",
  path: "/services",
});

export default function ServiciiLayout({ children }) {
  return children;
}
