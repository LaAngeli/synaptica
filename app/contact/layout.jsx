import { createPageMetadata } from "../../lib/seo";

export const metadata = createPageMetadata({
  title:
    "Contact și programări clinică neurofeedback brainmapping Cluj-Napoca",
  description:
    "Adresă, telefon, e-mail și formular de mesaj pentru programări la Synaptica Cluj. Solicită o consultație pentru brainmapping sau neurofeedback în Cluj-Napoca.",
  path: "/contact",
});

export default function ContactLayout({ children }) {
  return children;
}
