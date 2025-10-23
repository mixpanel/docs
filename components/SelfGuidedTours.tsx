'use client';

import * as React from 'react';
import Image from 'next/image';
import Script from 'next/script';
import clsx from 'clsx';

type Card = {
  badge: string;
  title: string;
  blurb?: string;
  img?: string;          // keep for card 1 image
  href?: string;         // optional link fallback
  navatticUrl?: string;  // if present, opens Navattic popup
  navatticTitle?: string;
};

export default function SelfGuidedTours({ cards }: { cards: Card[] }) {
  return (
    <>
      {/* Load Navattic once, after hydration */}
      <Script src="https://js.navattic.com/embeds.js" strategy="afterInteractive" />

      <div className="mx-auto mt-8 w-full max-w-7xl px-4">
        {/* 1 / 2 / 3 column responsive grid */}
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => {
            const Wrapper: any = 'a';
            const isNav = !!card.navatticUrl;

            const wrapperProps = isNav
              ? {
                  href: '#',
                  'data-navattic-open': card.navatticUrl,
                  ...(card.navatticTitle ? { 'data-navattic-title': card.navatticTitle } : {}),
                  onClick: (e: React.MouseEvent) => e.preventDefault(),
                }
              : { href: card.href ?? '#' };

            return (
              <li key={i}>
                <Wrapper
                  {...wrapperProps}
                  className={clsx(
                    'group relative block overflow-hidden rounded-2xl border-2 shadow-md',
                    'border-[#8B5CF6]/60 hover:border-[#8B5CF6]',
                    'bg-[#0B0A13] text-white',
                    'transition-transform will-change-transform hover:-translate-y-1'
                  )}
                >
                  {/* Dog-ear */}
                  <span
                    className="absolute right-0 top-0 h-7 w-7 bg-[#8B5CF6] opacity-90"
                    style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
                  />

                  {/* Media area: fixed height to prevent layout blow-ups */}
                  <div className="relative h-[160px] overflow-hidden">
                    {/* indent the image to the right a bit */}
                    <div className="absolute inset-y-0 left-3 right-0">
                      {card.img ? (
                        <Image
                          src={card.img}
                          alt={card.title}
                          fill
                          className="h-full w-full object-cover object-left"
                          sizes="(min-width:1024px) 320px, (min-width:640px) 45vw, 90vw"
                          priority={i === 0}
                        />
                      ) : (
                        <div className="h-full w-full bg-black" />
                      )}
                    </div>
                  </div>

                  {/* Bottom band */}
                  <div className="relative z-[1] bg-black p-4 md:p-5">
                    <span className="inline-block rounded-md bg-[#8B5CF6] px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white">
                      {card.badge}
                    </span>
                    <h3 className="mt-3 text-[22px] font-semibold leading-tight md:text-[24px]">
                      {card.title}
                    </h3>
                    {card.blurb ? (
                      <p className="mt-1 text-sm text-white/80 md:text-[15px]">{card.blurb}</p>
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
