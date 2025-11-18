"use client";

import { useState } from "react";

// Placeholder SVG as data URI
const PLACEHOLDER_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%23f3f4f6' width='400' height='400'/%3E%3Ctext fill='%239ca3af' font-family='sans-serif' font-size='18' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EProduct Image%3C/text%3E%3C/svg%3E";

export default function ProductImageGallery({ product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [imageErrors, setImageErrors] = useState({});
  
  // Get images from product, or use placeholder
  const productImages = Array.isArray(product?.images) && product.images.length > 0
    ? product.images
    : [{ url: PLACEHOLDER_IMAGE, alt: product?.title || "Product" }];
  
  const currentImage = productImages[selectedImage] || productImages[0];
  
  const handleImageError = (index) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  return (
    <div className="flex gap-4">
      {/* Thumbnails - Left */}
      {productImages.length > 1 && (
        <div className="flex flex-col gap-3">
          {productImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(idx)}
              className={`h-20 w-20 flex-shrink-0 border-2 bg-white transition-colors overflow-hidden ${
                selectedImage === idx ? "border-primary" : "border-transparent"
              }`}
            >
              {imageErrors[idx] ? (
                <div className="h-full w-full bg-accent/30 flex items-center justify-center text-xs text-foreground/40">
                  Image
                </div>
              ) : (
                <img
                  src={img.url || PLACEHOLDER_IMAGE}
                  alt={img.alt || `Thumbnail ${idx + 1}`}
                  className="h-full w-full object-cover"
                  onError={() => handleImageError(idx)}
                />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Main Image - Center */}
      <div className="relative flex-1">
        <div className="aspect-square w-full bg-white relative overflow-hidden">
          {imageErrors[selectedImage] ? (
            <div className="h-full w-full bg-accent/30 flex items-center justify-center">
              <span className="text-foreground/40">Image not available</span>
            </div>
          ) : (
            <img
              src={currentImage?.url || PLACEHOLDER_IMAGE}
              alt={currentImage?.alt || product?.title || "Product"}
              className="h-full w-full object-cover"
              onError={() => handleImageError(selectedImage)}
            />
          )}
        </div>
        {/* Navigation Arrow */}
        {productImages.length > 1 && (
          <button
            onClick={() => setSelectedImage((prev) => (prev + 1) % productImages.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 text-foreground hover:bg-background"
            aria-label="Next image"
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
        )}
      </div>
    </div>
  );
}

