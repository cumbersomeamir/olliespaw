"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const FEATURED_PRODUCTS = [
  {
    id: "1",
    title: "PREMIUM DOG TREATS",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=600&fit=crop&q=80",
    deliveryTime: "2-3 days",
    dietaryInfo: "For Dogs",
    bgColor: "bg-yellow-400",
    timeBadgeColor: "bg-yellow-500",
    slug: "premium-dog-treats",
  },
  {
    id: "2",
    title: "ORGANIC CAT FOOD BOWL",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=600&fit=crop&q=80",
    deliveryTime: "1-2 days",
    dietaryInfo: "For Cats",
    bgColor: "bg-blue-500",
    timeBadgeColor: "bg-blue-600",
    slug: "organic-cat-food-bowl",
  },
  {
    id: "3",
    title: "NATURAL PET SUPPLEMENTS",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=600&fit=crop&q=80",
    deliveryTime: "3-5 days",
    dietaryInfo: "For All Pets",
    bgColor: "bg-purple-500",
    timeBadgeColor: "bg-purple-600",
    slug: "natural-pet-supplements",
  },
  {
    id: "4",
    title: "PREMIUM DOG LEASH & COLLAR SET",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=600&fit=crop&q=80",
    deliveryTime: "2-4 days",
    dietaryInfo: "For Dogs",
    bgColor: "bg-blue-600",
    timeBadgeColor: "bg-blue-700",
    slug: "premium-dog-leash-collar-set",
  },
  {
    id: "5",
    title: "LUXURY PET BED",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=600&fit=crop&q=80",
    deliveryTime: "5-7 days",
    dietaryInfo: "For All Pets",
    bgColor: "bg-red-800",
    timeBadgeColor: "bg-red-900",
    slug: "luxury-pet-bed",
  },
];

export default function FeaturedProducts() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    // Trigger animation on mount
    setIsVisible(true);

    // Handle scroll position for carousel
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        setScrollPosition(scrollContainerRef.current.scrollLeft);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full bg-background py-16">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header Section */}
        <div
          className={`mb-8 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-foreground">
            FEATURED PRODUCTS
          </h3>
          <h2 className="mb-6 text-4xl font-bold uppercase tracking-tight text-foreground md:text-5xl">
            FROM OUR KITCHEN TO YOURS
          </h2>
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-background transition-all hover:bg-foreground/90 hover:scale-105"
          >
            View More
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Scroll Buttons */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/90 p-3 shadow-lg backdrop-blur-sm transition-all hover:bg-background hover:scale-110"
            aria-label="Scroll left"
          >
            <svg
              className="h-6 w-6 text-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/90 p-3 shadow-lg backdrop-blur-sm transition-all hover:bg-background hover:scale-110"
            aria-label="Scroll right"
          >
            <svg
              className="h-6 w-6 text-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Product Cards Carousel */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {FEATURED_PRODUCTS.map((product, index) => (
              <div
                key={product.id}
                className={`group relative min-w-[320px] max-w-[320px] flex-shrink-0 transform transition-all duration-700 hover:scale-105 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <Link href={`/products/${product.slug}`}>
                  <div
                    className={`relative h-[480px] overflow-hidden rounded-2xl ${product.bgColor} p-6 shadow-xl transition-all duration-300 hover:shadow-2xl`}
                  >
                    {/* Product Image */}
                    <div className="relative mb-4 h-64 w-full overflow-hidden rounded-xl bg-white/20">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 320px) 100vw, 320px"
                      />
                    </div>

                    {/* Delivery Time Badge */}
                    <div
                      className={`absolute right-6 top-6 rounded-lg ${product.timeBadgeColor} px-3 py-1.5 text-xs font-semibold text-white shadow-lg`}
                    >
                      {product.deliveryTime}
                    </div>

                    {/* Dietary Info */}
                    <div className="mb-4 flex items-center gap-2">
                      <svg
                        className="h-5 w-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm font-medium text-white">
                        {product.dietaryInfo}
                      </span>
                    </div>

                    {/* Product Title */}
                    <h3 className="mb-6 text-xl font-bold uppercase leading-tight text-white">
                      {product.title}
                    </h3>

                    {/* View Product Button */}
                    <div className="w-full rounded-lg bg-white px-6 py-3 text-sm font-semibold text-foreground transition-all group-hover:bg-white/90 group-hover:scale-105 flex items-center justify-center gap-2">
                      View Product
                      <svg
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

