import * as React from 'react'
import { getPagesUnderRoute } from 'nextra/context'

// -----------------------------
// Theme variables for light/dark
// -----------------------------
function ThemeVars() {
  return (
    <style>{`
      /* Light (default) */
      :root, html:not(.dark), [data-theme="light"] {
        --wn-bg:            #ffffff;
        --wn-card:          #f8f7ff;      /* subtle lilac to pair with MP palette */
        --wn-card-border:   rgba(0,0,0,0.06);
        --wn-text:          #1c1c20;      /* strong readable body */
        --wn-muted:         rgba(28,28,32,0.55);
        --wn-ring:          rgba(103,80,255,0.35);
        --wn-dot:           #6a5cff;      /* lilac */
      }

      /* Dark (works with either html.dark or data-theme) */
      html.dark, [data-theme="dark"] {
        --wn-bg:            #0f1116;
        --wn-card:          #171923;
        --wn-card-border:   rgba(255,255,255,0.08);
        --wn-text:          rgba(255,255,255,0.92);
        --wn-muted:         rgba(255,255,255,0.6);
        --wn-ring:          rgba(103,80,255,0.45);
        --wn-dot:           #a8a0ff;
      }

      /* Bridge common prose tokens inside our wrapper so the site theme can't wash out text */
      .wn {
        --tw-prose-body: var(--wn-text);
        --tw-prose-headings: var(--wn-text);
        --tw-prose-links: var(--wn-text);
      }
    `}</style>
  )
}

// -----------------------------
// Types
// -----------------------------
type Item = {
  route: string
  name: string
  frontMatter?: {
    title?: string
    date?: string
    image?: string
  }
}

function parseDate(s?: string): Date | null {
  if (!s) return null
  const d = new Date(s)
  return isNaN(+d) ? null : d
}

function formatDate(d: Date): string {
  const dt = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
  // 27 Sept 2025
  const parts = dt.formatToParts(d)
  const day = parts.find(p => p.type === 'day')?.value ?? ''
  const mon = parts.find(p => p.type === 'month')?.value ?? ''
  const yr  = parts.find(p => p.type === 'year')?.value ?? ''
  return `${day} ${mon} ${yr}`
}

function isNew(d: Date | null): boolean {
  if (!d) return false
  const ms = Date.now() - d.getTime()
  return ms <= 14 * 24 * 60 * 60 * 1000
}

// -----------------------------
// Main component
// -----------------------------
export default function WhatsNewVertical() {
  // Pull all changelog posts
  const raw = getPagesUnderRoute('/changelogs') as unknown as Item[]

  // Normalize & sort (newest first)
  const items = React.useMemo(() => {
    const mapped = (raw || []).map((p) => {
      const date = parseDate(p.frontMatter?.date)
      const title = p.frontMatter?.title ?? p.name ?? 'Untitled'
      const image = p.frontMatter?.image
      return { ...p, title, date, image }
    })
    mapped.sort((a, b) => {
      const da = a.date ? a.date.getTime() : 0
      const db = b.date ? b.date.getTime() : 0
      return db - da
    })
    return mapped
  }, [raw])

  // Pagination
  const SIZE_OPTIONS = [5, 10, 15]
  const [size, setSize] = React.useState<number>(SIZE_OPTIONS[0])
  const [page, setPage] = React.useState<number>(0)

  const total = items.length
  const start = page * size
  const end   = Math.min(start + size, total)

  React.useEffect(() => {
    if (start >= total) setPage(0)
  }, [size, total]) // reset if the list shrinks

  const pageItems = items.slice(start, end)

  const next = () => setPage((p) => (end >= total ? p : p + 1))
  const prev = () => setPage((p) => (p <= 0 ? 0 : p - 1))

  return (
    <section
      className="nx-not-prose not-prose wn"
      style={s.page}
      data-wn-id="wn-vertical"
    >
      <ThemeVars />

      {/* Header */}
      <div style={s.headerWrap}>
        <h1 style={s.h1}>What&apos;s New</h1>

        <div style={s.hero}>
          {/* PREFERRED FIX: use theme tokens inline (no hard-coded white) */}
          <p style={s.heroP}>
            <strong>Track Mixpanel product releases and improvements in one place.</strong>{' '}
            See what’s new, what got faster, and what opens up entirely new ways to answer questions about your product.
            These changes are built from customer feedback and real workflows—less setup, fewer manual steps, clearer answers.
          </p>
          <p style={s.heroP}>
            From performance boosts to streamlined analysis and collaboration, each release is here to shorten the path
            from “what happened?” to “what should we do?”. Browse the highlights below and put the most impactful updates
            to work on your team today.
          </p>
          <a href="/changelogs" style={s.heroLink}>Browse Changelog</a>
        </div>

        {/* Controls row */}
        <div style={s.controlsRow}>
          <div style={s.showing}>
            Showing {total === 0 ? 0 : start + 1}–{end} of {total}
          </div>

          <div style={s.controlsRight}>
            <span style={s.showLabel}>Show</span>
            <select
              aria-label="Show latest"
              value={size}
              onChange={(e) => { setSize(parseInt(e.target.value, 10)); setPage(0) }}
              style={s.select}
            >
              {SIZE_OPTIONS.map(v => (
                <option key={v} value={v}>Latest {v}</option>
              ))}
            </select>

            <button
              type="button"
              onClick={prev}
              disabled={page === 0}
              style={s.navBtn}
            >
              ← Prev
            </button>
            <button
              type="button"
              onClick={next}
              disabled={end >= total}
              style={s.navBtn}
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* List with timeline gutter */}
      <div style={s.listWrap}>
        <div style={s.timeline} />
        {pageItems.map((it) => {
          const d = it.date
          const badge = isNew(d)
          return (
            <article key={it.route} style={s.card}>
              {/* timeline dot */}
              <div style={s.dot} aria-hidden />

              {/* Title row */}
              <div style={s.titleRow}>
                <h2 style={s.h2}>
                  {it.title}
                  {badge && <span style={s.newBadge}>NEW</span>}
                </h2>
                {d && <time style={s.cardDate} dateTime={d.toISOString()}>{formatDate(d)}</time>}
              </div>

              {/* Media */}
              <a href={it.route} style={s.mediaLink} aria-label={`Read ${it.title}`}>
                <div style={s.media}>
                  {it.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={it.image} alt="" style={s.img} />
                  ) : (
                    <div style={s.placeholder} />
                  )}
                </div>
              </a>

              <div style={s.readRow}>
                <a href={it.route} style={s.readLink}>Read update →</a>
              </div>
            </article>
          )
        })}
      </div>

      {/* Footer controls */}
      <div style={s.footerRow}>
        <a href="/changelogs" style={s.footerLink}>Browse the full Changelog →</a>
        <div style={s.controlsRight}>
          <button
            type="button"
            onClick={prev}
            disabled={page === 0}
            style={s.navBtn}
          >
            ← Prev
          </button>
          <button
            type="button"
            onClick={next}
            disabled={end >= total}
            style={s.navBtn}
          >
            Next →
          </button>
        </div>
      </div>
    </section>
  )
}

// -----------------------------
// Styles (inline → preferred fix)
// -----------------------------
const s: Record<string, React.CSSProperties> = {
  page: {
    position: 'relative',
    margin: '0 auto',
    maxWidth: 980,
    padding: '8px 0 64px',
  },

  headerWrap: {
    marginBottom: 12,
  },

  h1: {
    fontSize: 44,
    lineHeight: 1.1,
    fontWeight: 700,
    margin: '0 0 12px 0',
    color: 'var(--wn-text)',
  },

  hero: {
    marginTop: 6,
    marginBottom: 8,
  },

  heroP: {
    // THE KEY: set tokenized color inline so Light mode is readable
    marginTop: 12,
    fontSize: 15,
    lineHeight: 1.6,
    color: 'var(--wn-text)',
  },

  heroLink: {
    marginTop: 12,
    color: 'var(--wn-text)',
    fontSize: 14,
    textDecoration: 'underline',
    textUnderlineOffset: '4px',
    display: 'inline-block',
  },

  controlsRow: {
    marginTop: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },

  showing: {
    fontSize: 12,
    color: 'var(--wn-muted)',
  },

  controlsRight: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },

  showLabel: {
    fontSize: 12,
    color: 'var(--wn-muted)',
    marginRight: 4,
  },

  select: {
    appearance: 'none',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    border: `1px solid var(--wn-card-border)`,
    background: 'transparent',
    color: 'var(--wn-text)',
    borderRadius: 8,
    padding: '6px 28px 6px 10px',
    fontSize: 14,
    position: 'relative' as const,
    backgroundImage:
      `linear-gradient(45deg, transparent 50%, var(--wn-text) 50%),
       linear-gradient(135deg, var(--wn-text) 50%, transparent 50%)`,
    backgroundPosition: 'right 10px center, right 5px center',
    backgroundSize: '6px 6px, 6px 6px',
    backgroundRepeat: 'no-repeat',
  },

  navBtn: {
    fontSize: 14,
    border: `1px solid var(--wn-card-border)`,
    background: 'transparent',
    color: 'var(--wn-text)',
    padding: '6px 10px',
    borderRadius: 8,
    cursor: 'pointer',
    transition: 'background 160ms ease',
  },

  listWrap: {
    position: 'relative',
    marginTop: 20,
  },

  timeline: {
    position: 'absolute',
    left: -24,
    top: 12,
    bottom: 12,
    width: 2,
    background:
      'linear-gradient(to bottom, var(--wn-card-border), var(--wn-card-border))',
    borderRadius: 2,
    pointerEvents: 'none',
  },

  card: {
    position: 'relative',
    margin: '28px 0 40px',
    paddingLeft: 0,
  },

  dot: {
    position: 'absolute',
    left: -28,
    top: 8,
    width: 10,
    height: 10,
    background: 'var(--wn-dot)',
    borderRadius: '999px',
    boxShadow: '0 0 0 3px var(--wn-ring)',
  },

  titleRow: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 10,
  },

  h2: {
    fontSize: 22,
    lineHeight: 1.25,
    fontWeight: 700,
    color: 'var(--wn-text)',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  newBadge: {
    fontSize: 11,
    lineHeight: 1,
    padding: '4px 6px',
    borderRadius: 999,
    border: `1px solid var(--wn-card-border)`,
    background: 'transparent',
    color: 'var(--wn-text)',
  },

  cardDate: {
    fontSize: 12,
    color: 'var(--wn-muted)',
    whiteSpace: 'nowrap',
  },

  mediaLink: {
    display: 'block',
    borderRadius: 16,
    overflow: 'hidden',
  },

  media: {
    borderRadius: 16,
    border: `1px solid var(--wn-card-border)`,
    background:
      'radial-gradient(180px 120px at 30% 20%, rgba(106,92,255,0.35), transparent), ' +
      'radial-gradient(220px 160px at 75% 70%, rgba(168,160,255,0.28), transparent), ' +
      'var(--wn-card)',
    padding: 18,
  },

  img: {
    display: 'block',
    width: '100%',
    height: 'auto',
    borderRadius: 10,
  },

  placeholder: {
    width: '100%',
    height: 260,
    borderRadius: 12,
    background:
      'repeating-linear-gradient( 45deg, rgba(0,0,0,0.06), rgba(0,0,0,0.06) 10px, transparent 10px, transparent 20px )',
  },

  readRow: {
    marginTop: 10,
  },

  readLink: {
    fontSize: 14,
    textDecoration: 'underline',
    textUnderlineOffset: '3px',
    color: 'var(--wn-text)',
  },

  footerRow: {
    marginTop: 28,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },

  footerLink: {
    color: 'var(--wn-text)',
    textDecoration: 'underline',
    textUnderlineOffset: '4px',
    fontSize: 14,
  },
}
