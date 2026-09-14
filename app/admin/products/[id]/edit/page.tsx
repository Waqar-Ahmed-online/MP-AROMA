import { notFound } from "next/navigation";
import { getProductById } from "@/lib/data";
import ProductForm from "@/components/admin/ProductForm";

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);
  if (!product) notFound();

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl tracking-[0.1em]">EDIT PRODUCT</h1>
      <ProductForm initial={product} />
    </div>
  );
}