import Link from "next/link";
import { getScentCategories } from "@/lib/data";
import ImgWithFallback from "@/components/ui/ImgWithFallback";

export default async function DiscoverByScent() {
  const scentCategories = await getScentCategories();

  return (
    <section data-aos="zoom-in-up" className="border-b border-gold/10 bg-ink py-16 md:py-24">
      <div className="mx-auto max-w-content px-5 md:px-10">
        <div className="text-center">
          <p className="text-[0.68rem] tracking-[0.3em] text-smoke">
            THE SENSORY EXPERIENCE
          </p>
          <h2 className="mt-2 font-display text-3xl tracking-[0.08em] text-parchment sm:text-4xl">
            DISCOVER BY SCENT
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {scentCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/collection/${cat.slug}`}
              className="group relative flex aspect-[3/4] items-center justify-center overflow-hidden border border-gold/10"
            >
              <ImgWithFallback
                src={cat.image}
                alt={cat.label}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/25" />
              <span className="relative z-10 rounded-full border border-gold/40 bg-ink/70 px-7 py-2.5 font-display text-lg tracking-[0.1em] text-parchment backdrop-blur-sm sm:text-xl">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}