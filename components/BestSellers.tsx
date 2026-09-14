import { getBestSellers } from "@/lib/data";
import ProductCard from "@/components/ui/ProductCard";
import FadeInOnScroll from "@/components/ui/FadeInOnScroll";

export default async function BestSellers() {
  const bestSellers = await getBestSellers();

  return (
    <section data-aos="zoom-in-up" className="border-b border-gold/10 bg-ink py-16 md:py-24">
      <div className="mx-auto max-w-content px-5 md:px-10">
        <FadeInOnScroll className="flex justify-center">
          <h2 className="text-center font-display text-3xl tracking-[0.1em] text-parchment sm:text-4xl">
            BEST SELLERS
          </h2>
        </FadeInOnScroll>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}