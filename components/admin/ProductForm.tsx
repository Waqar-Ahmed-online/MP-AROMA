"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/types/product";

export default function ProductForm({ initial }: { initial?: Product }) {
  const router = useRouter();
  const [name, setName] = useState(initial?.name || "");
  const [slug, setSlug] = useState(initial?.slug || "");
  const [inspiredBy, setInspiredBy] = useState(initial?.inspiredBy || "");
  const [compareAtPriceRs, setCompareAtPriceRs] = useState(
    initial?.compareAtPriceRs?.toString() || ""
  );
  const [priceRs, setPriceRs] = useState(initial?.priceRs?.toString() || "");
  const [category, setCategory] = useState<Product["category"]>(initial?.category || "men");
  const [isBestSeller, setIsBestSeller] = useState(initial?.isBestSeller || false);
  const [isTester, setIsTester] = useState(initial?.isTester || false);
  const [image, setImage] = useState(initial?.image || "");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
const [maxTesters, setMaxTesters] = useState(initial?.maxTesters?.toString() || "");
  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
    setUploading(false);

    if (!res.ok) {
      setError("Image upload failed");
      return;
    }
    const data = await res.json();
    setImage(data.url);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    // Actual price (compareAtPriceRs) optional hai — khali chorne par
    // sirf sale price (priceRs) dikhega, strikethrough wala price nahi.
    // null bhejte hain (undefined nahi) taake edit karte waqt agar pehle
    // se value thi aur ab khali kar di ho, to woh properly clear ho jaye.
    const payload = {
      name, slug, inspiredBy,
      priceRs: Number(priceRs),
      compareAtPriceRs: compareAtPriceRs ? Number(compareAtPriceRs) : null,
       category, isBestSeller, isTester, image, 
        maxTesters: category === "custom" ? Number(maxTesters) : null,
    };

    const res = initial
      ? await fetch(`/api/admin/products/${initial.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      : await fetch("/api/admin/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

    setSaving(false);

    if (!res.ok) {
      setError("Save failed");
      return;
    }

    router.push("/admin/products");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
      <label className="block text-xs tracking-[0.1em] text-smoke">
        Name
        <input value={name} onChange={(e) => setName(e.target.value)} required
          className="mt-1 w-full border border-gold/20 bg-ink px-3 py-2 text-sm text-parchment outline-none focus:border-gold" />
      </label>

      <label className="block text-xs tracking-[0.1em] text-smoke">
        Slug
        <input value={slug} onChange={(e) => setSlug(e.target.value)} required
          className="mt-1 w-full border border-gold/20 bg-ink px-3 py-2 text-sm text-parchment outline-none focus:border-gold" />
      </label>

      <label className="block text-xs tracking-[0.1em] text-smoke">
        Inspired By
        <input value={inspiredBy} onChange={(e) => setInspiredBy(e.target.value)}
          className="mt-1 w-full border border-gold/20 bg-ink px-3 py-2 text-sm text-parchment outline-none focus:border-gold" />
      </label>

      <div className="grid grid-cols-2 gap-3">
        <label className="block text-xs tracking-[0.1em] text-smoke">
          Actual Price (Rs.) — optional
          <input type="number" value={compareAtPriceRs} onChange={(e) => setCompareAtPriceRs(e.target.value)}
            placeholder="e.g. 3150"
            className="mt-1 w-full border border-gold/20 bg-ink px-3 py-2 text-sm text-parchment outline-none focus:border-gold" />
        </label>

        <label className="block text-xs tracking-[0.1em] text-smoke">
          Sale Price (Rs.)
          <input type="number" value={priceRs} onChange={(e) => setPriceRs(e.target.value)} required
            placeholder="e.g. 2599"
            className="mt-1 w-full border border-gold/20 bg-ink px-3 py-2 text-sm text-parchment outline-none focus:border-gold" />
        </label>
      </div>
      <p className="-mt-2 text-[0.65rem] leading-relaxed text-smoke">
        Actual price daalein to woh cut (strikethrough) ho kar sale price ke sath dikhega.
        Khali chor dein to sirf sale price dikhega.
      </p>
{category === "custom" && (
  <label className="block text-xs tracking-[0.1em] text-smoke">
    Max Testers Selectable
    <input
      type="number"
      min={1}
      value={maxTesters}
      onChange={(e) => setMaxTesters(e.target.value)}
      placeholder="e.g. 5"
      className="mt-1 w-full border border-gold/20 bg-ink px-3 py-2 text-sm text-parchment outline-none focus:border-gold"
    />
  </label>
)}
           <label className="block text-xs tracking-[0.1em] text-smoke">
        Category
        <select value={category} onChange={(e) => setCategory(e.target.value as Product["category"])}
          className="mt-1 w-full border border-gold/20 bg-ink px-3 py-2 text-sm text-parchment outline-none focus:border-gold">
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="unisex">Unisex</option>
          <option value="combo">Combo / Bundle</option>
          <option value="custom">Custom Pack</option>
        </select>
      </label>

      <label className="flex items-center gap-2 text-xs tracking-[0.1em] text-smoke">
        <input type="checkbox" checked={isBestSeller} onChange={(e) => setIsBestSeller(e.target.checked)} />
        Best Seller
      </label>
      <label className="flex items-center gap-2 text-xs tracking-[0.1em] text-smoke">
  <input type="checkbox" checked={isTester} onChange={(e) => setIsTester(e.target.checked)} />
  Perfume Tester
</label>

      <label className="block text-xs tracking-[0.1em] text-smoke">
        Image
        <input type="file" accept="image/*" onChange={handleImageUpload} className="mt-1 block w-full text-xs text-smoke" />
      </label>

      {uploading && <p className="text-xs text-gold">Uploading...</p>}
      {image && <img src={image} alt="preview" className="h-24 w-24 object-cover border border-gold/20" />}
      {error && <p className="text-xs text-red-400">{error}</p>}

      <button type="submit" disabled={saving || uploading}
        className="border border-gold bg-gold px-6 py-2 text-xs tracking-[0.2em] text-ink hover:bg-transparent hover:text-gold disabled:opacity-50">
        {saving ? "SAVING..." : "SAVE"}
      </button>
    </form>
  );
}