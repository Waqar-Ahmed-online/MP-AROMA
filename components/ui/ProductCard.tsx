"use client";

import { useState } from "react";
import Link from "next/link";
import { Product } from "@/types/product";
import ImgWithFallback from "@/components/ui/ImgWithFallback";
import { useCart } from "@/context/CartContext";
import ProductPrice from "@/components/ui/ProductPrice";
export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <Link
    data-aos="zoom-in-up"
      href={`/product/${product.slug}`}
      className="group flex flex-col border border-gold/10 bg-ink-soft/40 transition-colors hover:border-gold/40"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-ink-soft">
        <ImgWithFallback
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5 text-center">
        {product.inspiredBy && (
          <p className="text-[0.65rem] tracking-[0.1em] text-smoke">
            {product.inspiredBy}
          </p>
        )}
        <h3 className="font-display text-lg tracking-[0.08em] text-parchment">
          {product.name}
        </h3>
        
        <p className="font-body text-sm">
  <ProductPrice priceRs={product.priceRs} compareAtPriceRs={product.compareAtPriceRs} size="sm" />
</p>
        <button
          onClick={handleAddToCart}
          className="mt-auto border border-gold/40 px-4 py-2 font-body text-[0.65rem] tracking-[0.18em] text-parchment transition-colors hover:bg-gold hover:text-ink"
        >
          {added ? "[ ADDED ✓ ]" : "[ ADD TO CART ]"}
        </button>
      </div>
    </Link>
  );
}