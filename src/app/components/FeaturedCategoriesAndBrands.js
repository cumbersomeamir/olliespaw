"use client";

import Link from "next/link";

const FEATURED_CATEGORIES = [
  {
    id: "travel-safety",
    name: "Travel & Safety",
    discount: "up to 50% off",
    href: "/products?category=travel-safety",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    discount: "up to 50% off",
    href: "/products?category=healthcare",
  },
  {
    id: "gifting",
    name: "Gifting",
    discount: "up to 60% off",
    href: "/products?category=gifting",
  },
  {
    id: "cleaning-essentials",
    name: "Cleaning Essentials",
    discount: "up to 70% off",
    href: "/products?category=cleaning-essentials",
  },
  {
    id: "tick-flea",
    name: "Tick & Flea",
    discount: "up to 70% off",
    href: "/products?category=tick-flea",
  },
  {
    id: "clothing",
    name: "Clothing",
    discount: "up to 70% off",
    href: "/products?category=clothing",
  },
];

const TOP_BRANDS = [
  {
    id: "royal-canin",
    name: "Royal Canin",
    discount: "up to 20% off",
    href: "/products?brand=royal-canin",
  },
  {
    id: "lilys-kitchen",
    name: "Lily's Kitchen",
    discount: "up to 30% off",
    href: "/products?brand=lilys-kitchen",
  },
  {
    id: "orijen",
    name: "Orijen",
    discount: "up to 10% off",
    href: "/products?brand=orijen",
  },
  {
    id: "acana",
    name: "Acana",
    discount: "up to 15% off",
    href: "/products?brand=acana",
  },
  {
    id: "applaws",
    name: "Applaws",
    discount: "up to 10% off",
    href: "/products?brand=applaws",
  },
  {
    id: "thunder-paws",
    name: "Thunder Paws",
    discount: "up to 70% off",
    href: "/products?brand=thunder-paws",
  },
  {
    id: "bud-billy",
    name: "Bud & Billy",
    discount: "up to 80% off",
    href: "/products?brand=bud-billy",
  },
  {
    id: "addiction",
    name: "Addiction",
    discount: "up to 50% off",
    href: "/products?brand=addiction",
  },
  {
    id: "hills-science",
    name: "Hill's Science Plan",
    discount: "up to 10% off",
    href: "/products?brand=hills-science",
  },
  {
    id: "arden-grange",
    name: "Arden Grange",
    discount: "up to 30% off",
    href: "/products?brand=arden-grange",
  },
  {
    id: "open-farm",
    name: "Open Farm",
    discount: "up to 40% off",
    href: "/products?brand=open-farm",
  },
  {
    id: "trixie",
    name: "Trixie",
    discount: "up to 80% off",
    href: "/products?brand=trixie",
  },
];

export default function FeaturedCategoriesAndBrands() {
  return (
    <section className="w-full bg-background py-12">
      <div className="mx-auto max-w-7xl px-6">
        {/* Featured Categories Section */}
        <div className="mb-16">
          <h2 className="mb-6 text-center text-2xl font-semibold text-foreground">
            Featured Categories
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {FEATURED_CATEGORIES.map((category) => (
              <Link
                key={category.id}
                href={category.href}
                className="group relative flex h-64 flex-col overflow-hidden rounded-lg bg-primary p-4 transition-transform hover:scale-105"
              >
                {/* Discount Badge - Top Right */}
                <div className="absolute right-2 top-2 z-10">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-background">
                    <p className="text-center text-[10px] font-semibold leading-tight text-primary">
                      {category.discount}
                    </p>
                  </div>
                </div>

                {/* Product Image Placeholder */}
                <div className="mb-3 flex flex-1 items-center justify-center">
                  <div className="h-full w-full rounded bg-background/10"></div>
                </div>

                {/* Category Name */}
                <p className="text-center text-sm font-medium text-white">
                  {category.name}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Top Brands Section */}
        <div>
          <h2 className="mb-6 text-center text-2xl font-semibold text-foreground">
            Top Brands
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {TOP_BRANDS.map((brand) => (
              <Link
                key={brand.id}
                href={brand.href}
                className="group relative flex aspect-square flex-col items-center justify-center rounded-full border-2 border-primary/30 bg-background p-4 transition-transform hover:scale-105"
              >
                {/* Brand Logo Placeholder */}
                <div className="mb-6 flex h-20 w-20 items-center justify-center">
                  <div className="h-full w-full rounded-full bg-primary/10"></div>
                </div>

                {/* Discount Badge - Bottom Center */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
                  <div className="flex items-center justify-center rounded-full bg-primary px-2.5 py-1">
                    <p className="text-center text-[10px] font-semibold leading-tight text-white">
                      {brand.discount}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

