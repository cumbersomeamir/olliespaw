"use client";

import { useState, useEffect, useRef } from "react";
import GridOverlay from "@/components/matrix/GridOverlay";

const SUSTAINABILITY_POINTS = [
  {
    id: 1,
    title: "ECO-FRIENDLY PACKAGING",
    description: "100% recyclable and biodegradable packaging materials",
    percentage: 100,
    color: "#00ff95",
    icon: "♻️",
  },
  {
    id: 2,
    title: "LOCAL SOURCING",
    description: "Supporting Indian farmers and local suppliers",
    percentage: 85,
    color: "#00e0ff",
    icon: "🌾",
  },
  {
    id: 3,
    title: "CARBON NEUTRAL",
    description: "Offsetting carbon footprint through green initiatives",
    percentage: 90,
    color: "#7c5cff",
    icon: "🌱",
  },
  {
    id: 4,
    title: "ZERO WASTE",
    description: "Minimizing waste in production and operations",
    percentage: 95,
    color: "#ffed4f",
    icon: "♻️",
  },
];

function WordByWordReveal({ text, isVisible, delay = 0 }) {
  const [revealedWords, setRevealedWords] = useState([]);

  useEffect(() => {
    if (isVisible) {
      const words = text.split(" ");
      let currentIndex = 0;

      const interval = setInterval(() => {
        if (currentIndex < words.length) {
          setRevealedWords((prev) => [...prev, words[currentIndex]]);
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isVisible, text]);

  return (
    <span>
      {revealedWords.map((word, index) => (
        <span
          key={index}
          className="inline-block transition-all duration-300"
          style={{
            opacity: 1,
            transform: "translateY(0)",
            animationDelay: `${index * 0.1}s`,
          }}
        >
          {word}{" "}
        </span>
      ))}
      {revealedWords.length < text.split(" ").length && (
        <span className="inline-block w-2 h-4 bg-[#00ff95] animate-pulse ml-1" />
      )}
    </span>
  );
}

function CircularProgress({ percentage, color, delay = 0 }) {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const circleRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (circleRef.current) {
      observer.observe(circleRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const duration = 2000;
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setAnimatedPercentage(easeOutQuart * percentage);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      setTimeout(() => requestAnimationFrame(animate), delay);
    }
  }, [isVisible, percentage, delay]);

  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (animatedPercentage / 100) * circumference;

  return (
    <div ref={circleRef} className="relative h-32 w-32">
      <svg className="h-full w-full -rotate-90 transform">
        <circle
          cx="50%"
          cy="50%"
          r="45"
          fill="none"
          stroke="rgba(0, 255, 149, 0.1)"
          strokeWidth="8"
        />
        <circle
          cx="50%"
          cy="50%"
          r="45"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-300"
          style={{
            filter: `drop-shadow(0 0 8px ${color}60)`,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-mono text-2xl font-bold" style={{ color }}>
          {Math.round(animatedPercentage)}%
        </span>
      </div>
    </div>
  );
}

export default function Sustainability() {
  const [isVisible, setIsVisible] = useState(false);
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
      className="relative w-full overflow-hidden bg-[#050b11] py-24"
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
            SUSTAINABILITY & IMPACT
          </h2>
          <p className="font-mono text-sm text-[#6c7383]">
            // ENVIRONMENTAL COMMITMENT PROTOCOL
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left: Text Content */}
          <div
            className={`space-y-6 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="relative rounded-xl border-2 border-[rgba(0,255,149,0.3)] bg-[#070f17] p-8">
              <GridOverlay opacity={0.1} />

              <h3 className="mb-6 font-mono text-sm uppercase tracking-wider text-[#00ff95]">
                OUR COMMITMENT
              </h3>

              <div className="space-y-4 text-[#a7b2c7] leading-relaxed">
                <p>
                  <WordByWordReveal
                    text="At Ollie's Paw, we believe in responsible pet care that extends beyond our products. We're committed to sustainable practices that protect our planet for future generations."
                    isVisible={isVisible}
                    delay={200}
                  />
                </p>
                <p>
                  <WordByWordReveal
                    text="From eco-friendly packaging to local sourcing and carbon-neutral operations, every decision we make is guided by our commitment to environmental stewardship."
                    isVisible={isVisible}
                    delay={3000}
                  />
                </p>
              </div>
            </div>
          </div>

          {/* Right: Circular Progress Indicators */}
          <div
            className={`grid grid-cols-2 gap-6 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            {SUSTAINABILITY_POINTS.map((point, index) => (
              <div
                key={point.id}
                className="group relative overflow-hidden rounded-xl border-2 border-[rgba(0,255,149,0.2)] bg-[#070f17] p-6 transition-all duration-500 hover:border-[#00ff95] hover:shadow-[0_0_20px_rgba(0,255,149,0.3)]"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(20px)",
                  transitionDelay: `${index * 150}ms`,
                }}
              >
                <GridOverlay opacity={0.05} />

                {/* Icon */}
                <div className="mb-4 flex justify-center text-4xl">
                  {point.icon}
                </div>

                {/* Circular Progress */}
                <div className="mb-4 flex justify-center">
                  <CircularProgress
                    percentage={point.percentage}
                    color={point.color}
                    delay={index * 200}
                  />
                </div>

                {/* Title */}
                <h4
                  className="mb-2 text-center font-mono text-xs font-bold uppercase tracking-wider transition-colors duration-300 group-hover:text-[#00ff95]"
                  style={{ color: point.color }}
                >
                  {point.title}
                </h4>

                {/* Description */}
                <p className="text-center text-xs leading-relaxed text-[#6c7383]">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

