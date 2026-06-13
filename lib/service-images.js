/**
 * Asset paths and dimensions for service section imagery.
 * Alt text lives in translations (`services.sections[].imageAlt`).
 */
export const SERVICE_IMAGE_ASSETS = {
  isync: {
    basePath: "/images/services/synaptica-isyncme-helmet",
    width: 682,
    height: 1024,
    position: "right",
  },
  neuro: {
    basePath: "/images/services/synaptica-neurooptimal-session",
    width: 768,
    height: 1024,
    position: "right",
  },
  bowen: {
    basePath: "/images/services/synaptica-bowen-session",
    width: 682,
    height: 1024,
    position: "right",
  },
  rejuvance: {
    basePath: "/images/services/synaptica-rejuvance-session",
    width: 682,
    height: 1024,
    position: "right",
  },
};

/** Secondary imagery for the “What the service includes” block. */
export const SERVICE_INCLUDES_IMAGE_ASSETS = {
  isync: {
    basePath: "/images/services/synaptica-isyncme-sensors",
    width: 768,
    height: 1024,
    position: "left",
  },
  neuro: {
    basePath: "/images/services/synaptica-neurooptimal-zamp",
    width: 768,
    height: 1024,
    position: "left",
  },
  bowen: {
    basePath: "/images/services/synaptica-bowen-technique",
    width: 682,
    height: 1024,
    position: "left",
  },
  rejuvance: {
    basePath: "/images/services/synaptica-rejuvance-technique",
    width: 683,
    height: 1024,
    position: "left",
  },
};

export function getServiceImageSrc(basePath, width) {
  return `${basePath}-${width}.webp`;
}

/** Default desktop placement: alternate right / left for visual rhythm. */
export function defaultServiceImagePosition(index) {
  return index % 2 === 0 ? "right" : "left";
}
