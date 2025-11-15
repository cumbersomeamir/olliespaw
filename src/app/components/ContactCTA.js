"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import GridOverlay from "@/components/matrix/GridOverlay";

export default function ContactCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);
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

  const contactMethods = [
    {
      id: 1,
      label: "EMAIL",
      value: "info@olliespaw.com",
      href: "mailto:info@olliespaw.com",
      icon: "✉️",
      color: "#00ff95",
      bgGradient: "from-[#00ff95] to-[#00cc77]",
    },
    {
      id: 2,
      label: "PHONE",
      value: "+91 8090005050",
      href: "tel:+918090005050",
      icon: "📞",
      color: "#00e0ff",
      bgGradient: "from-[#00e0ff] to-[#00b3cc]",
    },
    {
      id: 3,
      label: "ADDRESS",
      value: "Dehradun, Uttarakhand",
      href: "#",
      icon: "📍",
      color: "#7c5cff",
      bgGradient: "from-[#7c5cff] to-[#5c3ccc]",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#050b11] py-12 sm:py-16 md:py-20 lg:py-24"
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
            GET IN TOUCH
          </h2>
          <p className="font-mono text-sm text-[#6c7383]">
            // CONNECT WITH OUR SYSTEM
          </p>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
          {contactMethods.map((method, index) => (
            <Link
              key={method.id}
              href={method.href}
              className="group relative overflow-hidden rounded-xl border-2 border-[rgba(0,255,149,0.2)] bg-[#070f17] p-6 sm:p-7 md:p-8 transition-all duration-500 hover:border-[#00ff95] hover:shadow-[0_0_40px_rgba(0,255,149,0.4)]"
              onMouseEnter={() => setHoveredButton(method.id)}
              onMouseLeave={() => setHoveredButton(null)}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible
                  ? "translateY(0) scale(1)"
                  : "translateY(30px) scale(0.9)",
                transitionDelay: `${index * 150}ms`,
              }}
            >
              <GridOverlay opacity={0.05} />

              {/* Hover Background Glow */}
              {hoveredButton === method.id && (
                <div
                  className="absolute inset-0 opacity-20 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at center, ${method.color}40 0%, transparent 70%)`,
                  }}
                />
              )}

              {/* Icon Container */}
              <div className="relative mb-6 flex justify-center">
                <div
                  className={`relative rounded-full p-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 ${
                    hoveredButton === method.id ? "matrix-neon-pulse" : ""
                  }`}
                  style={{
                    backgroundColor: `${method.color}20`,
                    border: `2px solid ${method.color}40`,
                    boxShadow:
                      hoveredButton === method.id
                        ? `0 0 30px ${method.color}60, inset 0 0 20px ${method.color}20`
                        : "none",
                  }}
                >
                  <span className="relative z-10 text-5xl">{method.icon}</span>
                  
                  {/* Orbital Ring on Hover */}
                  {hoveredButton === method.id && (
                    <div
                      className="absolute inset-0 rounded-full border-2 animate-spin-slow"
                      style={{
                        borderColor: method.color,
                        borderTopColor: "transparent",
                        borderRightColor: "transparent",
                      }}
                    />
                  )}
                </div>
              </div>

              {/* Label */}
              <h3
                className="mb-3 text-center font-mono text-xs font-bold uppercase tracking-wider transition-colors duration-300"
                style={{
                  color: hoveredButton === method.id ? method.color : "#00ff95",
                }}
              >
                {method.label}
              </h3>

              {/* Value */}
              <p className="text-center font-mono text-sm leading-relaxed text-[#a7b2c7] transition-colors duration-300 group-hover:text-[#f5f7ff]">
                {method.value}
              </p>

              {/* Bottom Border Animation */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#00ff95] transition-all duration-500 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div
          className={`mt-12 sm:mt-14 md:mt-16 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-xl border-2 border-[#00ff95] bg-transparent px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 font-mono text-sm sm:text-base font-bold uppercase tracking-wider text-[#00ff95] transition-all duration-300 hover:bg-[#00ff95] hover:text-[#040608] hover:scale-105 hover:shadow-[0_0_30px_rgba(0,255,149,0.5)] touch-manipulation min-h-[44px]"
            onMouseEnter={() => setHoveredButton("cta")}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <span className="relative z-10">VISIT CONTACT PAGE</span>
            <svg
              className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>

            {/* Animated Background on Hover */}
            {hoveredButton === "cta" && (
              <div className="absolute inset-0 bg-[#00ff95] animate-pulse-slow" />
            )}
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
