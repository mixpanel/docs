'use client';

import React, { useMemo, useState } from 'react';
import { getPagesUnderRoute } from 'nextra/context';

type Item = {
  url: string;
  title: string;
  date: string;
  thumbnail: string;
  description?: string;
};

const changelogPages = getPagesUnderRoute('/changelogs');

// ---------- helpers ----------
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

// Count items in last 30 days
const countLast30d = (items: Item[]) => {
  const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
  return items.filter((i) => {
    const t = new Date(i.date).getTime();
    return !isNaN(t) && t >= cutoff;
  }).length;
};

// ---------- build items (NEWEST first) ----------
function buildItems(): Item[] {
  return (changelogPages || [])
    .map((p: any) => {
      const fm = p.frontMatter || p.meta || {};
      const route = p.route || '';
      if (!/\/changelogs\/.+/.test(route)) return null; // skip index

      const name = p.name || route.split('/').pop() || '';
      const date = fm.date || parseDate(name) || parseDate(route);

      // smart thumbnail fallback across common keys
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
        description: fm.description || ''
      } as Item;
    })
    .filter(Boolean)
    .sort((a: Item, b: Item) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .reverse();
}

// ---------- minor utilities ----------
const clampStyle = (lines: number): React.CSSProperties => ({
  display: '-webkit-box',
  WebkitLineClamp: lines,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden'
});

function SubscribeButton() {
  // Tries to open the existing changelog modal (if present on the page).
  const onClick = () => {
    try {
      // Example hooks you might have on /changelogs:
      // 1) A button with data attribute to open modal
      const trigger =
        (document.querySelector('[data-changelog-subscribe]') as HTMLElement) ||
        (document.querySelector('button[aria-label="Subscribe"]') as HTMLElement);
      if (trigger) {
        trigger.click();
        return;
      }
      // 2) A global function (if exposed)
      // @ts-ignore
      if (typeof window.openChangelogSubscribe === 'function') {
        // @ts-ignore
        window.openChangelogSubscribe();
        return;
      }
    } catch {}
    // Fallback
    window.location.href = '/changelogs#subscribe';
  };

  return (
    <button
      onClick={onClick}
      className="rounded-md bg-violet-600 px-3 py-1.5 text-sm font-medium hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400"
    >
      Subscribe
    </button>
  );
}

// ---------- Controls ----------
function ControlsTop({
  pageSize,
  canPrev,
  canNext,
  changeSize,
  prev,
  next
}: {
  pageSize: number;
  canPrev: boolean;
  canNext: boolean;
  changeSize: (n: number) => void;
  prev: () => void;
  next: () => void;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span className="text-sm text-gray-500">Show</span>
      <select
        className="border rounded px-2 py-1 text-sm"
        value={pageSize}
        onChange={(e) => changeSize(Number(e.target.value))}
        aria-label="Select how many latest updates to show"
      >
        {[5, 10, 15, 20].map(n => (
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
  next
}: {
  canPrev: boolean;
  canNext: boolean;
  prev: () => void;
  next: () => void;
}) {
  return (
    <div className="mt-6 flex items-center gap-2">
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

// ---------- Card ----------
function Row({ item }: { item: Item }) {
  const headerRow: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8
  };

  const imgWrap: React.CSSProperties = {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    aspectRatio: '16 / 9',
    background:
      'radial-gradient(120% 120% at 0% 100%, rgba(168,85,247,0.18), transparent 60%), radial-gradient(120% 120% at 100% 0%, rgba(59,130,246,0.18), transparent 60%)'
  };

  return (
    <li style={{ padding: '12px 0' }}>
      <a href={item.url} className="block rounded-xl hover:bg-white/5 transition p-3">
        {/* Title (2 lines) left, date right */}
        <div style={headerRow}>
          <h3
            className="text-[16px] font-semibold leading-tight"
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

        {/* Summary (3 lines) if present */}
        {item.description ? (
          <p className="mt-2 text-[14px] text-gray-400" style={clampStyle(3)}>
            {item.description}
          </p>
        ) : null}

        {/* Inline read link */}
        <div className="mt-1">
          <span className="text-[13px] underline underline-offset-4">Read update →</span>
        </div>
      </a>
    </li>
  );
}

// ---------- Main ----------
export default function WhatsNewVertical() {
  const items = useMemo(buildItems, []);
  const shipped30 = countLast30d(items);

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
    setOffset(0); // back to newest window on size change
  };
  const prev = () => setOffset(Math.max(0, offset - pageSize));
  const next = () => setOffset(Math.min(total, offset + pageSize));

  // Header grid: hero left, controls right
  const headerGrid: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16
  };

  return (
    <section className="nx-not-prose not-prose" style={{ maxWidth: 880, margin: '0 auto' }}>
      {/* Hero (Variant B) */}
      <div style={headerGrid}>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">What&apos;s New</h1>
          <p className="mt-1 text-sm text-gray-400">
            Stay up to date with Mixpanel product releases and improvements. We shipped{' '}
            <strong>{shipped30}</strong> updates in the last 30 days.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <SubscribeButton />
            <a
              className="rounded-md border px-3 py-1.5 text-sm hover:bg-white/5"
              href="/changelogs"
            >
              Browse Changelog
            </a>
          </div>
        </div>

        {/* Top controls */}
        <ControlsTop
          pageSize={pageSize}
          canPrev={canPrev}
          canNext={canNext}
          changeSize={changeSize}
          prev={prev}
          next={next}
        />
      </div>

      {/* Status */}
      <div className="mb-3 text-xs text-gray-500">
        Showing {total === 0 ? 0 : start + 1}–{end} of {total}
      </div>

      {/* List */}
      <ul className="divide-y divide-white/10">
        {page.map((item) => (
          <Row key={item.url} item={item} />
        ))}
      </ul>

      {/* Bottom controls (Prev/Next only) */}
      <ControlsBottom canPrev={canPrev} canNext={canNext} prev={prev} next={next} />

      {/* CTA */}
      <div className="mt-6 text-sm">
        <a className="text-violet-400 underline underline-offset-4" href="/changelogs">
          Browse the full Changelog →
        </a>
      </div>
    </section>
  );
}
