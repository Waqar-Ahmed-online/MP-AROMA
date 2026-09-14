import DiscoverByScent from "@/components/DiscoverByScent";

export const metadata = {
  title: "The Scent Finder | MPAROMA",
};

export default function ScentFinderPage() {
  return (
    <>
      <div className="bg-ink pt-14 text-center md:pt-20">
        <h1 className="font-display text-3xl tracking-[0.08em] text-parchment sm:text-4xl">
          The Scent Finder
        </h1>
        <p className="mx-auto mt-3 max-w-xl px-5 text-sm leading-relaxed text-smoke">
          Not sure where to start? Browse by scent profile to find your
          signature.
        </p>
      </div>
      <DiscoverByScent />
    </>
  );
}