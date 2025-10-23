'use client';
import Image from 'next/image';

type Card = {
  badge: string;
  title: string;
  blurb?: string;
  href?: string;
  img?: string; // if absent, we show a black placeholder
};

export default function SelfGuidedTours({ cards }: { cards: Card[] }) {
  return (
    <>
      <div className="sgt-wrap">
        <div className="sgt-grid">
          {cards.map((c, i) => (
            <a
              key={i}
              href={c.href ?? '#'}
              className="sgt-card"
              aria-label={c.title}
            >
              <div className="dog-ear" aria-hidden />
              <div className="media">
                {c.img ? (
                  <Image
                    src={c.img}
                    alt=""
                    width={600}
                    height={220}
                    className="media-img"
                    priority={i === 0}
                  />
                ) : (
                  <div className="media-placeholder" />
                )}
              </div>

              <div className="bottom">
                <span className="badge">{c.badge}</span>
                <h3 className="title">{c.title}</h3>
                {c.blurb ? <p className="blurb">{c.blurb}</p> : null}
              </div>
            </a>
          ))}
        </div>
      </div>

      <style jsx>{`
        :root {
          --mp-purple: #8b5cf6; /* brand-ish purple */
          --card-bg: #0a0a0b;
          --text: #fff;
          --text-dim: rgba(255, 255, 255, 0.85);
          --border: var(--mp-purple);
          --shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
        }

        @media (prefers-color-scheme: light) {
          :root {
            /* keep the same visual we want: black card bottom + purple border works in light too */
            --card-bg: #0a0a0b;
            --text: #ffffff;
            --text-dim: rgba(255, 255, 255, 0.8);
            --border: var(--mp-purple);
          }
        }

        .sgt-wrap {
          /* give the grid breathing room and allow it to expand */
          width: 100%;
          max-width: 1200px; /* enough to fit 3 comfortably */
          margin: 36px auto 0;
          padding: 0 12px; /* small gutter for very narrow screens */
        }

        /* Responsive grid: 1 / 2 / 3 columns */
        .sgt-grid {
          display: grid;
          gap: 24px;
          grid-template-columns: 1fr; /* mobile */
        }
        @media (min-width: 700px) {
          .sgt-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (min-width: 1024px) {
          .sgt-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        .sgt-card {
          position: relative;
          display: block;
          border: 2px solid var(--border);
          border-radius: 14px;
          overflow: hidden;
          background: #000; /* top area; image sits here or placeholder */
          box-shadow: var(--shadow);
          text-decoration: none;
          color: var(--text);
          /* keep aspect / size roughly like your reference */
          min-height: 320px;
        }

        /* dog-ear */
        .dog-ear {
          position: absolute;
          right: 10px;
          top: 10px;
          width: 22px;
          height: 22px;
          background: var(--mp-purple);
          clip-path: polygon(0 0, 100% 0, 100% 100%);
          box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.15);
          z-index: 2;
        }

        /* image area: slightly indented from the border on top/left like the reference */
        .media {
          height: 168px;
          margin: 10px 10px 0 10px; /* indent from top/left */
          border-top-left-radius: 8px;
          border-bottom-left-radius: 8px;
          overflow: hidden;
          background: #0f0f10;
        }
        .media-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .media-placeholder {
          width: 100%;
          height: 100%;
          background: #000; /* solid black when no image */
        }

        /* bottom black panel */
        .bottom {
          position: relative;
          background: var(--card-bg);
          color: var(--text);
          padding: 14px 16px 18px;
          margin-top: 10px;
          border-bottom-left-radius: 12px;
          border-bottom-right-radius: 12px;
        }

        .badge {
          display: inline-block;
          background: var(--mp-purple);
          color: #0b0b0c;
          font-weight: 800;
          letter-spacing: 0.02em;
          font-size: 12px;
          line-height: 1;
          border-radius: 8px;
          padding: 8px 10px;
          margin-bottom: 12px;
        }

        .title {
          font-size: 22px;
          line-height: 1.15;
          font-weight: 800;
          margin: 0;
        }

        .blurb {
          margin: 6px 0 0 0;
          font-size: 14px;
          color: var(--text-dim);
        }
      `}</style>
    </>
  );
}
