import React, { useState, useEffect } from "react";
import { getPagesUnderRoute } from "nextra/context";
import { ImageFrame } from "./ImageFrame";
import { VideoButtonWithModal } from "./VideoButtonWithModal";
import Link from "next/link";
import { MdxFile } from "nextra";

enum PostFilterOptions {
  All = `all`,
  Announcements = `announcements`,
  Updates = `updates`,
}

const renderImage = (page) => {
  return (
    <ImageFrame
      src={page.frontMatter.thumbnail}
      alt={page.frontMatter.title}
      isAnnouncement={page.frontMatter?.isAnnouncement}
    />
  );
};

const getVideoEmbedURL = (videoURL) => {
  try {
    const parsedURL = new URL(videoURL);
    const host = parsedURL.host;
    if (host === "www.youtube.com" || host === "youtube.com" || host === "youtu.be") {
      const videoId = parsedURL.searchParams.get("v") || parsedURL.pathname.split("/").pop();
      return `https://www.youtube-nocookie.com/embed/${videoId}`;
    } else if (host === "www.loom.com" || host === "loom.com") {
      const videoId = parsedURL.pathname.split("/").pop();
      return `https://www.loom.com/embed/${videoId}?hideEmbedTopBar=true`;
    }
  } catch (e) {
    console.error("Invalid URL:", e);
  }
};

const renderVideo = (videoURL) => {
  const embedURL = getVideoEmbedURL(videoURL);

  return (
    <iframe
      src={embedURL}
      style={{
        width: "100%",
        aspectRatio: 16 / 9,
        height: "auto",
        borderRadius: "16px",
        marginBottom: "16px",
      }}
      allow="clipboard-write; encrypted-media; picture-in-picture"
      allowFullScreen
      title="Video"
    ></iframe>
  );
};

const renderMedia: (page: MdxFile) => React.JSX.Element = (page) => {
  if (page.frontMatter?.thumbnail) {
    return renderImage(page);
  } else if (page.frontMatter?.video) {
    return renderVideo(page.frontMatter?.video);
  }
  return null;
};

export default function ChangelogIndex({ more = "Learn More" }) {
  // naturally sorts pages from a-z rather than z-a
  const allPages = getPagesUnderRoute("/changelogs").reverse();
  const itemsPerPage = 10;
  const [displayedPages, setDisplayedPages] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [filter, setFilter] = useState(PostFilterOptions.All);

  const getAllFilteredPages = () => {
    return allPages.filter((page) => {
      switch (filter) {
        case PostFilterOptions.Updates:
          // @ts-ignore:next-line
          return !page.frontMatter?.isAnnouncement;
        case PostFilterOptions.Announcements:
          // @ts-ignore:next-line
          return page.frontMatter?.isAnnouncement === true;
        default:
          return true;
      }
    });
  };

  // Load initial or additional pages
  useEffect(() => {
    const morePages = getAllFilteredPages().slice(0, pageIndex + itemsPerPage);

    setDisplayedPages(morePages);
  }, [pageIndex, filter]);

  const loadMore = () => {
    setPageIndex((prev) => prev + itemsPerPage);
  };

  const filterButton = (id: PostFilterOptions, label: string) => {
    let className = "changelogFilterButton";
    if (filter === id) {
      className += " active";
    }
    return (
      <button
        className={className}
        onClick={() => {
          setFilter(id);
          setPageIndex(0);
        }}
      >
        {label}
      </button>
    );
  };

  const filterOptions = [
    { id: PostFilterOptions.All, label: "All Posts" },
    { id: PostFilterOptions.Announcements, label: "Announcements" },
    { id: PostFilterOptions.Updates, label: "Updates" },
  ];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
      className="changelogIndexContainer"
    >
      <div className="changelogIndexFilterBorder" />
      <div className="changelogIndexFilterBar">
        {filterOptions.map((filter) => filterButton(filter.id, filter.label))}
      </div>
      <div className="changelogIndexFilterBorder changelogIndexFilterBorderBottom" />

      {displayedPages.map((page) => (
        <div key={page.route} className="changelogIndexItem nx-mt-16">
          <div className="changelogIndexItemDate">
            {page.frontMatter?.date ? (
              <p className="changelogDate">
                {new Date(page.frontMatter.date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            ) : null}
          </div>

          <div className="changelogIndexItemBody">
            {(page.frontMatter?.thumbnail || page.frontMatter?.video) &&
              renderMedia(page)}

            <h3
              className={
                page.frontMatter?.thumbnail && "changelogItemTitleWrapper"
              }
            >
              <Link
                href={page.route}
                style={{ color: "inherit", textDecoration: "none" }}
                className="changelogItemTitle block"
              >
                {page.meta?.title || page.frontMatter?.title || page.name}
              </Link>
            </h3>

            <p className="opacity-80 mt-6 leading-7">
              {page.frontMatter?.description}
            </p>
            <div className="nx-isolate nx-inline-flex nx-items-center nx-space-x-5 nx-mt-8">
              {page.frontMatter?.isAnnouncement && (
                <a
                  href="https://mixpanel.com/contact-us/demo-request/"
                  className="nx-px-5 nx-py-3 nx-my-4 nx-drop-shadow-sm nx-bg-gradient-to-t nx-from-purple100 nx-to-purple50 nx-rounded-full nx-text-white nx-font-medium nx-text-medium"
                >
                  Request a Demo
                </a>
              )}
              {page.frontMatter?.video && page.frontMatter?.thumbnail && (
                <VideoButtonWithModal
                  src={page.frontMatter.video}
                  showThumbnail={false}
                />
              )}
              <Link
                target="_blank"
                href={page.route}
                className="changelogReadMoreLink"
              >
                {more + " →"}
              </Link>
            </div>
            <div className="changelogDivider nx-mt-16"></div>
          </div>
        </div>
      ))}
      {pageIndex + itemsPerPage < getAllFilteredPages().length && (
        <div className="changelogLoadMoreButtonContainer">
          <button onClick={loadMore} className="changelogLoadMoreButton">
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
