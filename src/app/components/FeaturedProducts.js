"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import GridOverlay from "@/components/matrix/GridOverlay";

const FEATURED_PRODUCTS = [
  {
    id: "1",
    title: "PREMIUM DOG TREATS",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=600&fit=crop&q=80",
    deliveryTime: "2-3 days",
    dietaryInfo: "For Dogs",
    accent: "#00ff95",
    slug: "premium-dog-treats",
  },
  {
    id: "2",
    title: "ORGANIC CAT FOOD BOWL",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=600&fit=crop&q=80",
    deliveryTime: "1-2 days",
    dietaryInfo: "For Cats",
    accent: "#00e0ff",
    slug: "organic-cat-food-bowl",
  },
  {
    id: "3",
    title: "NATURAL PET SUPPLEMENTS",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=600&fit=crop&q=80",
    deliveryTime: "3-5 days",
    dietaryInfo: "For All Pets",
    accent: "#7c5cff",
    slug: "natural-pet-supplements",
  },
  {
    id: "4",
    title: "PREMIUM DOG LEASH & COLLAR SET",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=600&fit=crop&q=80",
    deliveryTime: "2-4 days",
    dietaryInfo: "For Dogs",
    accent: "#00ff95",
    slug: "premium-dog-leash-collar-set",
  },
  {
    id: "5",
    title: "LUXURY PET BED",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=600&fit=crop&q=80",
    deliveryTime: "5-7 days",
    dietaryInfo: "For All Pets",
    accent: "#ff3670",
    slug: "luxury-pet-bed",
  },
];

export default function FeaturedProducts() {
  const [isVisible, setIsVisible] = useState(false);
  const [centerIndex, setCenterIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const scrollLeft = scrollContainerRef.current.scrollLeft;
        const cardWidth = 336; // 320px + 16px gap
        const newCenterIndex = Math.round(scrollLeft / cardWidth);
        setCenterIndex(newCenterIndex);
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
    <section className="relative w-full bg-[#040608] py-16">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header Section */}
        <div
          className={`mb-12 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#f5f7ff]">
            FEATURED PRODUCTS
          </h3>
          <h2 className="mb-6 text-4xl font-bold uppercase tracking-tight text-[#f5f7ff] md:text-5xl">
            FROM OUR KITCHEN TO YOURS
          </h2>
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 rounded-lg border-2 border-[#00ff95] bg-transparent px-6 py-3 text-sm font-mono font-semibold uppercase tracking-wider text-[#00ff95] transition-all hover:bg-[#00ff95] hover:text-[#040608] hover:scale-105 matrix-neon-pulse"
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
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full border-2 border-[#00ff95] bg-[#070f17]/90 p-3 text-[#00ff95] shadow-lg backdrop-blur-sm transition-all hover:bg-[#00ff95] hover:text-[#040608] hover:scale-110"
            aria-label="Scroll left"
          >
            <svg
              className="h-6 w-6"
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
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full border-2 border-[#00ff95] bg-[#070f17]/90 p-3 text-[#00ff95] shadow-lg backdrop-blur-sm transition-all hover:bg-[#00ff95] hover:text-[#040608] hover:scale-110"
            aria-label="Scroll right"
          >
            <svg
              className="h-6 w-6"
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
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 scroll-smooth px-4"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {FEATURED_PRODUCTS.map((product, index) => {
              const isCenter = index === centerIndex;
              const distance = Math.abs(index - centerIndex);
              
              return (
                <MatrixProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  isVisible={isVisible}
                  isCenter={isCenter}
                  distance={distance}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function MatrixProductCard({ product, index, isVisible, isCenter, distance }) {
  const [isHovered, setIsHovered] = useState(false);
  const scale = isCenter ? 1.0 : 0.88;
  const opacity = isCenter ? 1 : 0.6;

  return (
    <div
      className="group relative flex-shrink-0 transition-all duration-500"
      style={{
        minWidth: "320px",
        maxWidth: "320px",
        transform: `scale(${scale})`,
        opacity: opacity,
        filter: isCenter ? "brightness(1.1)" : "brightness(0.8)",
        transitionDelay: `${index * 100}ms`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.slug}`}>
        <div
          className={`relative h-[480px] overflow-hidden rounded-2xl border-2 bg-[#070f17] p-6 transition-all duration-300 ${
            isCenter
              ? "border-[#00ff95] shadow-[0_0_40px_rgba(0,255,149,0.4)]"
              : "border-[rgba(0,255,149,0.2)]"
          }`}
          style={{
            boxShadow: isCenter
              ? `0 0 40px ${product.accent}40, inset 0 0 40px ${product.accent}20`
              : "none",
          }}
        >
          {/* Background Gradient Shift */}
          {isCenter && (
            <div
              className="absolute inset-0 opacity-20 transition-opacity duration-500"
              style={{
                background: `linear-gradient(135deg, ${product.accent}20 0%, transparent 50%, ${product.accent}10 100%)`,
                animation: "gradient-shift 5s ease infinite",
              }}
            />
          )}

          <GridOverlay opacity={0.1} />

          {/* Scanline Overlay */}
          {isHovered && (
            <div className="matrix-scanline absolute inset-0 pointer-events-none rounded-2xl" />
          )}

          {/* Product Image - Wireframe to Solid */}
          <div className="relative mb-4 h-64 w-full overflow-hidden rounded-xl border border-[rgba(0,255,149,0.2)] bg-[#050b11]">
            <div
              className={`absolute inset-0 transition-all duration-700 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 320px) 100vw, 320px"
              />
            </div>
            
            {/* Wireframe overlay that fades on hover */}
            <div
              className={`absolute inset-0 transition-opacity duration-500 ${
                isHovered ? "opacity-0" : "opacity-30"
              }`}
            >
              <svg className="h-full w-full">
                <rect
                  x="10%"
                  y="10%"
                  width="80%"
                  height="80%"
                  fill="none"
                  stroke={product.accent}
                  strokeWidth="2"
                  strokeOpacity="0.5"
                />
                <line x1="10%" y1="30%" x2="90%" y2="30%" stroke={product.accent} strokeWidth="1" strokeOpacity="0.3" />
                <line x1="10%" y1="50%" x2="90%" y2="50%" stroke={product.accent} strokeWidth="1" strokeOpacity="0.3" />
                <line x1="10%" y1="70%" x2="90%" y2="70%" stroke={product.accent} strokeWidth="1" strokeOpacity="0.3" />
              </svg>
            </div>
          </div>

          {/* Delivery Time Badge - Glitch */}
          <div
            className={`absolute right-6 top-6 rounded-lg border-2 px-3 py-1.5 text-xs font-mono font-semibold text-white shadow-lg transition-all duration-300 ${
              isHovered ? "matrix-glitch" : ""
            }`}
            style={{
              borderColor: product.accent,
              backgroundColor: `${product.accent}20`,
              boxShadow: `0 0 10px ${product.accent}40`,
            }}
          >
            {product.deliveryTime}
          </div>

          {/* Dietary Info */}
          <div className="mb-4 flex items-center gap-2">
            <svg
              className="h-5 w-5 transition-colors duration-300"
              style={{ color: product.accent }}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-medium text-[#a7b2c7]">
              {product.dietaryInfo}
            </span>
          </div>

          {/* Product Title */}
          <h3
            className={`mb-6 text-xl font-bold uppercase leading-tight transition-all duration-300 ${
              isCenter ? "text-[#f5f7ff]" : "text-[#a7b2c7]"
            }`}
            style={{
              textShadow: isCenter ? `0 0 10px ${product.accent}40` : "none",
            }}
          >
            {product.title}
          </h3>

          {/* View Product Button */}
          <div
            className={`w-full rounded-lg border-2 px-6 py-3 text-sm font-mono font-semibold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
              isCenter
                ? "border-[#00ff95] bg-[#00ff95] text-[#040608] hover:bg-[#00ff95]/80"
                : "border-[rgba(0,255,149,0.3)] bg-transparent text-[#00ff95] hover:bg-[#00ff95] hover:text-[#040608]"
            }`}
            style={{
              boxShadow: isCenter
                ? `0 0 20px ${product.accent}40`
                : "none",
            }}
          >
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
  );
}
