"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Login failed");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-5">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm border border-gold/15 bg-ink-soft/40 p-8"
      >
        <h1 className="mb-6 text-center font-display text-2xl tracking-[0.1em] text-parchment">
          ADMIN LOGIN
        </h1>

        <label className="mb-3 block text-xs tracking-[0.1em] text-smoke">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 w-full border border-gold/20 bg-ink px-3 py-2 text-sm text-parchment outline-none focus:border-gold"
          />
        </label>

        <label className="mb-5 block text-xs tracking-[0.1em] text-smoke">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 w-full border border-gold/20 bg-ink px-3 py-2 text-sm text-parchment outline-none focus:border-gold"
          />
        </label>

        {error && <p className="mb-4 text-xs text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full border border-gold bg-gold py-2 text-xs tracking-[0.2em] text-ink transition hover:bg-transparent hover:text-gold disabled:opacity-50"
        >
          {loading ? "SIGNING IN..." : "SIGN IN"}
        </button>
      </form>
    </div>
  );
}