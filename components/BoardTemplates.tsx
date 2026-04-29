'use client';
import React from 'react';
import Image from 'next/image';

/**
 * Card data shape passed from MDX.
 * - title: Main title for the board template
 * - description: Supporting text explaining the template
 * - img: Preview image src (314x160 pixels recommended)
 * - previewUrl: Destination for the new tab preview
 * - bg: Optional custom background color (hex or rgba)
 */
type TemplateCard = {
  title: string;
  description: string;
  img: string;
  previewUrl: string;
  bg?: string;
};

interface Props {
  templates: TemplateCard[];
}

/* ---- Constants / design tokens (keep in sync with MDX usage) ---- */
const MP_PURPLE = 'rgb(139 92 246)';
const BORDER_RADIUS = 14;
const CARD_W = 296;
const CARD_H = 319;
/** Fixed image height for consistent alignment */
const IMAGE_H = 160;
/** Adjusted to 280 to ensure flush bleed to right edge (296 - 16 = 280) */
const IMAGE_W = 280;

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
    border: `2px solid var(--sgt-border)`,
    boxShadow: '0 10px 30px var(--sgt-shadow)',
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
    top: 18,
    height: IMAGE_H,
    width: IMAGE_W,
    marginLeft: 16,
    marginRight: -16,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    overflow: 'hidden',
    background: 'var(--sgt-media-bg)',
    zIndex: 1,
  } as React.CSSProperties,

  mediaImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'left top',
    display: 'block',
  } as React.CSSProperties,

  bottom: {
    position: 'absolute' as const,
    top: IMAGE_H + 22,
    left: 0,
    right: 0,
    bottom: 0,
    padding: '12px 18px 22px',
    zIndex: 3,
  },

  title: {
    fontSize: 21,
    fontWeight: 700,
    lineHeight: 1.1,
    margin: 0,
    color: 'var(--sgt-title)',
  } as React.CSSProperties,

  blurb: {
    marginTop: 4,
    fontSize: 14,
    lineHeight: 1.3,
    color: 'var(--sgt-blurb)',
    opacity: 0.85,
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

function CardView({ t }: { t: TemplateCard }) {
  const handleOpen = () => {
    window.open(t.previewUrl, '_blank', 'noopener,noreferrer');
  };

  /**
   * If a background color is provided:
   * 1. Set background to custom color
   * 2. Invert text to white for legibility
   */
  const customBgStyle = t.bg ? {
    background: t.bg,
    '--sgt-title': '#ffffff',
    '--sgt-blurb': 'rgba(255,255,255,0.9)',
    '--sgt-dogear': MP_PURPLE
  } as React.CSSProperties : {};

  return (
    <div style={{ ...styles.card, ...customBgStyle }} className="sgt-card">
      <button
        type="button"
        style={styles.clickable}
        className="sgt-click"
        onClick={handleOpen}
      >
        <div style={styles.dogEar} aria-hidden />
        <div style={styles.mediaWrap}>
          <Image src={t.img} alt="" fill style={styles.mediaImg} priority={false} />
        </div>

        <div style={styles.bottom}>
          <h3 style={styles.title}>{t.title}</h3>
          <div style={styles.blurb}>{t.description}</div>
        </div>
      </button>
    </div>
  );
}

export default function BoardTemplates({ templates }: Props) {
  return (
    <>
      <div style={styles.grid}>
        {templates.map((t, i) => (
          <CardView key={i} t={t} />
        ))}
      </div>

      <style jsx global>{`
        /* ---- Dark defaults (Base) ---- */
        :root {
          --sgt-card-bg: #0a0a0b;
          --sgt-title: #ffffff;
          --sgt-blurb: rgba(255, 255, 255, 0.85);
          --sgt-border: ${MP_PURPLE};
          --sgt-media-bg: #111111;
          --sgt-dogear: ${MP_PURPLE};
          --sgt-shadow: rgba(0, 0, 0, 0.4);
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
            --sgt-media-bg: #f3f4f6;
            --sgt-dogear: ${MP_PURPLE};
            --sgt-shadow: rgba(139, 92, 246, 0.12);
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
          --sgt-media-bg: #f3f4f6;
          --sgt-dogear: ${MP_PURPLE};
          --sgt-shadow: rgba(139, 92, 246, 0.12);
        }

        /* ---- Card base colors ---- */
        .sgt-card {
          background: var(--sgt-card-bg);
          color: var(--sgt-title);
          border-color: var(--sgt-border);
          box-shadow: 0 10px 30px var(--sgt-shadow);
        }

        /* ---- Micro-interactions ---- */
        .sgt-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 35px rgba(139, 92, 246, 0.25);          
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
          .sgt-card h3 { font-size: 22px; }
          .sgt-card p { font-size: 14px; }
        }
      `}</style>
    </>
  );
}
