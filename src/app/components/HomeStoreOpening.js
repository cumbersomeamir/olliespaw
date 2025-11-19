"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import CodeRain from "@/components/matrix/CodeRain";
import GridOverlay from "@/components/matrix/GridOverlay";

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
      delay: 0,
      image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1200&h=1600&fit=crop&q=80",
    },
    { 
      label: "CAT", 
      subtitle: "ENTER CAT GRID",
      accent: "#00e0ff",
      delay: 100,
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1200&h=1600&fit=crop&q=80",
    },
    { 
      label: "ALL", 
      subtitle: "VIEW ALL SIGNALS",
      accent: "#7c5cff",
      delay: 200,
      image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=1200&h=1600&fit=crop&q=80",
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
      className="group relative block h-[60vh] sm:h-[70vh] md:h-[80vh] w-full overflow-hidden bg-[#050b11] transition-all duration-500 hover:bg-[#070f17] active:bg-[#070f17] touch-manipulation"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
      style={{
        transform: isHovered 
          ? `perspective(1000px) rotateY(${mousePosition.x * 0.1}deg) rotateX(${-mousePosition.y * 0.1}deg) translateZ(20px)`
          : "perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)",
        transition: "transform 0.3s ease-out",
      }}
    >
      {/* Background Effects */}
      <CodeRain intensity={8} speed={60} />
      <GridOverlay opacity={0.08} pulse={true} />
      
      {/* Pet Image Background */}
      <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
        <Image
          src={panel.image}
          alt={panel.label}
          fill
          className="object-cover"
          sizes="(max-width: 1200px) 100vw, 1200px"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${panel.accent}40 0%, transparent 70%)`,
          }}
        />
      </div>
      
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
          className="w-2/3 h-2/3 sm:w-3/4 sm:h-3/4 opacity-20 sm:opacity-30 transition-opacity duration-500 group-hover:opacity-40 sm:group-hover:opacity-60"
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
        className={`absolute left-3 top-3 sm:left-4 sm:top-4 md:left-6 md:top-6 z-10 transition-all duration-1000 ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4"
        }`}
        style={{ transitionDelay: `${panel.delay}ms` }}
      >
        <h2 className="font-sans text-[32px] sm:text-[40px] md:text-[48px] lg:text-[72px] xl:text-[92px] font-extrabold uppercase leading-none tracking-tight block text-white">
          {panel.label}
        </h2>
      </div>

      {/* Subtitle - Word by Word Reveal */}
      <div
        className={`absolute left-3 bottom-16 sm:left-4 sm:bottom-18 md:left-6 md:bottom-20 z-10 transition-all duration-1000 ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: `${panel.delay + 300}ms` }}
      >
        <p
          className="text-[10px] sm:text-xs md:text-sm font-mono uppercase tracking-widest transition-colors duration-300"
          style={{ color: panel.accent }}
        >
          {panel.subtitle}
        </p>
      </div>

      {/* CTA Button - Neon Pulse */}
      <div
        className={`absolute bottom-3 left-3 sm:bottom-4 sm:left-4 md:bottom-6 md:left-6 z-10 transition-all duration-1000 ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: `${panel.delay + 600}ms` }}
      >
        <button
          className="group/btn relative overflow-hidden rounded-lg border-2 px-4 py-2.5 sm:px-5 sm:py-2.5 md:px-6 md:py-3 font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-300 touch-manipulation min-h-[44px] min-w-[100px]"
          style={{
            borderColor: panel.accent,
            color: panel.accent,
            boxShadow: isHovered ? `0 0 15px ${panel.accent}` : "none",
          }}
        >
          <span className="relative z-10">EXPLORE</span>
          <div
            className="absolute inset-0 transition-transform duration-300 group-hover/btn:translate-x-0 group-active/btn:translate-x-0 -translate-x-full"
            style={{ backgroundColor: `${panel.accent}20` }}
          />
        </button>
      </div>

    </Link>
  );
}
