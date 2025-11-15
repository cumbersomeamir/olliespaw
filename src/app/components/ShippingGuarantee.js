"use client";

import { useState, useEffect, useRef } from "react";
import GridOverlay from "@/components/matrix/GridOverlay";

const GUARANTEES = [
  {
    id: 1,
    title: "FREE SHIPPING",
    subtitle: "On orders over ₹1500",
    description: "Fast and secure delivery across India",
    icon: "🚚",
    color: "#00ff95",
    stat: "PAN India",
  },
  {
    id: 2,
    title: "7-DAY RETURNS",
    subtitle: "Hassle-free policy",
    description: "Not satisfied? Return within 7 days",
    icon: "↩️",
    color: "#00e0ff",
    stat: "100% Refund",
  },
  {
    id: 3,
    title: "QUALITY ASSURED",
    subtitle: "Vet approved products",
    description: "Every product tested and certified",
    icon: "✓",
    color: "#7c5cff",
    stat: "100% Safe",
  },
  {
    id: 4,
    title: "24/7 SUPPORT",
    subtitle: "Always here to help",
    description: "Round-the-clock customer service",
    icon: "💬",
    color: "#ffed4f",
    stat: "Instant Response",
  },
];

function ProgressBar({ progress, color, delay = 0 }) {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const barRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (barRef.current) {
      observer.observe(barRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const duration = 2000;
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const currentProgress = Math.min(elapsed / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - currentProgress, 4);
        setAnimatedProgress(easeOutQuart * progress);

        if (currentProgress < 1) {
          requestAnimationFrame(animate);
        }
      };
      setTimeout(() => requestAnimationFrame(animate), delay);
    }
  }, [isVisible, progress, delay]);

  return (
    <div ref={barRef} className="relative h-2 w-full overflow-hidden rounded-full bg-[#070f17] border border-[rgba(0,255,149,0.2)]">
      <div
        className="h-full rounded-full transition-all duration-300"
        style={{
          width: `${animatedProgress}%`,
          backgroundColor: color,
          boxShadow: `0 0 10px ${color}60`,
        }}
      />
    </div>
  );
}

function SuccessFlash({ isActive }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none transition-opacity duration-200 ${
        isActive ? "opacity-100" : "opacity-0"
      }`}
      style={{
        background: "radial-gradient(circle, rgba(0,255,149,0.3) 0%, transparent 70%)",
        animation: isActive ? "success-flash 0.3s ease-out" : "none",
      }}
    />
  );
}

export default function ShippingGuarantee() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#040608] py-24"
    >
      <GridOverlay opacity={0.1} pulse={true} />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div
          className={`mb-16 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          <h2 className="mb-4 text-4xl font-bold uppercase tracking-tight text-[#f5f7ff] md:text-5xl">
            SHIPPING & GUARANTEES
          </h2>
          <p className="font-mono text-sm text-[#6c7383]">
            // SERVICE COMMITMENT MATRIX
          </p>
        </div>

        {/* Guarantees Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {GUARANTEES.map((guarantee, index) => (
            <div
              key={guarantee.id}
              className="group relative overflow-hidden rounded-xl border-2 border-[rgba(0,255,149,0.2)] bg-[#070f17] p-8 transition-all duration-500 hover:border-[#00ff95] hover:shadow-[0_0_30px_rgba(0,255,149,0.3)]"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible
                  ? "translateY(0) scale(1)"
                  : "translateY(30px) scale(0.9)",
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <GridOverlay opacity={0.05} />
              <SuccessFlash isActive={hoveredIndex === index} />

              {/* Icon */}
              <div className="relative mb-6 flex justify-center">
                <div
                  className={`rounded-full p-5 transition-all duration-300 group-hover:scale-110 ${
                    hoveredIndex === index ? "matrix-neon-pulse" : ""
                  }`}
                  style={{
                    backgroundColor: `${guarantee.color}20`,
                    border: `2px solid ${guarantee.color}40`,
                    boxShadow:
                      hoveredIndex === index
                        ? `0 0 30px ${guarantee.color}60`
                        : "none",
                  }}
                >
                  <span className="text-4xl">{guarantee.icon}</span>
                </div>
              </div>

              {/* Title */}
              <h3
                className="mb-2 text-center font-mono text-sm font-bold uppercase tracking-wider transition-colors duration-300"
                style={{
                  color: hoveredIndex === index ? guarantee.color : "#00ff95",
                }}
              >
                {guarantee.title}
              </h3>

              {/* Subtitle */}
              <p className="mb-4 text-center font-mono text-xs text-[#6c7383]">
                {guarantee.subtitle}
              </p>

              {/* Description */}
              <p className="mb-6 text-center text-sm leading-relaxed text-[#a7b2c7]">
                {guarantee.description}
              </p>

              {/* Progress Bar */}
              <div className="mb-3">
                <ProgressBar
                  progress={100}
                  color={guarantee.color}
                  delay={index * 200}
                />
              </div>

              {/* Stat */}
              <p
                className="text-center font-mono text-xs font-bold uppercase tracking-wider"
                style={{ color: guarantee.color }}
              >
                {guarantee.stat}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes success-flash {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
          100% {
            opacity: 0;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
}

