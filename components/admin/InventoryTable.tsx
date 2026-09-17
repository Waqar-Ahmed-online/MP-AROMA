"use client";
import { useState } from "react";
import { Product } from "@/types/product";

export default function InventoryTable({ products }: { products: Product[] }) {
  const [stocks, setStocks] = useState<Record<string, number>>(
    Object.fromEntries(products.map((p) => [p.id, p.stock ?? 0]))
  );
  const [saving, setSaving] = useState<string | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);

  async function handleSave(id: string) {
    setSaving(id);
    setSavedId(null);
    try {
      await fetch(`/api/admin/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stock: stocks[id] }),
      });
      setSavedId(id);
      setTimeout(() => setSavedId(null), 1500);
    } finally {
      setSaving(null);
    }
  }

  return (
    <div className="divide-y divide-gold/10 border border-gold/10">
      {products.map((p) => (
        <div key={p.id} className="flex flex-wrap items-center gap-4 p-4">
          <img src={p.image} alt={p.name} className="h-14 w-14 object-cover" />

          <div className="min-w-[140px] flex-1">
            <p className="text-sm">{p.name}</p>
            <p className="text-xs text-smoke">{p.category}</p>
          </div>

          <input
            type="number"
            min={0}
            value={stocks[p.id]}
            onChange={(e) =>
              setStocks((s) => ({ ...s, [p.id]: Number(e.target.value) }))
            }
            className="w-24 border border-gold/30 bg-ink px-3 py-1.5 text-sm text-parchment focus:border-gold focus:outline-none"
          />

          <button
            onClick={() => handleSave(p.id)}
            disabled={saving === p.id}
            className="border border-gold px-4 py-1.5 text-xs tracking-[0.1em] text-gold transition-colors hover:bg-gold hover:text-ink disabled:opacity-50"
          >
            {saving === p.id ? "SAVING..." : savedId === p.id ? "SAVED ✓" : "SAVE"}
          </button>

          {stocks[p.id] <= 5 && (
            <span className="text-[0.65rem] uppercase tracking-[0.1em] text-red-400">
              Low stock
            </span>
          )}
        </div>
      ))}
    </div>
  );
}