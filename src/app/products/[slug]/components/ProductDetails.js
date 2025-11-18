"use client";

import { useState } from "react";
import { useCart } from "@/contexts/CartContext";

export default function ProductDetails({ product }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedDelivery, setSelectedDelivery] = useState("standard");

  // Handle price - can be number or string
  const getNumericPrice = (price) => {
    if (typeof price === "number") return price;
    if (typeof price === "string") {
      return parseFloat(price.replace(/[₹,\s]/g, "")) || 0;
    }
    return 0;
  };

  const currentPrice = getNumericPrice(product.price);
  const originalPriceNum = product.originalPrice ? getNumericPrice(product.originalPrice) : currentPrice * 1.2;
  const originalPrice = originalPriceNum;
  const discount = originalPrice > currentPrice ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : 0;
  const savings = originalPrice > currentPrice ? originalPrice - currentPrice : 0;
  const pricePerUnit = currentPrice / (product.weight || 1);
  
  // Format price for display
  const formatPrice = (price) => {
    return `₹ ${price.toFixed(2)}`;
  };

  const handleAddToCart = () => {
    addToCart(product, product.size || "Standard", quantity);
  };

  return (
    <div className="space-y-6">
      {/* Title and Brand */}
      <div>
        <h1 className="mb-2 text-2xl font-semibold text-foreground">{product.title}</h1>
        <p className="text-sm text-foreground/60">By {product.brand}</p>
      </div>

      {/* Delivery Options */}
      <div>
        <p className="mb-2 text-sm text-foreground/70">Get it delivered by</p>
        <div className="flex gap-3">
          <button
            onClick={() => setSelectedDelivery("standard")}
            className={`rounded border px-4 py-2 text-sm ${
              selectedDelivery === "standard"
                ? "border-primary bg-primary text-background"
                : "border-foreground/20 bg-background text-foreground"
            }`}
          >
            1-2 Days Delivery
          </button>
          <button
            onClick={() => setSelectedDelivery("express")}
            className={`flex items-center gap-2 rounded border px-4 py-2 text-sm ${
              selectedDelivery === "express"
                ? "border-primary bg-primary text-background"
                : "border-foreground/20 bg-background text-foreground"
            }`}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            60 Minutes
          </button>
        </div>
        {selectedDelivery === "express" && (
          <button className="mt-2 text-sm text-primary underline">
            Select your Location
          </button>
        )}
      </div>

      {/* Pricing */}
      <div>
        <div className="mb-2 flex items-center gap-3">
          {discount > 0 && (
            <span className="rounded bg-primary px-2 py-1 text-xs font-medium text-background">
              {discount}% Off
            </span>
          )}
          <span className="text-2xl font-semibold text-foreground">{formatPrice(currentPrice)}</span>
          {originalPrice > currentPrice && (
            <span className="text-sm text-foreground/60 line-through">
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>
        {product.weight && (
          <p className="text-sm text-foreground/60">(₹ {pricePerUnit.toFixed(2)}/kg)</p>
        )}
      </div>

      {/* Quantity Selector */}
      <div>
        <p className="mb-2 text-sm text-foreground/70">Quantity</p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="flex h-10 w-10 items-center justify-center border border-foreground/20 text-foreground hover:border-foreground/40"
          >
            −
          </button>
          <span className="w-12 text-center text-foreground">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="flex h-10 w-10 items-center justify-center border border-foreground/20 text-foreground hover:border-foreground/40"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="flex w-full items-center justify-center gap-2 bg-primary px-6 py-4 text-sm font-medium uppercase tracking-wider text-background hover:bg-primary/90"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        ADD TO CART
      </button>

      {/* Savings Info */}
      {savings > 0 && (
        <p className="text-sm text-primary">
          You are saving ₹ {savings.toFixed(2)}
        </p>
      )}

      {/* Buy Now Pay Later */}
      <div className="rounded border border-foreground/10 bg-background p-4">
        <p className="mb-2 text-sm font-medium text-foreground">Buy Now Pay Later</p>
        <p className="mb-3 text-xs text-foreground/70">
          Pay ₹ {(currentPrice / 4).toFixed(2)} now and the rest in 3 Payments over time. No hidden fees, no interest!
        </p>
        <div className="flex gap-2">
          <div className="h-6 w-16 rounded bg-primary/20" />
          <div className="h-6 w-16 rounded bg-secondary/20" />
        </div>
      </div>

      {/* Shop with Confidence */}
      <div className="space-y-4 rounded border border-foreground/10 bg-background p-4">
        <p className="text-sm font-medium text-foreground">Shop with Confidence</p>
        <div className="space-y-3 text-sm text-foreground/70">
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span>Customer Service +91 8090005050</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            <span>Convenient Delivery At Your Doorstep</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>We deliver PAN India</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span>Feel secure: Easy returns</span>
          </div>
        </div>
      </div>
    </div>
  );
}

