import { getPagesUnderRoute } from "nextra/context";
import ExtendedButton from '/components/ExtendedButton/ExtendedButton'
import Link from "next/link";

const renderMedia = (page) => {
  if (page.frontMatter?.thumbnail) {
    return <img src={page.frontMatter.thumbnail} 
                alt="Thumbnail" 
                style={{ maxWidth: '560px', width:"100%", borderRadius: "16px", marginBottom: "16px"}} 
                className="max-w-full h-auto" />;
  } else if (page.frontMatter?.video) {
    const videoURL = page.frontMatter.video;
    let embedURL;

    if (videoURL.includes("youtube.com") || videoURL.includes("youtu.be")) {
      const videoId = videoURL.split('v=')[1] ? videoURL.split('v=')[1].split('&')[0] : videoURL.split('/').pop();
      embedURL = `https://www.youtube.com/embed/${videoId}`;
    } else if (videoURL.includes("loom.com")) {
      const videoId = videoURL.split('/').pop();
      embedURL = `https://www.loom.com/embed/${videoId}`;
    }

    return (
      <iframe
        src={embedURL}
        style = {{maxWidth:"560px", width:"100%", aspectRatio: 16 / 9, height:"auto", borderRadius: "16px", marginBottom: "16px"}}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Video"
      ></iframe>
    );
  }
  return "";
};

export default function ChangelogIndex() {
  return getPagesUnderRoute("/changelogs").map((page) => {
    return (
      <div key={page.route} className="mb-10">
        <h3>
          <Link
            href={page.route}
            style={{ color: "inherit", textDecoration: "none" }}
            className="block font-semibold mt-8 text-2xl "
          >
            {page.meta?.title || page.frontMatter?.title || page.name}
          </Link>
        </h3>
        {page.frontMatter?.date ? (
          <p className="opacity-50 text-sm mt-1 mb-2 leading-7">
            {page.frontMatter.date}
          </p>
        ) : null}
        
        {renderMedia(page)}

        <ExtendedButton  title="Read more" link={page.route}></ExtendedButton>
      </div>
    );
  });
}
