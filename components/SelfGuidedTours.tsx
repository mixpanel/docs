'use client';

import * as React from 'react';
import Image from 'next/image';
import clsx from 'clsx';

export type SGCard = {
  badge: string;
  title: string;
  blurb?: string;
  img?: string;
  href?: string;              // optional fallback link
  navatticUrl?: string;       // if provided -> open Navattic modal
  navatticTitle?: string;
};

export default function SelfGuidedTours({ cards }: { cards: SGCard[] }) {
  return (
    <div className="mx-auto mt-8 w-full max-w-7xl px-4">
      {/* 1/2/3 columns responsive, this matches the v0.18 look */}
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c, i) => {
          const isNav = !!c.navatticUrl;
          const commonCardClasses = clsx(
            'group relative block overflow-hidden rounded-2xl border border-[#8B5CF6]/60 bg-[#0b0a13] text-white',
            'shadow-[0_6px_24px_rgba(0,0,0,0.25)] hover:border-[#8B5CF6] transition-transform hover:-translate-y-1'
          );

          // If Navattic URL is present, render an <a> with data-navattic-open and prevent default
          const Wrapper: any = 'a';
          const wrapperProps = isNav
            ? {
                href: '#',
                'data-navattic-open': c.navatticUrl,
                ...(c.navatticTitle ? { 'data-navattic-title': c.navatticTitle } : {}),
                onClick: (e: React.MouseEvent) => e.preventDefault(),
              }
            : {
                href: c.href ?? '#',
              };

          return (
            <li key={i}>
              <Wrapper {...wrapperProps} className={commonCardClasses}>
                {/* dog-ear */}
                <span
                  className="absolute right-0 top-0 h-6 w-6 bg-[#8B5CF6] opacity-90"
                  style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
                />

                {/* media area (fixed height like v0.18) */}
                <div className="relative h-[160px] overflow-hidden">
                  <div className="absolute inset-y-0 left-3 right-0">
                    {c.img ? (
                      <Image
                        src={c.img}
                        alt={c.title}
                        fill
                        className="object-cover object-left"
                        sizes="(min-width:1024px) 320px, (min-width:640px) 45vw, 90vw"
                        priority={i === 0}
                      />
                    ) : (
                      <div className="h-full w-full bg-black" />
                    )}
                  </div>
                </div>

                {/* content band */}
                <div className="bg-black p-4 md:p-5">
                  <span className="inline-block rounded-md bg-[#8B5CF6] px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white">
                    {c.badge}
                  </span>
                  <h3 className="mt-3 text-[22px] font-semibold leading-tight md:text-[24px]">
                    {c.title}
                  </h3>
                  {c.blurb ? (
                    <p className="mt-1 text-sm text-white/80 md:text-[15px]">{c.blurb}</p>
                  ) : null}
                </div>
              </Wrapper>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
