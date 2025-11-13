"use client";

import { useState } from "react";

export default function SizeSelector({ selectedSize, onSizeChange }) {
  const sizes = ["S", "M", "L", "XL", "XXL"];

  return (
    <div>
      <div className="mb-3 flex items-center gap-4">
        <div className="flex gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => onSizeChange(size)}
              className={`h-10 w-10 border ${
                selectedSize === size
                  ? "border-foreground bg-foreground text-background"
                  : "border-foreground/20 bg-background text-foreground hover:border-foreground/40"
              } transition-colors`}
            >
              {size}
            </button>
          ))}
        </div>
        <button className="text-sm text-foreground/60 underline hover:text-foreground">
          WHAT'S MY SIZE?
        </button>
      </div>
    </div>
  );
}

