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
  const lightImageRef = useRef<HTMLImageElement>(null);
  const darkImageRef = useRef<HTMLImageElement>(null);

  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (imageRef?.current) {
      setHeight(imageRef.current.getBoundingClientRect().height);
      setWidth(imageRef.current.getBoundingClientRect().width);
    } else {
      // display: none still renders the HTML, and returns 0 for both height and width
      setHeight(
        Math.max(
          lightImageRef.current.getBoundingClientRect().height,
          darkImageRef.current.getBoundingClientRect().height
        )
      );
      setWidth(
        Math.max(
          lightImageRef.current.getBoundingClientRect().width,
          darkImageRef.current.getBoundingClientRect().width
        )
      );
    }
  }, [setHeight, setWidth]);

  const isTall = height > MAX_IMAGE_HEIGHT_WITHOUT_OVERFLOW;

  const createTVConfig = (bottomGradient, topGradient) => {
    return {
      base: `nx-aspect-video nx-overflow-hidden nx-nx-mt-8 lg:nx-rounded-3xl nx-rounded-xl nx-bg-[#EAE7E7${bottomGradient}] nx-bg-gradient-to-t nx-from-[#EAE7E7${topGradient}] nx-mb-8 lg:nx-px-14`,
      variants: {
        isTall: {
          false: "nx-flex nx-justify-center nx-items-center",
        },
      },
    };
  };

  const darkImageFrame = tv(createTVConfig("14", "0D"));
  const lightImageFrame = tv(createTVConfig("00", "80"));

  const imageSelf = tv({
    base: "nx-w-full max-h-96 h-full nx-shadow-sm",
    variants: {
      isTall: {
        true: "nx-border nx-border-grey20",
        false: "nx-rounded-2xl",
      },
      isAnnouncement: {
        true: "lg:nx-rounded-3xl nx-rounded-xl nx-mb-8 nx-bg-transparent nx-border-0",
      },
    },
  });

  const ImageComponent = () => (
    <Image
      ref={imageRef}
      src={props.src}
      height={height}
      width={width}
      className={imageSelf({ isTall: isTall, isAnnouncement: isAnnouncement })}
      alt={alt}
    />
  );

  return isAnnouncement ? (
    <ImageComponent />
  ) : (
    <>
      <div className={`lightImageFrame ` + lightImageFrame({ isTall: isTall })}>
        <ImageComponent />
      </div>

      <div className={`darkImageFrame ` + darkImageFrame({ isTall: isTall })}>
        <ImageComponent />
      </div>
    </>
  );
}
