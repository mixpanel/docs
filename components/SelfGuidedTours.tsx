// components/SelfGuidedTours.tsx
import React from "react";
import Script from "next/script";

type Card = {
  id?: string;
  title: string;
  label: string;
  img?: string;           // optional—if missing we'll render a placeholder
  popupUrl?: string;      // Navattic demo URL; use data-navattic-open
};

const cards: Card[] = [
  {
    title: "Launch an Experiment",
    label: "PRODUCT OVERVIEWS",
    img: "/navattic/launch-an-experiment.png", // make sure this exists in /public/navattic/
    popupUrl: "https://capture.navattic.com/cmfkxwfa5000004lc8408f5wi",
  },
  {
    title: "Example Walkthrough",
    label: "PRODUCT OVERVIEWS",
    // no img -> placeholder
    popupUrl: "https://capture.navattic.com/YOUR_SECOND_DEMO_ID",
  },
  {
    title: "Customizing the Lead Page",
    label: "CRM",
    // no img -> placeholder
    popupUrl: "https://capture.navattic.com/YOUR_THIRD_DEMO_ID",
  },
];

export default function SelfGuidedTours() {
  return (
    <>
      {/* Load Navattic embeds (CSP must allow https://js.navattic.com) */}
      <Script src="https://js.navattic.com/embeds.js" strategy="afterInteractive" />

      {/* Keep all styling outside markdown; fixed-size cards */}
      <div className="nx-not-prose not-prose mt-8">
        <div className="flex flex-wrap gap-6">
          {cards.map((c, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Open: ${c.title}`}
              data-navattic-open={c.popupUrl}
              data-navattic-title={c.title}
              // exact 296 x 319, rounded, dark, hover lift
              className="relative w-[296px] h-[319px] rounded-[14px] overflow-hidden bg-[#0B0A13] border border-[#2A2A35] shadow-md hover:shadow-xl transition-transform hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
            >
              {/* Dog-ear (inline style so Tailwind purge can't strip it) */}
              <div
                className="absolute top-0 right-0 w-7 h-7 bg-[#FFC52E] pointer-events-none"
                style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
              />
              {/* Top yellow strip */}
              <div className="h-2 w-full bg-[#FFC52E]" />

              {/* Media area (160px tall) -> image indented to the right */}
              <div className="h-[160px] bg-[#151520]">
                <div className="h-full ml-3 overflow-hidden rounded-l-sm">
                  {c.img ? (
                    <img
                      src={c.img}
                      alt={`${c.title} preview`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-slate-800 via-slate-900 to-black grid place-items-center">
                      <div className="flex items-center gap-2 text-slate-200 text-sm">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="opacity-90">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                        <span>Preview loads on click</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Body */}
              <div className="px-5 pt-4">
                <span className="inline-flex items-center rounded-md px-3 py-1 text-[11px] font-semibold tracking-wide bg-[#FFC52E] text-black">
                  {c.label}
                </span>
                <h3 className="mt-3 text-[22px] leading-[1.15] font-extrabold text-white">
                  {c.title}
                </h3>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
