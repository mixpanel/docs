import { ImageFrame } from "../ImageFrame";

type ChangelogHeaderProps = {
  date?: string;
  image?: any;
  title?: string;
};

export default function ChangelogPostHeader({
  date,
  image,
  title,
}: ChangelogHeaderProps) {
  return (
    <div className="changelogPostHeader">
      {date && (
        <p className="changelogDate">
          {new Date(date).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      )}

      {title && <h3 className="changelogTitle">{title}</h3>}

      {image && <ImageFrame src={image} alt={title} />}
    </div>
  );
}
