"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import GridOverlay from "@/components/matrix/GridOverlay";

const SMART_PICKS = [
  { id: 1, price: 10, label: "UNDER ₹ 10", color: "#00ff95" },
  { id: 2, price: 20, label: "UNDER ₹ 20", color: "#00e0ff" },
  { id: 3, price: 30, label: "UNDER ₹ 30", color: "#7c5cff" },
  { id: 4, price: 40, label: "UNDER ₹ 40", color: "#ffed4f" },
];

// SVG Icon Components - Matrix wireframe style
const BoneIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-24 h-24"
  >
    <path d="M6 12c0-1.5.5-3 1.5-4s2.5-1.5 4-1.5 3 .5 4 1.5 1.5 2.5 1.5 4-.5 3-1.5 4-2.5 1.5-4 1.5-3-.5-4-1.5S6 13.5 6 12z" />
    <path d="M12 6v12" />
    <path d="M18 12c0-1.5.5-3 1.5-4s2.5-1.5 4-1.5 3 .5 4 1.5 1.5 2.5 1.5 4-.5 3-1.5 4-2.5 1.5-4 1.5-3-.5-4-1.5S18 13.5 18 12z" />
  </svg>
);

const CatLitterIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-24 h-24"
  >
    <rect x="3" y="8" width="18" height="12" rx="2" />
    <path d="M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
    <circle cx="9" cy="14" r="1" fill="currentColor" />
    <circle cx="12" cy="14" r="1" fill="currentColor" />
    <circle cx="15" cy="14" r="1" fill="currentColor" />
    <circle cx="9" cy="17" r="1" fill="currentColor" />
    <circle cx="12" cy="17" r="1" fill="currentColor" />
    <circle cx="15" cy="17" r="1" fill="currentColor" />
  </svg>
);

const TreatsIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-24 h-24"
  >
    <path d="M6 12l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m6-8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M6 12l2 2m0 0l2 2m-2-2l-2 2m2-2l2-2m6 0l2 2m0 0l2 2m-2-2l-2 2m2-2l2-2" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </svg>
);

const BedIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-24 h-24"
  >
    <path d="M2 4v16" />
    <path d="M2 8h18a2 2 0 0 1 2 2v10" />
    <path d="M2 17h20" />
    <path d="M6 8V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
    <circle cx="6" cy="20" r="1" fill="currentColor" />
    <circle cx="18" cy="20" r="1" fill="currentColor" />
  </svg>
);

const ToysIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-24 h-24"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    <path d="M2 12h20" />
  </svg>
);

const CollarHarnessIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-24 h-24"
  >
    <ellipse cx="12" cy="12" rx="8" ry="5" />
    <path d="M8 12h8" />
    <circle cx="9" cy="12" r="1" fill="currentColor" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
    <circle cx="15" cy="12" r="1" fill="currentColor" />
    <path d="M4 12a8 5 0 0 1 8-5" />
    <path d="M4 12a8 5 0 0 0 8 5" />
  </svg>
);

const NOVEMBER_FAVORITES = [
  {
    id: "dry-food",
    name: "Dry Food",
    discount: "Upto 50% off",
    Icon: BoneIcon,
    href: "/products?category=dry-food",
    color: "#00ff95",
  },
  {
    id: "cat-litter",
    name: "Cat Litter",
    discount: "Upto 30% off",
    Icon: CatLitterIcon,
    href: "/products?category=cat-litter",
    color: "#00e0ff",
  },
  {
    id: "treats",
    name: "Treats",
    discount: "Upto 40% off",
    Icon: TreatsIcon,
    href: "/products?category=treats",
    color: "#7c5cff",
  },
  {
    id: "beds",
    name: "Beds",
    price: "start from ₹ 25",
    Icon: BedIcon,
    href: "/products?category=beds",
    color: "#ffed4f",
  },
  {
    id: "toys",
    name: "Toys",
    price: "under ₹ 40",
    Icon: ToysIcon,
    href: "/products?category=toys",
    color: "#ff3670",
  },
  {
    id: "collar-harness",
    name: "Collar & Harness",
    price: "under ₹ 39",
    Icon: CollarHarnessIcon,
    href: "/products?category=collar-harness",
    color: "#00ff95",
  },
];

export default function SmartPicksAndFavorites() {
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
      className="relative w-full overflow-hidden bg-[#050b11] py-24"
    >
      <GridOverlay opacity={0.1} pulse={true} />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Smart Picks Section */}
        <div className="mb-16">
          <div
            className={`mb-8 text-center transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
            }`}
          >
            <h2 className="mb-2 text-2xl font-semibold uppercase tracking-wider text-[#f5f7ff]">
              SMART PICKS
            </h2>
            <p className="font-mono text-sm text-[#6c7383]">
              // PRICE FILTER MATRIX
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {SMART_PICKS.map((pick, index) => (
              <Link
                key={pick.id}
                href={`/products?maxPrice=${pick.price}`}
                className="group relative"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(20px)",
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <div className="relative flex h-32 w-72 items-center overflow-hidden rounded-xl border-2 border-[rgba(0,255,149,0.2)] bg-[#070f17] transition-all duration-500 hover:border-[#00ff95] hover:shadow-[0_0_30px_rgba(0,255,149,0.3)]">
                  <GridOverlay opacity={0.05} />

                  {/* Left: EVERYTHING (vertical) */}
                  <div className="flex h-full flex-col items-center justify-center border-r-2 border-dashed border-[rgba(0,255,149,0.3)] px-4">
                    <span className="-rotate-90 whitespace-nowrap font-mono text-xs font-bold uppercase tracking-wider text-[#6c7383] transition-colors duration-300 group-hover:text-[#00ff95]">
                      EVERYTHING
                    </span>
                  </div>

                  {/* Right: UNDER ₹ X */}
                  <div className="flex flex-1 flex-col items-center justify-center px-4">
                    <p className="font-mono text-xs font-medium uppercase tracking-wider text-[#6c7383]">
                      UNDER
                    </p>
                    <p
                      className="font-mono text-3xl font-bold transition-colors duration-300"
                      style={{ color: pick.color }}
                    >
                      ₹ {pick.price}
                    </p>
                  </div>

                  {/* Hover Glow */}
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(circle at center, ${pick.color}20 0%, transparent 70%)`,
                    }}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* November Favourites Section */}
        <div>
          <div
            className={`mb-8 text-center transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <h2 className="mb-2 text-2xl font-semibold uppercase tracking-wider text-[#f5f7ff]">
              NOVEMBER FAVOURITES
            </h2>
            <p className="font-mono text-sm text-[#6c7383]">
              // SEASONAL OFFERS DATABASE
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {NOVEMBER_FAVORITES.map((favorite, index) => {
              const IconComponent = favorite.Icon;
              return (
                <Link
                  key={favorite.id}
                  href={favorite.href}
                  className="group relative overflow-hidden rounded-xl border-2 border-[rgba(0,255,149,0.2)] bg-[#070f17] p-8 transition-all duration-500 hover:border-[#00ff95] hover:shadow-[0_0_40px_rgba(0,255,149,0.4)]"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible
                      ? "translateY(0) scale(1)"
                      : "translateY(30px) scale(0.9)",
                    transitionDelay: `${300 + index * 100}ms`,
                  }}
                >
                  <GridOverlay opacity={0.05} />

                  {/* Scanline on Hover */}
                  <div className="matrix-scanline absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Background Glow */}
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(circle at center, ${favorite.color}20 0%, transparent 70%)`,
                    }}
                  />

                  {/* Product Icon */}
                  <div className="relative mb-6 flex h-48 items-center justify-center">
                    <div
                      className="transition-all duration-300 group-hover:scale-110"
                      style={{
                        color: favorite.color,
                        filter: `drop-shadow(0 0 20px ${favorite.color}60)`,
                      }}
                    >
                      <IconComponent />
                    </div>
                  </div>

                  {/* Discount/Price Text */}
                  <div className="relative">
                    {favorite.discount ? (
                      <p
                        className="mb-2 font-mono text-3xl font-bold transition-colors duration-300"
                        style={{ color: favorite.color }}
                      >
                        {favorite.discount}
                      </p>
                    ) : (
                      <div className="mb-2 flex items-baseline gap-2">
                        <p className="font-mono text-lg text-[#6c7383]">
                          {favorite.price.split("₹")[0]}
                        </p>
                        <p
                          className="font-mono text-3xl font-bold transition-colors duration-300"
                          style={{ color: favorite.color }}
                        >
                          ₹ {favorite.price.match(/\d+/)?.[0]}
                        </p>
                      </div>
                    )}
                    {/* Category Name */}
                    <p className="font-mono text-lg font-medium uppercase tracking-wider text-[#a7b2c7] transition-colors duration-300 group-hover:text-[#f5f7ff]">
                      {favorite.name}
                    </p>
                  </div>

                  {/* Corner Accent */}
                  <div
                    className="absolute right-0 top-0 h-20 w-20 opacity-20 transition-opacity duration-300 group-hover:opacity-40"
                    style={{
                      background: `linear-gradient(135deg, ${favorite.color}40 0%, transparent 50%)`,
                    }}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
