'use client';
import React from 'react';
import Image from 'next/image';
import Script from 'next/script';

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

const MP_PURPLE = 'rgb(139 92 246)';
const BORDER_RADIUS = 14;
const CARD_W = 296;
const CARD_H = 319;
const IMAGE_H = 140; // your latest working height
const IMAGE_W = 276;

const styles = {
  grid: {
    display: 'grid',
    gap: 16,
    gridTemplateColumns: 'repeat(auto-fit, minmax(296px, 1fr))',
    justifyContent: 'center',
    marginTop: 28,
  } as React.CSSProperties,

  card: {
    position: 'relative',
    width: CARD_W,
    height: CARD_H,
    borderRadius: BORDER_RADIUS,
    overflow: 'hidden',
    border: `2px solid ${MP_PURPLE}`,
    boxShadow: '0 10px 30px rgba(0,0,0,.25)',
    transition: 'background 0.3s ease, color 0.3s ease',
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
    marginTop: 0,
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

  placeholder: {
    width: '100%',
    height: '100%',
    background: 'var(--sgt-media-bg)',
  } as React.CSSProperties,

  bottom: {
    position: 'absolute' as const,
    top: IMAGE_H + 18,
    left: 0,
    right: 0,
    bottom: 0,
    padding: '14px 16px 18px',
    zIndex: 3,
  },

  badge: {
    display: 'inline-block',
    background: 'var(--sgt-badge-bg)',
    color: 'var(--sgt-badge-fg)',
    fontWeight: 700,
    letterSpacing: '.02em',
    fontSize: 12,
    lineHeight: 1,
    borderRadius: 8,
    padding: '8px 10px',
    marginBottom: 12,
  } as React.CSSProperties,

  title: {
    fontSize: 22,
    fontWeight: 700,
    lineHeight: 1.15,
    margin: 0,
    color: 'var(--sgt-title)',
  } as React.CSSProperties,

  blurb: {
    marginTop: 6,
    fontSize: 14,
    color: 'var(--sgt-blurb)',
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

function CardView({ c }: { c: Card }) {
  const inside = (
    <>
      <div style={styles.dogEar} aria-hidden />
      <div style={styles.mediaWrap}>
        {c.img ? (
          <Image
            src={c.img}
            alt=""
            fill
            style={styles.mediaImg}
            priority={false}
          />
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

  if (c.navatticOpen) {
    return (
      <div style={styles.card} className="sgt-card">
        <button
          type="button"
          style={styles.clickable}
          data-navattic-open={c.navatticOpen}
          data-navattic-title={c.navatticTitle || c.title}
        >
          {inside}
        </button>
      </div>
    );
  }

  if (c.href) {
    return (
      <div style={styles.card} className="sgt-card">
        <a href={c.href} style={styles.clickable}>
          {inside}
        </a>
      </div>
    );
  }

  return (
    <div style={styles.card} className="sgt-card">
      {inside}
    </div>
  );
}

export default function SelfGuidedTours({ cards }: Props) {
  return (
    <>
      <Script src="https://js.navattic.com/embeds.js" strategy="afterInteractive" />
      <div style={styles.grid}>
        {cards.map((c, i) => (
          <CardView key={i} c={c} />
        ))}
      </div>

      {/* Light/Dark theme variables */}
      <style jsx global>{`
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

        @media (prefers-color-scheme: light) {
          :root {
            --sgt-card-bg: #f9f9fb;
            --sgt-title: #111111;
            --sgt-blurb: #333333;
            --sgt-border: ${MP_PURPLE};
            --sgt-media-bg: #d8d8dd;
            --sgt-dogear: ${MP_PURPLE};
            --sgt-badge-bg: ${MP_PURPLE};
            --sgt-badge-fg: #ffffff; /* white text for visibility */
          }
        }

        .sgt-card {
          background: var(--sgt-card-bg);
          color: var(--sgt-title);
          border-color: var(--sgt-border);
        }
      `}</style>
    </>
  );
}
