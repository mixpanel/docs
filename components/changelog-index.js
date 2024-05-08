import React, { useState, useEffect } from 'react';
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

export default function ChangelogIndex({ more = "Read more" }) {
  const allPages = getPagesUnderRoute("/changelogs");
  const itemsPerPage = 10;
  const [displayedPages, setDisplayedPages] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);

  // Load initial or additional pages
  useEffect(() => {
    console.log(pageIndex);  // Check the current page index
    const morePages = allPages.slice(pageIndex, pageIndex + itemsPerPage);
    setDisplayedPages(prev => [...prev, ...morePages]);
  }, [pageIndex]);
  
  const loadMore = () => {
    setPageIndex(prev => prev + itemsPerPage);
  };

  return (
    <div style={{display: 'block', maxWidth: '560px', width:'100%', marginLeft: 'auto', marginRight: 'auto',  alignItems: 'center' }}>
      {displayedPages.map((page) => (
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

          <p className="opacity-80 mt-6 leading-7">
          {page.frontMatter?.description}{" "}
          <span className="inline-block">
            <Link
              href={page.route}
              className="text-[color:hsl(var(--nextra-primary-hue),100%,50%)] underline underline-offset-2 decoration-from-font"
            >
              {more + " →"}
            </Link>
          </span>
        </p>
        </div>
      ))}
    {pageIndex + itemsPerPage < allPages.length && (
      <button onClick={loadMore} className="text-white 
      
      // Background
      bg-gradient-to-b from-purple50 to-purple100 hover:from-purple50 hover:to-purple100 active:from-purple50 active:to-purple140
  
      // Shadow
      shadow-sm hover:shadow-md
  
      // Shadow
      rounded-full hover:rounded-lg 
      
      // Font 
      font-medium  text-md 
      
      // Padding
      px-7 py-2.5">
        Load More
      </button>
    )}
  </div>
  );
}
