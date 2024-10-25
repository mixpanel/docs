type ChangelogHeaderProps = {
  date?: string;
  media?: any;
  title?: string;
};

export default function ChangelogPostHeader({
  date,
  media,
  title,
}: ChangelogHeaderProps) {
  return (
    <div>
      {date && (
        <p className="changelogDate">
          {new Date(date).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      )}

      {media && <div>INSERT MEDIA HERE</div>}

      {title && <h3>{title}</h3>}
    </div>
  );
}
