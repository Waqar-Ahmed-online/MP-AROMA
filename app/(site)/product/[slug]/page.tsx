import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/data";
import ProductDetailClient from "@/components/ProductDetailClient";

interface Props {
  params: { slug: string };
}

export default async function ProductPage({ params }: Props) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product!} />;
}