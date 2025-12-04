"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import GridOverlay from "@/components/matrix/GridOverlay";

const SMART_PICKS = [
  { id: 1, price: 49, label: "UNDER ₹ 49", color: "#00ff95" },
  { id: 2, price: 99, label: "UNDER ₹ 99", color: "#00e0ff" },
  { id: 3, price: 199, label: "UNDER ₹ 199", color: "#7c5cff" },
  { id: 4, price: 499, label: "UNDER ₹ 499", color: "#ffed4f" },
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
    image: "https://openfarmpet.com/cdn/shop/files/OFP-Dog-Dry-Food-Collection-All-Bowl-155x110.png?v=1741803381&width=1200",
    href: "/products?category=dry-food",
    color: "#00ff95",
  },
  {
    id: "cat-litter",
    name: "Litter",
    discount: "Upto 30% off",
    Icon: CatLitterIcon,
    image: "https://www.healthy-pet.com/cdn/shop/articles/cat_paw_litter_box_ksetani.jpg?v=1684366611",
    href: "/products?category=cat-litter",
    color: "#00e0ff",
  },
  {
    id: "toys",
    name: "Toys",
    discount: "Upto 40% off",
    Icon: TreatsIcon,
    image: "https://image.petmd.com/files/inline-images/dog%20with%20frisco%20toy%20in%20mouth.jpg?VersionId=DVVTn4QtoUid9ljq_3gTdXNaamN7qiBs",
    href: "/products?category=toys",
    color: "#7c5cff",
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
      className="relative w-full overflow-hidden bg-[#050b11] py-12 sm:py-16 md:py-20 lg:py-24"
    >
      <GridOverlay opacity={0.1} pulse={true} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Smart Picks Section */}
        <div className="mb-12 sm:mb-14 md:mb-16">
          <div
            className={`mb-6 sm:mb-8 text-center transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
            }`}
          >
            <h2 className="mb-2 text-xl sm:text-2xl font-semibold uppercase tracking-wider text-[#f5f7ff]">
              SMART PICKS
            </h2>

          </div>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
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
            <h2 className="mb-2 text-xl sm:text-2xl font-semibold uppercase tracking-wider text-[#f5f7ff]">
              NOVEMBER FAVOURITES
            </h2>

          </div>
          <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {NOVEMBER_FAVORITES.map((favorite, index) => {
              const IconComponent = favorite.Icon;
              return (
                <Link
                  key={favorite.id}
                  href={favorite.href}
                  className="group relative overflow-hidden rounded-xl border-2 border-[rgba(0,255,149,0.2)] bg-[#070f17] p-4 sm:p-6 md:p-8 transition-all duration-500 hover:border-[#00ff95] hover:shadow-[0_0_40px_rgba(0,255,149,0.4)]"
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

                  {/* Product Image */}
                  <div className="relative mb-4 sm:mb-6 flex h-32 sm:h-40 md:h-48 items-center justify-center overflow-hidden rounded-lg">
                    <div className="relative w-full h-full transition-all duration-300 group-hover:scale-110">
                      <Image
                        src={favorite.image}
                        alt={favorite.name}
                        fill
                        className="object-cover rounded-lg"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
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
