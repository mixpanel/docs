import React, { useState, useEffect } from "react";
import { getPagesUnderRoute } from "nextra/context";
import { ImageFrame } from "./ImageFrame";
import { VideoButtonWithModal } from "./VideoButtonWithModal";
import Link from "next/link";

enum PostFilterOptions {
  All = `all`,
  Announcements = `announcements`,
  Updates = `updates`,
}

const renderImage = (page) => {
  return (
    <ImageFrame src={page.frontMatter.thumbnail} alt={page.frontMatter.title} />
  );
};

export default function ChangelogIndex({ more = "Learn More" }) {
  // naturally sorts pages from a-z rather than z-a
  const allPages = getPagesUnderRoute("/changelogs").reverse();
  const itemsPerPage = 10;
  const [displayedPages, setDisplayedPages] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [filter, setFilter] = useState(PostFilterOptions.All);

  // Load initial or additional pages
  useEffect(() => {
    const morePages = allPages
      .filter((page) => {
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
      })
      .slice(0, pageIndex + itemsPerPage);
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
      <button className={className} onClick={() => setFilter(id)}>
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

      {displayedPages.map((page) => (
        <div key={page.route} className="changelogIndexItem">
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
            {page.frontMatter?.thumbnail && renderImage(page)}

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
              {page.frontMatter?.description}
            </p>
            <div className="nx-isolate nx-inline-flex nx-items-center nx-space-x-5 nx-mt-8">
              {page.frontMatter?.video && (
                <VideoButtonWithModal src={page.frontMatter.video} />
              )}
              <Link href={page.route} className="changelogReadMoreLink">
                {more + " →"}
              </Link>
            </div>
            <div className="changelogDivider nx-mt-16"></div>
          </div>
        </div>
      ))}
      {pageIndex + itemsPerPage < allPages.length && (
        <div className="changelogLoadMoreButtonContainer">
          <button onClick={loadMore} className="changelogLoadMoreButton">
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
