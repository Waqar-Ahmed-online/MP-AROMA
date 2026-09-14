"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Review } from "@/types/product";

export default function ReviewApprovalList({ reviews }: { reviews: Review[] }) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function updateStatus(id: string, status: "approved" | "pending") {
    setLoadingId(id);
    await fetch(`/api/admin/reviews/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setLoadingId(null);
    router.refresh();
  }

  async function removeReview(id: string) {
    if (!confirm("Yeh review permanently delete karna hai?")) return;
    setLoadingId(id);
    await fetch(`/api/admin/reviews/${id}`, { method: "DELETE" });
    setLoadingId(null);
    router.refresh();
  }

  const pending = reviews.filter((r) => r.status === "pending");
  const approved = reviews.filter((r) => r.status !== "pending");

  return (
    <div className="mt-8 space-y-10">
      <section>
        <h2 className="text-sm tracking-[0.15em] text-gold">
          PENDING ({pending.length})
        </h2>

        {pending.length === 0 && (
          <p className="mt-3 text-xs text-smoke">
            Koi naya review pending nahi hai.
          </p>
        )}

        <div className="mt-4 space-y-4">
          {pending.map((r) => (
            <div key={r.id} className="border border-gold/20 bg-ink-soft/40 p-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="max-w-xl">
                  <p className="text-xs tracking-[0.1em] text-gold">
                    {"★".repeat(r.rating)}
                    {"☆".repeat(5 - r.rating)}
                  </p>
                  <p className="mt-1 text-sm text-parchment">{r.quote}</p>
                  <p className="mt-1 text-xs text-smoke">— {r.author || "Anonymous"}</p>
                </div>

               {r.media && r.media.length > 0 && (
  <div className="flex gap-2">
    {r.media.map((m, i) =>
      m.type === "video" ? (
        <video key={i} src={m.url} controls className="h-24 w-24 object-cover" />
      ) : (
        <img key={i} src={m.url} alt="review media" className="h-24 w-24 object-cover" />
      )
    )}
  </div>
)}
              </div>

              <div className="mt-3 flex gap-3">
                <button
                  disabled={loadingId === r.id}
                  onClick={() => updateStatus(r.id, "approved")}
                  className="border border-gold bg-gold px-4 py-1.5 text-xs tracking-[0.15em] text-ink hover:bg-transparent hover:text-gold disabled:opacity-50"
                >
                  APPROVE
                </button>
                <button
                  disabled={loadingId === r.id}
                  onClick={() => removeReview(r.id)}
                  className="border border-red-400/50 px-4 py-1.5 text-xs tracking-[0.15em] text-red-300 hover:bg-red-400/10 disabled:opacity-50"
                >
                  REJECT
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-sm tracking-[0.15em] text-gold">
          APPROVED ({approved.length})
        </h2>

        <div className="mt-4 space-y-3">
          {approved.map((r) => (
            <div
              key={r.id}
              className="flex flex-wrap items-center justify-between gap-3 border border-gold/10 bg-ink-soft/20 p-3"
            >
              <div>
                <p className="text-xs tracking-[0.1em] text-gold">
                  {"★".repeat(r.rating)}
                  {"☆".repeat(5 - r.rating)}
                </p>
                <p className="text-sm text-parchment">{r.quote}</p>
                <p className="text-xs text-smoke">— {r.author || "Anonymous"}</p>
              </div>
              <button
                disabled={loadingId === r.id}
                onClick={() => removeReview(r.id)}
                className="border border-gold/30 px-3 py-1 text-[0.65rem] tracking-[0.15em] text-smoke hover:text-gold disabled:opacity-50"
              >
                REMOVE
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}