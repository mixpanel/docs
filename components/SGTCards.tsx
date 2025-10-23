'use client';
import React from 'react';

type Card = {
  title: string;
  badge: string;
  blurb?: string;
  img?: string;
  href?: string;
};

const MP_PURPLE = 'rgb(139 92 246)';
const BLACK = '#0a0a0b';
const BORDER_RADIUS = 14;
const CARD_W = 296;
const CARD_H = 319;
const IMAGE_H = 168;

const styles = {
  // NEW: flex grid with wrap, 24px gaps, margin-top for spacing,
  // and maxWidth = 3 cards + 2 gaps (296*3 + 24*2 = 936)
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 24,
    marginTop: 28,      // ← extra spacing from the text above
    maxWidth: 936,      // ← locks default to 3 cards per row
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
    flex: `0 0 ${CARD_W}px`,
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
  } as React.CSSProperties,

  mediaWrap: {
    height: IMAGE_H,
    marginLeft: 10,
    marginTop: 10,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    overflow: 'hidden',
    background: '#111',
  } as React.CSSProperties,

  mediaImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  } as React.CSSProperties,

  placeholder: {
    width: '100%',
    height: '100%',
    background: BLACK,
  } as React.CSSProperties,

  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: '14px 16px 18px',
    background: BLACK,
    color: 'white',
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
    fontSize: 28,
    fontWeight: 700,
    lineHeight: 1.05,
    margin: 0,
  } as React.CSSProperties,

  blurb: {
    marginTop: 6,
    opacity: 0.85,
    fontSize: 14,
  } as React.CSSProperties,

  link: {
    textDecoration: 'none',
    color: 'inherit',
    display: 'block',
    width: '100%',
    height: '100%',
  } as React.CSSProperties,
};

function CardView({ c }: { c: Card }) {
  const inside = (
    <>
      <div style={styles.dogEar} aria-hidden />
      <div style={styles.mediaWrap}>
        {c.img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={c.img} alt="" style={styles.mediaImg} />
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

  return (
    <div style={styles.card}>
      {c.href ? (
        <a href={c.href} style={styles.link} aria-label={c.title}>
          {inside}
        </a>
      ) : (
        inside
      )}
    </div>
  );
}

export default function SGTCards({ cards }: { cards: Card[] }) {
  return (
    <div style={styles.grid}>
      {cards.map((c, i) => (
        <CardView key={i} c={c} />
      ))}
    </div>
  );
}
