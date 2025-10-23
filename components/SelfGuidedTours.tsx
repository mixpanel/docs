'use client';

import * as React from 'react';
import Image from 'next/image';
import Script from 'next/script';
import clsx from 'clsx';

type Card = {
  badge: string;
  title: string;
  blurb?: string;
  img?: string;             // optional image
  href?: string;            // fallback URL
  navatticUrl?: string;     // Navattic demo link
  navatticTitle?: string;   // Navattic popup title
};

export default function SelfGuidedTours({ cards }: { cards: Card[] }) {
  return (
    <>
      {/* ✅ Load Navattic embed script once (client-side only) */}
      <Script
        src="https://js.navattic.com/embeds.js"
        strategy="afterInteractive"
      />

      <div
        className={clsx(
          'mt-8 mx-auto w-full max-w-6xl px-4',
        )}
      >
        {/* Responsive grid — 1/2/3 columns */}
        <ul
          className={clsx(
            'grid gap-6',
            'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
          )}
        >
          {cards.map((card, i) => {
            const Wrapper: React.ElementType = 'a';
            const isNavattic = Boolean(card.navatticUrl);

            const wrapperProps = isNavattic
              ? {
                  href: '#',
                  'data-navattic-open': card.navatticUrl,
                  ...(card.navatticTitle
                    ? { 'data-navattic-title': card.navatticTitle }
                    : {}),
                  onClick: (e: React.MouseEvent) => e.preventDefault(),
                }
              : { href: card.href ?? '#' };

            return (
              <li key={i}>
                <Wrapper
                  {...wrapperProps}
                  className={clsx(
                    'group block overflow-hidden rounded-2xl border-2 shadow-md',
                    'border-[#8B5CF6]/60 hover:border-[#8B5CF6]',
                    'bg-[#0B0A13] text-white',
                    'transition-transform hover:-translate-y-1',
                  )}
                >
                  {/* Dog-ear */}
                  <span
                    className="absolute right-0 top-0 h-7 w-7 bg-[#8B5CF6] opacity-90"
                    style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
                  />

                  {/* Media (image or placeholder) */}
                  <div className="relative h-[160px] overflow-hidden">
                    <div className="absolute inset-y-0 left-3 right-0">
                      {card.img ? (
                        <Image
                          src={card.img}
                          alt={card.title}
                          fill
                          className="object-cover object-left"
                          sizes="(min-width: 1024px) 320px, 45vw"
                        />
                      ) : (
                        <div className="h-full w-full bg-black/90" />
                      )}
                    </div>
                  </div>

                    {/* Bottom section */}
                    <div className="relative z-[1] bg-black p-4 md:p-5">
                      <span className="inline-block rounded-md bg-[#8B5CF6] px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white">
                        {card.badge}
                      </span>
                      <h3 className="mt-3 text-[22px] md:text-[24px] font-semibold leading-tight">
                        {card.title}
                      </h3>
                      {card.blurb ? (
                        <p className="mt-1 text-sm md:text-[15px] text-white/80">
                          {card.blurb}
                        </p>
                      ) : null}
                    </div>
                </Wrapper>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
