"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import { useCart } from "@/context/CartContext";
import ImgWithFallback from "@/components/ui/ImgWithFallback";
import { getAvailableShippingMethods, ShippingMethod } from "@/lib/shipping";

export default function CheckoutPage() {
 
  const { items, subtotal, cartCount, clearCart } = useCart();

  const shippingOptions = getAvailableShippingMethods(subtotal);
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>(
    shippingOptions[0].id
  );
const [discountCode, setDiscountCode] = useState("");
const [discountMsg, setDiscountMsg] = useState<string | null>(null);
const [discountPercent, setDiscountPercent] = useState<number | null>(null);
const [applyingDiscount, setApplyingDiscount] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [orderNote, setOrderNote] = useState("");
  const [orderSuccess, setOrderSuccess] = useState<{
    orderId: string;
    customerEmailSent: boolean;
  } | null>(null);

  useEffect(() => {
    try {
      setOrderNote(localStorage.getItem("mparoma_order_note") || "");
    } catch {
      // ignore storage errors
    }
  }, []);

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    postalCode: "",
    phone: "",
  });

const shippingCost =
  shippingOptions.find((s) => s.id === shippingMethod)?.cost ?? 0;
const discountAmount = discountPercent
  ? Math.round((subtotal * discountPercent) / 100)
  : 0;
const total = subtotal - discountAmount + shippingCost;
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

async function handleApplyDiscount() {
  if (!discountCode.trim()) {
    setDiscountMsg("Please enter a code.");
    return;
  }
  setApplyingDiscount(true);
  setDiscountMsg(null);
  try {
    const res = await fetch("/api/vouchers/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: discountCode }),
    });
    const data = await res.json();
    if (!res.ok) {
      setDiscountPercent(null);
      setDiscountMsg(data.error || "Invalid code.");
    } else {
      setDiscountPercent(data.percent);
      setDiscountMsg(`🎉 ${data.percent}% off applied!`);
    }
  } catch {
    setDiscountMsg("Something went wrong, try again.");
  } finally {
    setApplyingDiscount(false);
  }
}

  async function handlePlaceOrder(e: React.FormEvent) {
    e.preventDefault();
    setOrderError(null);

    const shippingLabel = shippingOptions.find(
      (s) => s.id === shippingMethod
    )?.label as string;

    const payload = {
      items: items.map((i) => ({
        id: i.id,
        name: i.name,
        quantity: i.quantity,
        priceRs: i.priceRs,
        selectedTesters: i.selectedTesters || [],
      })),
      subtotal,
       discountCode: discountPercent ? discountCode.toUpperCase() : null, 
  discountPercent: discountPercent || 0,                            
  discountAmount,  
      shippingMethod,
      shippingLabel,
      shippingCost,
      total,
      customer: {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        address: form.address,
        apartment: form.apartment,
        city: form.city,
        postalCode: form.postalCode,
      },
      note: orderNote,
    };

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Could not place your order.");
      }

      clearCart();
      try {
        localStorage.removeItem("mparoma_order_note");
      } catch {
        // ignore storage errors
      }
      // Order confirm ho gaya — turant UI par batao, redirect nahi karte
      // taake user ko pata chale order place hua ya nahi.
      setOrderSuccess({
        orderId: data.orderId,
        customerEmailSent: Boolean(data.customerEmailSent),
      });
    } catch (err) {
      // Order fail ho gaya (network issue, server error, waghera) — turant
      // saaf error dikhao taake user dobara try kare.
      setOrderError(
        err instanceof Error
          ? err.message
          : "Could not place your order right now. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }



  if (orderSuccess) {
    return (
      <section className="bg-ink py-20">
        <div className="mx-auto flex max-w-content flex-col items-center gap-4 px-5 text-center md:px-10">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-green-500/40 bg-green-500/10 text-green-400">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <h1 className="font-display text-3xl tracking-[0.06em] text-parchment">
            Order Placed Successfully
          </h1>
          <p className="text-sm text-smoke">
            Order ID: <span className="text-gold">{orderSuccess.orderId}</span>
          </p>
          <p className="max-w-md text-sm text-parchment/80">
            {orderSuccess.customerEmailSent
              ? "A confirmation email has been sent to your inbox."
              : "Your order is confirmed, but we couldn't send the confirmation email — please save your Order ID above."}
          </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
  <Link
    href={`/track-order?orderId=${orderSuccess.orderId}&phone=${encodeURIComponent(
      form.phone
    )}`}
    className="border border-gold px-6 py-3 font-body text-xs tracking-[0.2em] text-gold transition-colors hover:bg-gold hover:text-ink"
  >
    TRACK THIS ORDER
  </Link>
  <Link
    href="/"
    className="border border-gold/30 px-6 py-3 font-body text-xs tracking-[0.2em] text-parchment/80 transition-colors hover:border-gold hover:text-gold"
  >
    CONTINUE SHOPPING
  </Link>
</div>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="bg-ink py-20">
        <div className="mx-auto flex max-w-content flex-col items-center gap-4 px-5 text-center md:px-10">
          <h1 className="font-display text-3xl tracking-[0.06em] text-parchment">
            Your Cart Is Empty
          </h1>
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
    <section className="bg-ink">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-gold/10 px-5 py-4 md:px-10">
        <Link href="/" className="font-display text-xl tracking-[0.18em] text-gold">
          MPAROMA
        </Link>
        <Link href="/cart" className="relative text-gold">
          <BagIcon />
          <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-parchment text-[0.6rem] font-semibold text-ink">
            {cartCount}
          </span>
        </Link>
      </div>

      <div className="mx-auto grid max-w-content grid-cols-1 gap-10 px-5 py-10 md:px-10 lg:grid-cols-2 lg:gap-16">
        {/* LEFT: form */}
        <form onSubmit={handlePlaceOrder} className="flex flex-col gap-8">
          <div>
            <h2 className="mb-4 font-display text-xl text-parchment">Contact</h2>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border border-gold/20 bg-ink-soft px-4 py-3 text-sm text-parchment placeholder-smoke focus:border-gold focus:outline-none"
            />
            <label className="mt-3 flex items-center gap-2 text-xs text-smoke">
              <input type="checkbox" className="accent-gold" />
              Email me with news and offers
            </label>
          </div>

          <div>
            <h2 className="mb-4 font-display text-xl text-parchment">Delivery</h2>
            <div className="flex flex-col gap-3">
              <select
                disabled
                className="w-full border border-gold/20 bg-ink-soft px-4 py-3 text-sm text-parchment"
              >
                <option>Pakistan</option>
              </select>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input
                  name="firstName"
                  required
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  className="w-full border border-gold/20 bg-ink-soft px-4 py-3 text-sm text-parchment placeholder-smoke focus:border-gold focus:outline-none"
                />
                <input
                  name="lastName"
                  required
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                  className="w-full border border-gold/20 bg-ink-soft px-4 py-3 text-sm text-parchment placeholder-smoke focus:border-gold focus:outline-none"
                />
              </div>
              <input
                name="address"
                required
                value={form.address}
                onChange={handleChange}
                placeholder="Address"
                className="w-full border border-gold/20 bg-ink-soft px-4 py-3 text-sm text-parchment placeholder-smoke focus:border-gold focus:outline-none"
              />
              <input
                name="apartment"
                value={form.apartment}
                onChange={handleChange}
                placeholder="Apartment, suite, etc. (optional)"
                className="w-full border border-gold/20 bg-ink-soft px-4 py-3 text-sm text-parchment placeholder-smoke focus:border-gold focus:outline-none"
              />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input
                  name="city"
                  required
                  value={form.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="w-full border border-gold/20 bg-ink-soft px-4 py-3 text-sm text-parchment placeholder-smoke focus:border-gold focus:outline-none"
                />
                <input
                  name="postalCode"
                  value={form.postalCode}
                  onChange={handleChange}
                  placeholder="Postal code (optional)"
                  className="w-full border border-gold/20 bg-ink-soft px-4 py-3 text-sm text-parchment placeholder-smoke focus:border-gold focus:outline-none"
                />
              </div>
              <input
                name="phone"
                required
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full border border-gold/20 bg-ink-soft px-4 py-3 text-sm text-parchment placeholder-smoke focus:border-gold focus:outline-none"
              />
              <label className="flex items-center gap-2 text-xs text-smoke">
                <input type="checkbox" className="accent-gold" />
                Save this information for next time
              </label>
            </div>
          </div>

          <div>
            <h2 className="mb-4 font-display text-xl text-parchment">
              Shipping method
            </h2>
            <div className="flex flex-col gap-2">
              {shippingOptions.map((option) => (
                <label
                  key={option.id}
                  className={`flex cursor-pointer items-center justify-between border px-4 py-3 text-sm transition-colors ${
                    shippingMethod === option.id
                      ? "border-gold bg-gold/10 text-parchment"
                      : "border-gold/20 text-parchment/80"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shippingMethod"
                      checked={shippingMethod === option.id}
                      onChange={() => setShippingMethod(option.id)}
                      className="accent-gold"
                    />
                    {option.label}
                  </span>
                  <span>{option.cost === 0 ? "FREE" : `Rs. ${option.cost}.00`}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-2 font-display text-xl text-parchment">Payment</h2>
            <p className="mb-3 text-xs text-smoke">
              All transactions are secure and encrypted.
            </p>
            <div className="border border-gold/20 bg-ink-soft px-4 py-4 text-sm text-parchment/85">
              <p className="font-semibold text-gold">Cash on Delivery</p>
              <p className="mt-1 text-xs text-smoke">
                Pay in cash when your order is delivered.
              </p>
            </div>
          </div>

          {orderError && (
            <div className="flex items-start gap-2 rounded-sm border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="mt-0.5 flex-shrink-0"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v5" />
                <path d="M12 16h.01" />
              </svg>
              <span>
                <strong className="block text-red-200">Order failed</strong>
                {orderError}
              </span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gold px-6 py-4 font-body text-xs tracking-[0.2em] text-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "PLACING ORDER..." : "PLACE ORDER"}
          </button>
        </form>

        {/* RIGHT: order summary */}
        <div className="h-fit rounded-sm border border-gold/15 bg-ink-soft/50 p-6 lg:sticky lg:top-10">
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <div className="relative h-16 w-14 flex-shrink-0 overflow-hidden border border-gold/10 bg-ink">
                  <ImgWithFallback
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-ink text-[0.6rem] font-semibold text-parchment ring-1 ring-gold/40">
                    {item.quantity}
                  </span>
                </div>
                <p className="flex-1 text-sm text-parchment">{item.name}</p>
                <p className="text-sm text-parchment">
                  Rs. {(item.priceRs * item.quantity).toLocaleString()}.00
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex gap-2">
            <input
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              placeholder="Discount code"
              className="flex-1 border border-gold/20 bg-ink px-3 py-2 text-sm text-parchment placeholder-smoke focus:border-gold focus:outline-none"
            />
          <button
  type="button"
  onClick={handleApplyDiscount}
  disabled={applyingDiscount}
  className="border border-gold/40 px-4 text-xs tracking-[0.1em] text-parchment hover:bg-gold hover:text-ink disabled:opacity-50"
>
  {applyingDiscount ? "..." : "Apply"}
</button>
          </div>
          {discountMsg && (
            <p className="mt-1 text-xs text-smoke">{discountMsg}</p>
          )}

          <div className="mt-6 flex flex-col gap-2 border-t border-gold/10 pt-4 text-sm">
  <div className="flex justify-between text-parchment/85">
    <span>Subtotal</span>
    <span>Rs. {subtotal.toLocaleString()}.00</span>
  </div>
  {discountPercent && (
    <div className="flex justify-between text-gold">
      <span>Discount ({discountPercent}%)</span>
      <span>-Rs. {discountAmount.toLocaleString()}.00</span>
    </div>
  )}
  <div className="flex justify-between text-parchment/85">
    <span>Shipping</span>
    <span>{shippingCost === 0 ? "FREE" : `Rs. ${shippingCost}.00`}</span>
  </div>
  <div className="flex justify-between border-t border-gold/10 pt-2 text-base font-semibold text-parchment">
    <span>Total</span>
    <span className="text-gold">Rs. {total.toLocaleString()}.00</span>
  </div>
</div>
        </div>
      </div>
    </section>
  );
}

function BagIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 8h12l-1 12H7L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}