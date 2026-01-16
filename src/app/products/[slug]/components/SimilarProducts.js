"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import Link from "next/link";
import Image from "next/image";

export default function SimilarProducts({ currentProduct }) {
  const { addToCart } = useCart();
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSimilarProducts() {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          // Filter out the current product and get up to 4 similar products
          const otherProducts = (data.products || [])
            .filter((p) => p.slug !== currentProduct?.slug)
            .slice(0, 4);
          setSimilarProducts(otherProducts);
        }
      } catch (error) {
        console.error("Error fetching similar products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSimilarProducts();
  }, [currentProduct?.slug]);

  const formatPrice = (price) => {
    if (typeof price === "number") {
      return `₹ ${price.toFixed(2)}`;
    }
    if (typeof price === "string") {
      return price;
    }
    return "₹ 0.00";
  };

  if (loading) {
    return (
      <div className="mt-12">
        <h2 className="mb-6 text-xl font-semibold text-foreground">
          Similar items you might like
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="min-w-[200px] flex-shrink-0 border border-foreground/10 bg-background animate-pulse"
            >
              <div className="aspect-square w-full bg-foreground/10" />
              <div className="p-4 space-y-2">
                <div className="h-4 w-20 bg-foreground/10 rounded" />
                <div className="h-3 w-full bg-foreground/10 rounded" />
                <div className="h-3 w-3/4 bg-foreground/10 rounded" />
                <div className="h-8 w-full bg-foreground/10 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (similarProducts.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h2 className="mb-6 text-xl font-semibold text-foreground">
        Similar items you might like
      </h2>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {similarProducts.map((product) => {
          const productImage = product.images?.[0]?.url || "/images/dummy/placeholder.jpg";
          const productPrice = formatPrice(product.price);
          const deliveryTime = product.deliveryTime || "2-3 days";

          return (
            <div
              key={product.slug || product.id}
              className="min-w-[200px] flex-shrink-0 border border-foreground/10 bg-background"
            >
              <Link href={`/products/${product.slug}`}>
                <div className="relative aspect-square w-full overflow-hidden bg-white">
                  <Image
                    src={productImage}
                    alt={product.title || "Product"}
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                </div>
              </Link>
              <div className="p-4">
                <p className="mb-2 text-sm font-semibold text-foreground">
                  {productPrice}
                </p>
                {product.originalPrice && product.originalPrice > product.price && (
                  <p className="mb-1 text-xs text-foreground/60 line-through">
                    {formatPrice(product.originalPrice)}
                  </p>
                )}
                <Link href={`/products/${product.slug}`}>
                  <p className="mb-2 line-clamp-2 text-xs text-foreground/80 hover:text-foreground">
                    {product.title}
                  </p>
                </Link>
                <p className="mb-3 text-xs text-foreground/60">{deliveryTime} Delivery</p>
                <button
                  onClick={() => addToCart(
                    {
                      ...product,
                      id: product.slug,
                      price: product.price,
                    },
                    "Standard",
                    1
                  )}
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
          );
        })}
      </div>
    </div>
  );
}

