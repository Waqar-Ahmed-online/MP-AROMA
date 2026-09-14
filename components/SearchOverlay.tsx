"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Product } from "@/types/product";
import ImgWithFallback from "@/components/ui/ImgWithFallback";
import ProductPrice from "@/components/ui/ProductPrice";
export default function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setResults([]);
    }
  }, [open]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.results || []);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div
      className={`fixed inset-0 z-[70] ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`absolute left-0 right-0 top-0 mx-auto max-w-content bg-ink-soft shadow-xl transition-transform duration-300 ease-out ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex items-center gap-3 border-b border-gold/10 px-5 py-5 md:px-10">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search perfumes..."
            className="flex-1 bg-transparent font-body text-sm text-parchment placeholder:text-smoke focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="flex h-8 w-8 items-center justify-center rounded-full text-parchment hover:bg-gold/10"
          >
            ✕
          </button>
        </div>

        {query.trim() && (
          <div className="max-h-[70vh] overflow-y-auto px-5 py-4 md:px-10">
            {loading && <p className="py-6 text-center text-sm text-smoke">Searching...</p>}
            {!loading && results.length === 0 && (
              <p className="py-6 text-center text-sm text-smoke">No products found.</p>
            )}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  onClick={onClose}
                  className="group flex flex-col gap-2"
                >
                  <div className="aspect-[3/4] w-full overflow-hidden border border-gold/10 bg-ink">
                    <ImgWithFallback
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="font-display text-sm text-parchment">{product.name}</p>
                  
                  <p className="text-xs">
  <ProductPrice priceRs={product.priceRs} compareAtPriceRs={product.compareAtPriceRs} size="sm" />
</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}