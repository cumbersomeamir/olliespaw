import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Product from "@/models/Product";

// Mirror the fallback dataset from list route
const FALLBACK_INDEX = {
  "pet-plus-iron": {
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
  "pet-plus-calcium": {
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
  "vita-pet": {
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
  "pet-plus-fertile": {
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
};

export async function GET(_req, { params }) {
  try {
    const resolvedParams = await params;
    const slug = resolvedParams?.slug;
    const conn = await dbConnect();
    if (!conn) {
      const item = FALLBACK_INDEX[slug];
      if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json({ product: item }, { status: 200 });
    }
    const product = await Product.findOne({ slug }).lean();
    if (!product) {
      // Fallback to in-memory data if not in DB
      const item = FALLBACK_INDEX[slug];
      if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json({ product: item }, { status: 200 });
    }
    return NextResponse.json({ product }, { status: 200 });
  } catch (err) {
    console.error("[API] Error fetching product:", err);
    // Try fallback on error
    const resolvedParams = await params;
    const slug = resolvedParams?.slug;
    const item = FALLBACK_INDEX[slug];
    if (item) return NextResponse.json({ product: item }, { status: 200 });
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}


