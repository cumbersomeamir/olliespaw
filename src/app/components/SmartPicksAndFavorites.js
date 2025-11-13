"use client";

import Link from "next/link";

const SMART_PICKS = [
  { id: 1, price: 10, label: "UNDER ₹ 10" },
  { id: 2, price: 20, label: "UNDER ₹ 20" },
  { id: 3, price: 30, label: "UNDER ₹ 30" },
  { id: 4, price: 40, label: "UNDER ₹ 40" },
];

// SVG Icon Components - Professional line art style
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
  },
  {
    id: "cat-litter",
    name: "Cat Litter",
    discount: "Upto 30% off",
    Icon: CatLitterIcon,
    href: "/products?category=cat-litter",
  },
  {
    id: "treats",
    name: "Treats",
    discount: "Upto 40% off",
    Icon: TreatsIcon,
    href: "/products?category=treats",
  },
  {
    id: "beds",
    name: "Beds",
    price: "start from ₹ 25",
    Icon: BedIcon,
    href: "/products?category=beds",
  },
  {
    id: "toys",
    name: "Toys",
    price: "under ₹ 40",
    Icon: ToysIcon,
    href: "/products?category=toys",
  },
  {
    id: "collar-harness",
    name: "Collar & Harness",
    price: "under ₹ 39",
    Icon: CollarHarnessIcon,
    href: "/products?category=collar-harness",
  },
];

export default function SmartPicksAndFavorites() {
  return (
    <section className="w-full bg-background py-12">
      <div className="mx-auto max-w-7xl px-6">
        {/* Smart Picks Section */}
        <div className="mb-12">
          <h2 className="mb-6 text-center text-2xl font-semibold text-foreground">
            Smart Picks
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {SMART_PICKS.map((pick) => (
              <Link
                key={pick.id}
                href={`/products?maxPrice=${pick.price}`}
                className="group relative"
              >
                <div className="flex h-32 w-72 items-center border-2 border-primary bg-background transition-transform hover:scale-105">
                  {/* Left: EVERYTHING (vertical) */}
                  <div className="flex h-full flex-col items-center justify-center border-r-2 border-dashed border-foreground/30 px-3">
                    <span className="-rotate-90 whitespace-nowrap text-xs font-medium text-foreground">
                      EVERYTHING
                    </span>
                  </div>
                  {/* Right: UNDER ₹ X */}
                  <div className="flex flex-1 flex-col items-center justify-center px-3">
                    <p className="text-xs font-medium text-foreground">UNDER</p>
                    <p className="text-2xl font-bold text-primary">₹ {pick.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* November Favourites Section */}
        <div>
          <h2 className="mb-6 text-center text-2xl font-semibold text-foreground">
            November Favourites
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {NOVEMBER_FAVORITES.map((favorite) => {
              const IconComponent = favorite.Icon;
              return (
                <Link
                  key={favorite.id}
                  href={favorite.href}
                  className="group relative overflow-hidden rounded-lg bg-primary p-6 transition-transform hover:scale-105"
                >
                  {/* Product Icon */}
                  <div className="mb-4 flex h-48 items-center justify-center text-white">
                    <IconComponent />
                  </div>

                  {/* Discount/Price Text */}
                  <div className="relative">
                    {favorite.discount ? (
                      <p className="text-3xl font-bold text-white">
                        {favorite.discount}
                      </p>
                    ) : (
                      <div className="flex items-baseline gap-2">
                        <p className="text-lg text-white/80">{favorite.price.split("₹")[0]}</p>
                        <p className="text-3xl font-bold text-white">
                          ₹ {favorite.price.match(/\d+/)?.[0]}
                        </p>
                      </div>
                    )}
                    {/* Category Name - lighter color */}
                    <p className="mt-2 text-lg font-medium text-white/75">
                      {favorite.name}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

