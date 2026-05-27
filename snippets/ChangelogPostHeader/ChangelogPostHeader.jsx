export const ChangelogPostHeader = ({ date, image, title }) => {
  const ImageFrame = ({ src, alt = "Thumbnail of screenshot", isAnnouncement = false }) => {
    if (isAnnouncement) {
      return <img src={src} alt={alt} className="w-full lg:rounded-3xl rounded-xl mb-8" />;
    }

    return (
      <div className="aspect-video overflow-hidden mt-8 lg:rounded-3xl rounded-xl mb-8 px-8 sm:px-10 lg:px-14 flex justify-center items-center bg-gradient-to-t from-gray-100 to-gray-50 dark:from-gray-800/20 dark:to-gray-800/10">
        <img src={src} alt={alt} className="w-full max-h-96 h-full object-contain rounded-2xl shadow-sm" />
      </div>
    );
  };

  return (
    <div className="changelogPostHeader">
      {date && (
        <p className="changelogDate">
          {new Date(date).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: "UTC",
          })}
        </p>
      )}

      {/* {title && <h3 className="changelogTitle">{title}</h3>} */}

      {image && <ImageFrame src={image} alt={title} />}
    </div>
  );
};
