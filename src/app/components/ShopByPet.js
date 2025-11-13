"use client";

import Link from "next/link";

const PET_CATEGORIES = [
  {
    id: "dog",
    name: "Dog",
    label: "Shop Dog",
    bgColor: "#FFB6C1", // Light pink
    image: "🐕",
  },
  {
    id: "cat",
    name: "Cat",
    label: "Shop Cat",
    bgColor: "#98FB98", // Mint green
    image: "🐱",
  },
  {
    id: "fish",
    name: "Fish",
    label: "Shop Fish",
    bgColor: "#87CEEB", // Bright blue
    image: "🐠",
  },
  {
    id: "small-pet",
    name: "Small Pet",
    label: "Shop Small Pet",
    bgColor: "#DDA0DD", // Light purple
    image: "🐰",
  },
  {
    id: "bird",
    name: "Bird",
    label: "Shop Bird",
    bgColor: "#32CD32", // Lime green
    image: "🦜",
  },
  {
    id: "reptile",
    name: "Reptile",
    label: "Shop Reptile",
    bgColor: "#FFFF00", // Bright yellow
    image: "🦎",
  },
];

export default function ShopByPet() {
  return (
    <section className="w-full bg-background py-12">
      <div className="mx-auto max-w-7xl px-6">
        {/* Pagination Dots */}
        <div className="mb-6 flex justify-center gap-2">
          <div className="h-2 w-2 rounded-full bg-primary" />
          <div className="h-2 w-2 rounded-full bg-primary/30" />
        </div>

        {/* Title */}
        <h2 className="mb-8 text-center text-2xl font-semibold uppercase tracking-wider text-foreground">
          SHOP BY PET
        </h2>

        {/* Pet Category Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PET_CATEGORIES.map((pet) => (
            <Link
              key={pet.id}
              href={`/products?category=${pet.id}`}
              className="group relative aspect-[4/3] overflow-hidden transition-transform hover:scale-105"
              style={{ backgroundColor: pet.bgColor }}
            >
              {/* Pet Image Placeholder - Using emoji for now, replace with actual images */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-8xl opacity-80">{pet.image}</div>
              </div>

              {/* Text Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/60 to-transparent p-6">
                <p className="text-xl font-semibold text-background">{pet.label}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

