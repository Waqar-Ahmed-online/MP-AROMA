"use client";

import { useState } from "react";

export function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

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
    <div>
      <h3 className="font-display text-lg text-parchment">
        Never Miss a Signature Scent
      </h3>
      <p className="mt-2 text-xs text-smoke">
        Get exclusive updates, special offers, and early access to new
        arrivals delivered straight to your inbox.
      </p>
      <form onSubmit={handleSubmit} className="mt-4 flex">
        <input
          type="email"
          required
          placeholder="Enter your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 border border-gold/20 bg-ink-soft px-3 py-2.5 text-xs text-parchment placeholder:text-smoke/70 focus:border-gold focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          aria-label="Subscribe"
          className="flex items-center justify-center border border-gold bg-gold px-4 text-ink transition-colors hover:bg-transparent hover:text-gold disabled:opacity-60"
        >
          ✉
        </button>
      </form>
      {status === "done" && (
        <p className="mt-2 text-[0.65rem] text-gold">You&apos;re on the list.</p>
      )}
      {status === "error" && (
        <p className="mt-2 text-[0.65rem] text-smoke">Something went wrong.</p>
      )}
    </div>
  );
}