
export function normalizeCategory(value: string): "men" | "women" | "unisex" | "combo" | "custom" {
  const v = value.toLowerCase();
  if (v === "men") return "men";
  if (v === "women") return "women";
  if (v === "combo") return "combo";
  if (v === "custom") return "custom";
  return "unisex";
}

export function categoryMatchesSlug(category: string, slug: string): boolean {
  return normalizeCategory(category) === normalizeCategory(slug);
}