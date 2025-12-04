"use client";

import { useState, useEffect } from "react";

function DigitalCounter({ target, duration = 2000, prefix = "", suffix = "" }) {
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

  return (
    <span className="font-mono">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

export default function SystemStatusBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { label: "SYSTEM UPTIME", value: 99.9, suffix: "%", icon: "⚡" },
    { label: "ORDERS TODAY", value: 745, icon: "📦" },
    { label: "PETS SERVED", value: 9011, icon: "🐾" },
    { label: "ACTIVE USERS", value: 3421, icon: "👥" },
  ];

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 border-t border-[rgba(0,255,149,0.3)] bg-[#050b11]/95 backdrop-blur-sm transition-all duration-1000 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 py-3">
        <div className="flex flex-wrap items-center justify-between gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="flex items-center gap-3 transition-all duration-500"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(10px)",
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <span className="text-2xl transition-transform duration-300 hover:scale-110 hover:rotate-12">
                {stat.icon}
              </span>
              <div className="flex flex-col">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#6c7383]">
                  {stat.label}
                </span>
                <span className="font-mono text-lg font-bold text-[#00ff95]">
                  {stat.suffix ? (
                    <>
                      <DigitalCounter target={stat.value} />{stat.suffix}
                    </>
                  ) : (
                    <DigitalCounter target={stat.value} />
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

