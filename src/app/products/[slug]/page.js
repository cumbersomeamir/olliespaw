"use client";

import ProductImageGallery from "./components/ProductImageGallery";
import ProductDetails from "./components/ProductDetails";
import BuyTogether from "./components/BuyTogether";
import ProductTabs from "./components/ProductTabs";
import SimilarProducts from "./components/SimilarProducts";

// Mock product data - in real app, fetch by slug
const PRODUCTS = {
  "nourishmax-kibble-chicken": {
    id: "1",
    title: "NourishMax Kibble – Chicken 12kg",
    brand: "Ollie's Paw",
    price: "₹ 580.00",
    originalPrice: 725,
    weight: 12,
    badge: "exclusive",
  },
  "shine-coat-supplement": {
    id: "2",
    title: "Shine & Coat Supplement",
    brand: "Ollie's Paw",
    price: "₹ 320.00",
    originalPrice: 400,
    weight: 1,
    badge: "new",
  },
  "calm-comfort-chews": {
    id: "3",
    title: "Calm & Comfort Chews",
    brand: "Ollie's Paw",
    price: "₹ 195.00",
    originalPrice: 240,
    weight: 1,
  },
  "daily-multivitamin-bites": {
    id: "4",
    title: "Daily Multivitamin Bites",
    brand: "Ollie's Paw",
    price: "₹ 140.00",
    originalPrice: 175,
    weight: 1,
  },
};

export default function ProductDetailPage({ params }) {
  const slug = typeof params?.slug === "string" ? params.slug : "";
  const product = PRODUCTS[slug] || PRODUCTS["nourishmax-kibble-chicken"];

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-12">
          {/* Left: Product Images */}
          <div className="lg:col-span-5">
            <ProductImageGallery product={product} />
          </div>

          {/* Right: Product Details */}
          <div className="lg:col-span-7">
            <ProductDetails product={product} />
          </div>
        </div>

        {/* Buy Together Section */}
        <BuyTogether mainProduct={product} />

        {/* Product Tabs */}
        <ProductTabs product={product} />

        {/* Similar Products */}
        <SimilarProducts />
      </div>
    </div>
  );
}
