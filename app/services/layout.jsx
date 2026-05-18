import { createPageMetadata } from "../../lib/seo";

export const metadata = createPageMetadata({
  title:
    "Servicii neurofeedback Cluj și brainmapping EEG | iSyncMe și NeurOptimal",
  description:
    "Servicii neurofeedback Cluj și brainmapping EEG în Cluj-Napoca: iSyncMe, NeurOptimal, evaluare activitate cerebrală și protocol personalizat, non-invaziv.",
  path: "/services",
});

export default function ServiciiLayout({ children }) {
  return children;
}
