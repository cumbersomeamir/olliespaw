"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import GridOverlay from "@/components/matrix/GridOverlay";

const FEATURES = [
  {
    id: 1,
    title: "MADE IN INDIA",
    description: "Proudly crafted in India with locally sourced premium ingredients.",
    icon: "🇮🇳",
    color: "#00ff95",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop&q=80",
  },
  {
    id: 2,
    title: "SCIENCE-BACKED",
    description: "Every formula is developed with veterinary expertise and research.",
    icon: "🔬",
    color: "#00e0ff",
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop&q=80",
  },
  {
    id: 3,
    title: "100% NATURAL",
    description: "No artificial preservatives, colors, or harmful additives.",
    icon: "🌿",
    color: "#7c5cff",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop&q=80",
  },
  {
    id: 4,
    title: "VET APPROVED",
    description: "Recommended by veterinarians and trusted by pet parents.",
    icon: "👨‍⚕️",
    color: "#ffed4f",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop&q=80",
  },
  {
    id: 5,
    title: "FAST DELIVERY",
    description: "PAN India shipping with secure and timely delivery.",
    icon: "🚚",
    color: "#ff3670",
    image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&h=400&fit=crop&q=80",
  },
  {
    id: 6,
    title: "EASY RETURNS",
    description: "7-day hassle-free return policy for your peace of mind.",
    icon: "↩️",
    color: "#00ff95",
    image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=400&fit=crop&q=80",
  },
];

function RadarSweep({ isActive, color }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg className="h-full w-full" viewBox="0 0 200 200">
        <defs>
          <linearGradient id={`radar-gradient-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0" />
            <stop offset="50%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {isActive && (
          <g>
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke={`url(#radar-gradient-${color})`}
              strokeWidth="2"
              className="radar-sweep"
            />
            <line
              x1="100"
              y1="100"
              x2="100"
              y2="20"
              stroke={color}
              strokeWidth="2"
              opacity="0.6"
              className="radar-sweep-line"
            />
          </g>
        )}
      </svg>
    </div>
  );
}

function CheckmarkDraw({ isActive, delay = 0 }) {
  const [pathLength, setPathLength] = useState(0);
  const checkRef = useRef(null);

  useEffect(() => {
    if (isActive && checkRef.current) {
      const path = checkRef.current;
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;

      setTimeout(() => {
        path.style.transition = "stroke-dashoffset 0.8s ease-out";
        path.style.strokeDashoffset = 0;
      }, delay);
    }
  }, [isActive, delay]);

  return (
    <svg
      className="h-8 w-8"
      fill="none"
      stroke="#00ff95"
      strokeWidth="3"
      viewBox="0 0 24 24"
    >
      <path
        ref={checkRef}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

export default function WhyChooseUs() {
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
      className="relative w-full overflow-hidden bg-[#050b11] py-12 sm:py-16 md:py-20 lg:py-24"
    >
      <GridOverlay opacity={0.1} pulse={true} />

      {/* Binary Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="h-full w-full font-mono text-xs text-[#00ff95] leading-tight">
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={i} className="whitespace-pre">
              {Array.from({ length: 100 })
                .map(() => (Math.random() > 0.5 ? "1" : "0"))
                .join(" ")}
            </div>
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div
          className={`mb-12 sm:mb-14 md:mb-16 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          <h2 className="mb-4 text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#f5f7ff]">
            WHY CHOOSE US
          </h2>
          <p className="font-mono text-sm text-[#6c7383]">
            // COMPETITIVE ADVANTAGE MATRIX
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <div
              key={feature.id}
              className="group relative overflow-hidden rounded-xl border-2 border-[rgba(0,255,149,0.2)] bg-[#070f17] p-6 sm:p-7 md:p-8 transition-all duration-500 hover:border-[#00ff95] hover:shadow-[0_0_30px_rgba(0,255,149,0.3)]"
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

              {/* Feature Image Background */}
              <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300 overflow-hidden">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 400px) 100vw, 400px"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, ${feature.color}40 0%, transparent 70%)`,
                  }}
                />
              </div>

              {/* Radar Sweep on Hover */}
              {hoveredIndex === index && (
                <RadarSweep isActive={true} color={feature.color} />
              )}

              {/* RGB Split Glitch on Hover */}
              {hoveredIndex === index && (
                <div
                  className="absolute inset-0 pointer-events-none rounded-xl matrix-rgb-split"
                  style={{
                    background: `linear-gradient(90deg, transparent 0%, ${feature.color}10 50%, transparent 100%)`,
                    mixBlendMode: "screen",
                  }}
                />
              )}

              {/* Icon with Glow Orbit */}
              <div className="relative mb-6 flex items-center justify-center">
                <div
                  className="relative rounded-full p-4 transition-all duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: `${feature.color}20`,
                    border: `2px solid ${feature.color}40`,
                    boxShadow: hoveredIndex === index
                      ? `0 0 20px ${feature.color}60, 0 0 40px ${feature.color}30`
                      : "none",
                  }}
                >
                  <span className="text-4xl">{feature.icon}</span>
                  
                  {/* Glow Orbit Ring */}
                  {hoveredIndex === index && (
                    <div
                      className="absolute inset-0 rounded-full border-2"
                      style={{
                        borderColor: feature.color,
                        animation: "glow-orbit 2s linear infinite",
                        boxShadow: `0 0 20px ${feature.color}`,
                      }}
                    />
                  )}
                </div>
              </div>

              {/* Title */}
              <h3
                className="mb-4 text-center font-mono text-sm font-bold uppercase tracking-wider transition-colors duration-300"
                style={{ color: hoveredIndex === index ? feature.color : "#00ff95" }}
              >
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-center text-sm leading-relaxed text-[#a7b2c7]">
                {feature.description}
              </p>

              {/* Checkmark Draw Animation */}
              <div className="mt-6 flex justify-center">
                <CheckmarkDraw isActive={isVisible} delay={index * 150 + 500} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes glow-orbit {
          0% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: scale(1.2) rotate(180deg);
            opacity: 0.5;
          }
          100% {
            transform: scale(1) rotate(360deg);
            opacity: 1;
          }
        }

        @keyframes radar-sweep {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .radar-sweep {
          animation: radar-sweep 3s linear infinite;
        }

        .radar-sweep-line {
          animation: radar-sweep 3s linear infinite;
          transform-origin: 100px 100px;
        }
      `}</style>
    </section>
  );
}

