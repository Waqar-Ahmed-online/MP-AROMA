import { Product } from "@/types/product";

// Placeholder data. Image paths point to /public/images/products/*
// — drop matching files in there and these will render automatically.
// Later this file's contents move into MongoDB and this export is
// replaced by a fetch() to /api/products with the same shape.

export const products: Product[] = [
  {
    id: "1",
    slug: "noir-essence",
    name: "NOIR ESSENCE",
    inspiredBy: "Inspired by Creed Aventus",
    priceRs: 1999,
    image: "/images/products/noir-essence.jpg",
    category: "men",
    isBestSeller: true,
    isTester: true,
  },
  {
    id: "2",
    slug: "cafe-noir",
    name: "CAFÉ NOIR",
    inspiredBy: "Inspired by Bercodie Coffee",
    priceRs: 2599,
    image: "/images/products/cafe-noir.jpg",
    category: "unisex",
    isBestSeller: true,
    isTester: true,
  },
  {
    id: "3",
    slug: "velvet-bloom",
    name: "VELVET BLOOM",
    inspiredBy: "Inspired by Gucci Flora",
    priceRs: 1599,
    image: "/images/products/velvet-bloom.jpg",
    category: "women",
    isBestSeller: true,
    isTester: true,
  },
];

export const bestSellers = products.filter((p) => p.isBestSeller);
export const testers = products.filter((p) => p.isTester);