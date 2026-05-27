export const VideoButtonWithModal = ({ src, title = "Video about this feature", showThumbnail = true }) => {
  const VideoIcon = () => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
        <g filter="url(#filter0_i_982_76833)">
          <circle cx="10.8027" cy="10.3469" r="10" fill="#5028C0" />
        </g>
        <circle cx="10.8027" cy="10.3469" r="10.0962" stroke="white" strokeOpacity="0.1" strokeWidth="0.192307" />
        <path
          d="M15.5305 9.99026C15.8523 10.1194 15.8523 10.575 15.5305 10.7041L9.06317 13.2997C8.81047 13.4011 8.53531 13.215 8.53531 12.9427L8.53531 7.75165C8.53531 7.47936 8.81047 7.29329 9.06317 7.39471L15.5305 9.99026Z"
          fill="white"
        />
        <defs>
          <filter
            id="filter0_i_982_76833"
            x="0.610352"
            y="-1.51213"
            width="20.3848"
            height="22.0514"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="-1.66667" />
            <feGaussianBlur stdDeviation="2.5" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.313726 0 0 0 0 0.156863 0 0 0 0 0.752941 0 0 0 0.4 0" />
            <feBlend mode="normal" in2="shape" result="effect1_innerShadow_982_76833" />
          </filter>
        </defs>
      </svg>
    );
  };

  const VideoIconDark = () => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
        <g filter="url(#filter0_di_1462_26969)">
          <circle cx="13.8027" cy="12.3469" r="10" fill="#B094FF" shapeRendering="crispEdges" />
          <circle
            cx="13.8027"
            cy="12.3469"
            r="10.0962"
            stroke="white"
            strokeOpacity="0.1"
            strokeWidth="0.192307"
            shapeRendering="crispEdges"
          />
        </g>
        <g filter="url(#filter1_i_1462_26969)">
          <path
            d="M17.5305 11.9904C17.8523 12.1195 17.8523 12.5751 17.5305 12.7043L11.0632 15.2998C10.8105 15.4012 10.5353 15.2151 10.5353 14.9428L10.5353 9.75177C10.5353 9.47948 10.8105 9.29342 11.0632 9.39483L17.5305 11.9904Z"
            fill="#1B0B3B"
          />
        </g>
        <defs>
          <filter
            id="filter0_di_1462_26969"
            x="0.277018"
            y="0.487874"
            width="27.0514"
            height="27.0513"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="1.66667" />
            <feGaussianBlur stdDeviation="1.66667" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1462_26969" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1462_26969" result="shape" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="-1.66667" />
            <feGaussianBlur stdDeviation="2.5" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.313726 0 0 0 0 0.156863 0 0 0 0 0.752941 0 0 0 0.4 0" />
            <feBlend mode="normal" in2="shape" result="effect2_innerShadow_1462_26969" />
          </filter>
          <filter
            id="filter1_i_1462_26969"
            x="10.5352"
            y="8.59759"
            width="7.23633"
            height="6.73029"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="-0.769229" />
            <feGaussianBlur stdDeviation="0.384614" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.690196 0 0 0 0 0.580392 0 0 0 0 1 0 0 0 1 0" />
            <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1462_26969" />
          </filter>
        </defs>
      </svg>
    );
  };
  const urlMatchesDomain = (domains, domainStartsWith, url) =>
    domains.filter((domain) => domain.startsWith(domainStartsWith)).some((domain) => url.includes(domain));

  const getYoutubeEmbedURL = (url) => {
    const videoId = url.split("v=")[1] ? url.split("v=")[1].split("&")[0] : url.split("/").pop();
    return `https://www.youtube-nocookie.com/embed/${videoId}`;
  };

  const getLoomEmbedURL = (url) => {
    const videoId = url.split("/").pop();
    return `https://www.loom.com/embed/${videoId}?hideEmbedTopBar=true`;
  };

  const getVideoEmbedURL = (url) => {
    const domains = ["youtube.com", "youtu.be", "loom.com"];
    if (urlMatchesDomain(domains, "youtu", url)) return getYoutubeEmbedURL(url);
    if (urlMatchesDomain(domains, "loom", url)) return getLoomEmbedURL(url);
    return null;
  };

  const getLoomShareURL = (embedURL) => {
    if (!embedURL?.includes("loom.com")) return null;
    return embedURL.replace("/embed/", "/share/");
  };

  const embedURL = getVideoEmbedURL(src);
  const [isOpen, setIsOpen] = useState(false);

  const loomShareURL = getLoomShareURL(embedURL);
  if (loomShareURL) {
    return (
      <p style={{ marginTop: "1.5rem" }}>
        <a href={loomShareURL} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:no-underline">
          Link to Demo
        </a>
      </p>
    );
  }

  return (
    <div className={showThumbnail ? "relative z-0 w-fit rounded-2xl mt-10 mb-10" : undefined}>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={
          showThumbnail
            ? "flex items-center px-2 py-1 text-xs font-semibold text-purple-700 shadow-sm rounded-2xl px-4 py-4 relative"
            : "flex items-center px-2 py-1 text-xs font-semibold text-purple-700 shadow-sm border-2 border-purple-700 rounded-full hover:rounded-lg"
        }
      >
        {showThumbnail ? (
          <iframe
            src={embedURL}
            style={{
              width: "170px",
              aspectRatio: "16/9",
              height: "auto",
              borderRadius: "8px",
              marginRight: "16px",
              zIndex: "-1",
            }}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            title={title}
            onClick={(e) => e.preventDefault()}
          />
        ) : (
          <span className="mr-2">
            <span className="dark:hidden">
              <VideoIcon />
            </span>
            <span className="hidden dark:inline">
              <VideoIconDark />
            </span>
          </span>
        )}
        {`Watch the video${showThumbnail ? " →" : ""}`}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
          onClick={() => setIsOpen(false)}
        >
          <div className="w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <iframe
              src={embedURL}
              style={{ width: "100%", aspectRatio: "16/9", height: "auto", borderRadius: "16px" }}
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              title={title}
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};
