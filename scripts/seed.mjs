import { config } from "dotenv";
config({ path: ".env.local" });

import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "mparoma";

if (!uri) {
  console.error("MONGODB_URI missing — check .env.local");
  process.exit(1);
}

const products = [
  {
    slug: "noir-essence",
    name: "NOIR ESSENCE",
    inspiredBy: "Inspired by Creed Aventus",
    priceRs: 1999,
    image: "/images/products/noir-essence.jpg",
    category: "men",
    isBestSeller: true,
  },
  {
    slug: "cafe-noir",
    name: "CAFÉ NOIR",
    inspiredBy: "Inspired by Bercodie Coffee",
    priceRs: 2599,
    image: "/images/products/cafe-noir.jpg",
    category: "unisex",
    isBestSeller: true,
  },
  {
    slug: "velvet-bloom",
    name: "VELVET BLOOM",
    inspiredBy: "Inspired by Gucci Flora",
    priceRs: 1599,
    image: "/images/products/velvet-bloom.jpg",
    category: "women",
    isBestSeller: true,
  },
];

const scentCategories = [
  { label: "MEN", slug: "men", image: "/images/scent/pour-homme.jpg" },
  { label: "WOMEN", slug: "women", image: "/images/scent/pour-femme.jpg" },
  { label: "UNISEX", slug: "unisex", image: "/images/scent/partage-unisex.jpg" },
];

const reviews = [
  { quote: "The scent lasted from my morning meeting straight through dinner — genuinely long-lasting.", author: "Verified Buyer", rating: 5 },
  { quote: "True craftsmanship in every bottle — the packaging feels as premium as the fragrance smells.", author: "Verified Buyer", rating: 5 },
  { quote: "I've tried the tester set and I'm genuinely impressed with our range's inspired fragrance collection.", author: "MParoma", rating: 5 },
  { quote: "Entire signature line is a statement — can't decide between the two so I got both.", author: "Verified Buyer", rating: 5 },
  { quote: "Fresh on arrival and true to the notes described. Will reorder.", author: "Verified Buyer", rating: 5 },
];

const heroContent = {
  heading: "CRAFTED FOR EVERY MOMENT",
  tagline: "A signature written in scent.",
  description: "Experience lasting impression with our natural-inspired luxury fragrance collection.",
  backgroundImage: "/images/hero/hero-main.jpg",
  primaryCtaLabel: "Discover the Collection",
  primaryCtaHref: "/collection",
  secondaryCtaLabel: "Order a Tester",
  secondaryCtaHref: "/perfume-testers",
};

async function seed() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);

  await db.collection("products").deleteMany({});
  await db.collection("products").insertMany(products);

  await db.collection("scentCategories").deleteMany({});
  await db.collection("scentCategories").insertMany(scentCategories);

  await db.collection("reviews").deleteMany({});
  await db.collection("reviews").insertMany(reviews);

  await db.collection("heroContent").deleteMany({});
  await db.collection("heroContent").insertOne(heroContent);

  console.log("Seed complete: products, scentCategories, reviews, heroContent");
  await client.close();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});