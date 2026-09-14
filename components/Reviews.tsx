import { getReviews } from "@/lib/data";
import ReviewsGallery from "@/components/ReviewsGallery";

export default async function Reviews() {
  const reviews = await getReviews();
  const avg = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(2)
    : "5.00";

  return (
    <section className="border-b border-gold/10 bg-ink-soft/40 py-14 md:py-20">
      <div className="mx-auto max-w-content px-5 md:px-10">
        <div className="text-center">
          <h2 className="font-display text-2xl tracking-[0.1em] text-parchment sm:text-3xl">
            Customers are saying
          </h2>
          <p className="mt-2 flex flex-wrap items-center justify-center gap-2 text-sm text-smoke">
            <span className="text-gold">★★★★★</span>
            <span>
              {avg} ★ ({reviews.length})
            </span>
            <span className="rounded-full border border-emerald-400/40 px-2 py-0.5 text-[0.65rem] text-emerald-300">
              ✓ Verified
            </span>
          </p>
        </div>

        <div className="mt-8">
          <ReviewsGallery reviews={reviews} />
        </div>
      </div>
    </section>
  );
}