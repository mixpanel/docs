import React, { useState, useEffect } from "react";
import { getPagesUnderRoute } from "nextra/context";
import ExtendedButton from "/components/ExtendedButton/ExtendedButton";
import Link from "next/link";

const renderMedia = (page) => {
  if (page.frontMatter?.thumbnail) {
    return (
      <img
        src={page.frontMatter.thumbnail}
        alt="Thumbnail"
        style={{
          width: "100%",
          borderRadius: "16px",
          marginBottom: "16px",
        }}
        className="max-w-full h-auto"
      />
    );
  } else if (page.frontMatter?.video) {
    const videoURL = page.frontMatter.video;
    let embedURL;

    if (videoURL.includes("youtube.com") || videoURL.includes("youtu.be")) {
      const videoId = videoURL.split("v=")[1]
        ? videoURL.split("v=")[1].split("&")[0]
        : videoURL.split("/").pop();
      embedURL = `https://www.youtube.com/embed/${videoId}`;
    } else if (videoURL.includes("loom.com")) {
      const videoId = videoURL.split("/").pop();
      embedURL = `https://www.loom.com/embed/${videoId}?hideEmbedTopBar=true`;
    }

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
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Video"
      ></iframe>
    );
  }
  return "";
};

export default function ChangelogIndex({ more = "Read more" }) {
  // naturally sorts pages from a-z rather than z-a
  const allPages = getPagesUnderRoute("/changelogs").reverse();
  const itemsPerPage = 10;
  const [displayedPages, setDisplayedPages] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [filter, setFilter] = useState(`all`);

  // Load initial or additional pages
  useEffect(() => {
    console.log(filter)
    const morePages = allPages.filter(page => {
      switch (filter) {
        case 'updates':
          return page.frontMatter?.isAnnouncement !== true;
        case 'announcements':
          return page.frontMatter?.isAnnouncement === true;
        default:
          return true;
      }
    }).slice(0, pageIndex + itemsPerPage);
    setDisplayedPages(morePages);
  }, [pageIndex, filter]);

  const loadMore = () => {
    setPageIndex((prev) => prev + itemsPerPage);
  };

  const filterButton = (id, label) => {
    let className = 'changelogFilterButton';
    if (filter === id) {
      className += ' active'
    }
    return (
      <button
        className={className}
        onClick={() => setFilter(id)}
      >{label}</button>
    );
  }

  const filterOptions = [
    {id: 'all', label: 'All Posts'},
    {id: 'announcements', label: 'Announcements'},
    {id: 'updates', label: 'Updates'},
  ]

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
        {filterOptions.map(filter => filterButton(filter.id, filter.label))}
      </div>

      {displayedPages.map((page) => (
        <div key={page.route} className="changelogIndexItem">
          <div className="changelogIndexItemDate">
            {page.frontMatter?.date ? (
              <p className="changelogDate">{(new Date(page.frontMatter.date)).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric"
              })}</p>
            ) : null}
          </div>

          <div className="changelogIndexItemBody">
            {renderMedia(page)}

            <h3>
              <Link
                href={page.route}
                style={{ color: "inherit", textDecoration: "none" }}
                className="changelogItemTitle block"
              >
                {page.meta?.title || page.frontMatter?.title || page.name}
              </Link>
            </h3>

            <p className="opacity-80 mt-6 leading-7">
              {page.frontMatter?.description}{" "}
              <span className="inline-block">
                <Link href={page.route} className="changelogReadMoreLink">
                  {more + " →"}
                </Link>
              </span>
            </p>
            <div className="changelogDivider nx-mt-16"></div>
          </div>
        </div>
      ))}
      {pageIndex + itemsPerPage < allPages.length && (
        <div class="changelogLoadMoreButtonContainer">
          <button onClick={loadMore} className="changelogLoadMoreButton">
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
