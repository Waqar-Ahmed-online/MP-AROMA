"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DiscoverySetContent } from "@/types/discoverySet";

export default function DiscoverySetForm({ initial }: { initial: DiscoverySetContent }) {
  const router = useRouter();
  const [form, setForm] = useState(initial);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  function update<K extends keyof DiscoverySetContent>(key: K, value: DiscoverySetContent[K]) {
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
    setSaved(false);

    const res = await fetch("/api/admin/discovery-set", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setSaving(false);
    if (!res.ok) return setError("Save failed");
    setSaved(true);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
      <label className="block text-xs tracking-[0.1em] text-smoke">
        Heading
        <input value={form.heading} onChange={(e) => update("heading", e.target.value)}
          className="mt-1 w-full border border-gold/20 bg-ink px-3 py-2 text-sm text-parchment outline-none focus:border-gold" />
      </label>

      <label className="block text-xs tracking-[0.1em] text-smoke">
        Subtitle
        <input value={form.subtitle} onChange={(e) => update("subtitle", e.target.value)}
          className="mt-1 w-full border border-gold/20 bg-ink px-3 py-2 text-sm text-parchment outline-none focus:border-gold" />
      </label>

      <label className="block text-xs tracking-[0.1em] text-smoke">
        Price Label
        <input value={form.priceLabel} onChange={(e) => update("priceLabel", e.target.value)}
          className="mt-1 w-full border border-gold/20 bg-ink px-3 py-2 text-sm text-parchment outline-none focus:border-gold" />
      </label>

      <label className="block text-xs tracking-[0.1em] text-smoke">
        Button Label
        <input value={form.ctaLabel} onChange={(e) => update("ctaLabel", e.target.value)}
          className="mt-1 w-full border border-gold/20 bg-ink px-3 py-2 text-sm text-parchment outline-none focus:border-gold" />
      </label>

      <label className="block text-xs tracking-[0.1em] text-smoke">
        Button Link
        <input value={form.ctaHref} onChange={(e) => update("ctaHref", e.target.value)}
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
      {saved && <p className="text-xs text-gold">Saved.</p>}

      <button type="submit" disabled={saving || uploading}
        className="border border-gold bg-gold px-6 py-2 text-xs tracking-[0.2em] text-ink hover:bg-transparent hover:text-gold disabled:opacity-50">
        {saving ? "SAVING..." : "SAVE"}
      </button>
    </form>
  );
}