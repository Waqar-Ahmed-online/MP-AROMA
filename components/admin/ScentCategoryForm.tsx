"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ScentCategory } from "@/types/product";

export default function ScentCategoryForm({ initial }: { initial: ScentCategory }) {
  const router = useRouter();
  const [label, setLabel] = useState(initial.label);
  const [slug, setSlug] = useState(initial.slug);
  const [image, setImage] = useState(initial.image);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

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
    setImage(data.url);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const res = await fetch(`/api/admin/scent-categories/${initial.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ label, slug, image }),
    });

    setSaving(false);
    if (!res.ok) return setError("Save failed");
    router.push("/admin/scent-categories");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
      <label className="block text-xs tracking-[0.1em] text-smoke">
        Label
        <input value={label} onChange={(e) => setLabel(e.target.value)} required
          className="mt-1 w-full border border-gold/20 bg-ink px-3 py-2 text-sm text-parchment outline-none focus:border-gold" />
      </label>

           <label className="block text-xs tracking-[0.1em] text-smoke">
        Slug
        <select
          value={slug}
          onChange={(e) => setSlug(e.target.value as ScentCategory["slug"])}
          className="mt-1 w-full border border-gold/20 bg-ink px-3 py-2 text-sm text-parchment outline-none focus:border-gold"
        >
          <option value="men">men</option>
          <option value="women">women</option>
          <option value="unisex">unisex</option>
        </select>
      </label>

      <label className="block text-xs tracking-[0.1em] text-smoke">
        Image
        <input type="file" accept="image/*" onChange={handleImageUpload} className="mt-1 block w-full text-xs text-smoke" />
      </label>
      {uploading && <p className="text-xs text-gold">Uploading...</p>}
      {image && <img src={image} alt="preview" className="h-32 w-full object-cover border border-gold/20" />}
      {error && <p className="text-xs text-red-400">{error}</p>}

      <button type="submit" disabled={saving || uploading}
        className="border border-gold bg-gold px-6 py-2 text-xs tracking-[0.2em] text-ink hover:bg-transparent hover:text-gold disabled:opacity-50">
        {saving ? "SAVING..." : "SAVE"}
      </button>
    </form>
  );
}