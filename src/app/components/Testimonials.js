"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import GridOverlay from "@/components/matrix/GridOverlay";

const TESTIMONIALS = [
  {
    id: 1,
    name: "PRIYA SHARMA",
    location: "Mumbai, Maharashtra",
    pet: "Golden Retriever - Max",
    rating: 5,
    text: "Ollie's Paw products have transformed Max's health. The quality is exceptional and delivery is always on time. Highly recommended!",
    color: "#00ff95",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop&q=80",
  },
  {
    id: 2,
    name: "RAHUL KUMAR",
    location: "Delhi, NCR",
    pet: "Persian Cat - Luna",
    rating: 5,
    text: "Luna absolutely loves the treats! Natural ingredients and no side effects. Best pet care brand in India.",
    color: "#00e0ff",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop&q=80",
  },
  {
    id: 3,
    name: "ANITA PATEL",
    location: "Bangalore, Karnataka",
    pet: "Beagle - Charlie",
    rating: 5,
    text: "Science-backed formulas that actually work. Charlie's coat is shinier and he's more energetic. Thank you Ollie's Paw!",
    color: "#7c5cff",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop&q=80",
  },
  {
    id: 4,
    name: "VIKASH SINGH",
    location: "Pune, Maharashtra",
    pet: "Labrador - Buddy",
    rating: 5,
    text: "Made in India with premium quality. Fast delivery and excellent customer service. Buddy is healthier than ever!",
    color: "#ffed4f",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop&q=80",
  },
];

export default function Testimonials() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
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

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#040608] py-12 sm:py-16 md:py-20 lg:py-24"
    >
      <GridOverlay opacity={0.1} pulse={true} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div
          className={`mb-12 sm:mb-14 md:mb-16 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          <h2 className="mb-4 text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#f5f7ff]">
            CUSTOMER TESTIMONIALS
          </h2>
          <p className="font-mono text-sm text-[#6c7383]">
            // USER FEEDBACK DATABASE
          </p>
        </div>

        {/* Testimonials Grid - Show all testimonials */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="group relative overflow-hidden rounded-xl border-2 border-[rgba(0,255,149,0.2)] bg-[#070f17] p-6 sm:p-7 md:p-8 transition-all duration-500 hover:border-[#00ff95] hover:shadow-[0_0_30px_rgba(0,255,149,0.3)]"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible
                  ? "translateY(0) scale(1)"
                  : "translateY(30px) scale(0.9)",
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <GridOverlay opacity={0.05} />

              {/* Pet Image Background */}
              <div className="absolute inset-0 opacity-10 group-hover:opacity-15 transition-opacity duration-300 overflow-hidden">
                <Image
                  src={testimonial.image}
                  alt={testimonial.pet}
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
                    background: `linear-gradient(135deg, ${testimonial.color}30 0%, transparent 70%)`,
                  }}
                />
              </div>

              {/* Scanline on Hover */}
              <div className="matrix-scanline absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Top Section with Rating */}
              <div className="mb-6 flex items-start justify-between">
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <span
                      key={i}
                      className="text-xl transition-all duration-300 group-hover:scale-110"
                      style={{
                        color: testimonial.color,
                        filter: `drop-shadow(0 0 4px ${testimonial.color}60)`,
                        animationDelay: `${i * 50}ms`,
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <div
                  className="rounded-full p-3 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
                  style={{
                    backgroundColor: `${testimonial.color}20`,
                    border: `2px solid ${testimonial.color}40`,
                  }}
                >
                  <span className="text-2xl">🐾</span>
                </div>
              </div>

              {/* Testimonial Text */}
              <p className="mb-6 text-base leading-relaxed text-[#a7b2c7] transition-colors duration-300 group-hover:text-[#f5f7ff]">
                "{testimonial.text}"
              </p>

              {/* Customer Info */}
              <div className="border-t border-[rgba(0,255,149,0.2)] pt-4">
                <h4
                  className="mb-1 font-mono text-sm font-bold uppercase tracking-wider transition-colors duration-300"
                  style={{ color: testimonial.color }}
                >
                  {testimonial.name}
                </h4>
                <p className="font-mono text-xs text-[#6c7383]">
                  {testimonial.location}
                </p>
                <p className="mt-1 font-mono text-xs text-[#a7b2c7]">
                  {testimonial.pet}
                </p>
              </div>

              {/* Corner Accent */}
              <div
                className="absolute right-0 top-0 h-16 w-16 opacity-20 transition-opacity duration-300 group-hover:opacity-40"
                style={{
                  background: `linear-gradient(135deg, ${testimonial.color}40 0%, transparent 50%)`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
