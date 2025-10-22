import React from "react";
import Script from "next/script";

type Card = {
  title: string;
  label: string;
  img?: string;
  popupUrl?: string;
};

const cards: Card[] = [
  {
    title: "Launch an Experiment",
    label: "PRODUCT OVERVIEWS",
    img: "/navattic/launch-an-experiment.png",
    popupUrl: "https://capture.navattic.com/cmfkxwfa5000004lc8408f5wi",
  },
  {
    title: "Example Walkthrough",
    label: "PRODUCT OVERVIEWS",
    popupUrl: "https://capture.navattic.com/YOUR_SECOND_DEMO_ID",
  },
  {
    title: "Customizing the Lead Page",
    label: "CRM",
    popupUrl: "https://capture.navattic.com/YOUR_THIRD_DEMO_ID",
  },
];

export default function SelfGuidedTours({ version }: { version?: string }) {
  return (
    <>
      <Script src="https://js.navattic.com/embeds.js" strategy="afterInteractive" />

      {/* data-hide-arrows lets us nuke stray ::before/::after triangles only in this section */}
      <div className="nx-not-prose not-prose mt-8 relative" data-hide-arrows>
        {version ? (
          <div className="absolute -top-6 right-0 inline-flex items-center gap-2 rounded-full bg-fuchsia-600/15 text-fuchsia-300 px-3 py-1 text-xs font-medium">
            Self-Guided Tours v{version}
          </div>
        ) : null}

        <div className="flex flex-wrap gap-6">
          {cards.map((c, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Open: ${c.title}`}
              data-navattic-open={c.popupUrl}
              data-navattic-title={c.title}
              style={{ width: 296, height: 319 }}
              className="
                relative overflow-hidden rounded-[14px]
                bg-[#0B0A13]
                border-2 border-[#8B5CF6]/70        /* <— purple card border */
                shadow-md hover:shadow-xl
                transition-transform hover:-translate-y-1
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]
              "
            >
              {/* dog-ear */}
              <div
                className="absolute top-0 right-0 w-7 h-7 bg-[#8B5CF6] pointer-events-none"
                style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
              />

              {/* accent bar */}
              <div className="h-2 w-full bg-[#8B5CF6]" />

              {/* media section */}
              <div className="h-[160px] bg-[#151520]">
                <div className="h-full ml-3 overflow-hidden rounded-l-sm">
                  {c.img ? (
                    <img
                      src={c.img}
                      alt={`${c.title} preview`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      draggable={false}
                    />
                  ) : (
                    <div className="h-full w-full bg-black grid place-items-center">
                      <div className="flex items-center gap-2 text-slate-300 text-sm">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="opacity-80">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                        <span>Preview loads on click</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* bottom content */}
              <div className="px-5 pt-4">
                <span className="inline-flex items-center rounded-md px-3 py-1 text-[11px] font-semibold tracking-wide bg-[#8B5CF6] text-white">
                  {c.label}
                </span>
                <h3 className="mt-3 text-[22px] leading-[1.15] font-extrabold text-white">
                  {c.title}
                </h3>
              </div>
            </button>
          ))}
        </div>

        {/* scoped style: remove tiny connector arrows from any legacy styles */}
        <style jsx global>{`
          [data-hide-arrows] *::before,
          [data-hide-arrows] *::after {
            /* wipe any pseudo-element triangles that might be injected elsewhere */
            content: none !important;
          }
        `}</style>
      </div>
    </>
  );
}
