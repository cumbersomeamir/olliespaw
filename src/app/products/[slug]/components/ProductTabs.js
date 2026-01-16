"use client";

import { useState } from "react";

export default function ProductTabs({ product }) {
  const [activeTab, setActiveTab] = useState("description");

  const tabs = [
    { id: "description", label: "Product Description" },
    { id: "nutrition", label: "Nutritional Info" },
    { id: "feeding", label: "Feeding Instructions" },
  ];

  return (
    <div className="mt-12">
      {/* Tabs */}
      <div className="flex border-b border-foreground/10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === tab.id
                ? "border-b-2 border-primary text-primary"
                : "text-foreground/60 hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "description" && (
          <div className="space-y-4 text-sm leading-relaxed text-foreground/80">
            {product.description ? (
              <div 
                className="prose prose-sm max-w-none text-foreground/80"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            ) : (
              <p>
                {product.title} contains premium, natural ingredients formulated to support your pet's overall wellbeing. Made with love and backed by science, this product is crafted in India with the highest standards of quality and care.
              </p>
            )}
          </div>
        )}

        {activeTab === "nutrition" && (
          <div className="text-sm leading-relaxed text-foreground/80">
            {product.nutritionInfo ? (
              <div 
                className="prose prose-sm max-w-none text-foreground/80"
                dangerouslySetInnerHTML={{ __html: product.nutritionInfo }}
              />
            ) : (
              <p>Nutritional information coming soon. This product is formulated with premium ingredients to support your pet's health and wellness.</p>
            )}
          </div>
        )}

        {activeTab === "feeding" && (
          <div className="text-sm leading-relaxed text-foreground/80">
            {product.feedingInstructions ? (
              <div 
                className="prose prose-sm max-w-none text-foreground/80"
                dangerouslySetInnerHTML={{ __html: product.feedingInstructions }}
              />
            ) : (
              <p>Feeding instructions coming soon. Please follow the recommended feeding guidelines based on your pet's weight and activity level.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

