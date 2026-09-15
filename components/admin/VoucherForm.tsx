"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VoucherForm() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [percent, setPercent] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const res = await fetch("/api/admin/vouchers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, percent: Number(percent) }),
    });

    setSaving(false);
    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Save failed");
      return;
    }
    router.push("/admin/vouchers");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm space-y-4">
      <label className="block text-xs tracking-[0.1em] text-smoke">
        Voucher Code
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="e.g. EID20"
          required
          className="mt-1 w-full border border-gold/20 bg-ink px-3 py-2 text-sm text-parchment outline-none focus:border-gold"
        />
      </label>

      <label className="block text-xs tracking-[0.1em] text-smoke">
        Discount Percent (%)
        <input
          type="number"
          min={1}
          max={100}
          value={percent}
          onChange={(e) => setPercent(e.target.value)}
          placeholder="e.g. 20"
          required
          className="mt-1 w-full border border-gold/20 bg-ink px-3 py-2 text-sm text-parchment outline-none focus:border-gold"
        />
      </label>

      {error && <p className="text-xs text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={saving}
        className="border border-gold bg-gold px-6 py-2 text-xs tracking-[0.2em] text-ink hover:bg-transparent hover:text-gold disabled:opacity-50"
      >
        {saving ? "SAVING..." : "CREATE VOUCHER"}
      </button>
    </form>
  );
}