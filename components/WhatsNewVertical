'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { getPagesUnderRoute } from 'nextra/context';

type Item = {
  url: string;
  title: string;
  date: string;
  description: string;
  thumbnail: string;
  types: string[];
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
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
};
const fullMonth = (dateStr: string) => {
  const d = new Date(dateStr);
  if (isNaN(d as any)) return 'Unknown';
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'long' });
};
const ymKey = (dateStr: string) => {
  const d = new Date(dateStr);
  if (isNaN(d as any)) return '0000-00';
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${yyyy}-${mm}`;
};

// Mixpanel-flavored category normalization (lightweight)
const normalizeCategories = (raw: string[], title: string): string[] => {
  const txt = (title || '').toLowerCase();
  const set = new Set<string>();
  const add = (k: string) => set.add(k);

  const addFrom = (s: string) => {
    const v = s.toLowerCase();
    if (/session\s*replay/.test(v)) add('Session Replay');
    else if (/lexicon/.test(v)) add('Lexicon');
    else if (/(metric|dashboard|report|insight|funnel|cohort)/.test(v)) add('Core Analytics');
    else if (/(sdk|ios|android|javascript|react native|flutter)/.test(v)) add('SDKs');
    else if (/api|export|pipeline|warehouse/.test(v)) add('APIs & Pipelines');
    else if (/(segment|rudder|snowflake|bigquery|dbt|integration)/.test(v)) add('Integrations');
    else if (/(privacy|security|gdpr|governance)/.test(v)) add('Governance & Privacy');
    else if (/(billing|pricing|admin)/.test(v)) add('Admin & Billing');
    else if (/(experiment|beta|flag)/.test(v)) add('Experiments');
  };

  raw?.forEach(addFrom);
  addFrom(txt);
  if (set.size === 0) add('Feature');
  return Array.from(set);
};

const palette: Record<string, string> = {
  'Session Replay': '#22c55e',
  'Lexicon': '#06b6d4',
  'Core Analytics': '#8b5cf6',
  'SDKs': '#f59e0b',
  'APIs & Pipelines': '#0ea5e9',
  'Integrations': '#10b981',
  'Governance & Privacy': '#ef4444',
  'Admin & Billing': '#f97316',
  'Experiments': '#eab308',
  'Feature': '#d946ef'
};
const colorFor = (cat?: string) => palette[cat || 'Feature'] || palette['Feature'];
const chipStyle = (cat?: string) => {
  const base = colorFor(cat);
  return {
    backgroundColor: `${base}1A`,
    border: `1px solid ${base}33`,
    color: base
  } as React.CSSProperties;
};

// ---------- build items ----------
function buildItems(): Item[] {
  return (changelogPages || [])
    .map((p: any) => {
      const fm = p.frontMatter || p.meta || {};
      const route = p.route || '';
      if (!/\/changelogs\/.+/.test(route)) return null;
      const name = p.name || route.split('/').pop() || '';
      const date = fm.date || parseDate(name) || parseDate(route);

      const raw: string[] = (() => {
        const out: string[] = [];
        const cat = fm.category || fm.type;
        if (cat) out.push(String(cat));
        const tags = fm.tags;
        if (Array.isArray(tags)) out.push(...tags.map(String));
        else if (typeof tags === 'string') out.push(...tags.split(',').map((t: string) => t.trim()).filter(Boolean));
        return out;
      })();

      return {
        url: route,
        title: fm.title || p.title || humanize(name),
        date,
        description: fm.description || '',
        thumbnail: fm.thumbnail || '',
        types: normalizeCategories(raw, fm.title || p.title || name)
      } as Item;
    })
    .filter(Boolean)
    .sort((a: Item, b: Item) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// ---------- UI ----------
function Card({ item }: { item: Item }) {
  return (
    <a href={item.url} className="block w-full rounded-lg hover:bg-white/5 transition p-3">
      <div className="flex gap-3">
        {/* compact media */}
        <div className="shrink-0 w-[128px] h-[80px] rounded-md overflow-hidden bg-black/10">
          {item.thumbnail ? (
            <img src={item.thumbnail} alt="" loading="lazy" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full" style={{
              background:
                'radial-gradient(120% 120% at 0% 100%, rgba(168,85,247,0.2), transparent 60%), radial-gradient(120% 120% at 100% 0%, rgba(59,130,246,0.2), transparent 60%)'
            }} />
          )}
        </div>

        {/* text content */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-gray-500">
            <span>{fmtDay(item.date)}</span>
            {(item.types || []).slice(0, 2).map((t) => (
              <span key={t} className="inline-block rounded px-1.5 py-0.5" style={chipStyle(t)}>
                {t}
              </span>
            ))}
          </div>
          <h3 className="mt-0.5 text-[15px] font-medium leading-snug line-clamp-2">{item.title}</h3>
          {item.description && (
            <p className="mt-0.5 text-sm text-gray-500 line-clamp-2">{item.description}</p>
          )}
        </div>
      </div>
    </a>
  );
}

export default function WhatsNewVertical() {
  const items = useMemo(buildItems, []);

  // Group by month (desc)
  const groups = useMemo(() => {
    const map = new Map<string, Item[]>();
    for (const it of items) {
      const k = ymKey(it.date);
      if (!map.has(k)) map.set(k, []);
      map.get(k)!.push(it);
    }
    const arr = Array.from(map.entries()).sort((a, b) => (a[0] < b[0] ? 1 : -1));
    return arr.map(([key, list]) => {
      const label = fullMonth(list[0]?.date || key + '-01');
      const sorted = list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      return { key, label, list: sorted };
    });
  }, [items]);

  // Default: only newest 2 months expanded
  const defaultOpen = useMemo(() => new Set(groups.slice(0, 2).map(g => g.key)), [groups]);
  const [open, setOpen] = useState<Set<string>>(defaultOpen);

  useEffect(() => { setOpen(new Set(groups.slice(0, 2).map(g => g.key))); }, [groups]);

  const toggle = (k: string) => {
    setOpen(prev => {
      const s = new Set(prev);
      if (s.has(k)) s.delete(k); else s.add(k);
      return s;
    });
  };

  const expandAll = () => setOpen(new Set(groups.map(g => g.key)));
  const collapseAll = () => setOpen(new Set(groups.slice(0, 2).map(g => g.key)));

  // small stat
  const shipped30d = useMemo(() => {
    const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
    return items.filter(i => !isNaN(new Date(i.date) as any) && new Date(i.date).getTime() >= cutoff).length;
  }, [items]);

  return (
    <section className="nx-not-prose not-prose mx-auto max-w-3xl">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">What&apos;s New</h1>
        <p className="mt-1 text-sm text-gray-500">
          Vertical compact view. Latest <strong>2 months</strong> are expanded; older months are collapsed.
          We shipped <strong>{shipped30d}</strong> updates in the last 30 days.
        </p>
        <div className="mt-3 flex gap-2">
          <button onClick={expandAll} className="rounded border px-3 py-1 text-sm">Expand all</button>
          <button onClick={collapseAll} className="rounded border px-3 py-1 text-sm">Collapse to recent</button>
        </div>
      </header>

      <div className="space-y-4">
        {groups.map(g => {
          const isOpen = open.has(g.key);
          return (
            <section key={g.key} className="rounded-xl border bg-white/[0.03]">
              {/* Month header */}
              <button
                onClick={() => toggle(g.key)}
                className="w-full flex items-center justify-between px-4 py-3 border-b rounded-t-xl hover:bg-white/5 transition"
                aria-expanded={isOpen}
              >
                <div className="flex items-baseline gap-3">
                  <h2 className="text-base font-semibold">{g.label}</h2>
                  <span className="text-xs text-gray-500">{g.list.length}</span>
                </div>
                <span className="text-sm opacity-70">{isOpen ? '−' : '+'}</span>
              </button>

              {/* Items */}
              {isOpen && (
                <ul className="divide-y divide-white/10">
                  {g.list.map(it => (
                    <li key={it.url}>
                      <Card item={it} />
                    </li>
                  ))}
                </ul>
              )}
            </section>
          );
        })}
      </div>

      <footer className="mt-8 text-sm text-gray-500">
        Looking for something else? See the full <a className="underline" href="/changelogs">Changelog</a>.
      </footer>
    </section>
  );
}
