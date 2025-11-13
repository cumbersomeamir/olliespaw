"use client";

import Link from "next/link";

const FAVORITE_CATEGORIES = [
  {
    id: "dog-food",
    name: "Dog Food",
    href: "/products?category=dog-food",
    image: "🦴",
  },
  {
    id: "cat-food",
    name: "Cat Food",
    href: "/products?category=cat-food",
    image: "🐟",
  },
  {
    id: "treats",
    name: "Treats",
    href: "/products?category=treats",
    image: "🍖",
  },
  {
    id: "cat-litter",
    name: "Cat Litter & Accessories",
    href: "/products?category=cat-litter",
    image: "🧽",
  },
  {
    id: "toys",
    name: "Toys",
    href: "/products?category=toys",
    image: "🎾",
  },
  {
    id: "flea-tick",
    name: "Flea & Tick",
    href: "/products?category=flea-tick",
    image: "🛡️",
  },
  {
    id: "health-care",
    name: "Health Care",
    href: "/products?category=health-care",
    image: "💊",
  },
  {
    id: "grooming",
    name: "Grooming",
    href: "/products?category=grooming",
    image: "🧴",
  },
  {
    id: "bowls",
    name: "Bowls",
    href: "/products?category=bowls",
    image: "🥣",
  },
  {
    id: "beds",
    name: "Beds",
    href: "/products?category=beds",
    image: "🛏️",
  },
  {
    id: "leashes-collars",
    name: "Leashes & Collars",
    href: "/products?category=leashes-collars",
    image: "🦮",
  },
  {
    id: "training",
    name: "Dog Training & Behavior",
    href: "/products?category=training",
    image: "📚",
  },
];

export default function CustomerFavorites() {
  return (
    <section className="w-full bg-background py-12">
      <div className="mx-auto max-w-7xl px-6">
        {/* Title */}
        <h2 className="mb-8 text-center text-2xl font-semibold uppercase tracking-wider text-foreground">
          CUSTOMER FAVORITES
        </h2>

        {/* Category Grid */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {FAVORITE_CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="group flex flex-col items-center text-center transition-transform hover:scale-105"
            >
              {/* Product Image Placeholder */}
              <div className="mb-4 aspect-square w-full max-w-[180px] overflow-hidden rounded-lg bg-white shadow-sm">
                <div className="flex h-full w-full items-center justify-center bg-accent/20">
                  <span className="text-6xl opacity-60">{category.image}</span>
                </div>
              </div>

              {/* Category Label */}
              <p className="text-sm font-medium text-foreground group-hover:text-primary">
                {category.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

