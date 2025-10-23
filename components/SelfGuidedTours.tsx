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
const BLACK = '#0a0a0b';
const BORDER_RADIUS = 14;
const CARD_W = 296;
const CARD_H = 319;

// keep your current height
const IMAGE_H = 275;

const styles = {
  grid: {
    display: 'grid',
    gap: 16,
    // 3-up by default but remains responsive when the window shrinks
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
    background: BLACK,
    color: 'white',
    boxShadow: '0 10px 30px rgba(0,0,0,.25)',
  } as React.CSSProperties,

  dogEar: {
    position: 'absolute',
    right: 10,
    top: 10,
    width: 22,
    height: 22,
    background: MP_PURPLE,
    clipPath: 'polygon(0 0, 100% 0, 100% 100%)',
    boxShadow: '0 0 0 2px rgba(0,0,0,.15) inset',
    zIndex: 5,              // above image/text
    pointerEvents: 'none',
  } as React.CSSProperties,

  // keep left indent; bleed to right border
  mediaWrap: {
    position: 'relative',
    height: IMAGE_H,
    marginLeft: 16,         // align with badge
    marginRight: -16,       // touch right border
    marginTop: 0,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    overflow: 'hidden',
    background: '#111',
    zIndex: 1,              // under dog-ear and text
  } as React.CSSProperties,

  mediaImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'left top', // keep left edge visible
    display: 'block',
  } as React.CSSProperties,

  placeholder: {
    width: '100%',
    height: '100%',
    background: BLACK,
  } as React.CSSProperties,

  // 👇 key change: anchor this block to a fixed TOP that starts just
  // below the image so the badge/title/blurb align across all cards
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: IMAGE_H,      // starts just under the image (consistent)
    bottom: 0,              // stretch down; content overlays the lower area
    padding: '14px 16px 18px',
    background: BLACK,
    color: 'white',
    zIndex: 3,
  } as React.CSSProperties,

  badge: {
    display: 'inline-block',
    background: MP_PURPLE,
    color: 'black',
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
  } as React.CSSProperties,

  blurb: {
    marginTop: 6,
    opacity: 0.85,
    fontSize: 14,
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

  if (c.navatticOpen) {
    return (
      <div style={styles.card}>
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
      <div style={styles.card}>
        <a href={c.href} style={styles.clickable}>
          {inside}
        </a>
      </div>
    );
  }

  return <div style={styles.card}>{inside}</div>;
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
    </>
  );
}
