"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import ImgWithFallback from "@/components/ui/ImgWithFallback";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/shipping";
import CartTesterPicker from "@/components/CartTesterPicker";
export default function CartPage() {
  const router = useRouter();
  const { items, removeFromCart, updateQuantity, subtotal } = useCart();
  const [note, setNote] = useState("");

  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  if (items.length === 0) {
    return (
      <section className="bg-ink py-20">
        <div className="mx-auto flex max-w-content flex-col items-center gap-4 px-5 text-center md:px-10">
          <h1 className="font-display text-3xl tracking-[0.06em] text-parchment">
            Your Shopping Cart
          </h1>
          <p className="text-sm text-smoke">
            Aapne abhi tak koi product cart mein add nahi kiya.
          </p>
          <Link
            href="/collection"
            className="mt-4 border border-gold px-6 py-3 font-body text-xs tracking-[0.2em] text-gold transition-colors hover:bg-gold hover:text-ink"
          >
            CONTINUE SHOPPING
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-ink py-14 md:py-20">
      <div className="mx-auto max-w-content px-5 md:px-10">
        <h1 className="mb-10 text-center font-display text-4xl tracking-[0.06em] text-parchment">
          Your Shopping Cart
        </h1>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* LEFT: items table */}
          <div className="lg:col-span-2">
            <div className="hidden grid-cols-[2fr_1fr_1fr] border-b border-gold/15 pb-3 text-[0.65rem] tracking-[0.2em] text-smoke sm:grid">
              <span>PRODUCT</span>
              <span className="text-center">QUANTITY</span>
              <span className="text-right">TOTAL</span>
            </div>

            {items.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-1 gap-4 border-b border-gold/10 py-6 sm:grid-cols-[2fr_1fr_1fr] sm:items-center"
              >
                {/* Product */}
                <div className="flex gap-4">
                  <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden border border-gold/10 bg-ink-soft">
                    <ImgWithFallback
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center gap-1">
                    <h3 className="font-display text-lg text-parchment">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gold">
                      Rs. {item.priceRs.toLocaleString()}.00
                    </p>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="w-fit text-[0.65rem] uppercase tracking-[0.15em] text-smoke underline underline-offset-2 hover:text-red-400"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex justify-start sm:justify-center">
                  <div className="flex items-center border border-gold/30">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 text-parchment transition-colors hover:bg-gold hover:text-ink"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="w-10 text-center text-sm text-parchment">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 text-parchment transition-colors hover:bg-gold hover:text-ink"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Total */}
                <p className="text-left text-sm text-parchment sm:text-right">
                  Rs. {(item.priceRs * item.quantity).toLocaleString()}.00
                </p>
                <div className="sm:col-span-3">
  <CartTesterPicker item={item} />
</div>
              </div>
            ))}

            <Link
              href="/collection"
              className="mt-6 inline-block text-xs uppercase tracking-[0.15em] text-parchment underline underline-offset-4 hover:text-gold"
            >
              Continue Shopping
            </Link>
          </div>

          {/* RIGHT: summary */}
          <div className="h-fit rounded-sm border border-gold/15 bg-ink-soft/50 p-6 lg:sticky lg:top-28">
            <p className="text-xs text-parchment/85">
              {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                <>🎉 Congrats! You are eligible for FREE Shipping</>
              ) : (
                <>
                  Add <span className="text-gold">Rs. {remaining}</span> more
                  to get FREE Shipping
                </>
              )}
            </p>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-ink">
              <div
                className="h-full rounded-full bg-gold transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-6">
              <label className="mb-2 block text-xs tracking-[0.1em] text-parchment/85">
                Order special instructions
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                placeholder="Any note for your order..."
                className="w-full resize-none border border-gold/20 bg-ink px-3 py-2 text-sm text-parchment placeholder-smoke focus:border-gold focus:outline-none"
              />
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-gold/10 pt-4">
              <span className="font-body text-sm text-parchment">Total</span>
              <span className="font-body text-lg text-gold">
                Rs. {subtotal.toLocaleString()}.00
              </span>
            </div>
            <p className="mt-1 text-[0.65rem] text-smoke">
              Taxes and shipping calculated at checkout
            </p>

            <button
              onClick={() => {
                try {
                  if (note.trim()) {
                    localStorage.setItem("mparoma_order_note", note.trim());
                  } else {
                    localStorage.removeItem("mparoma_order_note");
                  }
                } catch {
                  // ignore storage errors
                }
                router.push("/checkout");
              }}
              className="mt-5 w-full bg-gold px-6 py-3 font-body text-xs tracking-[0.2em] text-ink transition-opacity hover:opacity-90"
            >
              CHECK OUT
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}