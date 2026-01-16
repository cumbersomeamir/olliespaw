"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import Image from "next/image";

export default function BuyTogether({ mainProduct }) {
  const { addToCart } = useCart();
  const [selectedCombo, setSelectedCombo] = useState(0);
  const [allProducts, setAllProducts] = useState([]);
  const [combos, setCombos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          // Filter out the current product
          const otherProducts = (data.products || []).filter(
            (p) => p.slug !== mainProduct?.slug
          );
          setAllProducts(otherProducts);
          
          // Create dynamic combos (2-3 products per combo)
          const generatedCombos = generateCombos(otherProducts);
          setCombos(generatedCombos);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [mainProduct?.slug]);

  // Generate combos from available products
  function generateCombos(products) {
    if (products.length === 0) return [];
    
    const combos = [];
    // Create combos of 2-3 products
    // Combo 1: First 3 products
    if (products.length >= 3) {
      combos.push({
        id: 1,
        products: products.slice(0, 3),
      });
    }
    // Combo 2: First 2 products
    if (products.length >= 2) {
      combos.push({
        id: 2,
        products: products.slice(0, 2),
      });
    }
    // Combo 3: Products 1, 3, 4 (if available) or different combination
    if (products.length >= 3) {
      const combo3Products = [products[0]];
      if (products[2]) combo3Products.push(products[2]);
      if (products[3]) combo3Products.push(products[3]);
      else if (products[1]) combo3Products.push(products[1]);
      combos.push({
        id: 3,
        products: combo3Products,
      });
    }
    
    return combos.length > 0 ? combos : [];
  }

  if (loading) {
    return (
      <div className="mt-12 rounded border border-foreground/10 bg-background p-6">
        <div className="text-foreground/70">Loading combo options...</div>
      </div>
    );
  }

  if (combos.length === 0) {
    return null; // Don't show section if no combos available
  }

  const combo = combos[selectedCombo] || combos[0];
  if (!combo) return null;

  const totalPrice = combo.products.reduce((sum, p) => sum + (p.price || 0), 0);
  const totalOriginal = combo.products.reduce(
    (sum, p) => sum + (p.originalPrice || p.price || 0),
    0
  );
  const comboDiscount =
    totalOriginal > totalPrice
      ? Math.round(((totalOriginal - totalPrice) / totalOriginal) * 100)
      : 0;
  const savings = totalOriginal - totalPrice;

  const handleAddAllToCart = () => {
    combo.products.forEach((product) => {
      addToCart(
        {
          ...product,
          id: product.slug,
          price: product.price,
        },
        "Standard",
        1
      );
    });
  };

  const calculateDiscount = (product) => {
    if (!product.originalPrice || product.originalPrice <= product.price) return 0;
    return Math.round(
      ((product.originalPrice - product.price) / product.originalPrice) * 100
    );
  };

  return (
    <div className="mt-12 rounded border border-foreground/10 bg-background p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">
          Buy Together - Save ₹ {savings.toFixed(2)}
        </h2>
      </div>

      {/* Combo Tabs */}
      {combos.length > 1 && (
        <div className="mb-6 flex gap-2 border-b border-foreground/10">
          {combos.map((c, idx) => (
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
      )}

      {/* Combo Products */}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        {combo.products.map((product, idx) => {
          const discount = calculateDiscount(product);
          const productImage = product.images?.[0]?.url || "/images/dummy/placeholder.jpg";
          
          return (
            <div key={product.slug || product.id || idx} className="flex items-center gap-4">
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
                <div className="relative h-24 w-24 overflow-hidden rounded border border-foreground/10 bg-background">
                  <Image
                    src={productImage}
                    alt={product.title || "Product"}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                {discount > 0 && (
                  <div className="absolute right-0 top-0 rounded bg-primary px-2 py-1 text-xs font-medium text-background">
                    {discount}% Off
                  </div>
                )}
                <div className="mt-2 max-w-[100px]">
                  <p className="text-xs font-medium text-foreground line-clamp-2">
                    {product.title}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-foreground">
                    ₹ {product.price?.toFixed(2) || "0.00"}
                  </p>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <p className="text-xs text-foreground/60 line-through">
                      ₹ {product.originalPrice.toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Combo Total and Button */}
      <div className="flex flex-col gap-4 border-t border-foreground/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          {comboDiscount > 0 && (
            <span className="mr-2 rounded bg-primary px-2 py-1 text-xs font-medium text-background">
              {comboDiscount}% Off
            </span>
          )}
          <span className="text-lg font-semibold text-foreground">
            ₹ {totalPrice.toFixed(2)}
          </span>
          {totalOriginal > totalPrice && (
            <span className="ml-2 text-sm text-foreground/60 line-through">
              ₹ {totalOriginal.toFixed(2)}
            </span>
          )}
        </div>
        <button
          onClick={handleAddAllToCart}
          className="flex items-center justify-center gap-2 bg-primary px-6 py-3 text-sm font-medium uppercase tracking-wider text-background hover:bg-primary/90"
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

