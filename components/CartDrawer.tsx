"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import ImgWithFallback from "@/components/ui/ImgWithFallback";

export default function CartDrawer() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    subtotal,
    isCartOpen,
    closeCart,
  } = useCart();

  return (
    <div
      className={`fixed inset-0 z-[60] ${
        isCartOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!isCartOpen}
    >
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
          isCartOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Slider panel */}
      <div
        className={`absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-ink-soft shadow-xl transition-transform duration-300 ease-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-gold/10 px-5 py-4">
          <h2 className="font-display text-lg tracking-[0.1em] text-parchment">
            Added to Cart
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="flex h-8 w-8 items-center justify-center rounded-full text-parchment hover:bg-gold/10"
          >
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <p className="text-sm text-smoke">Aapka cart abhi khali hai.</p>
            <Link
              href="/collection"
              onClick={closeCart}
              className="border border-gold px-5 py-2.5 text-xs tracking-[0.2em] text-gold transition-colors hover:bg-gold hover:text-ink"
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 border-b border-gold/10 py-4 first:pt-0"
                >
                  <div className="h-20 w-16 flex-shrink-0 overflow-hidden border border-gold/10 bg-ink">
                    <ImgWithFallback
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col gap-1">
                    <p className="text-sm text-parchment">{item.name}</p>
                    <p className="text-xs text-gold">
                      Rs. {item.priceRs.toLocaleString()}.00
                    </p>

                    <div className="mt-1 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                        className="flex h-6 w-6 items-center justify-center border border-gold/20 text-parchment hover:border-gold"
                      >
                        −
                      </button>
                      <span className="w-5 text-center text-xs text-parchment">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                        className="flex h-6 w-6 items-center justify-center border border-gold/20 text-parchment hover:border-gold"
                      >
                        +
                      </button>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="ml-auto text-[0.65rem] uppercase tracking-[0.15em] text-smoke underline underline-offset-2 hover:text-red-400"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gold/10 px-5 py-4">
              <div className="mb-4 flex items-center justify-between text-sm">
                <span className="text-smoke">Subtotal</span>
                <span className="text-parchment">
                  Rs. {subtotal.toLocaleString()}.00
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="border border-gold px-5 py-3 text-center text-xs tracking-[0.2em] text-gold transition-colors hover:bg-gold hover:text-ink"
                >
                  VIEW CART
                </Link>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="bg-gold px-5 py-3 text-center text-xs tracking-[0.2em] text-ink transition-colors hover:bg-gold/90"
                >
                  CHECKOUT
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}