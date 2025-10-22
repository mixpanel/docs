/* Close-style Navattic cards (fixed 296x319) */
import React from "react";

type Card = {
  title: string;             // Large headline in the black area
  tag: string;               // Pill label (e.g., "PRODUCT OVERVIEWS")
  demoUrl: string;           // Navattic capture URL
  img?: string | null;       // Optional image; black placeholder if absent
};

const MP_PURPLE = "#7C6BFF"; // Mixpanel accent
const MP_PURPLE_LIGHT = "#A89BFF"; // lighter shade for subtle accents

function DogEar() {
  return (
    <div
      aria-hidden
      className="absolute right-0 top-0"
      style={{
        width: 0,
        height: 0,
        borderTop: "22px solid " + MP_PURPLE,
        borderLeft: "22px solid transparent",
      }}
    />
  );
}

function CardTile({ title, tag, demoUrl, img }: Card) {
  return (
    <button
      type="button"
      className="relative w-[296px] h-[319px] rounded-[14px] overflow-hidden border border-white/10 dark:border-white/10 bg-white dark:bg-[#0B0B11] shadow-md hover:shadow-lg transition"
      data-navattic-open={demoUrl}
      data-navattic-title={title}
    >
      {/* top ribbon */}
      <div
        className="absolute left-0 top-0 h-[10px] w-full"
        style={{ backgroundColor: MP_PURPLE }}
      />
      {/* dog-ear */}
      <DogEar />

      {/* image zone (indented to the right by 12px) */}
      <div className="mt-[10px] pl-3 pr-0">
        <div className="relative w-[calc(100%-12px)] h-[168px] overflow-hidden rounded-t-[10px] bg-black/80">
          {img ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={img}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 bg-black" />
          )}
        </div>
      </div>

      {/* bottom content */}
      <div className="absolute left-0 right-0 bottom-0 bg-black text-white p-4 pt-3">
        <span
          className="inline-block text-[11px] font-semibold uppercase tracking-wide px-2 py-1 rounded"
          style={{ backgroundColor: MP_PURPLE_LIGHT, color: "#0B0B11" }}
        >
          {tag}
        </span>

        <h3 className="mt-2 text-[22px] leading-[1.1] font-semibold">
          {title}
        </h3>
      </div>
    </button>
  );
}

export default function SelfGuidedTours() {
  const cards: Card[] = [
    {
      title: "Launch an Experiment",
      tag: "PRODUCT OVERVIEWS",
      demoUrl: "https://capture.navattic.com/cmfkxwfa5000004lc8408f5wi",
      img: "/navattic/launch-an-experiment.png", // your uploaded image
    },
    {
      title: "Example Walkthrough",
      tag: "PRODUCT OVERVIEWS",
      demoUrl: "https://capture.navattic.com/REPLACE_WITH_DEMO_ID",
      img: null, // black placeholder
    },
    {
      title: "Customizing the Lead Page",
      tag: "CRM",
      demoUrl: "https://capture.navattic.com/REPLACE_WITH_DEMO_ID",
      img: null, // black placeholder
    },
  ];

  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {cards.map((c) => (
          <CardTile key={c.title} {...c} />
        ))}
      </div>
    </div>
  );
}
