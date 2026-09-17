"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/types/product";
import ImgWithFallback from "@/components/ui/ImgWithFallback";
import { useCart } from "@/context/CartContext";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import ProductPrice from "@/components/ui/ProductPrice";
export default function ProductDetailClient({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const router = useRouter();

  const [qty, setQty] = useState(1);
  const [viewers, setViewers] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [shareCopied, setShareCopied] = useState(false);

  // Fake "N people viewing" — sirf client par set hota hai (hydration mismatch se bachne ke liye)
  useEffect(() => {
    setViewers(Math.floor(Math.random() * 300) + 60);
  }, []);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  }

  function decreaseQty() {
    setQty((q) => Math.max(1, q - 1));
  }

  function increaseQty() {
    setQty((q) => Math.min(10, q + 1));
  }

  function handleAddToCart() {
    addToCart(product, qty);
    showToast("Cart mein add ho gaya ✓");
  }

  function handleBuyNow() {
    addToCart(product, qty);
    router.push("/cart");
  }

  function handleWhatsapp() {
    const message = `Hi! Mujhe "${product.name}" (Rs. ${product.priceRs}) mein interest hai. Quantity: ${qty}.`;
    window.open(buildWhatsAppLink(message), "_blank");
  }

  async function handleShare() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      try {
        await navigator.share({ title: product.name, url });
      } catch {
        // user cancelled — ignore
      }
    } else {
      await navigator.clipboard.writeText(url);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 1500);
    }
  }

  return (
    <section className="relative bg-ink py-14 md:py-20">
      <div className="mx-auto grid max-w-content grid-cols-1 gap-10 px-5 md:grid-cols-2 md:px-10">
        {/* LEFT: Image */}
        <div className="relative aspect-[3/4] w-full overflow-hidden border border-gold/10 bg-ink-soft">
          <ImgWithFallback
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        {/* RIGHT: Info */}
        <div className="flex flex-col justify-center gap-4">
          {product.inspiredBy && (
            <p className="text-xs tracking-[0.2em] text-smoke">
              {product.inspiredBy}
            </p>
          )}
          <h1 className="font-display text-3xl tracking-[0.06em] text-parchment sm:text-4xl">
            {product.name}
          </h1>
        
          <p className="font-body text-xl">
  <ProductPrice priceRs={product.priceRs} compareAtPriceRs={product.compareAtPriceRs} size="lg" />
</p>
          {product.description && (
            <p className="text-sm leading-relaxed text-smoke">
              {product.description}
            </p>
          )}

          {/* Viewers count */}
          {viewers !== null && (
            <div className="flex items-center gap-2 text-xs text-smoke">
              <EyeIcon />
              <span>{viewers} people are viewing this right now</span>
            </div>
          )}

          {/* Special Offer box */}
          <div className="rounded-sm border border-gold/25 bg-ink-soft/50 p-5">
            <p className="mb-3 text-xs font-semibold tracking-[0.15em] text-gold">
              Special Offer
            </p>
            <ul className="flex flex-col gap-2 text-xs tracking-[0.05em] text-parchment/85">
              <li className="flex items-center gap-2">
                <ArrowIcon /> In Stock
              </li>
              <li className="flex items-center gap-2">
                <ArrowIcon /> Free Shipping on Orders Above Rs.2000
              </li>
              <li className="flex items-center gap-2">
                <ArrowIcon /> Three Tester Pack In Just Rs.1000*
              </li>
            </ul>
          </div>

          {/* Stock urgency bar */}
          <div className="flex flex-col gap-2">
            <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.1em] text-gold">
              <FlameIcon /> HURRY UP! ONLY 50 LEFT IN STOCK
            </p>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink-soft">
              <div className="h-full w-[70%] rounded-full bg-gold" />
            </div>
          </div>

          {/* Ask a Question / Share */}
          <div className="flex items-center gap-6 border-y border-gold/10 py-3 text-xs tracking-[0.08em] text-parchment/85">
            <button
              type="button"
              onClick={handleWhatsapp}
              className="flex items-center gap-2 hover:text-gold"
            >
              <QuestionIcon /> Ask a Question
            </button>
            <button
              type="button"
              onClick={handleShare}
              className="flex items-center gap-2 hover:text-gold"
            >
              <ShareIcon /> {shareCopied ? "Link Copied!" : "Share"}
            </button>
          </div>

          {/* Quantity selector */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-gold/30">
              <button
                type="button"
                onClick={decreaseQty}
                className="px-4 py-2 text-parchment transition-colors hover:bg-gold hover:text-ink"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-10 text-center font-body text-sm text-parchment">
                {qty}
              </span>
              <button
                type="button"
                onClick={increaseQty}
                className="px-4 py-2 text-parchment transition-colors hover:bg-gold hover:text-ink"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <button
            onClick={handleAddToCart}
            className="mt-2 w-full border border-gold bg-gold px-6 py-3 font-body text-xs tracking-[0.2em] text-ink transition-colors hover:bg-transparent hover:text-parchment"
          >
            ADD TO CART
          </button>
          <button
            onClick={handleBuyNow}
            className="w-full border border-parchment/40 bg-transparent px-6 py-3 font-body text-xs tracking-[0.2em] text-parchment transition-colors hover:border-gold hover:text-gold"
          >
            BUY IT NOW
          </button>
          <button
            onClick={handleWhatsapp}
            className="w-full bg-[#25D366] px-6 py-3 font-body text-xs tracking-[0.2em] text-ink transition-opacity hover:opacity-90"
          >
            WHATSAPP
          </button>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-sm border border-gold bg-ink px-5 py-3 text-xs tracking-[0.1em] text-gold shadow-lg">
          {toast}
        </div>
      )}
    </section>
  );
}

function EyeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-gold">
      <path d="M5 3l14 9-14 9V3z" />
    </svg>
  );
}

function FlameIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-gold">
      <path d="M12 2c1 3-2 4-2 7a4 4 0 0 0 8 0c0-1-.5-2-1-3 2 1 3 4 3 6a6 6 0 0 1-12 0c0-4 3-6 4-10Z" />
    </svg>
  );
}

function QuestionIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1 .9-1 1.7" />
      <circle cx="12" cy="17" r="0.5" fill="currentColor" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="18" cy="5" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="19" r="2.5" />
      <path d="M8.2 10.7 15.8 6.3M8.2 13.3l7.6 4.4" />
    </svg>
  );
}