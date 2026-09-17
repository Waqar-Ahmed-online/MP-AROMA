export interface Product {
  id: string;
  slug: string;
  name: string;
  inspiredBy?: string;
  priceRs: number; // sale price — hamesha yehi dikhta hai
  compareAtPriceRs?: number; // actual/original price (optional) — bharne par cut price ke sath dikhta hai
  image: string;
 category: "men" | "women" | "unisex" | "combo" | "custom";
  isBestSeller?: boolean;
  isTester?: boolean;
  maxTesters?: number;
  description?: string;
   stock?: number; 
}

export interface ScentCategory {
  id: string;
  label: string; // e.g. "MEN"
  slug: "men" | "women" | "unisex";
  image: string;
}

export interface ReviewMedia {
  url: string;
  type: "image" | "video";
}

export interface Review {
  id: string;
  quote: string;
  author?: string;
  rating: number;
  media?: ReviewMedia[];
  status?: "pending" | "approved";
  createdAt?: string;
}

export interface DiscoveryKit {
  id: string;
  title: string;
  subtitle: string;
  priceRs: number;
  image: string;
}