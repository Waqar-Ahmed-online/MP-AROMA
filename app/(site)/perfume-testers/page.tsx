import Link from "next/link";
import { getTesters } from "@/lib/data";
import ProductCard from "@/components/ui/ProductCard";

export const metadata = {
  title: "Perfume Testers | MPAROMA",
};

export default async function PerfumeTestersPage() {
  const testers = await getTesters();

  return (
    <section className="bg-ink py-14 md:py-20">
      <div className="mx-auto max-w-content px-5 md:px-10">
        <div className="text-center">
          <h1 className="font-display text-3xl tracking-[0.08em] text-parchment sm:text-4xl">
            Perfume Testers
          </h1>
          <p className="mt-2 text-xs tracking-[0.15em] text-smoke">
            <Link href="/" className="hover:text-gold">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-parchment/70">Perfume Testers</span>
          </p>
        </div>

        {testers.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-center text-sm text-smoke">
            No testers available right now — check back soon.
          </p>
        )}
      </div>
    </section>
  );
}