import NotFoundContent from "./components/NotFoundContent";
import { buildSeoTitle, DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "../lib/seo";

const NOT_FOUND_SEGMENT = "Eroare 404 – pagina cerută nu există";

export const metadata = {
  title: { absolute: buildSeoTitle(NOT_FOUND_SEGMENT) },
  description:
    "URL-ul accesat nu se regăsește pe synaptica-cluj.ro. Folosește meniul sau revino la pagina principală pentru brainmapping și neurofeedback la Cluj.",
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "ro_RO",
    url: SITE_URL,
    title: buildSeoTitle(NOT_FOUND_SEGMENT),
    description:
      "URL-ul accesat nu se regăsește pe synaptica-cluj.ro. Folosește meniul sau revino la pagina principală pentru brainmapping și neurofeedback la Cluj.",
    images: [{ url: DEFAULT_OG_IMAGE, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: buildSeoTitle(NOT_FOUND_SEGMENT),
    description:
      "URL-ul accesat nu se regăsește pe synaptica-cluj.ro. Folosește meniul sau revino la pagina principală pentru brainmapping și neurofeedback la Cluj.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function NotFound() {
  return <NotFoundContent />;
}
