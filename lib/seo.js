/** Site origin — folosit pentru metadataBase, canonical absolut și Open Graph. */
export const SITE_URL = "https://synaptica-cluj.ro";

export const SITE_NAME = "Synaptica Cluj";

/** Imagine implicită pentru og:image / Twitter (fișier din /public). */
export const DEFAULT_OG_IMAGE = "/synaptica_logo.png";

const OG_LOCALE = "ro_RO";

/**
 * Structură unică pentru titlurile indexabile:
 * «[segment: cuvinte cheie + intenție / locație unde e cazul]» + « | Synaptica Cluj »
 *
 * În `app/layout.jsx`, `title.template` trebuie să fie `%s${SEO_TITLE_SUFFIX}`.
 * Pentru Open Graph / Twitter trimitem mereu titlul complet (Next nu aplică șablonul acolo).
 */
export const SEO_TITLE_SUFFIX = " | Synaptica Cluj";

/** Segment folosit pentru homepage și fallback `title.default` în layout. */
export const SEO_HOME_TITLE_SEGMENT =
  "Brainmapping EEG și neurofeedback la Cluj-Napoca";

/** @param {string} segment — doar partea dinaintea sufixului de brand */
export function buildSeoTitle(segment) {
  return `${segment}${SEO_TITLE_SUFFIX}`;
}

/**
 * Construiește obiect Metadata Next.js: titlu, descriere, canonical, Open Graph, Twitter.
 *
 * @param {object} opts
 * @param {string} opts.title — segment SEO (fără « | Synaptica Cluj »), cu excepția cazului titleAbsolute
 * @param {string} opts.description
 * @param {string} opts.path — cale relativă, ex. `/`, `/services`
 * @param {string} [opts.ogImage]
 * @param {"website" | "article"} [opts.ogType]
 * @param {boolean} [opts.titleAbsolute] — titlu HTML/ social complet, fără șablon (ex. 404)
 * @returns {import("next").Metadata}
 */
export function createPageMetadata({
  title,
  description,
  path,
  ogImage,
  ogType = "website",
  titleAbsolute = false,
}) {
  const pathname =
    path === "" || path === "/"
      ? "/"
      : path.startsWith("/")
        ? path
        : `/${path}`;

  const pageUrl = `${SITE_URL}${pathname === "/" ? "/" : pathname}`;
  const imagePath = ogImage || DEFAULT_OG_IMAGE;
  const resolvedTitle = titleAbsolute ? title : buildSeoTitle(title);

  return {
    title: titleAbsolute ? { absolute: title } : title,
    description,
    alternates: {
      canonical: pathname,
    },
    openGraph: {
      type: ogType,
      url: pageUrl,
      title: resolvedTitle,
      description,
      siteName: SITE_NAME,
      locale: OG_LOCALE,
      images: [{ url: imagePath, alt: resolvedTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      images: [imagePath],
    },
  };
}

/** Metadata comună pentru `app/layout.jsx` (fără canonical specific paginii). */
export const rootMetadataBase = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: buildSeoTitle(SEO_HOME_TITLE_SEGMENT),
    template: `%s${SEO_TITLE_SUFFIX}`,
  },
  description:
    "Cluj-Napoca: brainmapping EEG, neurofeedback NeurOptimal® și protocoale personalizate pentru somn, anxietate, concentrare și echilibru cognitiv la Synaptica Cluj.",
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: OG_LOCALE,
    url: SITE_URL,
    title: buildSeoTitle(SEO_HOME_TITLE_SEGMENT),
    description:
      "Cluj-Napoca: brainmapping EEG, neurofeedback NeurOptimal® și protocoale personalizate pentru somn, anxietate, concentrare și echilibru cognitiv la Synaptica Cluj.",
    images: [{ url: DEFAULT_OG_IMAGE, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: buildSeoTitle(SEO_HOME_TITLE_SEGMENT),
    description:
      "Cluj-Napoca: brainmapping EEG, neurofeedback NeurOptimal® și protocoale personalizate pentru somn, anxietate, concentrare și echilibru cognitiv la Synaptica Cluj.",
    images: [DEFAULT_OG_IMAGE],
  },
};
