"use client";

import { useState } from "react";
import { useCart } from "@/contexts/CartContext";

const COMBOS = [
  {
    id: 1,
    products: [
      { id: "1", title: "NourishMax Kibble – Chicken", price: 580, originalPrice: 725, discount: 20 },
      { id: "2", title: "Shine & Coat Supplement", price: 320, originalPrice: 400, discount: 20 },
      { id: "3", title: "Calm & Comfort Chews", price: 195, originalPrice: 240, discount: 18 },
    ],
  },
  {
    id: 2,
    products: [
      { id: "1", title: "NourishMax Kibble – Chicken", price: 580, originalPrice: 725, discount: 20 },
      { id: "4", title: "Daily Multivitamin Bites", price: 140, originalPrice: 175, discount: 20 },
    ],
  },
  {
    id: 3,
    products: [
      { id: "2", title: "Shine & Coat Supplement", price: 320, originalPrice: 400, discount: 20 },
      { id: "3", title: "Calm & Comfort Chews", price: 195, originalPrice: 240, discount: 18 },
    ],
  },
];

export default function BuyTogether({ mainProduct }) {
  const { addToCart } = useCart();
  const [selectedCombo, setSelectedCombo] = useState(0);
  const combo = COMBOS[selectedCombo];

  const totalPrice = combo.products.reduce((sum, p) => sum + p.price, 0);
  const totalOriginal = combo.products.reduce((sum, p) => sum + p.originalPrice, 0);
  const comboDiscount = Math.round(((totalOriginal - totalPrice) / totalOriginal) * 100);
  const savings = totalOriginal - totalPrice;

  const handleAddAllToCart = () => {
    combo.products.forEach((product) => {
      addToCart(
        { ...product, price: `₹ ${product.price.toFixed(2)}` },
        "Standard",
        1
      );
    });
  };

  return (
    <div className="mt-12 rounded border border-foreground/10 bg-background p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">
          Buy Together - Save ₹ {savings.toFixed(2)}
        </h2>
      </div>

      {/* Combo Tabs */}
      <div className="mb-6 flex gap-2 border-b border-foreground/10">
        {COMBOS.map((c, idx) => (
          <button
            key={c.id}
            onClick={() => setSelectedCombo(idx)}
            className={`px-4 py-2 text-sm ${
              selectedCombo === idx
                ? "border-b-2 border-primary font-medium text-primary"
                : "text-foreground/60 hover:text-foreground"
            }`}
          >
            Combo {idx + 1}
          </button>
        ))}
      </div>

      {/* Combo Products */}
      <div className="mb-6 flex items-center gap-4">
        {combo.products.map((product, idx) => (
          <div key={product.id} className="flex items-center gap-4">
            {idx > 0 && (
              <div className="text-2xl text-foreground/40">+</div>
            )}
            <div className="relative">
              <div className="absolute left-2 top-2 z-10">
                <svg className="h-6 w-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="h-24 w-24 bg-white">
                <div className="h-full w-full bg-accent/30" />
              </div>
              {product.discount > 0 && (
                <div className="absolute right-0 top-0 rounded bg-primary px-2 py-1 text-xs font-medium text-background">
                  {product.discount}% Off
                </div>
              )}
              <div className="mt-2 max-w-[100px]">
                <p className="text-xs font-medium text-foreground line-clamp-2">
                  {product.title}
                </p>
                <p className="mt-1 text-xs font-semibold text-foreground">
                  ₹ {product.price.toFixed(2)}
                </p>
                <p className="text-xs text-foreground/60 line-through">
                  ₹ {product.originalPrice.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Combo Total and Button */}
      <div className="flex items-center justify-between border-t border-foreground/10 pt-4">
        <div>
          {comboDiscount > 0 && (
            <span className="mr-2 rounded bg-primary px-2 py-1 text-xs font-medium text-background">
              {comboDiscount}% Off
            </span>
          )}
          <span className="text-lg font-semibold text-foreground">
            ₹ {totalPrice.toFixed(2)}
          </span>
          <span className="ml-2 text-sm text-foreground/60 line-through">
            ₹ {totalOriginal.toFixed(2)}
          </span>
        </div>
        <button
          onClick={handleAddAllToCart}
          className="flex items-center gap-2 bg-primary px-6 py-3 text-sm font-medium uppercase tracking-wider text-background hover:bg-primary/90"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          ADD ALL {combo.products.length} TO CART
        </button>
      </div>
    </div>
  );
}

