import { getProducts } from "@/lib/data";
import InventoryTable from "@/components/admin/InventoryTable";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminInventoryPage() {
  const products = await getProducts();

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl tracking-[0.1em]">INVENTORY</h1>
      <InventoryTable products={products} />
    </div>
  );
}