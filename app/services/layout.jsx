import { createPageMetadata } from "../../lib/seo";

export const metadata = createPageMetadata({
  title:
    "Servicii brainmapping EEG, neurofeedback NeurOptimal® și iSyncMe la Cluj",
  description:
    "Ce include: brainmapping EEG, neurofeedback, terapie cu casca iSyncMe® și plan personalizat la Cluj-Napoca. Află pașii, indicațiile și cum te putem ajuta la Synaptica Cluj.",
  path: "/services",
});

export default function ServiciiLayout({ children }) {
  return children;
}
