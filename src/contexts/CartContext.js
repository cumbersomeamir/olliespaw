"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product, size, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id && item.size === size
      );
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, size, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id, size) => {
    setCartItems((prev) => prev.filter((item) => !(item.id === id && item.size === size)));
  };

  const updateQuantity = (id, size, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id, size);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.size === size ? { ...item, quantity } : item
      )
    );
  };

  const getSubtotal = () => {
    return cartItems.reduce((sum, item) => {
      const price = parseFloat(item.price.replace(/[₹,\s]/g, ""));
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

