"use client";

import { useState, useEffect } from "react";
import GridOverlay from "@/components/matrix/GridOverlay";

const feedData = [
  { id: 1, event: "Dogs bought today", count: 247, category: "DOG FOOD" },
  { id: 2, event: "Most viewed toys", count: 892, category: "TOYS" },
  { id: 3, event: "High-priority restocks", count: 34, category: "SUPPLIES" },
  { id: 4, event: "Cat treats ordered", count: 156, category: "TREATS" },
  { id: 5, event: "New pet registrations", count: 89, category: "SIGNUPS" },
];

function DigitalCounter({ target, duration = 2000 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * target));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [target, duration]);

  return <span className="font-mono">{count}</span>;
}

export default function LivePetGridFeed() {
  const [isVisible, setIsVisible] = useState(false);
  const [highlightedRow, setHighlightedRow] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      setHighlightedRow((prev) => (prev + 1) % feedData.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full bg-[#040608] py-16">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div
          className={`mb-12 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <h2 className="mb-2 text-2xl font-semibold uppercase tracking-[0.2em] text-[#f5f7ff]">
            LIVE PET GRID FEED
          </h2>
          <p className="font-mono text-sm text-[#6c7383]">
            // REAL-TIME SIGNAL PROCESSING
          </p>
        </div>

        {/* Console Table */}
        <div className="relative overflow-hidden rounded-xl border-2 border-[rgba(0,255,149,0.3)] bg-[#070f17]">
          <GridOverlay opacity={0.1} />
          
          {/* Table Header */}
          <div className="border-b border-[rgba(0,255,149,0.2)] bg-[#050b11] px-6 py-4">
            <div className="grid grid-cols-3 gap-4 font-mono text-xs uppercase tracking-wider text-[#6c7383]">
              <div>EVENT</div>
              <div className="text-center">COUNT</div>
              <div className="text-right">CATEGORY</div>
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-[rgba(0,255,149,0.1)]">
            {feedData.map((item, index) => {
              const isHighlighted = highlightedRow === index;
              
              return (
                <div
                  key={item.id}
                  className={`grid grid-cols-3 gap-4 px-6 py-4 font-mono text-sm transition-all duration-500 ${
                    isHighlighted
                      ? "bg-[rgba(0,255,149,0.1)] text-[#00ff95]"
                      : "text-[#a7b2c7]"
                  }`}
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateX(0)" : "translateX(-20px)",
                    transitionDelay: `${index * 100}ms`,
                    boxShadow: isHighlighted
                      ? "inset 0 0 20px rgba(0,255,149,0.1)"
                      : "none",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[#00ff95]">▶</span>
                    <span>{item.event}</span>
                  </div>
                  <div className="text-center font-bold text-[#00ff95]">
                    <DigitalCounter target={item.count} />
                  </div>
                  <div className="text-right text-[#6c7383]">{item.category}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

