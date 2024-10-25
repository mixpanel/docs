import { useState } from "react";
import { Dialog } from "@headlessui/react";
import getVideoEmbedURL from "./util";
// https://www.tailwind-variants.org/docs
import { tv } from "tailwind-variants";
import VideoIcon from "../svg/VideoIcon";

type VideoButtonModalProps = {
  src: string;
  title?: string;
  showThumbnail?: boolean;
};

export default function VideoButtonWithModal({
  title = "Video about this feature",
  showThumbnail = true,
  ...props
}: VideoButtonModalProps) {
  const embedURL = getVideoEmbedURL(props.src);
  let [isOpen, setIsOpen] = useState(false);

  // TODO: update this style and abstract it as time allows to a single button component
  // https://www.figma.com/design/8kiticjQNChvsP9y7s9SRf/Product-Releases-(Copy)?node-id=982-75355&node-type=frame&t=O7vwnwoAoOx42stw-0
  const playButton = tv({
    base: "nx-flex nx-items-center nx-rounded-full nx-border-2 nx-border-purple140 nx-px-2 nx-py-1 nx-text-xs nx-font-semibold nx-text-purple140 nx-shadow-sm hover:nx-rounded-lg focus-visible:nx-outline focus-visible:nx-outline-2 focus-visible:nx-outline-offset-2 focus-visible:nx-outline-purple140",
    variants: {
      showThumbnail: {
        true: "nx-border nx-border-base120 nx-rounded-2xl hover:nx-rounded-2xl nx-px-4 nx-py-4 nx-relative",
      },
    },
  });

  const buttonWrapper = tv({
    base: "",
    variants: {
      showThumbnail: {
        true: "nx-bg-white nx-relative nx-z-0 nx-w-fit nx-rounded-2xl nx-mt-10 nx-mb-10",
      },
    },
  });

  return (
    <div className={buttonWrapper({ showThumbnail: showThumbnail })}>
      <button
        type="button"
        className={playButton({ showThumbnail: showThumbnail })}
        onClick={() => setIsOpen(true)}
      >
        {showThumbnail ? (
          <iframe
            src={embedURL}
            style={{
              width: "170px",
              aspectRatio: 16 / 9,
              height: "auto",
              borderRadius: "8px",
              marginRight: "16px",
              zIndex: "-1",
            }}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            title={title}
            onClick={(e) => {
              e.preventDefault();
            }}
          ></iframe>
        ) : (
          <VideoIcon />
        )}
        Watch the Video
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="nx-fixed nx-inset-0 nx-flex nx-w-screen nx-items-center nx-justify-center nx-p-4 nx-bg-black nx-bg-opacity-80 nx-z-20">
          <Dialog.Panel className="nx-w-full nx-max-w-6xl">
            <iframe
              src={embedURL}
              style={{
                width: "100%",
                aspectRatio: 16 / 9,
                height: "auto",
                borderRadius: "16px",
              }}
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              title={title}
              allowFullScreen
            ></iframe>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
