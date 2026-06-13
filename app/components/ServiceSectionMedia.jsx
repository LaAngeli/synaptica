import { getServiceImageSrc } from "../../lib/service-images";

const RIGHT_MASK =
  "linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.08)_8%,rgba(0,0,0,0.28)_18%,rgba(0,0,0,0.55)_30%,rgba(0,0,0,0.82)_42%,black_52%,black_100%)";

const LEFT_MASK =
  "linear-gradient(to_right,black_0%,black_48%,rgba(0,0,0,0.82)_58%,rgba(0,0,0,0.55)_70%,rgba(0,0,0,0.28)_82%,rgba(0,0,0,0.08)_92%,transparent_100%)";

/**
 * Responsive service imagery — clean on mobile, blended into section bg on desktop.
 * @param {"mobile" | "desktop"} variant
 * @param {"left" | "right"} position — desktop blend edge (inner side toward text)
 */
export default function ServiceSectionMedia({
  variant,
  position = "right",
  size = "default",
  basePath,
  alt,
  width,
  height,
}) {
  const src480 = getServiceImageSrc(basePath, 480);
  const src768 = getServiceImageSrc(basePath, 768);
  const src1024 = getServiceImageSrc(basePath, 1024);
  const maxHeightClass =
    size === "compact"
      ? "max-h-[min(56vh,26rem)] lg:max-h-[min(52vh,24rem)]"
      : "max-h-[min(68vh,32rem)]";

  if (variant === "mobile") {
    return (
      <div className="relative mx-auto w-full max-w-[16rem] sm:max-w-xs lg:hidden">
        <picture className="block w-full">
          <source media="(max-width: 640px)" srcSet={src480} type="image/webp" />
          <img
            src={src768}
            alt={alt}
            width={768}
            height={Math.round((768 / width) * height)}
            loading="lazy"
            decoding="async"
            className="mx-auto h-auto w-full rounded-2xl object-contain"
          />
        </picture>
      </div>
    );
  }

  const mask = position === "right" ? RIGHT_MASK : LEFT_MASK;
  const objectPosition = position === "right" ? "object-right" : "object-left";
  const overlayClass =
    position === "right"
      ? "absolute inset-y-0 left-0 w-[46%] bg-gradient-to-r from-white/95 from-0% via-white/85 via-35% to-transparent to-100%"
      : "absolute inset-y-0 right-0 w-[46%] bg-gradient-to-l from-white/95 from-0% via-white/85 via-35% to-transparent to-100%";

  return (
    <div
      className={`relative hidden min-h-0 lg:block lg:max-w-none ${
        position === "right" ? "lg:justify-self-end" : "lg:justify-self-start"
      }`}
    >
      <div
        className={`relative overflow-hidden rounded-[1.75rem] ${maxHeightClass} lg:[mask-image:var(--service-mask)] lg:[-webkit-mask-image:var(--service-mask)]`}
        style={{ "--service-mask": mask }}
      >
        <picture className="block h-full w-full">
          <source media="(max-width: 1280px)" srcSet={src768} type="image/webp" />
          <img
            src={src1024}
            alt={alt}
            width={1024}
            height={Math.round((1024 / width) * height)}
            loading="lazy"
            decoding="async"
            className={`h-auto w-full object-contain ${maxHeightClass} ${objectPosition}`}
          />
        </picture>
        <div className={`pointer-events-none ${overlayClass}`} aria-hidden />
      </div>
    </div>
  );
}
