import Link from "next/link";
import { getProducts } from "@/lib/data";
import DeleteProductButton from "@/components/admin/DeleteProductButton";

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl tracking-[0.1em]">PRODUCTS</h1>
        <Link
          href="/admin/products/new"
          className="border border-gold px-4 py-2 text-xs tracking-[0.15em] text-gold hover:bg-gold hover:text-ink"
        >
          + ADD PRODUCT
        </Link>
      </div>

      <div className="divide-y divide-gold/10 border border-gold/10">
        {products.map((p) => (
          <div key={p.id} className="flex items-center gap-4 p-4">
            <img src={p.image} alt={p.name} className="h-14 w-14 object-cover" />
            <div className="flex-1">
              <p className="text-sm">{p.name}</p>
             <p className="text-xs text-smoke">
  Rs. {p.priceRs}
  {typeof p.compareAtPriceRs === "number" && p.compareAtPriceRs > p.priceRs
    ? ` (was Rs. ${p.compareAtPriceRs})`
    : ""}{" "}
  · {p.category}
</p>
            </div>
            <Link href={`/admin/products/${p.id}/edit`} className="text-xs text-gold hover:underline">
              EDIT
            </Link>
            <DeleteProductButton id={p.id} />
          </div>
        ))}
      </div>
    </div>
  );
}