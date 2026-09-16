import Link from "next/link";
import { getScentCategories } from "@/lib/data";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export default async function AdminScentCategoriesPage() {
  const categories = await getScentCategories();
  return (
    <div>
      <h1 className="mb-6 font-display text-2xl tracking-[0.1em]">SCENT CATEGORIES</h1>
      <div className="divide-y divide-gold/10 border border-gold/10">
        {categories.map((c) => (
          <div key={c.id} className="flex items-center gap-4 p-4">
            <img src={c.image} alt={c.label} className="h-14 w-14 object-cover" />
            <p className="flex-1 text-sm">{c.label}</p>
            <Link href={`/admin/scent-categories/${c.id}/edit`} className="text-xs text-gold hover:underline">
              EDIT
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}