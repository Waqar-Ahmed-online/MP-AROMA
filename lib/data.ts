import { getDb } from "@/lib/mongodb";
import { Product, ScentCategory, Review } from "@/types/product";
import { products as mockProducts } from "@/data/products";
import { scentCategories as mockScentCategories } from "@/data/scentCategories";
import { reviews as mockReviews } from "@/data/reviews";
import { DiscoverySetContent } from "@/types/discoverySet";
import { HeroSlide } from "@/types/hero";
import { AboutSection } from "@/types/about";

// Mongo documents have `_id`, our types use `id` (string) — this
// converts one Mongo doc into our app-facing shape.
function withStringId<T extends { _id?: unknown }>(doc: T): Omit<T, "_id"> & { id: string } {
  const { _id, ...rest } = doc;
  return { ...rest, id: String(_id) } as Omit<T, "_id"> & { id: string };
}

export async function getProducts(): Promise<Product[]> {
  try {
    const db = await getDb();
    const docs = await db.collection("products").find({}).toArray();
    if (docs.length > 0) return docs.map(withStringId) as unknown as Product[];
    return mockProducts;
  } catch {
    return mockProducts;
  }
}

export async function getBestSellers(): Promise<Product[]> {
  const all = await getProducts();
  return all.filter((p) => p.isBestSeller);
}
export async function getTesters(): Promise<Product[]> {
  const all = await getProducts();
  return all.filter((p) => p.isTester);
}

export async function getScentCategories(): Promise<ScentCategory[]> {
  try {
    const db = await getDb();
    const docs = await db.collection("scentCategories").find({}).toArray();
    if (docs.length > 0) return docs.map(withStringId) as unknown as ScentCategory[];
    return mockScentCategories;
  } catch {
    return mockScentCategories;
  }
}

function normalizeReviewMedia(doc: any) {
  if (doc.media) return doc; // already naye format mein hai
  if (doc.mediaUrl) {
    return {
      ...doc,
      media: [{ url: doc.mediaUrl, type: doc.mediaType === "video" ? "video" : "image" }],
    };
  }
  return { ...doc, media: [] };
}
// Public-facing: only reviews an admin has approved show on the site.
export async function getReviews(): Promise<Review[]> {
  try {
    const db = await getDb();
    const docs = await db
      .collection("reviews")
      .find({ status: { $ne: "pending" } })
      .sort({ createdAt: -1 })
      .toArray();
    if (docs.length > 0)
      return docs.map(withStringId).map(normalizeReviewMedia) as unknown as Review[];
    return mockReviews;
  } catch {
    return mockReviews;
  }
}


const fallbackHeroSlides: HeroSlide[] = [
  {
    id: "fallback-1",
    heading: "CRAFTED FOR EVERY MOMENT",
    tagline: "A SIGNATURE WRITTEN IN SCENT",
    backgroundImage: "/images/hero/hero-main.jpg",
    primaryCtaLabel: "Discover the Collection",
    primaryCtaHref: "/collection",
    secondaryCtaLabel: "Order a Tester",
    secondaryCtaHref: "/perfume-testers",
    order: 1,
  },
];

export async function getHeroSlides(): Promise<HeroSlide[]> {
  try {
    const db = await getDb();
    const docs = await db.collection("heroSlides").find({}).sort({ order: 1 }).toArray();
    if (docs.length > 0) return docs.map(withStringId) as unknown as HeroSlide[];
    return fallbackHeroSlides;
  } catch {
    return fallbackHeroSlides;
  }
}

export async function getHeroSlideById(id: string): Promise<HeroSlide | null> {
  const all = await getHeroSlides();
  return all.find((s) => s.id === id) || null;
}
export async function getProductById(id: string): Promise<Product | null> {
  const all = await getProducts();
  return all.find((p) => p.id === id) || null;
}
export async function getScentCategoryById(id: string): Promise<ScentCategory | null> {
  const all = await getScentCategories();
  return all.find((c) => c.id === id) || null;
}

export async function getDiscoverySetContent(): Promise<DiscoverySetContent> {
  const fallback: DiscoverySetContent = {
    heading: "FIND YOUR MATCH",
    subtitle: "TRIPLE TESTER SET",
    priceLabel: "Rs. 1,000",
    ctaLabel: "Begin Discovery",
    ctaHref: "/discovery-kits",
    backgroundImage: "/images/discovery/triple-tester.jpg",
  };
  try {
    const db = await getDb();
    const doc = await db.collection("discoverySet").findOne({});
    if (doc) {
      const { _id, ...rest } = doc;
      return { ...fallback, ...rest } as DiscoverySetContent;
    }
    return fallback;
  } catch {
    return fallback;
  }
}
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const all = await getProducts();
  return all.find((p) => p.slug === slug) || null;
}

const fallbackAboutSections: AboutSection[] = [
  {
    id: "1",
    eyebrow: "THE HEART BEHIND THE SCENT",
    title: "Our Story",
    description:
      "Inspired by the art of perfumery and the beauty of emotion, MPAROMA was born in Paris. Each fragrance is a reflection of personality.",
    image: "",
    imagePosition: "right",
    order: 1,
  },
];

export async function getAboutSections(): Promise<AboutSection[]> {
  try {
    const db = await getDb();
    const docs = await db.collection("aboutSections").find({}).sort({ order: 1 }).toArray();
    if (docs.length > 0) return docs.map(withStringId) as unknown as AboutSection[];
    return fallbackAboutSections;
  } catch {
    return fallbackAboutSections;
  }
}

export async function getAboutSectionById(id: string): Promise<AboutSection | null> {
  const all = await getAboutSections();
  return all.find((s) => s.id === id) || null;
}
