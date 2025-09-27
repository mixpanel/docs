'use client';

import React, { useMemo, useState } from 'react';
import { getPagesUnderRoute } from 'nextra/context';

type Item = {
  url: string;
  title: string;
  date: string;
  thumbnail: string;
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

// ---------- build items (newest first) ----------
function buildItems(): Item[] {
  return (changelogPages || [])
    .map((p: any) => {
      const fm = p.frontMatter || p.meta || {};
      const route = p.route || '';
      if (!/\/changelogs\/.+/.test(route)) return null; // skip /changelogs index
      const name = p.name || route.split('/').pop() || '';
      const date = fm.date || parseDate(name) || parseDate(route);
      const thumb =
        fm.thumbnail || fm.image || fm.cover || fm.screenshot || fm.hero || '';
      return {
        url: route,
        title: fm.title || p.title || humanize(name),
        date,
        thumbnail: thumb
      } as Item;
    })
    .filter(Boolean)
    .sort((a: Item, b: Item) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .reverse();
}

// ---------- UI ----------
function Row({ item }: { item: Item }) {
  // explicit inline sizing so we’re not relying on arbitrary Tailwind sizes
  const thumbStyle: React.CSSProperties = {
    width: 120,
    height: 72,
    borderRadius: 8,
    overflow: 'hidden',
    background: 'rgba(0,0,0,0.1)',
    flex: '0 0 auto'
  };

  const titleStyle: React.CSSProperties = {
    marginTop: 2,
    fontSize: 15,
    fontWeight: 600,
    lineHeight: 1.25,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  };

  return (
    <li style={{ padding: '8px 0' }}>
      <a href={item.url} className="block rounded-lg hover:bg-white/5 transition" style={{ padding: 12 }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <div style={thumbStyle}>
            {item.thumbnail ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.thumbnail}
                alt=""
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background:
                    'radial-gradient(120% 120% at 0% 100%, rgba(168,85,247,0.18), transparent 60%), radial-gradient(120% 120% at 100% 0%, rgba(59,130,246,0.18), transparent 60%)'
                }}
              />
            )}
          </div>

          <div style={{ minWidth: 0 }}>
            <div className="text-[12px] text-gray-500">{fmtDay(item.date)}</div>
            <h3 style={titleStyle}>{item.title}</h3>
          </div>
        </div>
      </a>
    </li>
  );
}

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
    setOffset(0); // reset to latest
  };

  const prev = () => setOffset(Math.max(0, offset - pageSize));
  const next = () => setOffset(Math.min(total, offset + pageSize));

  // header grid keeps controls pinned right even on narrow center columns
  const headerGrid: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16
  };

  return (
    <section className="nx-not-prose not-prose" style={{ maxWidth: 720, margin: '0 auto' }}>
      <div style={headerGrid}>
        <h1 className="text-3xl font-semibold tracking-tight">What&apos;s New</h1>

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
            className="rounded border px-2 py-1 text-sm disabled:opacity-40"
            aria-label="Previous batch"
            title="Previous batch"
            style={{ marginLeft: 8 }}
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
      </div>

      <div className="text-xs text-gray-500" style={{ marginBottom: 8 }}>
        Showing {total === 0 ? 0 : start + 1}–{end} of {total}
      </div>

      <ul className="divide-y divide-white/10">
        {page.map((item) => (
          <Row key={item.url} item={item} />
        ))}
      </ul>

      <div className="mt-6 text-sm text-gray-500">
        Looking for more? See the full <a className="underline" href="/changelogs">Changelog</a>.
      </div>
    </section>
  );
}
