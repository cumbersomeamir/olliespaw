"use client";

import ProductImageGallery from "./components/ProductImageGallery";
import ProductDetails from "./components/ProductDetails";
import BuyTogether from "./components/BuyTogether";
import ProductTabs from "./components/ProductTabs";
import SimilarProducts from "./components/SimilarProducts";
import { useEffect, useState, use } from "react";

export default function ProductDetailPage({ params }) {
  const resolvedParams = use(params);
  const slug = typeof resolvedParams?.slug === "string" ? resolvedParams.slug : "";
  const [product, setProduct] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await fetch(`/api/products/${slug}`);
        if (res.ok) {
          const data = await res.json();
          if (mounted) setProduct(data.product);
          return;
        }
      } catch {
        // ignore
      }
      // Fallback minimal product
      if (mounted) {
        setProduct({
          slug,
          title: "Ollie’s Paw Product",
          brand: "Ollie’s Paw",
          price: 199,
          badge: null,
          images: [{ url: "/images/dummy/placeholder.jpg", alt: "Product" }],
          description: "Product description will be available soon.",
          highlights: ["Premium quality", "Fast delivery"],
        });
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-8">
          <div className="text-foreground/70">Loading product...</div>
        </div>
      </div>
    );
  }

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
