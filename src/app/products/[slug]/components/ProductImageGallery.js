"use client";

import { useState } from "react";

export default function ProductImageGallery({ product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const images = [
    { id: 1, type: "main" },
    { id: 2, type: "detail" },
    { id: 3, type: "detail" },
    { id: 4, type: "detail" },
    { id: 5, type: "detail" },
    { id: 6, type: "detail" },
  ];

  return (
    <div className="flex gap-4">
      {/* Thumbnails - Left */}
      <div className="flex flex-col gap-3">
        {images.map((img, idx) => (
          <button
            key={img.id}
            onClick={() => setSelectedImage(idx)}
            className={`h-20 w-20 flex-shrink-0 border-2 bg-white transition-colors ${
              selectedImage === idx ? "border-primary" : "border-transparent"
            }`}
          >
            <div className="h-full w-full bg-accent/30" />
          </button>
        ))}
      </div>

      {/* Main Image - Center */}
      <div className="relative flex-1">
        <div className="aspect-square w-full bg-white">
          <div className="h-full w-full bg-accent/30" />
        </div>
        {/* Navigation Arrow */}
        <button
          onClick={() => setSelectedImage((prev) => (prev + 1) % images.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 text-foreground hover:bg-background"
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
      </div>
    </div>
  );
}

