"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AboutSection } from "@/types/about";

type FormState = Omit<AboutSection, "id">;

export default function AboutSectionForm({ initial }: { initial?: AboutSection }) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(
    initial ?? {
      eyebrow: "",
      title: "",
      description: "",
      image: "",
      imagePosition: "right",
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
    update("image", data.url);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const res = initial
      ? await fetch(`/api/admin/about/${initial.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        })
      : await fetch("/api/admin/about", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

    setSaving(false);
    if (!res.ok) return setError("Save failed");
    router.push("/admin/about");
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
        Eyebrow (chhoti caption, title se upar)
        <input value={form.eyebrow} onChange={(e) => update("eyebrow", e.target.value)}
          className="mt-1 w-full border border-gold/20 bg-ink px-3 py-2 text-sm text-parchment outline-none focus:border-gold" />
      </label>

      <label className="block text-xs tracking-[0.1em] text-smoke">
        Title
        <input value={form.title} onChange={(e) => update("title", e.target.value)}
          className="mt-1 w-full border border-gold/20 bg-ink px-3 py-2 text-sm text-parchment outline-none focus:border-gold" />
      </label>

      <label className="block text-xs tracking-[0.1em] text-smoke">
        Description
        <textarea value={form.description} onChange={(e) => update("description", e.target.value)} rows={4}
          className="mt-1 w-full border border-gold/20 bg-ink px-3 py-2 text-sm text-parchment outline-none focus:border-gold" />
      </label>

      <label className="block text-xs tracking-[0.1em] text-smoke">
        Image Position
        <select value={form.imagePosition} onChange={(e) => update("imagePosition", e.target.value as "left" | "right")}
          className="mt-1 w-full border border-gold/20 bg-ink px-3 py-2 text-sm text-parchment outline-none focus:border-gold">
          <option value="right">Image Right</option>
          <option value="left">Image Left</option>
        </select>
      </label>

      <label className="block text-xs tracking-[0.1em] text-smoke">
        Image
        <input type="file" accept="image/*" onChange={handleImageUpload} className="mt-1 block w-full text-xs text-smoke" />
      </label>
      {uploading && <p className="text-xs text-gold">Uploading...</p>}
      {form.image && (
        <img src={form.image} alt="preview" className="h-32 w-48 object-cover border border-gold/20" />
      )}

      {error && <p className="text-xs text-red-400">{error}</p>}

      <button type="submit" disabled={saving || uploading}
        className="border border-gold bg-gold px-6 py-2 text-xs tracking-[0.2em] text-ink hover:bg-transparent hover:text-gold disabled:opacity-50">
        {saving ? "SAVING..." : "SAVE"}
      </button>
    </form>
  );
}