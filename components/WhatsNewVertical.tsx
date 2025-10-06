'use client';

import React, { useMemo, useState } from 'react';
import { getPagesUnderRoute } from 'nextra/context';

type Item = {
  url: string;
  title: string;
  date: string;
  thumbnail: string;
  videoEmbed?: string; // derived embed URL if a supported video is present
};

const changelogPages = getPagesUnderRoute('/changelogs');

/* ---------- helpers ---------- */
const parseDate = (s = '') => {
  const m = s.match(/(\d{4}-\d{2}-\d{2})/);
  return m ? m[1] : '';
};
const humanize = (s = '') =>
  s.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

const fmtDay = (dateStr: string) => {
  const d = new Date(dateStr);
  if (isNaN(d as any)) return dateStr || '';
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
};

const firstNonEmpty = (...vals: any[]) =>
  vals.find((v) => {
    if (!v) return false;
    if (Array.isArray(v)) return v.length > 0 && typeof v[0] === 'string';
    return typeof v === 'string';
  });

const clampStyle = (lines: number): React.CSSProperties => ({
  display: '-webkit-box',
  WebkitLineClamp: lines,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden'
});

/** Build an embeddable URL for common hosts */
function getVideoEmbedURL(videoURL?: string): string | undefined {
  if (!videoURL) return undefined;
  try {
    const url = new URL(videoURL);
    const host = url.host.replace(/^www\./, '');

    // YouTube
    if (host === 'youtube.com') {
      const id = url.searchParams.get('v') || url.pathname.split('/').pop();
      return id ? `https://www.youtube.com/embed/${id}` : undefined;
    }
    if (host === 'youtu.be') {
      const id = url.pathname.split('/').pop();
      return id ? `https://www.youtube.com/embed/${id}` : undefined;
    }

    // Loom
    if (host === 'loom.com') {
      const id = url.pathname.split('/').pop();
      return id ? `https://www.loom.com/embed/${id}?hideEmbedTopBar=true` : undefined;
    }

    // Vimeo
    if (host === 'vimeo.com') {
      const id = url.pathname.split('/').pop();
      return id ? `https://player.vimeo.com/video/${id}` : undefined;
    }
  } catch {
    // ignore invalid URL
  }
  return undefined;
}

/* ---------- build items (NEWEST → OLDEST) ---------- */
function buildItems(): Item[] {
  return (changelogPages || [])
    .map((p: any) => {
      const fm = p.frontMatter || p.meta || {};
      const route = p.route || '';
      if (!/\/changelogs\/.+/.test(route)) return null;

      const name = p.name || route.split('/').pop() || '';
      const date = fm.date || parseDate(name) || parseDate(route);

      const thumb = firstNonEmpty(
        fm.thumbnail,
        fm.image,
        fm.cover,
        fm.ogImage,
        fm.hero,
        fm.screenshot,
        Array.isArray(fm.images) ? fm.images[0] : undefined
      ) as string | undefined;

      const videoEmbed = getVideoEmbedURL(fm.video);

      return {
        url: route,
        title: fm.title || p.title || humanize(name),
        date,
        thumbnail: thumb || '',
        videoEmbed
      } as Item;
    })
    .filter(Boolean)
    .sort((a: Item, b: Item) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/* ---------- shared inline styles (theme-safe) ---------- */
const TL_X = 12;                     // timeline line X (relative to UL left)
const TL_PAD = TL_X + 16;            // left padding so content clears the gutter

const s = {
  page: { maxWidth: 880, margin: '0 auto' },
  h1: {
    marginTop: 16,
    marginBottom: 0,
    fontSize: '44px',
    lineHeight: 1.1,
    fontWeight: 600 as const,
    letterSpacing: '-0.02em' as const,
  },
  heroP: {
    marginTop: 12,
    fontSize: 15,
    lineHeight: 1.6,
    // color inherits for light/dark
  },
  heroLink: {
    marginTop: 12,
    fontSize: 14,
    textDecoration: 'underline',
    textUnderlineOffset: '4px',
    display: 'inline-block',
  },
  rowBar: {
    marginTop: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  showing: {
    fontSize: 12,
    opacity: 0.7,
  },
  controlsWrap: { whiteSpace: 'nowrap' as const, minWidth: 0 },
  btn: {
    fontSize: 12,
    padding: '6px 8px',
    borderRadius: 6,
    border: '1px solid currentColor',
    background: 'transparent',
    color: 'inherit',
    cursor: 'pointer',
  },
  select: {
    fontSize: 12,
    padding: '6px 8px',
    borderRadius: 6,
    border: '1px solid currentColor',
    background: 'transparent',
    color: 'inherit',
  },
  /* list + timeline */
  list: {
    marginTop: 12,
    listStyle: 'none',
    padding: 0,
    position: 'relative' as const,
    paddingLeft: TL_PAD,
  },
  timelineLine: {
    position: 'absolute' as const,
    left: TL_X,
    top: 0,
    bottom: 0,
    width: 2,
    background: 'currentColor',
    opacity: 0.12,
  },
  /* card */
  cardLi: { padding: '12px 0', position: 'relative' as const },
  cardA: { display: 'block', borderRadius: 12, padding: 12, textDecoration: 'none', color: 'inherit' },
  cardHeader: {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 600 as const,
    lineHeight: 1.2,
    textDecorationThickness: '1px',
    textUnderlineOffset: '4px',
  },
  cardDate: {
    fontSize: 12,
    opacity: 0.6,
  },
  imgWrap: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    aspectRatio: '16 / 9',
    background:
      'radial-gradient(120% 120% at 0% 100%, rgba(168,85,247,0.18), transparent 60%), radial-gradient(120% 120% at 100% 0%, rgba(59,130,246,0.18), transparent 60%)',
  },
  readLink: {
    marginTop: 6,
    fontSize: 13,
    textDecoration: 'underline',
    textUnderlineOffset: '4px',
    display: 'inline-block',
  },
  footerLink: {
    fontSize: 14,
    color: 'rgb(167 139 250)',
    textDecoration: 'underline',
    textUnderlineOffset: '4px',
  },
  /* timeline dot */
  dot: {
    position: 'absolute' as const,
    left: -(TL_PAD - TL_X),
    top: 12,
    width: 8,
    height: 8,
    borderRadius: 999,
    background: 'rgb(167 139 250)',
    boxShadow: '0 0 0 2px rgba(20,20,30,0.9)',
  },
  /* NEW badge */
  newBadge: {
    marginLeft: 8,
    fontSize: 11,
    fontWeight: 700 as const,
    letterSpacing: '0.02em',
    color: 'rgb(26, 26, 31)',
    background: 'linear-gradient(90deg, rgba(167,139,250,0.95), rgba(99,102,241,0.95))',
    borderRadius: 999,
    padding: '2px 6px',
    lineHeight: 1.1,
    verticalAlign: 'middle',
  },

  /* text-only mode */
  textOnly: {
    marginTop: 4,
  },
  divider: {
    height: 1,
    background: 'currentColor',
    opacity: 0.1,
    margin: '6px 0 2px',
  },
  readLinkSmall: {
    fontSize: 13,
    textDecoration: 'underline',
    textUnderlineOffset: '4px',
  },
};

/* ---------- control components ---------- */
function ControlsTop({
  pageSize,
  canPrev,
  canNext,
  changeSize,
  prev,
  next,
}: {
  pageSize: number;
  canPrev: boolean;
  canNext: boolean;
  changeSize: (n: number) => void;
  prev: () => void;
  next: () => void;
}) {
  return (
    <div style={s.controlsWrap}>
      <span style={{ fontSize: 13, opacity: 0.7, marginRight: 6 }}>Show</span>
      <select style={s.select} value={pageSize} onChange={(e) => changeSize(Number(e.target.value))}>
        {[5, 10, 15, 20].map((n) => (
          <option key={n} value={n}>
            Latest {n}
          </option>
        ))}
      </select>
      <button onClick={prev} disabled={!canPrev} style={{ ...s.btn, marginLeft: 8 }}>
        &larr; Prev
      </button>
      <button onClick={next} disabled={!canNext} style={{ ...s.btn, marginLeft: 6 }}>
        Next &rarr;
      </button>
    </div>
  );
}

function ControlsBottom({
  canPrev,
  canNext,
  prev,
  next,
}: {
  canPrev: boolean;
  canNext: boolean;
  prev: () => void;
  next: () => void;
}) {
  return (
    <div style={s.controlsWrap}>
      <button onClick={prev} disabled={!canPrev} style={s.btn}>
        &larr; Prev
      </button>
      <button onClick={next} disabled={!canNext} style={{ ...s.btn, marginLeft: 6 }}>
        Next &rarr;
      </button>
    </div>
  );
}

/* ---------- card ---------- */
function Row({ item }: { item: Item }) {
  // NEW badge if within last 14 days
  const isNew = (() => {
    const d = new Date(item.date);
    if (isNaN(d as any)) return false;
    const days = (Date.now() - d.getTime()) / (1000 * 60 * 60 * 24);
    return days <= 14;
  })();

  const hasThumb = !!item.thumbnail;
  const hasVideo = !!item.videoEmbed;
  const hasMedia = hasThumb || hasVideo;

  return (
    <li style={s.cardLi} role="listitem">
      {/* timeline dot */}
      <span aria-hidden="true" style={s.dot} />

      <a href={item.url} style={s.cardA} aria-label={`Read update: ${item.title}`}>
        <div style={s.cardHeader}>
          <h3 style={{ ...s.cardTitle, ...clampStyle(2) }} title={item.title}>
            {item.title}
            {isNew && <span style={s.newBadge}>NEW</span>}
          </h3>
          <div style={s.cardDate}>{fmtDay(item.date)}</div>
        </div>

        {hasMedia ? (
          <div style={s.imgWrap}>
            {hasVideo ? (
              <iframe
                src={item.videoEmbed}
                title="Video"
                allow="clipboard-write; encrypted-media; picture-in-picture"
                allowFullScreen
                style={{ width: '100%', height: '100%', border: 0, display: 'block' }}
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.thumbnail}
                alt=""
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            )}
          </div>
        ) : (
          // Text-only compact mode (no blank gradient box)
          <div style={s.textOnly}>
            <div style={s.divider} />
            <span style={s.readLinkSmall}>Read update →</span>
          </div>
        )}
      </a>
    </li>
  );
}

/* ---------- main ---------- */
export default function WhatsNewVertical() {
  const items = useMemo(buildItems, []);

  // paging (Latest X)
  const [pageSize, setPageSize] = useState<number>(5);
  const [offset, setOffset] = useState<number>(0);

  const total = items.length;
  const start = offset;
  const end = Math.min(offset + pageSize, total);
  const page = items.slice(start, end);

  const canPrev = start > 0;
  const canNext = end < total;

  const changeSize = (n: number) => {
    setPageSize(n);
    setOffset(0);
  };
  const prev = () => setOffset(Math.max(0, offset - pageSize));
  const next = () => setOffset(Math.min(total, offset + pageSize));

  return (
    <section className="nx-not-prose not-prose" style={s.page}>
      {/* HERO */}
      <div>
        <h1 style={s.h1}>What&apos;s New</h1>

        <p style={s.heroP}>
          <strong>Track Mixpanel product releases and improvements in one place.</strong> See what’s
          new, what got faster, and what opens up entirely new ways to answer questions about your
          product. These changes are built from customer feedback and real workflows—less setup,
          fewer manual steps, clearer answers.
        </p>
        <p style={s.heroP}>
          From performance boosts to streamlined analysis and collaboration, each release is here to
          shorten the path from “what happened?” to “what should we do?”. Browse the highlights below
          and put the most impactful updates to work on your team today.
        </p>

        <a href="/changelogs" style={s.heroLink}>
          Browse Changelog
        </a>
      </div>

      {/* TOP BAR — single line */}
      <div style={s.rowBar}>
        <div style={s.showing}>
          Showing {total === 0 ? 0 : start + 1}–{end} of {total}
        </div>
        <ControlsTop
          pageSize={pageSize}
          canPrev={canPrev}
          canNext={canNext}
          changeSize={changeSize}
          prev={prev}
          next={next}
        />
      </div>

      {/* LIST + TIMELINE */}
      <ul style={s.list} role="list">
        <div aria-hidden="true" style={s.timelineLine} />
        {page.map((item) => (
          <Row key={item.url} item={item} />
        ))}
      </ul>

      {/* BOTTOM BAR — single line */}
      <div style={{ ...s.rowBar, marginTop: 32 }}>
        <div>
          <a href="/changelogs" style={s.footerLink}>
            Browse the full Changelog →
          </a>
        </div>
        <ControlsBottom canPrev={canPrev} canNext={canNext} prev={prev} next={next} />
      </div>
    </section>
  );
}
