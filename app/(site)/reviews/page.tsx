import Reviews from "@/components/Reviews";
import ReviewForm from "@/components/ReviewForm";

export const metadata = {
  title: "Reviews | MPAROMA",
};

export default function ReviewsPage() {
  return (
    <>
      <div className="bg-ink pt-14 text-center md:pt-20">
        <h1 className="font-display text-3xl tracking-[0.08em] text-parchment sm:text-4xl">
          Reviews
        </h1>
        <p className="mx-auto mt-3 max-w-xl px-5 text-sm leading-relaxed text-smoke">
          What our customers are saying about MPAROMA.
        </p>
      </div>
      <Reviews />
      <div className="bg-ink pb-14 md:pb-20">
        <ReviewForm />
      </div>
    </>
  );
}