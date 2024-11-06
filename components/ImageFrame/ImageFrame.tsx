import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
// https://www.tailwind-variants.org/docs
import { tv } from "tailwind-variants";

type ImageFrameProps = {
  src: string;
  alt?: string;
  isAnnouncement?: boolean;
};

const MAX_IMAGE_HEIGHT_WITHOUT_OVERFLOW = 400;

export default function ImageFrame({
  alt = "Thumbnail of screenshot",
  isAnnouncement = false,
  ...props
}: ImageFrameProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (imageRef.current) {
      setHeight(imageRef.current.getBoundingClientRect().height);
      setWidth(imageRef.current.getBoundingClientRect().width);
    }
  }, []);

  const isTall = height > MAX_IMAGE_HEIGHT_WITHOUT_OVERFLOW;

  const imageFrame = tv({
    base: "nx-aspect-video nx-overflow-hidden nx-nx-mt-8 lg:nx-rounded-3xl nx-rounded-xl nx-bg-[#EAE7E714] nx-bg-gradient-to-t nx-from-[#EAE7E70D] nx-mb-8 lg:nx-px-14",
    variants: {
      isTall: {
        false: "nx-flex nx-justify-center nx-items-center",
      },
    },
  });

  const imageSelf = tv({
    base: "nx-w-full max-h-96 h-full nx-shadow-sm",
    variants: {
      isTall: {
        true: "nx-border nx-border-grey20",
        false: "nx-rounded-2xl",
      },
      isAnnouncement: {
        true: "lg:nx-rounded-3xl nx-rounded-xl nx-mb-8",
      },
    },
  });

  return isAnnouncement ? (
    <Image
      ref={imageRef}
      src={props.src}
      height={height}
      width={width}
      className={imageSelf({ isTall: isTall, isAnnouncement: isAnnouncement })}
      alt={alt}
    />
  ) : (
    <div className={imageFrame({ isTall: isTall })}>
      <Image
        ref={imageRef}
        src={props.src}
        height={height}
        width={width}
        className={imageSelf({
          isTall: isTall,
          isAnnouncement: isAnnouncement,
        })}
        alt={alt}
      />
    </div>
  );
}
