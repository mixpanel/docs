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
      return {
        url: route,
        title: fm.title || p.title || humanize(name),
        date,
        thumbnail: fm.thumbnail || ''
      } as Item;
    })
    .filter(Boolean)
    .sort((a: Item, b: Item) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .reverse();
}

// ---------- UI ----------
function Row({ item }: { item: Item }) {
  return (
    <li className="py-2">
      <a href={item.url} className="block rounded-lg hover:bg-white/5 transition p-3">
        <div className="flex items-start gap-4">
          {/* compact media (between preview and old size) */}
          <div className="shrink-0 w-[120px] h-[72px] rounded-md overflow-hidden bg-black/10">
            {item.thumbnail ? (
              <img src={item.thumbnail} alt="" loading="lazy" className="w-full h-full object-cover" />
            ) : (
              <div
                className="w-full h-full"
                style={{
                  background:
                    'radial-gradient(120% 120% at 0% 100%, rgba(168,85,247,0.18), transparent 60%), radial-gradient(120% 120% at 100% 0%, rgba(59,130,246,0.18), transparent 60%)'
                }}
              />
            )}
          </div>

          <div className="min-w-0">
            <div className="text-[12px] text-gray-500">{fmtDay(item.date)}</div>
            <h3 className="mt-0.5 text-[15px] leading-snug font-medium line-clamp-2">
              {item.title}
            </h3>
          </div>
        </div>
      </a>
    </li>
  );
}

export default function WhatsNewVertical() {
  const items = useMemo(buildItems, []);

  // paging (Latest X)
  const [pageSize, setPageSize] = useState<number>(5); // default to 5 to match preview feel
  const [offset, setOffset] = useState<number>(0);

  const total = items.length;
  const start = offset;
  const end = Math.min(offset + pageSize, total);
  const page = items.slice(start, end);

  const canPrev = start > 0;
  const canNext = end < total;

  const changeSize = (n: number) => {
    setPageSize(n);
    setOffset(0); // reset to latest batch when size changes
  };

  const prev = () => setOffset(Math.max(0, offset - pageSize));
  const next = () => setOffset(Math.min(total, offset + pageSize));

  return (
    <section className="nx-not-prose not-prose mx-auto max-w-2xl">
      {/* Header row */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">What&apos;s New</h1>

        {/* Controls aligned top-right */}
        <div className="flex items-center gap-2">
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
            Prev
          </button>
          <button
            onClick={next}
            disabled={!canNext}
            className="rounded border px-2 py-1 text-sm disabled:opacity-40"
            aria-label="Next batch"
            title="Next batch"
          >
            Next
          </button>
        </div>
      </div>

      {/* status */}
      <div className="mb-3 text-xs text-gray-500">
        Showing {total === 0 ? 0 : start + 1}–{end} of {total}
      </div>

      {/* list */}
      <ul className="divide-y divide-white/10">
        {page.map((item) => (
          <Row key={item.url} item={item} />
        ))}
      </ul>

      {/* footer link */}
      <div className="mt-6 text-sm text-gray-500">
        Looking for more? See the full <a className="underline" href="/changelogs">Changelog</a>.
      </div>
    </section>
  );
}
