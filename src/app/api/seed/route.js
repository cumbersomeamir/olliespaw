import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Product from "@/models/Product";

const SEED_PRODUCTS = [
  {
    slug: "nourishmax-kibble-chicken",
    title: "NourishMax Kibble – Chicken 12kg",
    brand: "Ollie’s Paw",
    price: 580,
    originalPrice: 725,
    badge: "exclusive",
    category: "dog",
    dietaryInfo: "Complete and balanced nutrition",
    deliveryTime: "2-3 days",
    accent: "#00ff95",
    images: [
      { url: "/images/dummy/dog-food-1.jpg", alt: "Kibble Chicken 12kg" },
      { url: "/images/dummy/dog-food-2.jpg", alt: "Kibble Chicken pack" },
    ],
    description: "High-protein chicken kibble for active dogs.",
    highlights: ["High protein", "Added vitamins", "No artificial colors"],
    specs: [
      { key: "Weight", value: "12kg" },
      { key: "Protein", value: "28%" },
    ],
  },
  {
    slug: "shine-coat-supplement",
    title: "Shine & Coat Supplement",
    brand: "Ollie’s Paw",
    price: 320,
    originalPrice: 400,
    badge: "new",
    category: "all",
    dietaryInfo: "Omega-rich formula",
    deliveryTime: "2-3 days",
    accent: "#00ff95",
    images: [
      { url: "/images/dummy/supplement-1.jpg", alt: "Coat Supplement" },
      { url: "/images/dummy/supplement-2.jpg", alt: "Coat Supplement bottle" },
    ],
    description: "Enhances coat shine and supports skin health.",
    highlights: ["Omega 3 & 6", "Vet formulated", "Easy to mix"],
    specs: [
      { key: "Volume", value: "250ml" },
      { key: "Form", value: "Liquid" },
    ],
  },
  {
    slug: "classic-leash-forest-green",
    title: "Classic Leash – Forest Green",
    brand: "Ollie's Paw",
    price: 209,
    badge: "low",
    category: "dog",
    deliveryTime: "2-3 days",
    images: [
      { url: "/images/dummy/leash-1.jpg", alt: "Classic Leash Forest Green" },
      { url: "/images/dummy/leash-2.jpg", alt: "Leash closeup" },
    ],
    description: "Durable everyday leash with comfortable grip.",
    highlights: ["Metal hardware", "Nylon webbing", "Matte finish"],
  },
  {
    slug: "pet-plus-iron",
    title: "Pet + Iron",
    brand: "Ollie's Paw",
    price: 450,
    originalPrice: 550,
    badge: null,
    category: "dog",
    subCategory: "Immunity Boosters",
    petCategory: "Health & Wellness",
    customerFavourite: true,
    featuredCategory: true,
    featuredBrand: false,
    dietaryInfo: "Iron supplement for dogs",
    deliveryTime: "2-3 days",
    accent: "#00ff95",
    images: [
      { url: "/images/dummy/supplement-1.jpg", alt: "Pet + Iron" },
      { url: "/images/dummy/supplement-2.jpg", alt: "Pet + Iron bottle" },
    ],
    description: "Essential iron supplement to boost immunity and support overall health in dogs.",
    highlights: ["Iron enriched", "Immunity booster", "Vet recommended"],
    specs: [
      { key: "Volume", value: "200ml" },
      { key: "Form", value: "Liquid" },
    ],
  },
  {
    slug: "pet-plus-calcium",
    title: "Pet + Calcium",
    brand: "Ollie's Paw",
    price: 380,
    originalPrice: 480,
    badge: null,
    category: "dog",
    subCategory: "Joint Care",
    petCategory: "Health & Wellness",
    customerFavourite: false,
    featuredCategory: false,
    featuredBrand: false,
    dietaryInfo: "Calcium supplement for joint health",
    deliveryTime: "2-3 days",
    accent: "#00ff95",
    images: [
      { url: "/images/dummy/supplement-1.jpg", alt: "Pet + Calcium" },
      { url: "/images/dummy/supplement-2.jpg", alt: "Pet + Calcium bottle" },
    ],
    description: "Calcium supplement designed to support joint health and bone strength in dogs.",
    highlights: ["Calcium enriched", "Joint support", "Bone strength"],
    specs: [
      { key: "Volume", value: "200ml" },
      { key: "Form", value: "Liquid" },
    ],
  },
  {
    slug: "vita-pet",
    title: "Vita Pet",
    brand: "Ollie's Paw",
    price: 420,
    originalPrice: 520,
    badge: null,
    category: "dog",
    subCategory: "Skin & Coat",
    petCategory: "Health & Wellness",
    customerFavourite: false,
    featuredCategory: false,
    featuredBrand: false,
    dietaryInfo: "Multivitamin for skin and coat health",
    deliveryTime: "2-3 days",
    accent: "#00ff95",
    images: [
      { url: "/images/dummy/supplement-1.jpg", alt: "Vita Pet" },
      { url: "/images/dummy/supplement-2.jpg", alt: "Vita Pet bottle" },
    ],
    description: "Comprehensive multivitamin supplement to promote healthy skin and shiny coat in dogs.",
    highlights: ["Multivitamin blend", "Skin health", "Coat shine"],
    specs: [
      { key: "Volume", value: "250ml" },
      { key: "Form", value: "Liquid" },
    ],
  },
  {
    slug: "pet-plus-fertile",
    title: "Pet + Fertile",
    brand: "Ollie's Paw",
    price: 550,
    originalPrice: 650,
    badge: null,
    category: "dog",
    subCategory: "Immunity Boosters",
    petCategory: "Health & Wellness",
    customerFavourite: false,
    featuredCategory: false,
    featuredBrand: false,
    dietaryInfo: "Fertility and immunity support",
    deliveryTime: "2-3 days",
    accent: "#00ff95",
    images: [
      { url: "/images/dummy/supplement-1.jpg", alt: "Pet + Fertile" },
      { url: "/images/dummy/supplement-2.jpg", alt: "Pet + Fertile bottle" },
    ],
    description: "Specialized supplement to boost immunity and support reproductive health in dogs.",
    highlights: ["Immunity booster", "Reproductive health", "Vet formulated"],
    specs: [
      { key: "Volume", value: "200ml" },
      { key: "Form", value: "Liquid" },
    ],
  },
];

export async function POST() {
  try {
    const conn = await dbConnect();
    if (!conn) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }
    await Product.deleteMany({});
    const created = await Product.insertMany(SEED_PRODUCTS, { ordered: true });
    return NextResponse.json({ inserted: created.length }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "Failed to seed" }, { status: 500 });
  }
}


