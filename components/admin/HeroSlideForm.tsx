"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { HeroSlide } from "@/types/hero";

type FormState = Omit<HeroSlide, "id">;

export default function HeroSlideForm({ initial }: { initial?: HeroSlide }) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(
    initial ?? {
      heading: "",
      tagline: "",
      backgroundImage: "",
      primaryCtaLabel: "Discover the Collection",
      primaryCtaHref: "/collection",
      secondaryCtaLabel: "Order a Tester",
      secondaryCtaHref: "/tester",
      order: 1,
    }
  );
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
    setUploading(false);
    if (!res.ok) return setError("Image upload failed");
    const data = await res.json();
    update("backgroundImage", data.url);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const res = initial
      ? await fetch(`/api/admin/hero/${initial.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        })
      : await fetch("/api/admin/hero", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

    setSaving(false);
    if (!res.ok) return setError("Save failed");
    router.push("/admin/hero");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
      <label className="block text-xs tracking-[0.1em] text-smoke">
        Order (chhota number pehle dikhega)
        <input type="number" value={form.order} onChange={(e) => update("order", Number(e.target.value))}
          className="mt-1 w-full border border-gold/20 bg-ink px-3 py-2 text-sm text-parchment outline-none focus:border-gold" />
      </label>

      <label className="block text-xs tracking-[0.1em] text-smoke">
        Tagline (chhoti line, heading se upar)
        <input value={form.tagline} onChange={(e) => update("tagline", e.target.value)}
          className="mt-1 w-full border border-gold/20 bg-ink px-3 py-2 text-sm text-parchment outline-none focus:border-gold" />
      </label>

      <label className="block text-xs tracking-[0.1em] text-smoke">
        Heading
        <input value={form.heading} onChange={(e) => update("heading", e.target.value)}
          className="mt-1 w-full border border-gold/20 bg-ink px-3 py-2 text-sm text-parchment outline-none focus:border-gold" />
      </label>

      <label className="block text-xs tracking-[0.1em] text-smoke">
        Primary Button Label
        <input value={form.primaryCtaLabel} onChange={(e) => update("primaryCtaLabel", e.target.value)}
          className="mt-1 w-full border border-gold/20 bg-ink px-3 py-2 text-sm text-parchment outline-none focus:border-gold" />
      </label>
      <label className="block text-xs tracking-[0.1em] text-smoke">
        Primary Button Link
        <input value={form.primaryCtaHref} onChange={(e) => update("primaryCtaHref", e.target.value)}
          className="mt-1 w-full border border-gold/20 bg-ink px-3 py-2 text-sm text-parchment outline-none focus:border-gold" />
      </label>

      <label className="block text-xs tracking-[0.1em] text-smoke">
        Secondary Button Label
        <input value={form.secondaryCtaLabel} onChange={(e) => update("secondaryCtaLabel", e.target.value)}
          className="mt-1 w-full border border-gold/20 bg-ink px-3 py-2 text-sm text-parchment outline-none focus:border-gold" />
      </label>
      <label className="block text-xs tracking-[0.1em] text-smoke">
        Secondary Button Link
        <input value={form.secondaryCtaHref} onChange={(e) => update("secondaryCtaHref", e.target.value)}
          className="mt-1 w-full border border-gold/20 bg-ink px-3 py-2 text-sm text-parchment outline-none focus:border-gold" />
      </label>

      <label className="block text-xs tracking-[0.1em] text-smoke">
        Background Image
        <input type="file" accept="image/*" onChange={handleImageUpload} className="mt-1 block w-full text-xs text-smoke" />
      </label>
      {uploading && <p className="text-xs text-gold">Uploading...</p>}
      {form.backgroundImage && (
        <img src={form.backgroundImage} alt="preview" className="h-32 w-full object-cover border border-gold/20" />
      )}

      {error && <p className="text-xs text-red-400">{error}</p>}

      <button type="submit" disabled={saving || uploading}
        className="border border-gold bg-gold px-6 py-2 text-xs tracking-[0.2em] text-ink hover:bg-transparent hover:text-gold disabled:opacity-50">
        {saving ? "SAVING..." : "SAVE"}
      </button>
    </form>
  );
}