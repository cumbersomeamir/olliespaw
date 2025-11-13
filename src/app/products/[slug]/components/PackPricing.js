"use client";

export default function PackPricing({ product, selectedSize, onAddPack }) {
  const singlePrice = parseFloat(product.price.replace(/[₹,\s]/g, ""));
  const packPrice = (singlePrice * 3 * 0.86).toFixed(2); // ~14% discount

  return (
    <div className="border-t border-foreground/10 pt-4">
      <h3 className="mb-3 text-sm font-medium uppercase tracking-wider text-foreground">
        SAVE WITH OUR PACKS
      </h3>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-foreground/60 line-through">
            ₹ {(singlePrice * 3).toFixed(2)}
          </span>
          <span className="text-sm font-medium text-foreground">
            3 x ₹ {packPrice}
          </span>
        </div>
        <button
          onClick={() => onAddPack(selectedSize)}
          className="border border-foreground/20 bg-background px-4 py-2 text-sm text-foreground hover:border-foreground/40"
        >
          ADD A 3-PACK {selectedSize}
        </button>
      </div>
    </div>
  );
}

