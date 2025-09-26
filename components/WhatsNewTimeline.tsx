'use client';

import React, { useMemo, useState } from 'react';
import { getPagesUnderRoute } from 'nextra/context';

type Item = {
  url: string;
  title: string;
  date: string;
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
    s.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  const toTypes = (fm: any = {}) => {
    const out: string[] = [];
    const cat = fm.category || fm.type;
    if (cat) out.push(String(cat));
    const tags = fm.tags;
    if (Array.isArray(tags)) out.push(...tags.map(String));
    else if (typeof tags === 'string') {
      out.push(
        ...tags
          .split(',')
          .map((t: string) => t.trim())
          .filter(Boolean)
      );
    }
    return Array.from(new Set(out.filter(Boolean)));
  };

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
        description: fm.description || '',
        types: toTypes(fm)
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
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function monthKey(dateStr: string) {
  const d = new Date(dateStr);
  if (isNaN(d as any)) return 'Unknown';
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'long' });
}

export default function WhatsNewTimeline() {
  const items = useMemo(buildItems, []);

  const typeOptions = useMemo(() => {
    const set = new Set<string>();
    for (const i of items) for (const t of i.types || []) set.add(t);
    return ['All', ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [items]);

  const [selectedType, setSelectedType] = useState('All');

  const filtered = useMemo(() => {
    if (selectedType === 'All') return items;
    return items.filter(i => (i.types || []).includes(selectedType));
  }, [items, selectedType]);

  const shipped30d = useMemo(() => {
    const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
    return filtered.filter(
      i =>
        !isNaN(new Date(i.date) as any) &&
        new Date(i.date).getTime() >= cutoff
    ).length;
  }, [filtered]);

  // Group by month after filtering
  const groups = useMemo(() => {
    const map = new Map<string, Item[]>();
    for (const i of filtered) {
      const k = monthKey(i.date);
      if (!map.has(k)) map.set(k, []);
      map.get(k)!.push(i);
    }
    return Array.from(map.entries()).sort(
      (a, b) =>
        new Date(b[0]).getTime() - new Date(a[0]).getTime()
    );
  }, [filtered]);

  return (
    <section className="nx-not-prose not-prose mx-auto max-w-5xl">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold tracking-tight">What&apos;s New</h1>
        <p className="mt-1 text-sm text-gray-500">
          Fresh from our <a className="underline" href="/changelogs">Changelog</a>. Showing <strong>{filtered.length}</strong> updates{selectedType !== 'All' ? <> in <strong>{selectedType}</strong></> : null}. Shipped <strong>{shipped30d}</strong> in the last 30 days.
        </p>
      </div>

      {/* Type filter */}
      <div className="mb-5">
        <label className="text-sm text-gray-600 mr-2" htmlFor="typeSel">Type:</label>
        <select
          id="typeSel"
          className="border rounded px-2 py-1 text-sm"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          {typeOptions.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      {/* Timeline by month */}
      <div className="space-y-8">
        {groups.map(([month, arr]) => (
          <section key={month}>
            <h2 className="text-xl font-semibold mb-3">
              {month} <span className="text-sm text-gray-500">({arr.length})</span>
            </h2>
            <ul className="space-y-3">
              {arr
                .sort(
                  (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                )
                .map(i => (
                  <li key={i.url} className="border rounded-lg p-4 hover:shadow-sm transition">
                    <a href={i.url} className="block">
                      <div className="flex items-start gap-3">
                        <div className="w-24 shrink-0 text-xs text-gray-500 mt-1">
                          {fmtDate(i.date)}
                        </div>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                            {(i.types || []).slice(0, 3).map(t => (
                              <span key={t} className="inline-block px-1 py-0.5 rounded bg-gray-100">
                                {t}
                              </span>
                            ))}
                          </div>
                          <h3 className="mt-1 text-base font-medium leading-snug">
                            {i.title}
                          </h3>
                          {i.description && (
                            <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                              {i.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-8 text-sm text-gray-500">
        Do not see what you are looking for? See the full{' '}
        <a className="underline" href="/changelogs">Changelog</a>.
      </div>
    </section>
  );
}
