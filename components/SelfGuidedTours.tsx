"use client";

import React from "react";

type Demo = {
  id: string;              // Navattic demo id (the part after capture.navattic.com/)
  title: string;           // Big title in the black footer
  label: string;           // Small pill (e.g., PRODUCT OVERVIEWS)
  img?: string;            // /navattic/…; if absent we show a black placeholder
  alt?: string;
};

const mx = {
  // Mixpanel-ish colors
  purple: "rgb(120 86 255)",          // primary accent
  purple100: "rgb(232 224 255)",
  black: "#0b0b0f",
  white: "#ffffff",
};

// One fixed-size card (296w x 319h)
function DemoCard({ demo }: { demo: Demo }) {
  const embedUrl = `https://capture.navattic.com/${demo.id}`;

  return (
    <button
      type="button"
      data-navattic-open={embedUrl}
      data-navattic-title={demo.title}
      className={[
        // Fixed size & rounded card shell
        "relative w-[296px] h-[319px] rounded-[12px] overflow-hidden",
        "shadow-lg ring-1 ring-black/10 dark:ring-white/10",
        "transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline-none",
        "bg-white dark:bg-[#151521]",
      ].join(" ")}
      aria-label={`Open tour: ${demo.title}`}
    >
      {/* Top bar accent + dog-ear */}
      <div className="absolute top-0 left-0 right-0 h-[10px]" style={{ backgroundColor: mx.purple }} />
      <div className="absolute top-[6px] right-[6px] w-5 h-5 overflow-hidden pointer-events-none">
        {/* Dog ear made from a rotated square */}
        <div
          className="absolute -right-2 -top-2 w-6 h-6 rotate-45"
          style={{ backgroundColor: mx.purple }}
        />
      </div>

      {/* Image area (indented to the right) */}
      <div className="absolute left-0 right-0 top-[10px] h-[168px]">
        <div className="h-full w-full pr-[12px] pl-[20px] pt-[8px]">
          {demo.img ? (
            <img
              src={demo.img}
              alt={demo.alt ?? ""}
              className="h-full w-full object-cover rounded-t-[10px] rounded-br-[10px]"
              draggable={false}
            />
          ) : (
            <div
              className="h-full w-full rounded-t-[10px] rounded-br-[10px]"
              style={{ backgroundColor: mx.black }}
            />
          )}
        </div>
      </div>

      {/* Black footer content */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[151px] px-5 pt-3"
        style={{ backgroundColor: mx.black, color: mx.white }}
      >
        {/* Label pill */}
        <div className="mb-3">
          <span
            className="inline-block text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded"
            style={{
              textTransform: "uppercase",
              backgroundColor: mx.purple,
              color: mx.white,
            }}
          >
            {demo.label}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-[26px] leading-[30px] font-semibold">
          {demo.title}
        </h3>
      </div>
    </button>
  );
}

export default function SelfGuidedTours() {
  const demos: Demo[] = [
    {
      id: "cmfkxwfa5000004lc8408f5wi",
      title: "Launch an Experiment",
      label: "Product Overviews",
      img: "/navattic/launch-an-experiment.png",
      alt: "Experiment tour preview",
    },
    {
      id: "REPLACE_WITH_DEMO_ID",
      title: "Example Walkthrough",
      label: "Product Overviews",
      // no img => black placeholder
    },
    {
      id: "REPLACE_WITH_DEMO_ID",
      title: "Customizing the Lead Page",
      label: "CRM",
      // no img => black placeholder
    },
  ];

  return (
    <div className="w-full">
      {/* Card grid — each card is a fixed size so rows align like your reference */}
      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3 place-items-start">
        {demos.map((d) => (
          <DemoCard key={d.title} demo={d} />
        ))}
      </div>
    </div>
  );
}
