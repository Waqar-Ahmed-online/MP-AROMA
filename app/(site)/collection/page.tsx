import Link from "next/link";
import { getProducts,  getScentCategories } from "@/lib/data";
import ImgWithFallback from "@/components/ui/ImgWithFallback";
import { categoryMatchesSlug } from "@/lib/category";
export const metadata = {
  title: "All Collections | MPAROMA",
};

export default async function CollectionsPage() {
  const [products,  scentCategories] = await Promise.all([
    getProducts(),
    getScentCategories(),
  ]);

  const cards = [
    {
      label: "All Perfumes",
      href: "/collection/all",
      image: products[0]?.image ?? "",
      count: products.length,
    },
 
    ...scentCategories.map((cat) => ({
      label: cat.label,
      href: `/collection/${cat.slug}`,
      image: cat.image,
      count: products.filter((p) => categoryMatchesSlug(p.category, cat.slug)).length,
    })),
  ];

  return (
    <section className="bg-ink py-14 md:py-20">
      <div className="mx-auto max-w-content px-5 md:px-10">
        <div className="text-center">
          <h1 className="font-display text-3xl tracking-[0.08em] text-parchment sm:text-4xl">
            All Collections
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-smoke">
            Discover our premium fragrance collection, crafted to leave a
            lasting impression — explore every scent, curated for the moment
            it&apos;s made for.
          </p>
        </div>

        {/* Same size as the Best Sellers ProductCard grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group flex flex-col border border-gold/10 bg-ink-soft/40"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-ink-soft">
                <ImgWithFallback
                  src={card.image}
                  alt={card.label}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2 p-5 text-center">
                <h2 className="font-display text-lg tracking-[0.08em] text-parchment">
                  {card.label}
                </h2>
                <p className="font-body text-sm text-gold">
                  {card.count} {card.count === 1 ? "Product" : "Products"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}