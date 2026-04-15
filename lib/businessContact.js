/**
 * Date NAP + profile sociale pentru JSON-LD (și aliniere cu app/i18n/translations.js → contact).
 * La schimbarea detaliilor în site, actualizează și aici.
 */
export const businessContact = {
  /** E.164 — recomandat pentru schema.org / tel: */
  telephoneE164: "+40755062039",
  email: "contacts@synaptica-cluj.ro",
  postalAddress: {
    "@type": "PostalAddress",
    streetAddress: "Str. Robert Koch Nr. 7",
    addressLocality: "Cluj-Napoca",
    postalCode: "400347",
    addressCountry: "RO",
  },
  sameAs: [
    "https://www.instagram.com/synapticacluj/",
    "https://www.facebook.com/synapticacluj/",
    "https://www.tiktok.com/@synapticacluj",
  ],
};
