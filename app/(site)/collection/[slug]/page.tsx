import { notFound } from "next/navigation";
import { getProducts, getScentCategories } from "@/lib/data";
import ProductCard from "@/components/ui/ProductCard";
import { categoryMatchesSlug } from "@/lib/category";
interface Props {
  params: { slug: string };
}

export default async function CollectionSlugPage({ params }: Props) {
  const { slug } = params;
  const [products, scentCategories] = await Promise.all([
    getProducts(),
    getScentCategories(),
  ]);

  const isAll = slug === "all";
  const category = scentCategories.find((c) => c.slug === slug);

  if (!isAll && !category) {
    notFound();
  }

  const items = isAll
    ? products
    : products.filter((p) => categoryMatchesSlug(p.category, slug))

  const title = isAll ? "All Perfumes" : category!.label;

  return (
    <section className="bg-ink py-14 md:py-20">
      <div className="mx-auto max-w-content px-5 md:px-10">
        <div className="text-center">
          <h1 className="font-display text-3xl tracking-[0.08em] text-parchment sm:text-4xl">
            {title}
          </h1>
          <p className="mt-2 text-xs tracking-[0.15em] text-smoke">
            ({items.length} {items.length === 1 ? "Product" : "Products"})
          </p>
        </div>

        {items.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-center text-sm text-smoke">
            No products in this collection yet — check back soon.
          </p>
        )}
      </div>
    </section>
  );
}