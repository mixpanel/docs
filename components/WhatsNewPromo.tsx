function Carousel({ items }: { items: Item[] }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [canScroll, setCanScroll] = useState(false);
  const [progress, setProgress] = useState(0);

  // fixed sizes
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
    // give the container a stacking context
    <div className="relative nx-not-prose not-prose" style={{ isolation: 'isolate' }}>
      {/* BACKDROP GLOW — move BEHIND the scroller */}
      <div
        aria-hidden="true"
        className="absolute -inset-x-8 -top-8 -bottom-6 rounded-[40px] pointer-events-none -z-10"
        style={{
          background:
            'radial-gradient(60% 80% at 10% 0%, rgba(168,85,247,0.25), transparent 70%), radial-gradient(60% 80% at 90% 100%, rgba(59,130,246,0.25), transparent 70%)',
          filter: 'blur(20px)',
        }}
      />

      {/* SCROLLER — remove edge fade mask and force above backdrop */}
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
          // Edge fade turned OFF to avoid the “shade” look:
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

      {/* progress bar */}
      {canScroll && (
        <div className="absolute left-0 right-0 bottom-3 h-1 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full bg-fuchsia-500" style={{ width: `${Math.round(progress * 100)}%` }} />
        </div>
      )}

      {/* arrows */}
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
