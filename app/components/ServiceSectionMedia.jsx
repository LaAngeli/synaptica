import { getServiceImageSrc } from "../../lib/service-images";

const RIGHT_MASK =
  "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.03) 12%, rgba(0,0,0,0.14) 23%, rgba(0,0,0,0.34) 33%, rgba(0,0,0,0.6) 43%, rgba(0,0,0,0.84) 52%, black 60%, black 100%)";

const LEFT_MASK =
  "linear-gradient(to right, black 0%, black 40%, rgba(0,0,0,0.84) 48%, rgba(0,0,0,0.6) 57%, rgba(0,0,0,0.34) 67%, rgba(0,0,0,0.14) 77%, rgba(0,0,0,0.03) 88%, transparent 100%)";

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
  const roundedClass =
    position === "right"
      ? "rounded-tr-[1.75rem] rounded-br-[1.75rem]"
      : "rounded-tl-[1.75rem] rounded-bl-[1.75rem]";

  return (
    <div
      className={`relative hidden min-h-0 lg:block lg:max-w-none ${
        position === "right" ? "lg:justify-self-end" : "lg:justify-self-start"
      }`}
    >
      <div
        className={`relative overflow-hidden ${roundedClass} ${maxHeightClass} lg:[mask-image:var(--service-mask)] lg:[-webkit-mask-image:var(--service-mask)]`}
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
            className={`h-auto w-full object-cover ${maxHeightClass}`}
          />
        </picture>
      </div>
    </div>
  );
}
