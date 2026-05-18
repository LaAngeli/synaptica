/**
 * Date NAP + profile sociale pentru JSON-LD (și aliniere cu app/i18n/translations.js → contact).
 * La schimbarea detaliilor în site, actualizează și aici.
 */
export const businessContact = {
  /** E.164 — recomandat pentru schema.org / tel: */
  telephoneE164: "+40755062039",
  email: "contact@synaptica-cluj.ro",
  hasMap:
    "https://www.google.com/maps/search/?api=1&query=Str.%20Robert%20Koch%20Nr.%207%2C%20Cluj-Napoca%20400347",
  geoCoordinates: {
    "@type": "GeoCoordinates",
    latitude: 46.75627397112452,
    longitude: 23.579772277409482,
  },
  postalAddress: {
    "@type": "PostalAddress",
    streetAddress: "Str. Robert Koch Nr. 7",
    addressLocality: "Cluj-Napoca",
    postalCode: "400347",
    addressCountry: "RO",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "https://schema.org/Monday",
        "https://schema.org/Tuesday",
        "https://schema.org/Wednesday",
        "https://schema.org/Thursday",
        "https://schema.org/Friday",
      ],
      opens: "10:00",
      closes: "18:00",
    },
  ],
  areaServed: [
    { "@type": "City", name: "Cluj-Napoca" },
    { "@type": "AdministrativeArea", name: "Cluj County" },
    { "@type": "Country", name: "Romania" },
  ],
  priceRange: "300 RON - 7500 RON",
  sameAs: [
    "https://www.instagram.com/synapticacluj/",
    "https://www.facebook.com/synapticacluj/",
    "https://www.tiktok.com/@synapticacluj",
  ],
};
