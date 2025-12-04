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
            <p>
              {product.title} contains premium, natural ingredients formulated to support your pet's overall wellbeing. Made with love and backed by science, this product is crafted in India with the highest standards of quality and care.
            </p>
            <div>
              <h3 className="mb-2 font-semibold text-foreground">Product Features:</h3>
              <ul className="list-disc space-y-2 pl-6">
                <li>Premium natural ingredients sourced responsibly</li>
                <li>Formulated by pet nutrition experts</li>
                <li>Made in India with quality assurance</li>
                <li>Supports overall pet health and wellness</li>
                <li>Freshly sealed packaging for maximum freshness</li>
              </ul>
            </div>
            <div className="mt-6">
              <h3 className="mb-2 font-semibold text-foreground">Technical Details:</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-foreground">Size: </span>
                  <span className="text-foreground/70">200 ml</span>
                </div>
                <div>
                  <span className="font-medium text-foreground">Pet Life Stage: </span>
                  <span className="text-foreground/70">Adult</span>
                </div>
                <div>
                  <span className="font-medium text-foreground">Food Type: </span>
                  <span className="text-foreground/70">Liquid</span>
                </div>
                <div>


                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "nutrition" && (
          <div className="text-sm leading-relaxed text-foreground/80">
            <p>Nutritional information coming soon. This product is formulated with premium ingredients to support your pet's health and wellness.</p>
          </div>
        )}

        {activeTab === "feeding" && (
          <div className="text-sm leading-relaxed text-foreground/80">
            <p>Feeding instructions coming soon. Please follow the recommended feeding guidelines based on your pet's weight and activity level.</p>
          </div>
        )}
      </div>
    </div>
  );
}

