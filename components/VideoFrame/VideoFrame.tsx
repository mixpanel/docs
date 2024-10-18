import getVideoEmbedURL from "./util";
// https://www.tailwind-variants.org/docs
// import { tv } from "tailwind-variants";

type VideoFrameProps = {
  src: string;
  title?: string;
};

export default function VideoFrame({
  title = "Video about this feature",
  ...props
}: VideoFrameProps) {
  const embedURL = getVideoEmbedURL(props.src);

  return (
    <iframe
      src={embedURL}
      style={{
        maxWidth: "560px",
        width: "100%",
        aspectRatio: 16 / 9,
        height: "auto",
        borderRadius: "16px",
        marginBottom: "16px",
      }}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      title={title}
      allowFullScreen
    ></iframe>
  );
}
