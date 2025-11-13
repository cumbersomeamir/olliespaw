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
  
  const slug = product.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  return (
    <Link href={`/products/${slug}`} className="block">
      <div className="group w-full border border-transparent transition-colors hover:border-foreground/20">
        {/* Image frame - large white rectangle */}
        <div className="relative w-full">
          <div className="aspect-[3/4] w-full bg-white" />
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
          <div className="mt-1 text-sm font-medium text-foreground">{product.price}</div>
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


