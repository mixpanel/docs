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
    if (isAnnouncement) {
      setHeight(imageRef.current.getBoundingClientRect().height);
      setWidth(imageRef.current.getBoundingClientRect().width);
    } else {
      // display: none still renders the HTML, and returns 0 for both height and width
      setHeight(
        Math.max(
          lightImageRef.current?.getBoundingClientRect().height,
          darkImageRef.current?.getBoundingClientRect().height
        )
      );
      setWidth(
        Math.max(
          lightImageRef?.current?.getBoundingClientRect().width,
          darkImageRef?.current?.getBoundingClientRect().width
        )
      );
    }
  }, [setHeight, setWidth]);

  const isTall = height > MAX_IMAGE_HEIGHT_WITHOUT_OVERFLOW;

  const createTVConfig = (is_light = true) => {
    const lightBase = `nx-aspect-video nx-overflow-hidden nx-nx-mt-8 lg:nx-rounded-3xl nx-rounded-xl nx-mb-8 nx-px-8 sm:nx-px-10 md:nx-px-10 lg:nx-px-14 nx-bg-gradient-to-t nx-from-grey20-opacity-100 nx-to-grey20-opacity-50`;
    const darkBase = `nx-aspect-video nx-overflow-hidden nx-nx-mt-8 lg:nx-rounded-3xl nx-rounded-xl nx-mb-8 nx-px-8 sm:nx-px-10 md:nx-px-10 lg:nx-px-14 nx-bg-gradient-to-t nx-from-grey20-opacity-8 nx-to-grey20-opacity-5`;
    return {
      base: is_light ? lightBase : darkBase,
      variants: {
        isTall: {
          false: "nx-flex nx-justify-center nx-items-center",
        },
      },
    };
  };

  const darkImageFrame = tv(createTVConfig(false));
  const lightImageFrame = tv(createTVConfig(true));

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

  const renderImageComponent = (refInstance) => (
    <Image
      ref={refInstance}
      src={props.src}
      height={height}
      width={width}
      className={imageSelf({ isTall: isTall, isAnnouncement: isAnnouncement })}
      alt={alt}
    />
  );

  return isAnnouncement ? (
    <>{renderImageComponent(imageRef)}</>
  ) : (
    <>
      <div className={`lightImageFrame ` + lightImageFrame({ isTall: isTall })}>
        {renderImageComponent(lightImageRef)}
      </div>

      <div className={`darkImageFrame ` + darkImageFrame({ isTall: isTall })}>
        {renderImageComponent(darkImageRef)}
      </div>
    </>
  );
}
