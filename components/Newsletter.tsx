"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "done" : "error");
      if (res.ok) setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="border-b border-gold/10 bg-ink py-14 text-center md:py-20">
      <div className="mx-auto max-w-content px-5 md:px-10">
        <h2 className="font-display text-2xl tracking-[0.1em] text-parchment sm:text-3xl">
          JOIN THE SENSORY CLUB
        </h2>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            required
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 border border-gold/25 bg-ink-soft px-4 py-3 text-sm text-parchment placeholder:text-smoke focus:border-gold focus:outline-none"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="whitespace-nowrap border border-gold bg-gold px-6 py-3 text-[0.7rem] tracking-[0.2em] text-ink transition-colors hover:bg-transparent hover:text-parchment disabled:opacity-60"
          >
            {status === "loading" ? "SUBSCRIBING..." : "SUBSCRIBE"}
          </button>
        </form>

        {status === "done" && (
          <p className="mt-3 text-xs text-gold">You&apos;re on the list.</p>
        )}
        {status === "error" && (
          <p className="mt-3 text-xs text-smoke">
            Something went wrong — please try again.
          </p>
        )}
      </div>
    </section>
  );
}
