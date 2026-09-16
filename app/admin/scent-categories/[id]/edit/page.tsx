import { notFound } from "next/navigation";
import { getScentCategoryById } from "@/lib/data";
import ScentCategoryForm from "@/components/admin/ScentCategoryForm";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export default async function EditScentCategoryPage({ params }: { params: { id: string } }) {
  const category = await getScentCategoryById(params.id);
  if (!category) notFound();

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl tracking-[0.1em]">EDIT SCENT CATEGORY</h1>
      <ScentCategoryForm initial={category} />
    </div>
  );
}