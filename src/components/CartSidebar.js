"use client";

import { useCart } from "@/contexts/CartContext";
import { useState } from "react";

const SUGGESTED_PRODUCTS = [
  {
    id: "suggested-1",
    title: "Classic Leash – Forest Green",
    price: "₹ 195.00",
    image: "/placeholder.jpg",
    sizes: ["30", "32", "34", "36"],
  },
  {
    id: "suggested-2",
    title: "Travel Tote – Moss",
    price: "₹ 195.00",
    image: "/placeholder.jpg",
    sizes: ["30", "32", "34", "36"],
  },
];

export default function CartSidebar() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getSubtotal,
    isCartOpen,
    setIsCartOpen,
    addToCart,
  } = useCart();
  const [suggestedIndex, setSuggestedIndex] = useState(0);
  const [selectedSuggestedSize, setSelectedSuggestedSize] = useState("30");

  const subtotal = getSubtotal();
  const freeShippingThreshold = 1500;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const suggestedProduct = SUGGESTED_PRODUCTS[suggestedIndex];

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-foreground/50"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-background shadow-2xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-foreground/10 px-6 py-4">
            <h2 className="text-lg font-medium uppercase tracking-wider text-foreground">
              YOUR CART
            </h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-foreground/60 hover:text-foreground"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Column Headers */}
          <div className="flex items-center justify-between border-b border-foreground/10 px-6 py-3 text-xs uppercase tracking-wider text-foreground/60">
            <span>PRODUCT</span>
            <span>TOTAL</span>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto">
            {cartItems.length === 0 ? (
              <div className="flex h-full items-center justify-center px-6">
                <p className="text-center text-sm text-foreground/60">
                  Your cart is empty
                </p>
              </div>
            ) : (
              <div className="divide-y divide-foreground/10">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="px-6 py-4">
                    <div className="flex gap-4">
                      {/* Thumbnail */}
                      <div className="h-20 w-20 flex-shrink-0 bg-white" />

                      {/* Item Details */}
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">
                          {item.brand?.toUpperCase()} {item.title}
                        </p>
                        <p className="mt-1 text-xs text-foreground/60">
                          Size: {item.size}
                        </p>

                        {/* Quantity Selector */}
                        <div className="mt-3 flex items-center gap-3">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.size, item.quantity - 1)
                            }
                            className="flex h-8 w-8 items-center justify-center border border-foreground/20 text-foreground hover:border-foreground/40"
                          >
                            −
                          </button>
                          <span className="text-sm text-foreground">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.size, item.quantity + 1)
                            }
                            className="flex h-8 w-8 items-center justify-center border border-foreground/20 text-foreground hover:border-foreground/40"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id, item.size)}
                            className="ml-auto text-foreground/40 hover:text-foreground"
                          >
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground">
                          {item.price}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Complete Your Purchase Section */}
          {cartItems.length > 0 && (
            <div className="border-t border-foreground/10 px-6 py-6">
              <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-foreground">
                COMPLETE YOUR PURCHASE
              </h3>
              <div className="relative">
                {/* Carousel Arrows */}
                <button
                  onClick={() =>
                    setSuggestedIndex(
                      (prev) => (prev - 1 + SUGGESTED_PRODUCTS.length) % SUGGESTED_PRODUCTS.length
                    )
                  }
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-foreground/60 hover:text-foreground"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={() =>
                    setSuggestedIndex((prev) => (prev + 1) % SUGGESTED_PRODUCTS.length)
                  }
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-foreground/60 hover:text-foreground"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                <div className="flex gap-4">
                  <div className="h-20 w-20 flex-shrink-0 bg-white" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {suggestedProduct.title}
                    </p>
                    <p className="mt-1 text-sm text-foreground">{suggestedProduct.price}</p>

                    {/* Size Options */}
                    <div className="mt-3 flex gap-2">
                      {suggestedProduct.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSuggestedSize(size)}
                          className={`h-8 px-3 text-xs ${
                            selectedSuggestedSize === size
                              ? "border border-foreground bg-foreground text-background"
                              : "border border-foreground/20 bg-background text-foreground hover:border-foreground/40"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => {
                        addToCart(suggestedProduct, selectedSuggestedSize, 1);
                      }}
                      className="mt-3 w-full border border-foreground bg-background px-4 py-2 text-sm font-medium uppercase tracking-wider text-foreground hover:bg-foreground hover:text-background"
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="border-t border-foreground/10 px-6 py-6">
            {/* Subtotal */}
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm uppercase tracking-wider text-foreground/60">
                SUBTOTAL
              </span>
              <span className="text-sm font-medium text-foreground">
                ₹ {subtotal.toFixed(2)}
              </span>
            </div>

            {/* Free Shipping Bar */}
            {remainingForFreeShipping > 0 && (
              <div className="mb-4 flex items-center gap-2 bg-primary px-4 py-3">
                <svg className="h-5 w-5 text-background" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
                <span className="text-sm text-background">
                  Add ₹ {remainingForFreeShipping.toFixed(2)} for free shipping.
                </span>
              </div>
            )}

            {/* Checkout Button */}
            <button
              onClick={() => {
                window.location.href = "/checkout";
              }}
              className="w-full bg-foreground px-6 py-4 text-sm font-medium uppercase tracking-wider text-background hover:bg-foreground/90"
            >
              CHECK OUT
            </button>

            {/* Promotional Text */}
            <p className="mt-4 text-center text-xs text-foreground/60">
              10% on your first order &gt;&gt;
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

