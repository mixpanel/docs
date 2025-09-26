'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { getPagesUnderRoute } from 'nextra/context';

type Item = {
  url: string;
  title: string;
  date: string;
  description: string;
  thumbnail: string;
  video: string;
  category: string;
};

const changelogPages = getPagesUnderRoute('/changelogs');

function buildItems(): Item[] {
  const parseDate = (s = '') => {
    const m = s.match(/(\d{4}-\d{2}-\d{2})/);
    return m ? m[1] : '';
  };
  const humanize = (s = '') =>
    s.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  return (changelogPages || [])
    .map((p: any) => {
      const fm = p.frontMatter || p.meta || {};
      const route = p.route || '';
      if (!/\/changelogs\/.+/.test(route)) return null;
      const name = p.name || route.split('/').pop() || '';
      const date = fm.date || parseDate(name) || parseDate(route);
      return {
        url: route,
        title: fm.title || p.title || humanize(name),
        date,
        description: fm.description || '',
        thumbnail: fm.thumbnail || '',
        video: fm.video || '',
        category: String(fm.category || fm.type || ''),
      } as Item;
    })
    .filter(Boolean)
    .sort((a: Item, b: Item) => new Date(b.date || '').getTime() - new Date(a.date || '').getTime());
}

function fmtDate(dateStr: string) {
  const d = new Date(dateStr);
  if (isNaN(d as any)) return dateStr || '';
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}
function isNew(dateStr: string) {
  const d = new Date(dateStr);
  if (isNaN(d as any)) return false;
  const days = (Date.now() - d.getTime()) / (1000 * 60 * 60 * 24);
  return days <= 14;
}

const Tile = ({ item }: { item: Item }) => (
  <a
    href={item.url}
    className="block h-full rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border hover:shadow-lg transition"
  >
    <div className="p-5">
      <div className="text-xs uppercase tracking-wide text-gray-500 flex items-center gap-2">
        {fmtDate(item.date)}
        {item.category && <span>• {item.category}</span>}
        {isNew(item.date) && (
          <span className="ml-2 inline-block px-1.5 py-0.5 text-[10px] rounded bg-emerald-100 text-emerald-700">
            NEW
          </span>
        )}
      </div>
      <h3 className="mt-2 text-xl font-semibold leading-snug line-clamp-2">{item.title}</h3>
      {item.description && <p className="mt-2 text-sm opacity-90 line-clamp-3">{item.description}</p>}

      <div className="relative mt-5 h-56 rounded-xl overflow-hidden bg-black/10">
        {item.thumbnail ? (
          <img src={item.thumbnail} alt="" loading="lazy" className="w-full h-full object-cover" />
        ) : (
          <div
            className="w-full h-full"
            style={{
              background:
                'radial-gradient(120% 120% at 0% 100%, rgba(168,85,247,0.25), transparent 60%), radial-gradient(120% 120% at 100% 0%, rgba(59,130,246,0.25), transparent 60%)',
            }}
          />
        )}
        <div className="pointer-events-none absolute inset-0" style={{ boxShadow: 'inset 0 0 120px rgba(255,255,255,0.15)' }} />
      </div>

      <div className="mt-4">
        <span className="inline-flex items-center gap-1 text-sm font-medium underline">
          Read update <span aria-hidden="true">&rarr;</span>
        </span>
      </div>
    </div>
  </a>
);

function Carousel({ items }: { items: Item[] }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [canScroll, setCanScroll] = useState(false);
  const [progress, setProgress] = useState(0);

  const TILE_W = 420;
  const GAP = 24;

  useEffect(() => {
    const el = ref.current;
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
  }, [items.length]);

  const page = () => Math.max(TILE_W + GAP, Math.floor((ref.current?.clientWidth || 0) * 0.9));
  const left = () => ref.current?.scrollBy({ left: -page(), behavior: 'smooth' });
  const right = () => ref.current?.scrollBy({ left: page(), behavior: 'smooth' });

  return (
    <div className="relative nx-not-prose not-prose" style={{ isolation: 'isolate' }}>
      {/* Backdrop glow behind scroller */}
      <div
        aria-hidden="true"
        className="absolute -inset-x-8 -top-8 -bottom-6 rounded-[40px] pointer-events-none -z-10"
        style={{
          background:
            'radial-gradient(60% 80% at 10% 0%, rgba(168,85,247,0.25), transparent 70%), radial-gradient(60% 80% at 90% 100%, rgba(59,130,246,0.25), transparent 70%)',
          filter: 'blur(20px)',
        }}
      />

      {/* Scroller (no edge-fade mask) */}
      <div
        ref={ref}
        aria-label="Latest updates"
        style={{
          position: 'relative',
          zIndex: 1,
          overflowX: 'auto',
          overflowY: 'hidden',
          paddingBottom: '2.5rem',
          display: 'flex',
          flexWrap: 'nowrap',
          gap: `${GAP}px`,
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          maskImage: 'none',
          WebkitMaskImage: 'none',
        }}
      >
        {items.map((i) => (
          <div key={i.url} style={{ flex: `0 0 ${TILE_W}px`, minWidth: `${TILE_W}px` }}>
            <Tile item={i} />
          </div>
        ))}
      </div>

      {canScroll && (
        <div className="absolute left-0 right-0 bottom-3 h-1 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full bg-fuchsia-500" style={{ width: `${Math.round(progress * 100)}%` }} />
        </div>
      )}

      {canScroll && (
        <>
          <button
            onClick={left}
            aria-label="Previous"
            className="hidden md:flex absolute right-16 bottom-6 translate-y-1/2 rounded-full border bg-white/90 text-black px-3 py-2 shadow"
          >
            &lt;
          </button>
          <button
            onClick={right}
            aria-label="Next"
            className="hidden md:flex absolute right-4 bottom-6 translate-y-1/2 rounded-full border bg-white/90 text-black px-3 py-2 shadow"
          >
            &gt;
          </button>
        </>
      )}
    </div>
  );
}

export default function WhatsNewPromo() {
  const items = useMemo(buildItems, []);
  const shipped30d = useMemo(() => {
    const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
    return items.filter(i => !isNaN(new Date(i.date) as any) && new Date(i.date).getTime() >= cutoff).length;
  }, [items]);

  return (
    <section className="nx-not-prose not-prose mx-auto max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-4">
          <h1 className="text-4xl font-bold tracking-tight">New releases</h1>
          <p className="mt-3 text-base opacity-80">
            Learn more about our newly released capabilities. We shipped <strong>{shipped30d}</strong> updates in the last 30 days.
          </p>
        </div>
        <div className="lg:col-span-8">
          <Carousel items={items.slice(0, 16)} />
        </div>
      </div>

      <div className="mt-8 text-sm opacity-70">
        Do not see what you are looking for? See the full <a className="underline" href="/changelogs">Changelog</a>.
      </div>
    </section>
  );
}
