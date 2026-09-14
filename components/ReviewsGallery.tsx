"use client";

import { useState } from "react";
import ImgWithFallback from "@/components/ui/ImgWithFallback";
import HorizontalScroller from "@/components/ui/HorizontalScroller";
import { Review } from "@/types/product";

export default function ReviewsGallery({ reviews }: { reviews: Review[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <HorizontalScroller>
        {reviews.map((r, i) => {
          const cover = r.media?.[0];
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => setOpenIndex(i)}
              className="w-72 flex-shrink-0 cursor-pointer border border-gold/10 bg-ink p-5 text-left transition-colors hover:border-gold/40 sm:w-80"
            >
              {cover && (
                <div className="mb-4 aspect-square w-full overflow-hidden bg-ink-soft">
                  {cover.type === "video" ? (
                    <video src={cover.url} className="h-full w-full object-cover" />
                  ) : (
                    <ImgWithFallback
                      src={cover.url}
                      alt="Customer review"
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
              )}

              <div className="mb-2 text-gold" aria-label={`${r.rating} out of 5 stars`}>
                {"★".repeat(r.rating)}
                {"☆".repeat(5 - r.rating)}
              </div>
              <p className="text-sm leading-relaxed text-smoke">{r.quote}</p>
              {r.author && (
                <p className="mt-3 text-[0.7rem] tracking-[0.1em] text-parchment/70">
                  — {r.author}
                </p>
              )}
            </button>
          );
        })}
      </HorizontalScroller>

      {openIndex !== null && (
        <ReviewLightbox
          review={reviews[openIndex]}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </>
  );
}

function ReviewLightbox({
  review,
  onClose,
}: {
  review: Review;
  onClose: () => void;
}) {
  const media = review.media || [];
  const [mediaIndex, setMediaIndex] = useState(0);
  const active = media[mediaIndex];

  function prev() {
    setMediaIndex((i) => (i - 1 + media.length) % media.length);
  }
  function next() {
    setMediaIndex((i) => (i + 1) % media.length);
  }

  const initial = (review.author || "A").trim().charAt(0).toUpperCase();
  const date = review.createdAt
    ? new Date(review.createdAt).toLocaleDateString()
    : "";

    return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div
        className="relative flex h-[560px] max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-sm bg-ink-soft sm:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-ink text-parchment hover:bg-gold hover:text-ink"
        >
          ✕
        </button>

        {/* Left: image/video viewer — hamesha same height, review chahe koi bhi ho */}
        <div className="flex h-1/2 flex-col bg-ink sm:h-full sm:flex-1">
          <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-ink">
            {active ? (
              active.type === "video" ? (
                <video src={active.url} controls className="h-full w-full object-contain" />
              ) : (
                <ImgWithFallback
                  src={active.url}
                  alt="Customer review"
                  className="h-full w-full object-contain"
                />
              )
            ) : (
              <p className="text-sm text-smoke">No media attached</p>
            )}

            {media.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous image"
                  className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-gold/30 bg-ink/80 text-parchment hover:border-gold hover:text-gold"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next image"
                  className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-gold/30 bg-ink/80 text-parchment hover:border-gold hover:text-gold"
                >
                  ›
                </button>
              </>
            )}
          </div>

          {media.length > 1 && (
            <div className="flex flex-shrink-0 gap-2 border-t border-gold/10 p-3">
              {media.map((m, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setMediaIndex(i)}
                  className={`h-14 w-14 flex-shrink-0 overflow-hidden border ${
                    i === mediaIndex ? "border-gold" : "border-gold/20"
                  }`}
                >
                  {m.type === "video" ? (
                    <video src={m.url} className="h-full w-full object-cover" />
                  ) : (
                    <ImgWithFallback
                      src={m.url}
                      alt="Review thumbnail"
                      className="h-full w-full object-cover"
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: review details — fixed width, apna scroll agar text lamba ho */}
        <div className="flex h-1/2 w-full flex-col gap-3 overflow-y-auto p-6 sm:h-full sm:w-72 sm:flex-shrink-0">
          <div className="text-gold" aria-label={`${review.rating} out of 5 stars`}>
            {"★".repeat(review.rating)}
            {"☆".repeat(5 - review.rating)}
          </div>

          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gold/20 font-display text-sm text-gold">
              {initial}
            </span>
            <div>
              <p className="text-sm text-parchment">{review.author || "Anonymous"}</p>
              {date && <p className="text-[0.7rem] text-smoke">{date}</p>}
            </div>
          </div>

          <p className="text-sm leading-relaxed text-parchment/85">{review.quote}</p>
        </div>
      </div>
    </div>
  );
}
