"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const STATUSES = [
  { key: "pending", label: "Pending" },
  { key: "processing", label: "Mark as Processing" },
  { key: "shipped", label: "Mark as Shipped" },
  { key: "delivered", label: "Mark as Delivered" },
  { key: "cancelled", label: "Cancel" },
];

const STATUS_BADGE_STYLES: Record<string, string> = {
  pending: "border-gold/30 text-parchment",
  processing: "border-blue-400/40 text-blue-300",
  shipped: "border-amber-400/40 text-amber-300",
  delivered: "border-green-400/40 text-green-300",
  cancelled: "border-red-400/40 text-red-300",
};

export default function OrderStatusControl({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  const router = useRouter();
  const [current, setCurrent] = useState(status);
  const [saving, setSaving] = useState<string | null>(null); // konsa status save ho raha hai
  const [error, setError] = useState<string | null>(null);

  async function handleClick(next: string) {
    if (next === current || saving) return;
    const prev = current;
    setCurrent(next); // UI turant update, customer ko live reflect hone ke liye
    setSaving(next);
    setError(null);

    try {
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Status update failed.");
      }
      router.refresh();
    } catch (err) {
      setCurrent(prev); // fail hua to purani value par wapas
      setError(err instanceof Error ? err.message : "Status update failed.");
    } finally {
      setSaving(null);
    }
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <span
        className={`rounded-full border bg-ink px-3 py-1 text-[0.65rem] uppercase tracking-[0.15em] ${
          STATUS_BADGE_STYLES[current] || "border-gold/30 text-parchment"
        }`}
      >
        {current}
      </span>

      <div className="flex flex-wrap justify-end gap-1.5">
        {STATUSES.filter((s) => s.key !== current).map((s) => (
          <button
            key={s.key}
            type="button"
            disabled={saving !== null}
            onClick={() => handleClick(s.key)}
            className={`rounded-full border px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.1em] transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
              s.key === "cancelled"
                ? "border-red-400/30 text-red-300 hover:bg-red-400/10"
                : "border-gold/25 text-parchment/80 hover:border-gold hover:text-gold"
            }`}
          >
            {saving === s.key ? "Saving..." : s.label}
          </button>
        ))}
      </div>

      {error && <span className="text-[0.6rem] text-red-400">{error}</span>}
    </div>
  );
}