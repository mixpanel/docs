import React from "react";
import Script from "next/script";

type Card = {
  title: string;
  label: string;
  img?: string;       // if absent -> black placeholder
  popupUrl?: string;  // Navattic demo URL
};

// Mixpanel-ish accent (purple) that reads in both themes
const ACCENT = "#6E56CF"; // tweak if you have a stricter brand token

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
    // no img -> black fallback
    popupUrl: "https://capture.navattic.com/YOUR_SECOND_DEMO_ID",
  },
  {
    title: "Customizing the Lead Page",
    label: "CRM",
    // no img -> black fallback
    popupUrl: "https://capture.navattic.com/YOUR_THIRD_DEMO_ID",
  },
];

export default function SelfGuidedTours({ version }: { version?: string }) {
  // left “indent” used by image & text to match the reference card
  const insetPx = 12; // ~ml-3

  return (
    <>
      {/* Navattic pop-up loader */}
      <Script src="https://js.navattic.com/embeds.js" strategy="afterInteractive" />

      <div className="nx-not-prose not-prose mt-8">
        {/* Optional little version chip in the grid header */}
        {version ? (
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-fuchsia-600/15 text-fuchsia-300 px-3 py-1 text-xs font-medium">
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
              // EXACT size to match the reference
              style={{ width: 296, height: 319 }}
              className={[
                "relative overflow-hidden rounded-[14px]",
                "border border-gray-200/60 dark:border-[#2A2A35]",
                // black bottom area requested (works in light & dark)
                "bg-[#0B0A13]",
                "shadow-md hover:shadow-xl transition-transform hover:-translate-y-0.5",
                "focus:outline-none focus-visible:ring-2",
              ].join(" ")}
            >
              {/* Dog-ear in Mixpanel purple */}
              <div
                className="absolute top-0 right-0 w-7 h-7 pointer-events-none"
                style={{
                  background: ACCENT,
                  clipPath: "polygon(100% 0, 0 0, 100% 100%)",
                }}
              />

              {/* Thin top accent bar (full width) */}
              <div
                className="w-full"
                style={{ height: 8, background: ACCENT }}
              />

              {/* Media area — slightly indented to the right */}
              <div className="h-[160px] bg-[#13131C]">
                <div
                  className="h-full overflow-hidden rounded-l-sm"
                  style={{ marginLeft: insetPx }}
                >
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

              {/* Body — aligned to the same inset as the image */}
              <div className="pt-4 pr-4" style={{ paddingLeft: insetPx + 8 }}>
                <span
                  className="inline-flex items-center rounded-md px-2.5 py-1 text-[11px] font-semibold tracking-wide"
                  style={{ background: ACCENT, color: "#fff" }}
                >
                  {c.label}
                </span>

                {/* Title (short description) */}
                <h3 className="mt-3 text-[20px] leading-[1.15] font-extrabold text-white">
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
