"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import GridOverlay from "@/components/matrix/GridOverlay";

const FAVORITE_CATEGORIES = [
  {
    id: "dog-food",
    name: "Dog Food",
    href: "/products?category=dog-food",
    image: "🦴",
    photo: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop&q=80",
    stat: "98% repeat buy",
    tag: "Low allergy",
  },
  {
    id: "cat-food",
    name: "Cat Food",
    href: "/products?category=cat-food",
    image: "🐟",
    photo: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop&q=80",
    stat: "95% repeat buy",
    tag: "Grain-free",
  },
  {
    id: "treats",
    name: "Treats",
    href: "/products?category=treats",
    image: "🍖",
    photo: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&h=400&fit=crop&q=80",
    stat: "92% repeat buy",
    tag: "Natural",
  },
  {
    id: "cat-litter",
    name: "Cat Litter & Accessories",
    href: "/products?category=cat-litter",
    image: "🧽",
    photo: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop&q=80",
    stat: "89% repeat buy",
    tag: "Odor control",
  },
  {
    id: "toys",
    name: "Toys",
    href: "/products?category=toys",
    image: "🎾",
    photo: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&h=400&fit=crop&q=80",
    stat: "94% repeat buy",
    tag: "Durable",
  },
  {
    id: "flea-tick",
    name: "Flea & Tick",
    href: "/products?category=flea-tick",
    image: "🛡️",
    photo: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop&q=80",
    stat: "96% repeat buy",
    tag: "Long-lasting",
  },
  {
    id: "health-care",
    name: "Health Care",
    href: "/products?category=health-care",
    image: "💊",
    photo: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop&q=80",
    stat: "91% repeat buy",
    tag: "Vet approved",
  },
  {
    id: "grooming",
    name: "Grooming",
    href: "/products?category=grooming",
    image: "🧴",
    photo: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop&q=80",
    stat: "93% repeat buy",
    tag: "Gentle",
  },
  {
    id: "bowls",
    name: "Bowls",
    href: "/products?category=bowls",
    image: "🥣",
    photo: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop&q=80",
    stat: "90% repeat buy",
    tag: "Stainless steel",
  },
  {
    id: "beds",
    name: "Beds",
    href: "/products?category=beds",
    image: "🛏️",
    photo: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=400&fit=crop&q=80",
    stat: "97% repeat buy",
    tag: "Orthopedic",
  },
  {
    id: "leashes-collars",
    name: "Leashes & Collars",
    href: "/products?category=leashes-collars",
    image: "🦮",
    photo: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop&q=80",
    stat: "88% repeat buy",
    tag: "Adjustable",
  },
  {
    id: "training",
    name: "Dog Training & Behavior",
    href: "/products?category=training",
    image: "📚",
    photo: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop&q=80",
    stat: "85% repeat buy",
    tag: "Expert guide",
  },
];

export default function CustomerFavorites() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative w-full bg-[#050b11] py-8 sm:py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div
          className={`mb-8 sm:mb-10 md:mb-12 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <h2 className="mb-2 text-xl sm:text-2xl font-semibold uppercase tracking-[0.2em] text-[#f5f7ff]">
            CUSTOMER FAVORITES
          </h2>
          <p className="font-mono text-sm text-[#6c7383]">
            // SIGNAL-BASED RANKING
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {FAVORITE_CATEGORIES.map((category, index) => (
            <DataTile
              key={category.id}
              category={category}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function DataTile({ category, index, isVisible }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  return (
    <Link
      href={category.href}
      className="group relative flex flex-col items-center text-center transition-all duration-500"
      onMouseEnter={() => {
        setIsHovered(true);
        setTimeout(() => setShowInfo(true), 100);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowInfo(false);
      }}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "translateY(0)"
          : "translateY(20px)",
        transitionDelay: `${index * 50}ms`,
      }}
    >
      {/* Data Tile Card */}
      <div className="relative mb-4 aspect-square w-full max-w-[180px] overflow-hidden rounded-lg border border-[rgba(0,255,149,0.2)] bg-[#070f17] transition-all duration-300 group-hover:border-[#00ff95] group-hover:shadow-[0_0_20px_rgba(0,255,149,0.3)]">
        <GridOverlay opacity={0.05} />

        {/* Category Image Background */}
        <div className="absolute inset-0 opacity-50 group-hover:opacity-70 transition-opacity duration-300">
          <Image
            src={category.photo}
            alt={category.name}
            fill
            className="object-cover"
            sizes="(max-width: 180px) 100vw, 180px"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-[#070f17]/60 group-hover:bg-[#070f17]/40 transition-colors duration-300" />
        </div>

        {/* Icon Overlay */}
        <div className="relative flex h-full w-full items-center justify-center">
          <span
            className="text-6xl transition-all duration-300 group-hover:scale-110 z-10 drop-shadow-lg"
            style={{
              filter: isHovered
                ? "drop-shadow(0 0 15px rgba(0, 255, 149, 0.6)) brightness(1.2)"
                : "drop-shadow(0 0 5px rgba(0, 255, 149, 0.2))",
            }}
          >
            {category.image}
          </span>
        </div>

        {/* Frame Draw Animation on Hover */}
        {isHovered && (
          <div className="absolute inset-0">
            <svg className="h-full w-full">
              <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                fill="none"
                stroke="#00ff95"
                strokeWidth="2"
                strokeDasharray="1000"
                strokeDashoffset={isHovered ? 0 : 1000}
                className="transition-all duration-1000"
                rx="8"
              />
            </svg>
          </div>
        )}

        {/* Info Slide Up on Hover */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#070f17] via-[#070f17]/95 to-transparent p-3 transition-all duration-300 ${
            showInfo
              ? "translate-y-0 opacity-100"
              : "translate-y-full opacity-0"
          }`}
        >
          <p className="font-mono text-[10px] text-[#00ff95]">
            {category.stat}
          </p>
          <p className="mt-1 font-mono text-[9px] text-[#6c7383]">
            {category.tag}
          </p>
        </div>
      </div>

      {/* Category Label */}
      <p
        className={`text-sm font-medium transition-all duration-300 ${
          isHovered
            ? "text-[#00ff95] scale-105"
            : "text-[#a7b2c7]"
        }`}
      >
        {category.name}
      </p>

      {/* Success Icon on Hover */}
      {isHovered && (
        <div className="absolute -top-2 -right-2">
          <svg
            className="h-6 w-6 text-[#00ff95] transition-all duration-300 animate-spin"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      )}
    </Link>
  );
}
