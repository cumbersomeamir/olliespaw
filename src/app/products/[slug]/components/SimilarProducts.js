"use client";

import { useCart } from "@/contexts/CartContext";
import Link from "next/link";

const SIMILAR_PRODUCTS = [
  {
    id: "5",
    title: "Whimzees Rice Bone Dental Dog Treat For Large Breeds 540G",
    price: "₹ 59.85",
    slug: "whimzees-rice-bone",
  },
  {
    id: "6",
    title: "Royal Canin Golden Retriever Puppy Dry Food 12kg",
    price: "₹ 468.00",
    slug: "royal-canin-puppy",
  },
  {
    id: "7",
    title: "ZIWI Peak Deer Shank Bone Full Dog Chew 16-24CM",
    price: "₹ 69.48",
    slug: "ziwi-peak-deer",
  },
  {
    id: "8",
    title: "Royal Canin Labrador Retriever Adult Dry Dog Food",
    price: "₹ 139.00",
    slug: "royal-canin-labrador",
  },
  {
    id: "9",
    title: "Synergy Labs Veterinary Formula Clinical Skin Care & Itch Relief 30 Tablets",
    price: "₹ 107.00",
    slug: "synergy-labs-skin",
  },
];

export default function SimilarProducts() {
  const { addToCart } = useCart();

  return (
    <div className="mt-12">
      <h2 className="mb-6 text-xl font-semibold text-foreground">
        Similar items you might like
      </h2>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {SIMILAR_PRODUCTS.map((product) => (
          <div
            key={product.id}
            className="min-w-[200px] flex-shrink-0 border border-foreground/10 bg-background"
          >
            <Link href={`/products/${product.slug}`}>
              <div className="aspect-square w-full bg-white">
                <div className="h-full w-full bg-accent/30" />
              </div>
            </Link>
            <div className="p-4">
              <p className="mb-2 text-sm font-semibold text-foreground">
                {product.price}
              </p>
              <Link href={`/products/${product.slug}`}>
                <p className="mb-2 line-clamp-2 text-xs text-foreground/80 hover:text-foreground">
                  {product.title}
                </p>
              </Link>
              <p className="mb-3 text-xs text-foreground/60">6-7 Days Delivery</p>
              <button
                onClick={() => addToCart(product, "Standard", 1)}
                className="flex w-full items-center justify-center gap-2 bg-primary px-4 py-2 text-xs font-medium text-background hover:bg-primary/90"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

