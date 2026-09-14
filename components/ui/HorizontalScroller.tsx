"use client";

import { useRef } from "react";

export default function HorizontalScroller({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function scroll(dir: 1 | -1) {
    ref.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Scroll left"
        onClick={() => scroll(-1)}
        className="absolute left-0 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/30 bg-ink/90 p-2 text-parchment transition-colors hover:border-gold hover:text-gold sm:flex"
      >
        ‹
      </button>

      <div
        ref={ref}
       className="no-scrollbar flex gap-5 overflow-x-auto scroll-smooth px-1 pb-4"
      >
        {children}
      </div>

      <button
        type="button"
        aria-label="Scroll right"
        onClick={() => scroll(1)}
        className="absolute right-0 top-1/2 z-10 hidden translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/30 bg-ink/90 p-2 text-parchment transition-colors hover:border-gold hover:text-gold sm:flex"
      >
        ›
      </button>
    </div>
  );
}