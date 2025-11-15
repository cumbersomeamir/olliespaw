"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import GridOverlay from "@/components/matrix/GridOverlay";

const FEATURED_CATEGORIES = [
  {
    id: "travel-safety",
    name: "Travel & Safety",
    discount: "up to 50% off",
    href: "/products?category=travel-safety",
    color: "#00ff95",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    discount: "up to 50% off",
    href: "/products?category=healthcare",
    color: "#00e0ff",
  },
  {
    id: "gifting",
    name: "Gifting",
    discount: "up to 60% off",
    href: "/products?category=gifting",
    color: "#7c5cff",
  },
  {
    id: "cleaning-essentials",
    name: "Cleaning Essentials",
    discount: "up to 70% off",
    href: "/products?category=cleaning-essentials",
    color: "#ffed4f",
  },
  {
    id: "tick-flea",
    name: "Tick & Flea",
    discount: "up to 70% off",
    href: "/products?category=tick-flea",
    color: "#ff3670",
  },
  {
    id: "clothing",
    name: "Clothing",
    discount: "up to 70% off",
    href: "/products?category=clothing",
    color: "#00ff95",
  },
];

const TOP_BRANDS = [
  {
    id: "royal-canin",
    name: "Royal Canin",
    discount: "up to 20% off",
    href: "/products?brand=royal-canin",
    color: "#00ff95",
  },
  {
    id: "lilys-kitchen",
    name: "Lily's Kitchen",
    discount: "up to 30% off",
    href: "/products?brand=lilys-kitchen",
    color: "#00e0ff",
  },
  {
    id: "orijen",
    name: "Orijen",
    discount: "up to 10% off",
    href: "/products?brand=orijen",
    color: "#7c5cff",
  },
  {
    id: "acana",
    name: "Acana",
    discount: "up to 15% off",
    href: "/products?brand=acana",
    color: "#ffed4f",
  },
  {
    id: "applaws",
    name: "Applaws",
    discount: "up to 10% off",
    href: "/products?brand=applaws",
    color: "#ff3670",
  },
  {
    id: "thunder-paws",
    name: "Thunder Paws",
    discount: "up to 70% off",
    href: "/products?brand=thunder-paws",
    color: "#00ff95",
  },
  {
    id: "bud-billy",
    name: "Bud & Billy",
    discount: "up to 80% off",
    href: "/products?brand=bud-billy",
    color: "#00e0ff",
  },
  {
    id: "addiction",
    name: "Addiction",
    discount: "up to 50% off",
    href: "/products?brand=addiction",
    color: "#7c5cff",
  },
  {
    id: "hills-science",
    name: "Hill's Science Plan",
    discount: "up to 10% off",
    href: "/products?brand=hills-science",
    color: "#ffed4f",
  },
  {
    id: "arden-grange",
    name: "Arden Grange",
    discount: "up to 30% off",
    href: "/products?brand=arden-grange",
    color: "#ff3670",
  },
  {
    id: "open-farm",
    name: "Open Farm",
    discount: "up to 40% off",
    href: "/products?brand=open-farm",
    color: "#00ff95",
  },
  {
    id: "trixie",
    name: "Trixie",
    discount: "up to 80% off",
    href: "/products?brand=trixie",
    color: "#00e0ff",
  },
];

export default function FeaturedCategoriesAndBrands() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#040608] py-24"
    >
      <GridOverlay opacity={0.1} pulse={true} />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Featured Categories Section */}
        <div className="mb-16">
          <div
            className={`mb-8 text-center transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
            }`}
          >
            <h2 className="mb-2 text-2xl font-semibold uppercase tracking-wider text-[#f5f7ff]">
              FEATURED CATEGORIES
            </h2>
            <p className="font-mono text-sm text-[#6c7383]">
              // CATEGORY DISCOUNT MATRIX
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {FEATURED_CATEGORIES.map((category, index) => (
              <Link
                key={category.id}
                href={category.href}
                className="group relative flex h-64 flex-col overflow-hidden rounded-xl border-2 border-[rgba(0,255,149,0.2)] bg-[#070f17] p-4 transition-all duration-500 hover:border-[#00ff95] hover:shadow-[0_0_30px_rgba(0,255,149,0.3)]"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible
                    ? "translateY(0) scale(1)"
                    : "translateY(30px) scale(0.9)",
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <GridOverlay opacity={0.05} />

                {/* Discount Badge - Top Right */}
                <div className="absolute right-2 top-2 z-10">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-full border-2 transition-all duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: `${category.color}20`,
                      borderColor: category.color,
                      boxShadow: `0 0 15px ${category.color}40`,
                    }}
                  >
                    <p
                      className="text-center font-mono text-[9px] font-bold leading-tight uppercase tracking-tighter"
                      style={{ color: category.color }}
                    >
                      {category.discount}
                    </p>
                  </div>
                </div>

                {/* Product Image Placeholder with Grid */}
                <div className="mb-3 flex flex-1 items-center justify-center rounded-lg border border-[rgba(0,255,149,0.2)] bg-[#050b11] transition-all duration-300 group-hover:border-[#00ff95]">
                  <div className="relative h-full w-full">
                    <GridOverlay opacity={0.1} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="h-16 w-16 rounded-lg border-2 transition-all duration-300 group-hover:scale-110"
                        style={{
                          borderColor: category.color,
                          backgroundColor: `${category.color}10`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Category Name */}
                <p className="text-center font-mono text-xs font-bold uppercase tracking-wider text-[#a7b2c7] transition-colors duration-300 group-hover:text-[#00ff95]">
                  {category.name}
                </p>

                {/* Hover Glow */}
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at center, ${category.color}10 0%, transparent 70%)`,
                  }}
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Top Brands Section */}
        <div>
          <div
            className={`mb-8 text-center transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <h2 className="mb-2 text-2xl font-semibold uppercase tracking-wider text-[#f5f7ff]">
              TOP BRANDS
            </h2>
            <p className="font-mono text-sm text-[#6c7383]">
              // BRAND DISCOUNT DATABASE
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {TOP_BRANDS.map((brand, index) => (
              <Link
                key={brand.id}
                href={brand.href}
                className="group relative flex aspect-square flex-col items-center justify-center overflow-hidden rounded-full border-2 border-[rgba(0,255,149,0.2)] bg-[#070f17] p-4 transition-all duration-500 hover:border-[#00ff95] hover:shadow-[0_0_30px_rgba(0,255,149,0.3)]"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible
                    ? "translateY(0) scale(1)"
                    : "translateY(30px) scale(0.9)",
                  transitionDelay: `${300 + index * 50}ms`,
                }}
              >
                <GridOverlay opacity={0.05} />

                {/* Orbital Particles on Hover */}
                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {Array.from({ length: 4 }).map((_, i) => {
                    const angle = (i * 360) / 4;
                    const radius = 60;
                    return (
                      <div
                        key={i}
                        className="absolute h-1 w-1 rounded-full"
                        style={{
                          left: "50%",
                          top: "50%",
                          backgroundColor: brand.color,
                          transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}px)`,
                          animation: `orbital-rotate ${3 + i}s linear infinite`,
                          animationDelay: `${i * 0.3}s`,
                        }}
                      />
                    );
                  })}
                </div>

                {/* Brand Logo Placeholder */}
                <div className="relative mb-8 flex h-20 w-20 items-center justify-center">
                  <div
                    className="h-full w-full rounded-full border-2 transition-all duration-300 group-hover:scale-110"
                    style={{
                      borderColor: brand.color,
                      backgroundColor: `${brand.color}10`,
                      boxShadow: `0 0 20px ${brand.color}30`,
                    }}
                  >
                    <div className="flex h-full w-full items-center justify-center">
                      <div
                        className="h-8 w-8 rounded-full"
                        style={{
                          backgroundColor: brand.color,
                          opacity: 0.3,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Discount Badge - Bottom Center */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10">
                  <div
                    className="flex items-center justify-center rounded-full border-2 px-2.5 py-1 transition-all duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: `${brand.color}20`,
                      borderColor: brand.color,
                      boxShadow: `0 0 15px ${brand.color}40`,
                    }}
                  >
                    <p
                      className="text-center font-mono text-[9px] font-bold leading-tight uppercase tracking-tighter"
                      style={{ color: brand.color }}
                    >
                      {brand.discount}
                    </p>
                  </div>
                </div>

                {/* Hover Glow */}
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at center, ${brand.color}15 0%, transparent 70%)`,
                  }}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes orbital-rotate {
          from {
            transform: translate(-50%, -50%) rotate(0deg) translateY(-60px) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg) translateY(-60px) rotate(-360deg);
          }
        }
      `}</style>
    </section>
  );
}
