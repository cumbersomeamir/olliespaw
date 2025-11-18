"use client";

import Link from "next/link";

export default function ProductCard({ product }) {
  const badge = product.badge;
  const isLowStock = badge === "low";
  const imageBadgeClass =
    badge === "exclusive"
      ? "bg-secondary text-foreground"
      : badge === "new"
      ? "bg-primary text-background"
      : "hidden";
  const slug = product.slug || product.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  return (
    <Link href={`/products/${slug}`} className="block">
      <div className="group w-full border border-transparent transition-colors hover:border-foreground/20">
        {/* Image frame - large white rectangle */}
        <div className="relative w-full">
          <div className="aspect-[3/4] w-full bg-white overflow-hidden relative">
            {/* Use first dynamic image if available */}
            {Array.isArray(product.images) && product.images[0]?.url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.images[0].url}
                alt={product.images[0].alt || product.title}
                className="h-full w-full object-cover"
                loading="lazy"
                onError={(e) => {
                  // Fallback to placeholder on error
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='400'%3E%3Crect fill='%23f3f4f6' width='300' height='400'/%3E%3Ctext fill='%239ca3af' font-family='sans-serif' font-size='16' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EProduct%3C/text%3E%3C/svg%3E";
                }}
              />
            ) : (
              <div className="h-full w-full bg-accent/30 flex items-center justify-center">
                <span className="text-foreground/40 text-sm">No Image</span>
              </div>
            )}
          </div>
          {badge && !isLowStock && (
            <span
              className={`absolute ${
                badge === "exclusive" ? "top-2 left-2" : "top-2 right-2"
              } rounded px-2 py-1 text-[10px] font-medium uppercase tracking-wider ${imageBadgeClass}`}
            >
              {badge === "exclusive" ? "EXCLUSIVE" : "NEW"}
            </span>
          )}
        </div>
        {/* Meta - brand on top, price below, then product name */}
        <div className="mt-3 px-6">
          <div className="text-xs uppercase tracking-wider text-foreground/60">{product.brand.toUpperCase()}</div>
          <div className="mt-1 text-sm font-medium text-foreground">
            {typeof product.price === "number" ? `₹ ${product.price.toFixed(2)}` : product.price}
          </div>
          <div className="mt-1 text-[15px] leading-snug text-foreground">{product.title}</div>
          {isLowStock && (
            <div className="mt-2">
              <span className="inline-block rounded bg-secondary px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-foreground">
                LOW STOCK
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}


