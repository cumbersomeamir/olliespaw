"use client";

import { useState } from "react";

export default function CollapsibleSections() {
  const [openSection, setOpenSection] = useState(null);

  const sections = [
    {
      title: "DETAILS",
      content: "Premium pet wellness product made with natural ingredients. Formulated in India with care and science.",
    },
    {
      title: "FIT",
      content: "Suitable for all pet sizes. Please refer to size guide for specific measurements.",
    },
    {
      title: "DELIVERIES AND RETURNS",
      content: "Free shipping on orders over ₹ 1500. PAN India delivery. 7-day return policy. Free exchanges available.",
    },
    {
      title: "CARE GUIDE",
      content: "Store in a cool, dry place. Keep away from direct sunlight. Follow usage instructions on packaging.",
    },
  ];

  return (
    <div className="border-t border-foreground/10 pt-6">
      {sections.map((section, index) => (
        <div key={index} className="border-b border-foreground/10 last:border-b-0">
          <button
            onClick={() => setOpenSection(openSection === index ? null : index)}
            className="flex w-full items-center justify-between py-4 text-left"
          >
            <span className="text-sm font-medium uppercase tracking-wider text-foreground">
              {section.title}
            </span>
            <svg
              className={`h-4 w-4 transition-transform ${
                openSection === index ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {openSection === index && (
            <div className="pb-4 text-sm leading-relaxed text-foreground/80">
              {section.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

