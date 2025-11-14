"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import CodeRain from "@/components/matrix/CodeRain";
import GridOverlay from "@/components/matrix/GridOverlay";
import GlitchText from "@/components/matrix/GlitchText";

export default function HomeStoreOpening() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const panels = [
    { 
      label: "DOG", 
      subtitle: "ENTER DOG GRID",
      accent: "#00ff95",
      delay: 0 
    },
    { 
      label: "CAT", 
      subtitle: "ENTER CAT GRID",
      accent: "#00e0ff",
      delay: 100 
    },
    { 
      label: "ALL", 
      subtitle: "VIEW ALL SIGNALS",
      accent: "#7c5cff",
      delay: 200 
    },
  ];

  return (
    <section className="relative w-full overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {panels.map((panel, i) => (
          <Panel 
            key={i} 
            panel={panel}
            isVisible={isVisible}
            mousePosition={mousePosition}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}

function Panel({ panel, isVisible, mousePosition, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={index === 0 ? "/products?category=dog" : index === 1 ? "/products?category=cat" : "/products"}
      className="group relative block h-[80vh] w-full overflow-hidden bg-[#050b11] transition-all duration-500 hover:bg-[#070f17]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered 
          ? `perspective(1000px) rotateY(${mousePosition.x * 0.1}deg) rotateX(${-mousePosition.y * 0.1}deg) translateZ(20px)`
          : "perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)",
        transition: "transform 0.3s ease-out",
      }}
    >
      {/* Background Effects */}
      <CodeRain intensity={15} speed={60} />
      <GridOverlay opacity={0.15} pulse={true} />
      
      {/* Neon Border Frame */}
      <div
        className="absolute inset-0 border-2 transition-all duration-500"
        style={{
          borderColor: isHovered ? panel.accent : "rgba(0, 255, 149, 0.2)",
          boxShadow: isHovered 
            ? `0 0 20px ${panel.accent}, inset 0 0 20px ${panel.accent}40`
            : "none",
        }}
      />

      {/* Scanline Overlay */}
      {isHovered && (
        <div className="matrix-scanline absolute inset-0 pointer-events-none" />
      )}

      {/* Wireframe Pet Bed/Crate */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          viewBox="0 0 400 400"
          className="w-3/4 h-3/4 opacity-30 transition-opacity duration-500 group-hover:opacity-60"
          style={{ filter: `drop-shadow(0 0 10px ${panel.accent})` }}
        >
          <g
            fill="none"
            stroke={panel.accent}
            strokeWidth="2"
            strokeOpacity="0.6"
          >
            {/* Wireframe structure */}
            <rect x="50" y="50" width="300" height="300" rx="8" />
            <rect x="80" y="80" width="240" height="240" rx="6" />
            <line x1="50" y1="50" x2="80" y2="80" />
            <line x1="350" y1="50" x2="320" y2="80" />
            <line x1="50" y1="350" x2="80" y2="320" />
            <line x1="350" y1="350" x2="320" y2="320" />
            {/* Inner grid */}
            {Array.from({ length: 4 }).map((_, i) => (
              <line
                key={`v-${i}`}
                x1={100 + i * 60}
                y1="100"
                x2={100 + i * 60}
                y2="300"
              />
            ))}
            {Array.from({ length: 4 }).map((_, i) => (
              <line
                key={`h-${i}`}
                x1="100"
                y1={100 + i * 60}
                x2="300"
                y2={100 + i * 60}
              />
            ))}
          </g>
        </svg>
      </div>

      {/* Title - Glitch Reveal */}
      <div
        className={`absolute left-6 top-6 z-10 transition-all duration-1000 ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4"
        }`}
        style={{ transitionDelay: `${panel.delay}ms` }}
      >
        <h2 className="font-sans text-[48px] font-extrabold uppercase leading-none tracking-tight md:text-[72px] lg:text-[92px]">
          <GlitchText
            className="block text-white"
            duration={3000}
            glitchOnHover={true}
          >
            {panel.label}
          </GlitchText>
        </h2>
      </div>

      {/* Subtitle - Word by Word Reveal */}
      <div
        className={`absolute left-6 bottom-20 z-10 transition-all duration-1000 ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: `${panel.delay + 300}ms` }}
      >
        <p
          className="text-sm font-mono uppercase tracking-widest transition-colors duration-300"
          style={{ color: panel.accent }}
        >
          {panel.subtitle}
        </p>
      </div>

      {/* CTA Button - Neon Pulse */}
      <div
        className={`absolute bottom-6 left-6 z-10 transition-all duration-1000 ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: `${panel.delay + 600}ms` }}
      >
        <button
          className="group/btn relative overflow-hidden rounded-lg border-2 px-6 py-3 font-mono text-sm font-semibold uppercase tracking-wider transition-all duration-300"
          style={{
            borderColor: panel.accent,
            color: panel.accent,
            boxShadow: isHovered ? `0 0 15px ${panel.accent}` : "none",
          }}
        >
          <span className="relative z-10">EXPLORE</span>
          <div
            className="absolute inset-0 transition-transform duration-300 group-hover/btn:translate-x-0 -translate-x-full"
            style={{ backgroundColor: `${panel.accent}20` }}
          />
        </button>
      </div>

      {/* Bottom Info - Flicker On */}
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-6 z-10 flex items-end justify-between px-6 text-white transition-all duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: `${panel.delay + 900}ms` }}
      >
        <div className="text-[12px] leading-[1.25] tracking-widest md:text-[14px]">
          <p className="matrix-flicker">27 RUE</p>
          <p className="matrix-flicker" style={{ animationDelay: "0.1s" }}>
            DE SAINTONGE
          </p>
          <p className="matrix-flicker" style={{ animationDelay: "0.2s" }}>
            75003 PARIS
          </p>
        </div>
        <div className="text-right text-[12px] leading-[1.25] tracking-widest md:text-[14px]">
          <p className="matrix-flicker">A PARTIR</p>
          <p className="matrix-flicker" style={{ animationDelay: "0.1s" }}>
            DU 14.11.25
          </p>
          <p className="matrix-flicker" style={{ animationDelay: "0.2s" }}>
            11H00.19H30
          </p>
        </div>
      </div>
    </Link>
  );
}
