import React, { useState, useEffect } from "react";
import { getPagesUnderRoute } from "nextra/context";
import { ImageFrame } from "/components/ImageFrame";
import { VideoButtonWithModal } from "/components/VideoButtonWithModal";
import Link from "next/link";

const renderMedia = (page) => {
  return (
    <ImageFrame src={page.frontMatter.thumbnail} alt={page.frontMatter.title} />
  );
};

export default function ChangelogIndex({ more = "Read more" }) {
  // naturally sorts pages from a-z rather than z-a
  const allPages = getPagesUnderRoute("/changelogs").reverse();
  const itemsPerPage = 10;
  const [displayedPages, setDisplayedPages] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);

  // Load initial or additional pages
  useEffect(() => {
    const morePages = allPages.slice(pageIndex, pageIndex + itemsPerPage);
    setDisplayedPages((prev) => [...prev, ...morePages]);
  }, [pageIndex]);

  const loadMore = () => {
    setPageIndex((prev) => prev + itemsPerPage);
  };

  return (
    <div
      style={{
        display: "block",
        maxWidth: "560px",
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        alignItems: "center",
      }}
      className="changelogIndexContainer"
    >
      {displayedPages.map((page) => (
        <div key={page.route} className="changelogIndexItem">
          <h3>
            <Link
              href={page.route}
              style={{ color: "inherit", textDecoration: "none" }}
              className="changelogItemTitle block"
            >
              {page.meta?.title || page.frontMatter?.title || page.name}
            </Link>
          </h3>
          {page.frontMatter?.date ? (
            <p className="changelogDate">{page.frontMatter.date}</p>
          ) : null}

          {page.frontMatter?.thumbnail && renderMedia(page)}

          <p className="opacity-80 mt-6 leading-7">
            {page.frontMatter?.description}{" "}
            <span className="nx-isolate nx-inline-flex nx-rounded-md nx-shadow-sm nx-space-x-5 nx-mt-8">
              {page.frontMatter?.video && (
                <VideoButtonWithModal src={page.frontMatter.video} />
              )}
              <Link href={page.route} className="changelogReadMoreLink">
                {more + " →"}
              </Link>
            </span>
          </p>
          <div className="changelogDivider nx-mt-16"></div>
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
