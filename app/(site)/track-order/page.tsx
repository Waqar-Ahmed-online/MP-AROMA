"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  priceRs: number;
}

interface TrackedOrder {
  id: string;
  status: string;
  createdAt: string;
  items: OrderItem[];
  subtotal: number;
  shippingLabel: string;
  shippingCost: number;
  total: number;
  customer: {
    firstName?: string;
    lastName?: string;
    address?: string;
    apartment?: string;
    city?: string;
    postalCode?: string;
  };
}

// Order jitne stages se guzarta hai — "cancelled" is line se hat kar
// alag (red) dikhaya jata hai, isliye yahan shamil nahi.
const STEPS = [
  { key: "pending", label: "Pending" },
  { key: "processing", label: "Processing" },
  { key: "shipped", label: "Shipped" },
  { key: "delivered", label: "Delivered" },
];

function TrackOrderForm() {
  const searchParams = useSearchParams();

  const [orderId, setOrderId] = useState(searchParams.get("orderId") || "");
  const [phone, setPhone] = useState(searchParams.get("phone") || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<TrackedOrder | null>(null);
  const [autoTried, setAutoTried] = useState(false);

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    if (!orderId.trim() || !phone.trim()) {
      setError("Enter both the Order ID and phone number.");
      return;
    }

    setLoading(true);
    setError(null);
    setOrder(null);

    try {
      const res = await fetch("/api/track-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: orderId.trim(), phone: phone.trim() }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Order not found.");
      }

      setOrder(data.order);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Order not found.");
    } finally {
      setLoading(false);
    }
  }

  // Agar checkout page se orderId + phone query params ke sath aaya hai,
  // to form khud-ba-khud submit kar dete hain — customer ko dobara type
  // nahi karna padta.
  useEffect(() => {
    if (!autoTried && searchParams.get("orderId") && searchParams.get("phone")) {
      setAutoTried(true);
      handleSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoTried, searchParams]);

  const currentStepIndex = order
    ? STEPS.findIndex((s) => s.key === order.status)
    : -1;
  const isCancelled = order?.status === "cancelled";

  return (
    <section className="bg-ink py-16">
      <div className="mx-auto max-w-2xl px-5 md:px-10">
        <h1 className="font-display text-3xl tracking-[0.06em] text-parchment">
          Track Your Order
        </h1>
        <p className="mt-2 text-sm text-smoke">
         Enter your Order ID and the phone number you provided when placing the order.
There is no need to create an account.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <div>
            <label className="mb-1 block text-xs tracking-[0.1em] text-smoke">
              ORDER ID
            </label>
            <input
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="e.g. 66f1a2b3c4d5e6f7a8b9c0d1"
              className="w-full border border-gold/20 bg-ink-soft px-4 py-3 text-sm text-parchment placeholder-smoke focus:border-gold focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs tracking-[0.1em] text-smoke">
              PHONE NUMBER
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 0300-1234567"
              className="w-full border border-gold/20 bg-ink-soft px-4 py-3 text-sm text-parchment placeholder-smoke focus:border-gold focus:outline-none"
            />
          </div>

          {error && (
            <p className="rounded-sm border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full bg-gold px-6 py-3 font-body text-xs tracking-[0.2em] text-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "SEARCHING..." : "TRACK ORDER"}
          </button>
        </form>

        {order && (
          <div className="mt-10 rounded-sm border border-gold/15 bg-ink-soft/50 p-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gold/10 pb-4">
              <div>
                <p className="font-display text-sm text-gold">
                  Order #{order.id}
                </p>
                <p className="text-xs text-smoke">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
              {isCancelled && (
                <span className="rounded-full border border-red-400/40 px-3 py-1 text-[0.65rem] uppercase tracking-[0.15em] text-red-300">
                  Cancelled
                </span>
              )}
            </div>

            {/* Status stepper */}
            {!isCancelled && (
              <div className="mt-6 flex items-center justify-between">
                {STEPS.map((step, i) => (
                  <div key={step.key} className="flex flex-1 flex-col items-center">
                    <div className="flex w-full items-center">
                      <div
                        className={`h-0.5 flex-1 ${
                          i === 0
                            ? "opacity-0"
                            : i <= currentStepIndex
                            ? "bg-gold"
                            : "bg-gold/15"
                        }`}
                      />
                      <div
                        className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border text-[0.6rem] ${
                          i <= currentStepIndex
                            ? "border-gold bg-gold text-ink"
                            : "border-gold/25 text-smoke"
                        }`}
                      >
                        {i <= currentStepIndex ? "✓" : ""}
                      </div>
                      <div
                        className={`h-0.5 flex-1 ${
                          i === STEPS.length - 1
                            ? "opacity-0"
                            : i < currentStepIndex
                            ? "bg-gold"
                            : "bg-gold/15"
                        }`}
                      />
                    </div>
                    <span
                      className={`mt-2 text-center text-[0.6rem] uppercase tracking-[0.1em] ${
                        i <= currentStepIndex ? "text-parchment" : "text-smoke"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 flex flex-col gap-1 border-t border-gold/10 pt-4">
              {order.items.map((item, i) => (
                <p key={i} className="text-sm text-parchment/85">
                  {item.name} x{item.quantity} — Rs.{" "}
                  {(item.priceRs * item.quantity).toLocaleString()}
                </p>
              ))}
            </div>

            <p className="mt-3 text-sm text-parchment">
              Total:{" "}
              <span className="text-gold">
                Rs. {order.total.toLocaleString()}
              </span>{" "}
              <span className="text-smoke">
                (Shipping: {order.shippingLabel} — Rs. {order.shippingCost})
              </span>
            </p>

            <div className="mt-3 border-t border-gold/10 pt-3 text-sm text-parchment/85">
              <p>
                {order.customer.firstName} {order.customer.lastName}
              </p>
              <p>
                {order.customer.address}
                {order.customer.apartment ? `, ${order.customer.apartment}` : ""}
                , {order.customer.city}
                {order.customer.postalCode ? ` - ${order.customer.postalCode}` : ""}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default function TrackOrderPage() {
  // useSearchParams ko Suspense boundary chahiye Next.js app router mein.
  return (
    <Suspense fallback={null}>
      <TrackOrderForm />
    </Suspense>
  );
}