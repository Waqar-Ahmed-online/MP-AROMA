"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types/product";
import { CartItem } from "@/context/CartContext";

export default function CartTesterPicker({ item }: { item: CartItem }) {
  const { toggleTester } = useCart();
  const [testers, setTesters] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/testers")
      .then((res) => res.json())
      .then((data) => setTesters(data.testers || []))
      .finally(() => setLoading(false));
  }, []);

  if (item.category !== "custom") return null;

  const selected = item.selectedTesters || [];
  const limit = item.maxTesters || 0;
  const limitReached = selected.length >= limit;

  return (
    <div className="mt-3 rounded-sm border border-gold/15 bg-ink p-4">
      <p className="mb-3 text-xs tracking-[0.1em] text-gold">
        Select Testers ({selected.length}/{limit})
      </p>

      {loading ? (
        <p className="text-xs text-smoke">Loading testers...</p>
      ) : (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {testers.map((tester) => {
            const isChecked = selected.includes(tester.id);
            const disabled = !isChecked && limitReached;
            return (
              <label
                key={tester.id}
                className={`flex items-center gap-2 text-xs text-parchment/85 ${
                  disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer hover:text-gold"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  disabled={disabled}
                  onChange={() => toggleTester(item.id, tester.id)}
                />
                {tester.name}
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}