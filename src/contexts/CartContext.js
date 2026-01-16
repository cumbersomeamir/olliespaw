"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product, size, quantity = 1) => {
    setCartItems((prev) => {
      // Use slug as the primary identifier, fallback to id
      const productId = product.slug || product.id;
      if (!productId) {
        console.error("Product must have a slug or id", product);
        return prev;
      }
      
      const existing = prev.find(
        (item) => {
          const itemId = item.slug || item.id;
          return itemId === productId && item.size === size;
        }
      );
      
      if (existing) {
        return prev.map((item) => {
          const itemId = item.slug || item.id;
          return itemId === productId && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item;
        });
      }
      return [...prev, { ...product, id: productId, slug: product.slug || productId, size, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id, size) => {
    setCartItems((prev) => 
      prev.filter((item) => {
        const itemId = item.slug || item.id;
        return !(itemId === id && item.size === size);
      })
    );
  };

  const updateQuantity = (id, size, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id, size);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => {
        const itemId = item.slug || item.id;
        return itemId === id && item.size === size ? { ...item, quantity } : item;
      })
    );
  };

  const getSubtotal = () => {
    return cartItems.reduce((sum, item) => {
      // Handle both number and string prices
      let price = 0;
      if (typeof item.price === "number") {
        price = item.price;
      } else if (typeof item.price === "string") {
        price = parseFloat(item.price.replace(/[₹,\s]/g, "")) || 0;
      }
      return sum + price * item.quantity;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        getSubtotal,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}

