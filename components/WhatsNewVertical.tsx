'use client';

import React, { useMemo, useState } from 'react';
import { getPagesUnderRoute } from 'nextra/context';

type Item = {
  url: string;
  title: string;
  date: string;
  thumbnail: string;
  summary?: string; // NOTE: shown only if explicitly provided in frontmatter
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

/* ---------- build items (NEWEST → OLDEST) ---------- */
function buildItems(): Item[] {
  return (changelogPages || [])
    .map((p: any) => {
      const fm = p.frontMatter || p.meta || {};
      const route = p.route || '';
      if (!/\/changelogs\/.+/.test(route)) return null; // skip index

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

      return {
        url: route,
        title: fm.title || p.title || humanize(name),
        date,
        thumbnail: thumb || '',
        summary: fm.summary || '' // only render if explicitly set
      } as Item;
    })
    .filter(Boolean)
    .sort((a: Item, b: Item) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/* ---------- controls ---------- */
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
    <div className="inline-flex items-center gap-2 whitespace-nowrap">
      <span className="text-sm text-gray-500">Show</span>
      <select
        className="border rounded px-2 py-1 text-sm"
        value={pageSize}
        onChange={(e) => changeSize(Number(e.target.value))}
        aria-label="Select how many latest updates to show"
      >
        {[5, 10, 15, 20].map((n) => (
          <option key={n} value={n}>
            Latest {n}
          </option>
        ))}
      </select>

      <button
        onClick={prev}
        disabled={!canPrev}
        className="ml-2 rounded border px-2 py-1 text-sm disabled:opacity-40"
        aria-label="Previous batch"
        title="Previous batch"
      >
        &larr; Prev
      </button>
      <button
        onClick={next}
        disabled={!canNext}
        className="rounded border px-2 py-1 text-sm disabled:opacity-40"
        aria-label="Next batch"
        title="Next batch"
      >
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
    <div className="inline-flex items-center gap-2 whitespace-nowrap">
      <button
        onClick={prev}
        disabled={!canPrev}
        className="rounded border px-2 py-1 text-sm disabled:opacity-40"
        aria-label="Previous batch"
        title="Previous batch"
      >
        &larr; Prev
      </button>
      <button
        onClick={next}
        disabled={!canNext}
        className="rounded border px-2 py-1 text-sm disabled:opacity-40"
        aria-label="Next batch"
        title="Next batch"
      >
        Next &rarr;
      </button>
    </div>
  );
}

/* ---------- card ---------- */
function Row({ item }: { item: Item }) {
  const headerRow: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  };

  const imgWrap: React.CSSProperties = {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    aspectRatio: '16 / 9',
    background:
      'radial-gradient(120% 120% at 0% 100%, rgba(168,85,247,0.18), transparent 60%), radial-gradient(120% 120% at 100% 0%, rgba(59,130,246,0.18), transparent 60%)',
  };

  return (
    <li style={{ padding: '12px 0' }}>
      <a href={item.url} className="block rounded-xl hover:bg-white/5 transition p-3">
        {/* Title (bigger) left · Date right */}
        <div style={headerRow}>
          <h3
            className="text-[20px] font-semibold leading-tight hover:underline underline-offset-4"
            style={clampStyle(2)}
            title={item.title}
          >
            {item.title}
          </h3>
          <div className="text-[12px] text-gray-500">{fmtDay(item.date)}</div>
        </div>

        {/* Image */}
        <div style={imgWrap}>
          {item.thumbnail ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.thumbnail}
              alt=""
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          ) : (
            <div style={{ width: '100%', height: '100%' }} />
          )}
        </div>

        {/* Summary: ONLY if frontmatter.summary is present */}
        {item.summary ? (
          <p className="mt-2 text-[14px] text-gray-400" style={clampStyle(3)}>
            {item.summary}
          </p>
        ) : null}

        <div className="mt-1">
          <span className="text-[13px] underline underline-offset-4">Read update →</span>
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
    setOffset(0); // reset to newest window when size changes
  };
  const prev = () => setOffset(Math.max(0, offset - pageSize));
  const next = () => setOffset(Math.min(total, offset + pageSize));

  return (
    <section className="nx-not-prose not-prose" style={{ maxWidth: 880, margin: '0 auto' }}>
      {/* HERO */}
      <div>
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight">What&apos;s New</h1>

        {/* Two paragraphs with spacing */}
        <p className="mt-4 text-[15px] text-gray-300 leading-relaxed">
          <strong>Track Mixpanel product releases and improvements in one place.</strong> See what’s
          new, what got faster, and what opens up entirely new ways to answer questions about your
          product. These changes are built from customer feedback and real workflows—less setup,
          fewer manual steps, clearer answers.
        </p>
        <p className="mt-3 text-[15px] text-gray-300 leading-relaxed">
          From performance boosts to streamlined analysis and collaboration, each release is here to
          shorten the path from “what happened?” to “what should we do?”. Browse the highlights below
          and put the most impactful updates to work on your team today.
        </p>

        {/* Optional subtle secondary link */}
        <div className="mt-3">
          <a className="rounded-md border px-3 py-1.5 text-sm hover:bg-white/5" href="/changelogs">
            Browse Changelog
          </a>
        </div>
      </div>

      {/* CONTROLS ROW: same line (left + right) with spacing from hero */}
      <div className="mt-6 grid grid-cols-[1fr_auto] items-center gap-3">
        <div className="text-xs text-gray-500">
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

      {/* LIST */}
      <ul className="mt-3 divide-y divide-white/10">
        {page.map((item) => (
          <Row key={item.url} item={item} />
        ))}
      </ul>

      {/* FOOTER BAR: one line (left link · right controls) */}
      <div className="mt-8 grid grid-cols-[1fr_auto] items-center gap-3">
        <div className="text-sm">
          <a className="text-violet-400 underline underline-offset-4" href="/changelogs">
            Browse the full Changelog →
          </a>
        </div>
        <ControlsBottom canPrev={canPrev} canNext={canNext} prev={prev} next={next} />
      </div>
    </section>
  );
}
