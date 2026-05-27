export const SelfGuidedTours = ({ cards }) => {
  const MP_PURPLE = "rgb(139 92 246)";
  const BORDER_RADIUS = 14;
  const CARD_W = 296;
  const CARD_H = 319;
  const IMAGE_H = 140;
  const IMAGE_W = 276;

  const styles = {
    grid: {
      display: "grid",
      gap: 20,
      gridTemplateColumns: "repeat(auto-fit, minmax(296px, 1fr))",
      justifyContent: "center",
      marginTop: 32,
    },
    card: {
      position: "relative",
      width: CARD_W,
      height: CARD_H,
      borderRadius: BORDER_RADIUS,
      overflow: "hidden",
      border: `2px solid ${MP_PURPLE}`,
      boxShadow: "0 10px 30px rgba(0,0,0,.25)",
      transition: "transform .25s ease, box-shadow .25s ease, background .3s ease, color .3s ease",
    },
    dogEar: {
      position: "absolute",
      right: 10,
      top: 10,
      width: 22,
      height: 22,
      background: "var(--sgt-dogear)",
      clipPath: "polygon(0 0, 100% 0, 100% 100%)",
      boxShadow: "0 0 0 2px rgba(0,0,0,.15) inset",
      zIndex: 5,
      pointerEvents: "none",
    },
    mediaWrap: {
      position: "absolute",
      top: 18,
      height: IMAGE_H,
      width: IMAGE_W,
      marginLeft: 16,
      marginRight: -16,
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
      overflow: "hidden",
      background: "var(--sgt-media-bg)",
      zIndex: 1,
    },
    mediaImg: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "left top",
      display: "block",
    },
    placeholder: {
      width: "100%",
      height: "100%",
      background: "var(--sgt-media-bg)",
    },
    bottom: {
      position: "absolute",
      top: IMAGE_H + 22,
      left: 0,
      right: 0,
      bottom: 0,
      padding: "16px 18px 22px",
      zIndex: 3,
    },
    badge: {
      display: "inline-block",
      background: "var(--sgt-badge-bg)",
      color: "var(--sgt-badge-fg)",
      fontWeight: 800,
      letterSpacing: ".04em",
      fontSize: "11.5px",
      lineHeight: 1,
      borderRadius: 8,
      padding: "8px 10px",
      marginBottom: 10,
    },
    title: {
      fontSize: 23,
      fontWeight: 700,
      lineHeight: 1.2,
      margin: 0,
      color: "var(--sgt-title)",
    },
    blurb: {
      marginTop: 8,
      fontSize: 15,
      color: "var(--sgt-blurb)",
      opacity: 0.75,
    },
    clickable: {
      display: "block",
      width: "100%",
      height: "100%",
      background: "transparent",
      border: 0,
      padding: 0,
      cursor: "pointer",
      textAlign: "inherit",
    },
  };

  const openInline = useCallback((url, title) => {
    const safeTitle = title.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const prevOverflow = document.body.style.overflow;

    const overlay = document.createElement("div");
    Object.assign(overlay.style, {
      position: "fixed", inset: "0",
      background: "rgba(15,23,42,0.55)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: "999999",
    });

    const box = document.createElement("div");
    Object.assign(box.style, {
      width: "calc(100vw - 160px)", height: "calc(100vh - 144px)",
      background: "#F3F4F6", borderRadius: "12px",
      overflow: "hidden", boxShadow: "0 10px 40px rgba(0,0,0,.5)",
      position: "relative", display: "flex", flexDirection: "column",
    });

    box.innerHTML = `
      <div style="height:48px;flex-shrink:0;background:#F9FAFB;color:#111827;display:flex;align-items:center;justify-content:space-between;padding:0 16px;border-bottom:1px solid #E5E7EB">
        <div style="display:flex;gap:12px;align-items:center">
          <div style="display:flex;gap:8px;align-items:center">
            <div style="display:inline-flex;align-items:center;justify-content:center;width:40px;height:34px;border:1px solid #E5E7EB;border-radius:10px;background:#F3F4F6">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#111827" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"/>
                <path d="m12 12 4 10 1.7-4.3L22 16Z"/>
              </svg>
            </div>
            <span style="font-size:14px;font-weight:500">Viewing Interactive Demo</span>
          </div>
          <span style="display:inline-flex;align-items:center;padding:8px 16px;border-radius:999px;background:#FFFFFF;border:1px solid #D1D5DB;box-shadow:0 1px 2px rgba(15,23,42,0.05);font-weight:500;font-size:14px">${safeTitle}</span>
        </div>
        <button data-sgt-close aria-label="Close" style="width:36px;height:36px;border-radius:12px;border:1px solid #D1D5DB;background:#FFFFFF;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;font-size:22px;font-weight:500;color:#111827">&#215;</button>
      </div>
      <iframe src="${url}" title="${safeTitle}" allow="clipboard-write; fullscreen" style="width:100%;flex:1;border:0"></iframe>
    `;

    overlay.appendChild(box);
    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden";

    const close = () => {
      if (!overlay.parentNode) return;
      overlay.parentNode.removeChild(overlay);
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("popstate", close);
    };

    const onKey = (e) => { if (e.key === "Escape") close(); };

    overlay.addEventListener("click", close);
    box.addEventListener("click", (e) => e.stopPropagation());
    box.querySelector("[data-sgt-close]").addEventListener("click", close);
    window.addEventListener("keydown", onKey);
    window.addEventListener("popstate", close);
  }, []);

  const CardView = ({ c }) => {
    const inside = (
      <>
        <div style={styles.dogEar} aria-hidden />
        <div style={styles.mediaWrap}>
          {c.img ? (
            <img noZoom src={c.img} alt="" style={styles.mediaImg} loading="lazy" />
          ) : (
            <div style={styles.placeholder} />
          )}
        </div>
        <div style={styles.bottom}>
          <div style={styles.badge}>{c.badge}</div>
          <h3 style={styles.title}>{c.title}</h3>
          {c.blurb && <div style={styles.blurb}>{c.blurb}</div>}
        </div>
      </>
    );

    if (c.navatticOpen) {
      const navatticUrl = c.navatticOpen.startsWith("http")
        ? c.navatticOpen
        : `https://capture.navattic.com/${c.navatticOpen}`;
      return (
        <div style={styles.card} className="sgt-card">
          <button
            type="button"
            style={styles.clickable}
            className="sgt-click"
            onClick={(e) => {
              e.preventDefault();
              openInline(navatticUrl, c.navatticTitle || c.title);
            }}
          >
            {inside}
          </button>
        </div>
      );
    }

    if (c.href) {
      return (
        <div style={styles.card} className="sgt-card">
          <a href={c.href} style={styles.clickable} className="sgt-click">
            {inside}
          </a>
        </div>
      );
    }

    return (
      <div style={styles.card} className="sgt-card">
        {inside}
      </div>
    );
  };

  return (
    <>
      <div style={styles.grid}>
        {cards.map((c, i) => (
          <CardView key={i} c={c} />
        ))}
      </div>

      <style>{`
        :root {
          --sgt-card-bg: #0a0a0b; --sgt-title: #ffffff; --sgt-blurb: rgba(255,255,255,0.85);
          --sgt-border: ${MP_PURPLE}; --sgt-media-bg: #111111; --sgt-dogear: ${MP_PURPLE};
          --sgt-badge-bg: ${MP_PURPLE}; --sgt-badge-fg: #ffffff;
        }
        @media (prefers-color-scheme: light) {
          :root, html.light, html[class*='light'], [data-theme='light'] {
            --sgt-card-bg: #ffffff; --sgt-title: #111111; --sgt-blurb: #333333;
            --sgt-border: ${MP_PURPLE}; --sgt-media-bg: #e9e9ef; --sgt-dogear: ${MP_PURPLE};
            --sgt-badge-bg: ${MP_PURPLE}; --sgt-badge-fg: #ffffff;
          }
        }
        html.light, html[class*='light'], [data-theme='light'] {
          --sgt-card-bg: #ffffff; --sgt-title: #111111; --sgt-blurb: #333333;
          --sgt-border: ${MP_PURPLE}; --sgt-media-bg: #e9e9ef; --sgt-dogear: ${MP_PURPLE};
          --sgt-badge-bg: ${MP_PURPLE}; --sgt-badge-fg: #ffffff;
        }
        .sgt-card { background: var(--sgt-card-bg); color: var(--sgt-title); border-color: var(--sgt-border); }
        .sgt-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(139,92,246,0.25); }
        .sgt-card:focus-within { outline: 2px solid ${MP_PURPLE}; outline-offset: 2px; }
        .sgt-click:focus-visible { outline: 2px solid ${MP_PURPLE}; outline-offset: 3px; border-radius: 10px; }
        @media (min-width: 1280px) { .sgt-card h3 { font-size: 24px; } .sgt-card p { font-size: 15px; } }
      `}</style>
    </>
  );
};
