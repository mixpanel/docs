import { useState } from "react";
import { Dialog } from "@headlessui/react";
import getVideoEmbedURL from "./util";
// https://www.tailwind-variants.org/docs
import { tv } from "tailwind-variants";

type VideoButtonModalProps = {
  src: string;
  title?: string;
};

export default function VideoButtonWithModal({
  title = "Video about this feature",
  ...props
}: VideoButtonModalProps) {
  const embedURL = getVideoEmbedURL(props.src);
  let [isOpen, setIsOpen] = useState(false);

  // TODO: update this style and abstract it as time allows to a single button component
  // https://www.figma.com/design/8kiticjQNChvsP9y7s9SRf/Product-Releases-(Copy)?node-id=982-75355&node-type=frame&t=O7vwnwoAoOx42stw-0
  const playButton = tv({
    base: "nx-rounded nx-bg-indigo-600 nx-px-2 nx-py-1 nx-text-xs nx-font-semibold nx-text-white nx-shadow-sm hover:nx-bg-indigo-500 focus-visible:nx-outline focus-visible:nx-outline-2 focus-visible:nx-outline-offset-2 focus-visible:nx-outline-indigo-600",
  });

  return (
    <>
      <button
        type="button"
        className={playButton()}
        onClick={() => setIsOpen(true)}
      >
        Watch the Video
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="nx-fixed nx-inset-0 nx-flex nx-w-screen nx-items-center nx-justify-center nx-p-4 nx-bg-black nx-bg-opacity-80">
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
    </>
  );
}
