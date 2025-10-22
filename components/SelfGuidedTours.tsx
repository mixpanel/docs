import React from "react";
import Script from "next/script";

type Card = {
  title: string;
  label: string;
  img?: string;         // keep image support
  popupUrl?: string;    // Navattic popup
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
      {/* Navattic loader */}
      <Script src="https://js.navattic.com/embeds.js" strategy="afterInteractive" />

      {/* New card grid */}
      <section className="nx-not-prose not-prose" data-sgt-root>
        {version ? (
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-fuchsia-600/15 text-fuchsia-300 px-3 py-1 text-xs font-medium">
            Self-Guided Tours v{version}
          </div>
        ) : null}

        <div className="flex flex-wrap gap-8">
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
                bg-[#0B0A13] text-white
                border-2 border-[#8B5CF6]                /* PURPLE BORDER */
                shadow-md hover:shadow-xl
                transition-transform hover:-translate-y-1
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]
              "
            >
              {/* Dog-ear */}
              <div
                className="absolute top-0 right-0 w-7 h-7 bg-[#8B5CF6] pointer-events-none"
                style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
              />

              {/* Top accent bar */}
              <div className="h-2 w-full bg-[#8B5CF6]" />

              {/* Image area (indented slightly to the right) */}
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

              {/* Text area */}
              <div className="px-5 pt-4">
                <span className="inline-flex items-center rounded-md px-3 py-1 text-[11px] font-semibold tracking-wide bg-[#8B5CF6] text-white">
                  {c.label}
                </span>
                <h3 className="mt-3 text-[22px] leading-[1.15] font-extrabold">{c.title}</h3>
              </div>
            </button>
          ))}
        </div>
      </section>
    </>
  );
}
