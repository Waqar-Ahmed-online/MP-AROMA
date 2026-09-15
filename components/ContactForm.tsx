"use client";
import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "done" : "error");
      if (res.ok) setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl">
      <h2 className="text-center font-display text-2xl text-parchment">
        We&apos;d Love to Hear From You
      </h2>
      <div className="mx-auto mt-2 h-px w-10 bg-gold/40" />

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <label className="block text-xs tracking-[0.1em] text-smoke">
          Name*
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="mt-2 w-full border border-gold/20 bg-ink-soft px-4 py-3 text-sm text-parchment outline-none focus:border-gold"
          />
        </label>
        <label className="block text-xs tracking-[0.1em] text-smoke">
          Email*
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-2 w-full border border-gold/20 bg-ink-soft px-4 py-3 text-sm text-parchment outline-none focus:border-gold"
          />
        </label>
      </div>

      <label className="mt-5 block text-xs tracking-[0.1em] text-smoke">
        Message*
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="mt-2 w-full border border-gold/20 bg-ink-soft px-4 py-3 text-sm text-parchment outline-none focus:border-gold"
        />
      </label>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 w-full border border-gold bg-gold py-3 text-xs tracking-[0.2em] text-ink hover:bg-transparent hover:text-gold disabled:opacity-60 sm:w-auto sm:px-10"
      >
        {status === "loading" ? "SENDING..." : "SUBMIT"}
      </button>

      {status === "done" && (
        <p className="mt-3 text-xs text-gold">Message sent — we&apos;ll get back to you soon.</p>
      )}
      {status === "error" && (
        <p className="mt-3 text-xs text-smoke">Something went wrong — please try again.</p>
      )}
    </form>
  );
}