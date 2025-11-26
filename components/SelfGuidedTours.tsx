'use client';
import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

/**
 * Card data shape passed from MDX.
 * - navatticOpen: the Navattic demo id (e.g., "cmfkxwfa5000004lc8408f5wi")
 * - navatticTitle: optional; title for the Navattic popup chrome
 * - img: optional; if omitted, a dark placeholder fills the media area
 */
type Card = {
  badge: string;
  title: string;
  blurb?: string;
  img?: string;
  href?: string;
  navatticOpen?: string;
  navatticTitle?: string;
};

interface Props {
  cards: Card[];
}

/* ---- Constants / design tokens (keep in sync with MDX usage) ---- */
const MP_PURPLE = 'rgb(139 92 246)';
const BORDER_RADIUS = 14;
const CARD_W = 296;
const CARD_H = 319;
/** Image height is fixed for consistent badge anchoring */
const IMAGE_H = 140;
/** Image width is indented left and bleeds to the right edge */
const IMAGE_W = 276;

/* ---- Inline “CSS-in-TS” styles (layout is pixel-exact to your spec) ---- */
const styles = {
  grid: {
    display: 'grid',
    gap: 20,
    gridTemplateColumns: 'repeat(auto-fit, minmax(296px, 1fr))',
    justifyContent: 'center',
    marginTop: 32,
  } as React.CSSProperties,

  card: {
    position: 'relative',
    width: CARD_W,
    height: CARD_H,
    borderRadius: BORDER_RADIUS,
    overflow: 'hidden',
    border: `2px solid ${MP_PURPLE}`,
    boxShadow: '0 10px 30px rgba(0,0,0,.25)',
    transition: 'transform .25s ease, box-shadow .25s ease, background .3s ease, color .3s ease',
  } as React.CSSProperties,

  dogEar: {
    position: 'absolute',
    right: 10,
    top: 10,
    width: 22,
    height: 22,
    background: 'var(--sgt-dogear)',
    clipPath: 'polygon(0 0, 100% 0, 100% 100%)',
    boxShadow: '0 0 0 2px rgba(0,0,0,.15) inset',
    zIndex: 5,
    pointerEvents: 'none',
  } as React.CSSProperties,

  mediaWrap: {
    position: 'absolute',
    top: 18,              // aligns the image to the badge’s left indent
    height: IMAGE_H,
    width: IMAGE_W,
    marginLeft: 16,       // left indent (aligns with badge)
    marginRight: -16,     // bleed to right edge (no right indent)
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    overflow: 'hidden',
    background: 'var(--sgt-media-bg)', // placeholder color behind images
    zIndex: 1,
  } as React.CSSProperties,

  mediaImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'left top',
    display: 'block',
  } as React.CSSProperties,

  placeholder: {
    width: '100%',
    height: '100%',
    background: 'var(--sgt-media-bg)',
  } as React.CSSProperties,

  /**
   * Anchored text block:
   * - Badge top is locked to IMAGE_H + offset so all cards align visually
   * - Title and blurb naturally flow below the badge
   */
  bottom: {
    position: 'absolute' as const,
    top: IMAGE_H + 22,
    left: 0,
    right: 0,
    bottom: 0,
    padding: '16px 18px 22px',
    zIndex: 3,
  },

  /* Badge = stronger weight + tighter tracking for a pill look */
  badge: {
    display: 'inline-block',
    background: 'var(--sgt-badge-bg)',
    color: 'var(--sgt-badge-fg)',
    fontWeight: 800,
    letterSpacing: '.04em',
    fontSize: '11.5px',
    lineHeight: 1,
    borderRadius: 8,
    padding: '8px 10px',
    marginBottom: 10,
  } as React.CSSProperties,

  title: {
    fontSize: 23,
    fontWeight: 700,
    lineHeight: 1.2,
    margin: 0,
    color: 'var(--sgt-title)',
  } as React.CSSProperties,

  blurb: {
    marginTop: 8,
    fontSize: 15,
    color: 'var(--sgt-blurb)',
    opacity: 0.75,
  } as React.CSSProperties,

  clickable: {
    display: 'block',
    width: '100%',
    height: '100%',
    background: 'transparent',
    border: 0,
    padding: 0,
    cursor: 'pointer',
    textAlign: 'inherit',
  } as React.CSSProperties,
};

/* ---- One card view (supports Navattic popup or plain link) ---- */
function CardView({
  c,
  openInline, // inline overlay opener (provided by parent)
}: {
  c: Card;
  openInline?: (url: string, title: string) => void;
}) {
  const inside = (
    <>
      <div style={styles.dogEar} aria-hidden />
      <div style={styles.mediaWrap}>
        {c.img ? (
          <Image src={c.img} alt="" fill style={styles.mediaImg} priority={false} />
        ) : (
          <div style={styles.placeholder} />
        )}
      </div>

      <div style={styles.bottom}>
        <div style={styles.badge}>{c.badge}</div>
        <h3 style={styles.title}>{c.title}</h3>
        {c.blurb ? <div style={styles.blurb}>{c.blurb}</div> : null}
      </div>
    </>
  );

  // Always open inline overlay if a Navattic URL is provided (consistent UX)
  if (c.navatticOpen) {
    const navatticUrl = c.navatticOpen.startsWith('http')
      ? c.navatticOpen
      : `https://capture.navattic.com/${c.navatticOpen}`;

    return (
      <div style={styles.card} className="sgt-card">
        <button
          type="button"
          style={styles.clickable}
          className="sgt-click"
          data-navattic-open={navatticUrl}
          data-navattic-title={c.navatticTitle || c.title}
          onClick={(e) => {
            e.preventDefault();
            openInline?.(navatticUrl, c.navatticTitle || c.title);
          }}
        >
          {inside}
        </button>
      </div>
    );
  }

  // Fallback to href links if needed
  if (c.href) {
    return (
      <div style={styles.card} className="sgt-card">
        <a href={c.href} style={styles.clickable} className="sgt-click">
          {inside}
        </a>
      </div>
    );
  }

  // Static (non-clickable) card
  return (
    <div style={styles.card} className="sgt-card">
      {inside}
    </div>
  );
}

/**
 * SelfGuidedTours
 * - Renders a responsive grid of product-tour cards
 * - Shows a modal overlay for tours for a consistent experience
 */
export default function SelfGuidedTours({ cards }: Props) {
  const router = useRouter();

  // Inline overlay state
  const [inlineUrl, setInlineUrl] = useState<string | null>(null);
  const [inlineTitle, setInlineTitle] = useState<string>('');

  const openInline = useCallback((url: string, title: string) => {
    setInlineTitle(title);
    setInlineUrl(url);
  }, []);
  const closeInline = useCallback(() => setInlineUrl(null), []);

  // Close modal on route changes (avoid lingering overlay)
  useEffect(() => {
    const onStart = () => closeInline();
    router.events.on('routeChangeStart', onStart);
    return () => router.events.off('routeChangeStart', onStart);
  }, [router.events, closeInline]);

  // ESC to close + lock background scroll while open
  useEffect(() => {
    if (inlineUrl) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') closeInline();
      };
      window.addEventListener('keydown', onKey);
      return () => {
        window.removeEventListener('keydown', onKey);
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [inlineUrl, closeInline]);

  return (
    <>
      {/* Grid */}
      <div style={styles.grid}>
        {cards.map((c, i) => (
          <CardView key={i} c={c} openInline={openInline} />
        ))}
      </div>

      {/* Inline overlay */}
      {inlineUrl && (
        <div
          role="dialog"
          aria-label={inlineTitle}
          onClick={closeInline}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15,23,42,0.55)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '90vw',
              height: '80vh',
              background: 'transparent',
              borderRadius: 12,
              overflow: 'hidden',
              boxShadow: '0 10px 40px rgba(0,0,0,.5)',
              position: 'relative',
            }}
          >
            {/* Header bar styled to closely match Navattic's */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 48,
                background: '#F9FAFB',
                color: '#111827',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 16px',
                borderBottom: '1px solid #E5E7EB',
                zIndex: 3,
              }}
            >
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                {/* Left icon + label (no pill) */}
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 40,
                      height: 34,
                      border: '1px solid #E5E7EB',
                      borderRadius: 10,
                      background: '#F3F4F6',
                    }}
                  >
                    {/* SVG from original Navattic header (adjusted to TSX) */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ color: '#111827' }}
                    >
                      <path d="M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" />
                      <path d="m12 12 4 10 1.7-4.3L22 16Z" />
                    </svg>
                  </div>
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                    }}
                  >
                    Viewing Interactive Demo
                  </span>
                </div>

                {/* Title pill */}
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '8px 16px',
                    borderRadius: 999,
                    background: '#FFFFFF',
                    border: '1px solid #D1D5DB',
                    boxShadow: '0 1px 2px rgba(15,23,42,0.05)',
                    fontWeight: 500,
                    fontSize: 14,
                    lineHeight: 1.1,
                  }}
                >
                  {inlineTitle}
                </span>
              </div>

              <button
                onClick={closeInline}
                aria-label="Close"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 12,
                  border: '1px solid #D1D5DB',
                  background: '#FFFFFF',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: 22,
                  fontWeight: 500,
                  lineHeight: 1,
                  color: '#111827',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                }}
              >
                ×
              </button>
            </div>

            {/* iframe body, positioned below header */}
            <iframe
              title={inlineTitle}
              src={inlineUrl}
              style={{
                width: '100%',
                height: 'calc(100% - 48px)',
                border: 0,
                position: 'absolute',
                top: 48,
              }}
              allow="clipboard-write; fullscreen"
            />
          </div>
        </div>
      )}

      {/* Theme variables + interactions */}
      <style jsx global>{`
        /* ---- Dark defaults ---- */
        :root {
          --sgt-card-bg: #0a0a0b;
          --sgt-title: #ffffff;
          --sgt-blurb: rgba(255, 255, 255, 0.85);
          --sgt-border: ${MP_PURPLE};
          --sgt-media-bg: #111111;
          --sgt-dogear: ${MP_PURPLE};
          --sgt-badge-bg: ${MP_PURPLE};
          --sgt-badge-fg: #ffffff;
        }

        /* ---- Prefer light scheme (also covered below by class/attr) ---- */
        @media (prefers-color-scheme: light) {
          :root,
          html.light,
          html[class*='light'],
          [data-theme='light'] {
            --sgt-card-bg: #ffffff;
            --sgt-title: #111111;
            --sgt-blurb: #333333;
            --sgt-border: ${MP_PURPLE};
            --sgt-media-bg: #e9e9ef;
            --sgt-dogear: ${MP_PURPLE};
            --sgt-badge-bg: ${MP_PURPLE};
            --sgt-badge-fg: #ffffff;
          }
        }

        /* ---- Explicit site light mode (Mixpanel Docs sets html.light) ---- */
        html.light,
        html[class*='light'],
        [data-theme='light'] {
          --sgt-card-bg: #ffffff;
          --sgt-title: #111111;
          --sgt-blurb: #333333;
          --sgt-border: ${MP_PURPLE};
          --sgt-media-bg: #e9e9ef;
          --sgt-dogear: ${MP_PURPLE};
          --sgt-badge-bg: ${MP_PURPLE};
          --sgt-badge-fg: #ffffff;
        }

        /* ---- Card base colors ---- */
        .sgt-card {
          background: var(--sgt-card-bg);
          color: var(--sgt-title);
          border-color: var(--sgt-border);
        }

        /* ---- Micro-interactions ---- */
        .sgt-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(139, 92, 246, 0.25);
        }
        .sgt-card:focus-within {
          outline: 2px solid ${MP_PURPLE};
          outline-offset: 2px;
        }
        .sgt-click:focus-visible {
          outline: 2px solid ${MP_PURPLE};
          outline-offset: 3px;
          border-radius: 10px;
        }

        /* ---- Responsive type bump on very wide screens ---- */
        @media (min-width: 1280px) {
          .sgt-card h3 { font-size: 24px; }
          .sgt-card p { font-size: 15px; }
        }
      `}</style>
    </>
  );
}
