"use client";
import { useState, useEffect, useCallback } from "react";
import BracketButton from "@/components/ui/BracketButton";
import { HeroSlide } from "@/types/hero";

export default function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const count = slides.length;

  const goTo = useCallback(
    (i: number) => setIndex(((i % count) + count) % count),
    [count]
  );

  useEffect(() => {
    if (count <= 1) return;
    const timer = setInterval(() => goTo(index + 1), 4200);
    return () => clearInterval(timer);
  }, [index, count, goTo]);

  if (count === 0) return null;
  const slide = slides[index];

  return (
    <section className="relative w-full overflow-hidden border-b border-gold/10 bg-ink">
      <div className="relative min-h-[600px] sm:min-h-[680px] md:min-h-[760px]">
        {slides.map((s, i) => (
          <img
            key={s.id}
            src={s.backgroundImage}
            alt={s.heading}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-ink/50" />

        <div className="relative z-10 flex h-full min-h-[600px] flex-col items-center justify-center px-4 text-center sm:min-h-[680px] sm:px-6 md:min-h-[760px]">
          <div key={slide.id} className="animate-hero-text flex w-full max-w-3xl flex-col items-center">
            <p className="text-[0.65rem] tracking-[0.25em] text-gold sm:text-[0.7rem] sm:tracking-[0.3em]">
              {slide.tagline}
            </p>
            <h1 className="mt-3 max-w-full break-words font-display text-3xl leading-tight text-parchment sm:text-5xl md:text-6xl">
              {slide.heading}
            </h1>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <BracketButton href={slide.primaryCtaHref} variant="solid">
                {slide.primaryCtaLabel}
              </BracketButton>
              <BracketButton href={slide.secondaryCtaHref}>
                {slide.secondaryCtaLabel}
              </BracketButton>
            </div>
          </div>
        </div>

        {count > 1 && (
          <>
            <button
              aria-label="Previous slide"
              onClick={() => goTo(index - 1)}
              className="absolute left-4 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-lg text-parchment transition-colors hover:bg-black/50"
            >
              ‹
            </button>
            <button
              aria-label="Next slide"
              onClick={() => goTo(index + 1)}
              className="absolute right-4 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-lg text-parchment transition-colors hover:bg-black/50"
            >
              ›
            </button>

            <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => goTo(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-6 bg-gold" : "w-1.5 bg-parchment/40"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}