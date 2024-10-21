import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
// https://www.tailwind-variants.org/docs
import { tv } from "tailwind-variants";

type ImageFrameProps = {
  src: string;
  alt?: string;
};

export default function ImageFrame({
  alt = "Thumnail of screenshot",
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

  const isTall = height > 400;

  const imageFrame = tv({
    base: "nx-aspect-video nx-overflow-hidden nx-nx-mt-8 lg:nx-rounded-3xl nx-roundex-xl nx-bg-base80 nx-bg-gradient-to-t nx-from-grey20 nx-mb-8 lg:nx-px-14",
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
        false: "nx-rounded-md",
      },
    },
  });

  return (
    <div className={imageFrame({ isTall: isTall })}>
      <Image
        ref={imageRef}
        src={props.src}
        height={height}
        width={width}
        className={imageSelf({ isTall: isTall })}
        alt={alt}
      />
    </div>
  );
}
