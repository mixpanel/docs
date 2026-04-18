'use client';
import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

/**
 * Card data shape passed from MDX.
 * - title: Main title for the board template
 * - description: Supporting text explaining the template
 * - img: Preview image src (314x139 pixels recommended)
 * - createUrl: Destination for the main card click (Create flow)
 * - previewUrl: Destination for the "Preview Board" iframe modal
 */
type TemplateCard = {
  title: string;
  description: string;
  img: string;
  createUrl: string;
  previewUrl: string;
};

interface Props {
  templates: TemplateCard[];
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

  /**
   * Anchored text block:
   * - Badge top is locked to IMAGE_H + offset so all cards align visually
   * - Title and description naturally flow below the badge
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
    cursor: 'pointer',
    border: 'none',
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

/* ---- One card view (handles primary board creation and secondary preview) ---- */
function CardView({
  t,
  onNavigate,
  onPreview
}: {
  t: TemplateCard;
  onNavigate: (url: string) => void;
  onPreview: (url: string, title: string) => void;
}) {
  return (
    <div style={styles.card} className="sgt-card">
      <button
        type="button"
        style={styles.clickable}
        className="sgt-click"
        onClick={() => onNavigate(t.createUrl)}
      >
        <div style={styles.dogEar} aria-hidden />
        <div style={styles.mediaWrap}>
          <Image src={t.img} alt="" fill style={styles.mediaImg} priority={false} />
        </div>

        <div style={styles.bottom}>
          <div
            style={styles.badge}
            onClick={(e) => {
              e.stopPropagation(); // Prevents createUrl navigation
              onPreview(t.previewUrl, t.title);
            }}
          >
            PREVIEW BOARD
          </div>
          <h3 style={styles.title}>{t.title}</h3>
          <div style={styles.blurb}>{t.description}</div>
        </div>
      </button>
    </div>
  );
}

/**
 * BoardTemplates
 * - Renders a responsive grid of board template cards
 * - Shows an iframe modal overlay for board previews for a consistent experience
 */
export default function BoardTemplates({ templates }: Props) {
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
        {templates.map((t, i) => (
          <CardView
            key={i}
            t={t}
            onNavigate={(url) => router.push(url)}
            onPreview={openInline}
          />
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
              width: 'calc(100vw - 160px)',
              height: 'calc(100vh - 144px)',
              background: '#F3F4F6',
              borderRadius: 12,
              overflow: 'hidden',
              boxShadow: '0 10px 40px rgba(0,0,0,.5)',
              position: 'relative',
            }}
          >
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
                <span style={{ fontSize: 14, fontWeight: 500 }}>Previewing Template</span>
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
