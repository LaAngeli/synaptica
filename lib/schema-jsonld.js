import { businessContact } from "./businessContact";
import { SITE_NAME, SITE_URL, rootMetadataBase } from "./seo";

const CLINIC_ID = `${SITE_URL}/#clinic`;

/** Obiect unic JSON-LD (@graph): WebSite + MedicalClinic cu telefon, email, adresă, sameAs. */
export function buildSiteJsonLd() {
  const description = rootMetadataBase.description;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: SITE_URL,
        description,
        inLanguage: ["ro", "en"],
        publisher: { "@id": CLINIC_ID },
        hasPart: [
          { "@type": "SiteNavigationElement", name: "Home", url: `${SITE_URL}/` },
          { "@type": "SiteNavigationElement", name: "Servicii", url: `${SITE_URL}/services` },
          { "@type": "SiteNavigationElement", name: "Prețuri", url: `${SITE_URL}/pricing` },
          { "@type": "SiteNavigationElement", name: "Afecțiuni", url: `${SITE_URL}/conditions` },
          { "@type": "SiteNavigationElement", name: "Contact", url: `${SITE_URL}/contact` },
        ],
      },
      {
        "@type": "MedicalClinic",
        "@id": CLINIC_ID,
        name: SITE_NAME,
        url: SITE_URL,
        description,
        telephone: businessContact.telephoneE164,
        email: businessContact.email,
        address: businessContact.postalAddress,
        sameAs: businessContact.sameAs,
      },
    ],
  };
}
