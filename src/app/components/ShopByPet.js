"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import GridOverlay from "@/components/matrix/GridOverlay";

const PET_CATEGORIES = [
  {
    id: "dog",
    name: "Dog",
    label: "ENTER DOG GRID",
    accent: "#00ff95",
    image: "🐕",
    photo: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=600&fit=crop&q=80",
  },
  {
    id: "cat",
    name: "Cat",
    label: "ENTER CAT GRID",
    accent: "#00e0ff",
    image: "🐱",
    photo: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=600&fit=crop&q=80",
  },
  {
    id: "fish",
    name: "Fish",
    label: "ENTER FISH GRID",
    accent: "#7c5cff",
    image: "🐠",
    photo: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=600&fit=crop&q=80",
  },
  {
    id: "small-pet",
    name: "Small Pet",
    label: "ENTER SMALL PET GRID",
    accent: "#ffed4f",
    image: "🐰",
    photo: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&h=600&fit=crop&q=80",
  },
  {
    id: "bird",
    name: "Bird",
    label: "ENTER BIRD GRID",
    accent: "#00ff95",
    image: "🦜",
    photo: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=600&h=600&fit=crop&q=80",
  },
  {
    id: "reptile",
    name: "Reptile",
    label: "ENTER REPTILE GRID",
    accent: "#ff3670",
    image: "🦎",
    photo: "https://images.unsplash.com/photo-1520637836862-4d197d17c82a?w=600&h=600&fit=crop&q=80",
  },
];

export default function ShopByPet() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative w-full bg-[#040608] py-8 sm:py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Pagination Dots */}
        <div className="mb-6 flex justify-center gap-2">
          <div className="h-2 w-2 rounded-full bg-[#00ff95] matrix-neon-pulse" />
          <div className="h-2 w-2 rounded-full bg-[#00ff95]/30" />
        </div>

        {/* Title */}
        <div
          className={`mb-12 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <h2 className="mb-2 text-2xl font-semibold uppercase tracking-[0.2em] text-[#f5f7ff]">
            SHOP BY PET
          </h2>
          <p className="font-mono text-sm text-[#6c7383]">
            // HOLOGRAM TILE INTERFACE v2.0
          </p>
        </div>

        {/* Pet Category Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PET_CATEGORIES.map((pet, index) => (
            <HologramTile
              key={pet.id}
              pet={pet}
              index={index}
              isVisible={isVisible}
              mousePosition={mousePosition}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function HologramTile({ pet, index, isVisible, mousePosition }) {
  const [isHovered, setIsHovered] = useState(false);
  const [glowOrbit, setGlowOrbit] = useState(0);

  useEffect(() => {
    if (isHovered) {
      const interval = setInterval(() => {
        setGlowOrbit((prev) => (prev + 2) % 360);
      }, 16);
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  return (
    <Link
      href={`/products?category=${pet.id}`}
      className="group relative block aspect-[4/3] overflow-hidden rounded-xl transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateY(${mousePosition.x * 0.05}deg) rotateX(${-mousePosition.y * 0.05}deg) translateZ(30px) scale(1.02)`
          : `perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px) scale(1)`,
        transition: "transform 0.3s ease-out",
        transitionDelay: `${index * 50}ms`,
        opacity: isVisible ? 1 : 0,
      }}
    >
      {/* Dark Card Background */}
      <div className="absolute inset-0 bg-[#070f17] transition-all duration-300 group-hover:bg-[#0a1520]" />

      {/* Grid Overlay */}
      <GridOverlay opacity={0.1} />

      {/* Neon Border */}
      <div
        className="absolute inset-0 rounded-xl border-2 transition-all duration-300"
        style={{
          borderColor: isHovered ? pet.accent : "rgba(0, 255, 149, 0.2)",
          boxShadow: isHovered
            ? `0 0 30px ${pet.accent}40, inset 0 0 30px ${pet.accent}20`
            : "none",
        }}
      />

      {/* Scanline Overlay on Hover */}
      {isHovered && (
        <div className="matrix-scanline absolute inset-0 pointer-events-none rounded-xl" />
      )}

      {/* Glow Orbit Effect */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `conic-gradient(from ${glowOrbit}deg, transparent 0deg, ${pet.accent}20 90deg, transparent 180deg)`,
            mixBlendMode: "screen",
          }}
        />
      )}

      {/* Pet Image Background */}
      <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500">
        <Image
          src={pet.photo}
          alt={pet.name}
          fill
          className="object-cover"
          sizes="(max-width: 600px) 100vw, 600px"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${pet.accent}20 0%, transparent 70%)`,
          }}
        />
      </div>

      {/* Pet Icon - Wireframe Style (Overlay) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="text-8xl transition-all duration-500 group-hover:scale-110 drop-shadow-lg"
          style={{
            filter: isHovered
              ? `drop-shadow(0 0 20px ${pet.accent}) brightness(1.2)`
              : "drop-shadow(0 0 5px rgba(0, 255, 149, 0.3))",
          }}
        >
          {pet.image}
        </div>
      </div>

      {/* Label Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#070f17] via-[#070f17]/80 to-transparent p-6">
        <p
          className="font-mono text-sm font-semibold uppercase tracking-wider transition-colors duration-300"
          style={{ color: isHovered ? pet.accent : "#a7b2c7" }}
        >
          {pet.label}
        </p>
      </div>

      {/* RGB Split Glitch on Hover */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none rounded-xl matrix-rgb-split"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${pet.accent}10 50%, transparent 100%)`,
            mixBlendMode: "screen",
          }}
        />
      )}
    </Link>
  );
}
