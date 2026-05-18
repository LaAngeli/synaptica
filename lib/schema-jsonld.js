import { businessContact } from "./businessContact";
import { SITE_NAME, SITE_URL, rootMetadataBase } from "./seo";

const CLINIC_ID = `${SITE_URL}/#clinic`;

/** Obiect unic JSON-LD (@graph): WebSite + MedicalClinic cu NAP + semnale GEO locale. */
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
          { "@type": "SiteNavigationElement", name: "FAQ", url: `${SITE_URL}/faq` },
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
        hasMap: businessContact.hasMap,
        geo: businessContact.geoCoordinates,
        address: businessContact.postalAddress,
        openingHoursSpecification: businessContact.openingHoursSpecification,
        areaServed: businessContact.areaServed,
        priceRange: businessContact.priceRange,
        sameAs: businessContact.sameAs,
      },
    ],
  };
}
