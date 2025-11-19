"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import CodeRain from "@/components/matrix/CodeRain";
import GridOverlay from "@/components/matrix/GridOverlay";

function TypewriterText({ text, speed = 50, onComplete }) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (onComplete) {
      setTimeout(() => {
        setShowCursor(false);
        onComplete();
      }, 500);
    }
  }, [currentIndex, text, speed, onComplete]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className="font-mono">
      {displayedText}
      {showCursor && <span className="text-[#00ff95]">▊</span>}
    </span>
  );
}

export default function OurStory() {
  const [isVisible, setIsVisible] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);
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

    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollProgress = (window.innerHeight - rect.top) / window.innerHeight;
        setParallaxOffset(scrollProgress * 50);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#040608] py-12 sm:py-16 md:py-20 lg:py-24"
    >
      {/* Background Layers with Parallax */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          transform: `translateY(${parallaxOffset * 0.5}px)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <CodeRain intensity={10} speed={80} />
      </div>
      <GridOverlay opacity={0.15} pulse={true} />

      {/* Noise Static Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div
          className={`mb-12 sm:mb-14 md:mb-16 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          <h2 className="mb-4 text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#f5f7ff]">
            OUR STORY
          </h2>
          <p className="font-mono text-sm text-[#6c7383]">
            // INITIALIZATION SEQUENCE v1.0
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 gap-8 sm:gap-10 md:gap-12 lg:grid-cols-2">
          {/* Left: Story Text with Typewriter */}
          <div
            className={`space-y-6 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="relative rounded-xl border-2 border-[rgba(0,255,149,0.3)] bg-[#070f17]/80 p-6 sm:p-7 md:p-8 backdrop-blur-sm">
              <GridOverlay opacity={0.1} />
              
              {/* Hologram Displacement Effect */}
              <div
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{
                  background: `linear-gradient(45deg, transparent 30%, rgba(0,255,149,0.05) 50%, transparent 70%)`,
                  mixBlendMode: "screen",
                  animation: "hologram-displace 4s ease-in-out infinite",
                }}
              />

              <div className="relative z-10">
                <h3 className="mb-4 font-mono text-sm uppercase tracking-wider text-[#00ff95]">
                  MISSION STATEMENT
                </h3>
                {isVisible && (
                  <div className="space-y-4 text-[#a7b2c7] leading-relaxed">
                    <p>
                      <TypewriterText
                        text="Ollie's Paw began with a simple belief: our pets deserve the same love, care, and attention we give to any member of our family."
                        speed={30}
                      />
                    </p>
                    <p className="mt-4">
                      <TypewriterText
                        text="We craft premium, wellness-focused products made with love and guided by science—only our own creations that meet the highest standards of quality, safety, and care."
                        speed={30}
                      />
                    </p>
                    <p className="mt-4">
                      <TypewriterText
                        text="Our goal is to help every pet live longer, stronger, and happier—by empowering pet parents across India to make healthier choices."
                        speed={30}
                      />
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Visual Elements with 3D Rotation */}
          <div
            className={`flex items-center justify-center transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="relative h-[400px] w-full max-w-md">
              {/* 3D Rotating Card */}
              <div
                className="absolute inset-0 rounded-xl border-2 border-[rgba(0,255,149,0.3)] bg-[#070f17] p-8 transition-transform duration-500 hover:rotate-y-12 overflow-hidden"
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px",
                }}
              >
                <GridOverlay opacity={0.1} />
                
                {/* Pet Image Background */}
                <div className="absolute inset-0 opacity-30">
                  <Image
                    src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=800&fit=crop&q=80"
                    alt="Pet"
                    fill
                    className="object-cover"
                    sizes="(max-width: 400px) 100vw, 400px"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070f17] via-transparent to-transparent" />
                </div>
                
                {/* Orbital Particles */}
                <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                  {Array.from({ length: 8 }).map((_, i) => {
                    const angle = (i * 360) / 8;
                    const radius = 150;
                    return (
                      <div
                        key={i}
                        className="absolute h-2 w-2 rounded-full bg-[#00ff95] opacity-60"
                        style={{
                          left: "50%",
                          top: "50%",
                          transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}px)`,
                          animation: `orbital-rotate ${8 + i}s linear infinite`,
                          animationDelay: `${i * 0.5}s`,
                        }}
                      />
                    );
                  })}
                </div>

                {/* Center Content */}
                <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
                  <div className="mb-6 text-8xl">🐾</div>
                  <h4 className="mb-4 font-mono text-xl font-bold uppercase tracking-wider text-[#00ff95]">
                    EVERY PAW MATTERS
                  </h4>
                  <p className="font-mono text-sm text-[#6c7383]">
                    // ESTABLISHED 2025
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes hologram-displace {
          0%, 100% {
            transform: translateX(0) translateY(0);
            opacity: 0.05;
          }
          25% {
            transform: translateX(10px) translateY(-5px);
            opacity: 0.1;
          }
          50% {
            transform: translateX(-5px) translateY(10px);
            opacity: 0.08;
          }
          75% {
            transform: translateX(-10px) translateY(-5px);
            opacity: 0.1;
          }
        }

        @keyframes orbital-rotate {
          from {
            transform: translate(-50%, -50%) rotate(0deg) translateY(-150px) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg) translateY(-150px) rotate(-360deg);
          }
        }
      `}</style>
    </section>
  );
}

