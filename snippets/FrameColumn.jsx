export const FrameColumn = ({ src, title, description, link }) => {
  return (
    <div className="flex gap-8 items-start">
      <div className="flex-none w-[58%]">
        <Frame>
          <iframe
            title={title}
            src={src}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </Frame>
      </div>
      <div className="flex-1 min-w-0 pt-2">
        <h4 className="font-bold mt-0 mb-2">{title}</h4>
        <p className="mt-0">{description}</p>
        <br />
        <br />
        <a href={link} target="_blank" rel="noopener noreferrer" className="font-bold">
          Open in YouTube →
        </a>
      </div>
    </div>
  );
};
