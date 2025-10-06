'use client';

import React, { useMemo, useState, useRef } from 'react';
import { getPagesUnderRoute } from 'nextra/context';

type Item = {
  url: string;
  title: string;
  date: string;
  thumbnail: string;
  // NEW: optional media
  videoSrc?: string;       // self-hosted .mp4/.webm/etc
  videoPoster?: string;    // optional poster for the <video>
  youtubeId?: string;      // youtube id if provided
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

// quick YouTube id guesser (supports full URL or id)
const getYoutubeId = (val?: string) => {
  if (!val) return '';
  // already an id-like token
  if (/^[a-zA-Z0-9_-]{6,}$/.test(val)) return val;

  // url patterns
  const m =
    val.match(/[?&]v=([a-zA-Z0-9_-]{6,})/) ||
    val.match(/youtu\.be\/([a-zA-Z0-9_-]{6,})/) ||
    val.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{6,})/);

  return m ? m[1] : '';
};

const isVideoFile = (src?: string) =>
  !!src && /\.(mp4|webm|ogg|ogv|mov)$/i.test(src);

/* ---------- build items (NEWEST → OLDEST) ---------- */
function buildItems(): Item[] {
  return (changelogPages || [])
    .map((p: any) => {
      const fm = p.frontMatter || p.meta || {};
      const route = p.route || '';
      if (!/\/changelogs\/.+/.test(route)) return null;

      const name = p.name || route.split('/').pop() || '';
      const date = fm.date || parseDate(name) || parseDate(route);

      // thumbnail first (same as your original)
      const thumb = firstNonEmpty(
        fm.thumbnail,
        fm.image,
        fm.cover,
        fm.ogImage,
        fm.hero,
        fm.screenshot,
        Array.isArray(fm.images) ? fm.images[0] : undefined
      ) as string | undefined;

      // NEW: try to detect video
      const rawVideo =
        fm.video ||
        fm.videoUrl ||
        fm.mp4 ||
        fm.webm ||
        fm.media;

      let videoSrc: string | undefined;
      let videoPoster: string | undefined = fm.videoPoster || fm.poster || thumb;

      if (typeof rawVideo === 'string' && isVideoFile(rawVideo)) {
        videoSrc = rawVideo;
      } else if (rawVideo && typeof rawVideo === 'object') {
        // allow { src, poster }
        if (rawVideo.src && isVideoFile(rawVideo.src)) {
          videoSrc = rawVideo.src;
          videoPoster = rawVideo.poster || videoPoster;
        }
      }

      // NEW: YouTube support if no self-hosted video
      let youtubeId: string | undefined;
      if (!videoSrc) {
        youtubeId = getYoutubeId(fm.youtube || fm.youtubeId || fm.yt);
      }

      return {
        url: route,
        title: fm.title || p.title || humanize(name),
        date,
        thumbnail: thumb || '',
        videoSrc,
        videoPoster,
        youtubeId
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
    // color inherits (theme-safe)
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
  cardA: { display: 'block', borderRadius: 12, padding: 12, textDecoration: 'none' },
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
    position: 'relative' as const,
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
    background:
      'linear-gradient(90deg, rgba(167,139,250,0.95), rgba(99,102,241,0.95))',
    borderRadius: 999,
    padding: '2px 6px',
    lineHeight: 1.1,
    verticalAlign: 'middle',
  },
  // play overlay (for YouTube thumbnail & videos)
  playOverlay: {
    position: 'absolute' as const,
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: 56,
    height: 56,
    borderRadius: '50%',
    background: 'rgba(0,0,0,0.55)',
    boxShadow: '0 2px 16px rgba(0,0,0,0.35)',
    display: 'grid',
    placeItems: 'center',
    color: 'white',
    pointerEvents: 'none' as const
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeft: '14px solid white',
    borderTop: '8px solid transparent',
    borderBottom: '8px solid transparent',
    marginLeft: 4
  }
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
  const vidRef = useRef<HTMLVideoElement | null>(null);

  // NEW badge if within last 14 days
  const isNew = (() => {
    const d = new Date(item.date);
    if (isNaN(d as any)) return false;
    const days = (Date.now() - d.getTime()) / (1000 * 60 * 60 * 24);
    return days <= 14;
  })();

  // handlers for hover play (self-hosted video only)
  const maybePlay = () => {
    const v = vidRef.current;
    if (!v) return;
    // don’t auto-play on mobile
    if (window.matchMedia('(pointer:fine)').matches) {
      v.play().catch(() => {});
    }
  };
  const maybePause = () => {
    const v = vidRef.current;
    if (!v) return;
    v.pause();
    try { v.currentTime = 0; } catch {}
  };

  // YouTube thumbnail if we have an id and no image/video
  const youtubeThumb = item.youtubeId
    ? `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`
    : '';

  const showImage = !!item.thumbnail || !!youtubeThumb;
  const imageSrc = item.thumbnail || youtubeThumb;

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

        <div
          style={s.imgWrap}
          onMouseEnter={maybePlay}
          onFocus={maybePlay}
          onMouseLeave={maybePause}
          onBlur={maybePause}
        >
          {showImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageSrc!}
              alt=""
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          )}

          {!showImage && item.videoSrc && (
            <video
              ref={vidRef}
              src={item.videoSrc}
              poster={item.videoPoster}
              muted
              playsInline
              preload="none"
              // no controls for feed
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          )}

          {/* Play overlay for both video & YT thumbnail (purely visual) */}
          {(item.videoSrc || item.youtubeId) && (
            <span aria-hidden="true" style={s.playOverlay}>
              <span style={s.triangle} />
            </span>
          )}
        </div>

        <div>
          <span style={s.readLink}>Read update →</span>
        </div>
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

        <a href="/changelogs" style={s.heroLink} aria-label="Browse the full Mixpanel changelog">
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
