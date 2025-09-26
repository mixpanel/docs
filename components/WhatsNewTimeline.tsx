'use client';

import React, { useMemo, useRef, useState, useEffect } from 'react';
import { getPagesUnderRoute } from 'nextra/context';

type Item = {
  url: string;
  title: string;
  date: string;      // ISO-ish
  description: string;
  types: string[];
};

const changelogPages = getPagesUnderRoute('/changelogs');

function buildItems(): Item[] {
  const parseDate = (s = '') => {
    const m = s.match(/(\d{4}-\d{2}-\d{2})/);
    return m ? m[1] : '';
  };
  const humanize = (s = '') =>
    s.replace(/^\d{4}-\d{2}-\d{2}-/, '')
      .replace(/-/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());

  const toTypes = (fm: any = {}) => {
    const out: string[] = [];
    const cat = fm.category || fm.type;
    if (cat) out.push(String(cat));
    const tags = fm.tags;
    if (Array.isArray(tags)) out.push(...tags.map(String));
    else if (typeof tags === 'string') {
      out.push(
        ...tags.split(',').map((t: string) => t.trim()).filter(Boolean)
      );
    }
    return Array.from(new Set(out.filter(Boolean)));
  };

  return (changelogPages || [])
    .map((p: any) => {
      const fm = p.frontMatter || p.meta || {};
      const route = p.route || '';
      if (!/\/changelogs\/.+/.test(route)) return null; // skip index page
      const name = p.name || route.split('/').pop() || '';
      const date = fm.date || parseDate(name) || parseDate(route);
      return {
        url: route,
        title: fm.title || p.title || humanize(name),
        date,
        description: fm.description || '',
        types: toTypes(fm),
      } as Item;
    })
    .filter(Boolean)
    .sort(
      (a: Item, b: Item) =>
        new Date(b.date || '').getTime() - new Date(a.date || '').getTime()
    );
}

function fmtDate(dateStr: string) {
  const d = new Date(dateStr);
  if (isNaN(d as any)) return dateStr || '';
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}
function fullMonth(dateStr: string) {
  const d = new Date(dateStr);
  if (isNaN(d as any)) return 'Unknown';
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'long' });
}
function y(dateStr: string) {
  const d = new Date(dateStr);
  return isNaN(d as any) ? NaN : d.getFullYear();
}
function ymKey(dateStr: string) {
  const d = new Date(dateStr);
  if (isNaN(d as any)) return '0000-00';
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${yyyy}-${mm}`;
}

export default function WhatsNewTimeline() {
  const items = useMemo(buildItems, []);

  // Years available (desc)
  const years = useMemo(() => {
    const s = new Set<number>();
    for (const i of items) {
      const yy = y(i.date);
      if (!isNaN(yy)) s.add(yy);
    }
    return Array.from(s).sort((a, b) => b - a);
  }, [items]);

  const defaultYear = years[0] ?? new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<number>(defaultYear);

  // Type options (alpha)
  const typeOptions = useMemo(() => {
    const set = new Set<string>();
    for (const i of items) for (const t of (i.types || [])) set.add(t);
    return ['All', ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [items]);
  const [selectedType, setSelectedType] = useState<string>('All');

  // Filter by year and type
  const filtered = useMemo(() => {
    return items.filter(i => {
      const yy = y(i.date);
      if (isNaN(yy) || yy !== selectedYear) return false;
      if (selectedType !== 'All' && !(i.types || []).includes(selectedType)) {
        return false;
      }
      return true;
    });
  }, [items, selectedYear, selectedType]);

  // Group into months (desc by month)
  const monthCols = useMemo(() => {
    const map = new Map<string, Item[]>();
    for (const i of filtered) {
      const k = ymKey(i.date);
      if (!map.has(k)) map.set(k, []);
      map.get(k)!.push(i);
    }
    const arr = Array.from(map.entries()).sort((a, b) => (a[0] < b[0] ? 1 : -1));
    return arr.map(([key, list]) => {
      const label = fullMonth(list[0]?.date || key + '-01');
      const sorted = list.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      return { key, label, list: sorted };
    });
  }, [filtered]);

  // 30d shipped (just for a small stat)
  const shipped30d = useMemo(() => {
    const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
    return items.filter(
      i => !isNaN(new Date(i.date) as any) && new Date(i.date).getTime() >= cutoff
    ).length;
  }, [items]);

  // Horizontal scroller controls
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [canScroll, setCanScroll] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setCanScroll(max > 0);
      setProgress(max <= 0 ? 0 : el.scrollLeft / max);
    };
    update();
    el.addEventListener('scroll', update as any, { passive: true } as any);
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update as any);
      window.removeEventListener('resize', update);
    };
  }, [monthCols.length, selectedYear, selectedType]);

  const page = () => Math.floor((scrollerRef.current?.clientWidth || 0) * 0.9);
  const left = () => scrollerRef.current?.scrollBy({ left: -page(), behavior: 'smooth' });
  const right = () => scrollerRef.current?.scrollBy({ left: page(), behavior: 'smooth' });

  // Year prev/next helpers
  const prevYear = () => {
    const idx = years.indexOf(selectedYear);
    if (idx >= 0 && idx < years.length - 1) setSelectedYear(years[idx + 1]);
  };
  const nextYear = () => {
    const idx = years.indexOf(selectedYear);
    if (idx > 0) setSelectedYear(years[idx - 1]);
  };

  return (
    <section className="nx-not-prose not-prose mx-auto max-w-[120rem]">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Product Updates</h1>
          <p className="mt-1 text-sm text-gray-500">
            Stay up to date with the latest Mixpanel releases, improvements, and experiments.
            We shipped <strong>{shipped30d}</strong> updates in the last 30 days.
          </p>
        </div>

        {/* Year chips + prev/next */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevYear}
            className="rounded border px-2 py-1 text-sm disabled:opacity-40"
            disabled={years.indexOf(selectedYear) === years.length - 1}
            aria-label="Previous year"
          >
            &larr;
          </button>
          <div className="flex gap-2">
            {years.map(yv => (
              <button
                key={yv}
                onClick={() => setSelectedYear(yv)}
                className={[
                  'rounded-full px-3 py-1 text-sm border',
                  yv === selectedYear ? 'bg-white/10' : 'bg-transparent'
                ].join(' ')}
                aria-pressed={yv === selectedYear}
              >
                {yv}
              </button>
            ))}
          </div>
          <button
            onClick={nextYear}
            className="rounded border px-2 py-1 text-sm disabled:opacity-40"
            disabled={years.indexOf(selectedYear) === 0}
            aria-label="Next year"
          >
            &rarr;
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <label htmlFor="typeSel" className="text-sm text-gray-600">Type</label>
        <select
          id="typeSel"
          className="border rounded px-2 py-1 text-sm"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          {typeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        {selectedType !== 'All' && (
          <button
            className="text-sm underline"
            onClick={() => setSelectedType('All')}
            aria-label="Clear type filter"
          >
            Clear
          </button>
        )}
      </div>

      {/* Board scroller */}
      <div className="relative">
        {/* Horizontal lane: grid columns with fixed min width */}
        <div
          ref={scrollerRef}
          className="relative"
          aria-label="Updates timeline board"
          style={{
            overflowX: 'auto',
            overflowY: 'hidden',
            display: 'grid',
            gridAutoFlow: 'column',
            gridAutoColumns: 'minmax(300px, 340px)',
            gap: '24px',
            paddingBottom: '2.5rem',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            maskImage: 'linear-gradient(to right, transparent, black 32px, black calc(100% - 32px), transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 32px, black calc(100% - 32px), transparent)'
          }}
        >
          {monthCols.map(col => (
            <section key={col.key} className="rounded-xl border bg-white/[0.03]">
              <header className="sticky top-0 z-10 bg-white/[0.03] backdrop-blur-sm px-4 py-3 border-b rounded-t-xl">
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="text-base font-semibold">{col.label}</h2>
                  <span className="text-xs text-gray-500">{col.list.length}</span>
                </div>
              </header>

              <ul className="p-2">
                {col.list.map((i) => (
                  <li key={i.url}>
                    <a
                      href={i.url}
                      className="block rounded-lg px-2 py-2 hover:bg-white/5 transition"
                    >
                      <div className="flex items-start gap-3">
                        {/* glyph */}
                        <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-fuchsia-400" aria-hidden="true" />
                        {/* content */}
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2 text-[11px] text-gray-500">
                            <span>{fmtDate(i.date)}</span>
                            {(i.types || []).slice(0, 3).map(t => (
                              <span key={t} className="inline-block rounded bg-white/10 px-1.5 py-0.5">
                                {t}
                              </span>
                            ))}
                          </div>
                          <div className="mt-0.5 font-medium leading-snug">
                            {i.title}
                          </div>
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* progress */}
        {monthCols.length > 0 && (
          <div className="absolute left-0 right-0 bottom-3 h-1 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-fuchsia-500" style={{ width: `${Math.round(progress * 100)}%` }} />
          </div>
        )}

        {/* arrows */}
        {monthCols.length > 0 && (
          <>
            <button
              onClick={left}
              aria-label="Scroll left"
              className="hidden md:flex absolute right-16 bottom-6 translate-y-1/2 rounded-full border bg-white/90 text-black px-3 py-2 shadow"
            >
              &lt;
            </button>
            <button
              onClick={right}
              aria-label="Scroll right"
              className="hidden md:flex absolute right-4 bottom-6 translate-y-1/2 rounded-full border bg-white/90 text-black px-3 py-2 shadow"
            >
              &gt;
            </button>
          </>
        )}
      </div>

      {/* Footer link */}
      <div className="mt-8 text-sm text-gray-500">
        Looking for something older? See the full{' '}
        <a className="underline" href="/changelogs">Changelog</a>.
      </div>
    </section>
  );
}
