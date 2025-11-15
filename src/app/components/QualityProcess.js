"use client";

import { useState, useEffect, useRef } from "react";
import GridOverlay from "@/components/matrix/GridOverlay";

const PROCESS_STEPS = [
  {
    id: 1,
    title: "SOURCING",
    description: "Premium ingredients sourced from trusted suppliers across India.",
    percentage: 100,
    color: "#00ff95",
  },
  {
    id: 2,
    title: "FORMULATION",
    description: "Science-backed formulas developed by pet nutrition experts.",
    percentage: 95,
    color: "#00e0ff",
  },
  {
    id: 3,
    title: "TESTING",
    description: "Rigorous quality checks and safety testing at every stage.",
    percentage: 98,
    color: "#7c5cff",
  },
  {
    id: 4,
    title: "PACKAGING",
    description: "Eco-friendly packaging that preserves freshness and quality.",
    percentage: 92,
    color: "#ffed4f",
  },
  {
    id: 5,
    title: "DELIVERY",
    description: "Fast, secure delivery to your doorstep across India.",
    percentage: 96,
    color: "#ff3670",
  },
];

function BarChart({ percentage, color, label, delay = 0 }) {
  const [animatedWidth, setAnimatedWidth] = useState(0);
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
        const progress = Math.min(elapsed / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setAnimatedWidth(easeOutQuart * percentage);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      setTimeout(() => requestAnimationFrame(animate), delay);
    }
  }, [isVisible, percentage, delay]);

  return (
    <div ref={barRef} className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-wider text-[#a7b2c7]">
          {label}
        </span>
        <span
          className="font-mono text-sm font-bold"
          style={{ color }}
        >
          {Math.round(animatedWidth)}%
        </span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-[#070f17] border border-[rgba(0,255,149,0.2)]">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${animatedWidth}%`,
            backgroundColor: color,
            boxShadow: `0 0 10px ${color}60`,
          }}
        />
      </div>
    </div>
  );
}

function TimelineMarker({ step, index, isActive, color }) {
  return (
    <div className="relative flex flex-col items-center">
      {/* Timeline Line */}
      {index < PROCESS_STEPS.length - 1 && (
        <div
          className={`absolute top-8 h-24 w-0.5 transition-all duration-500 ${
            isActive ? "bg-[#00ff95]" : "bg-[rgba(0,255,149,0.2)]"
          }`}
        />
      )}

      {/* Marker Circle */}
      <div
        className={`relative z-10 h-16 w-16 rounded-full border-4 transition-all duration-500 ${
          isActive
            ? "border-[#00ff95] bg-[#070f17] shadow-[0_0_20px_rgba(0,255,149,0.5)] scale-110"
            : "border-[rgba(0,255,149,0.3)] bg-[#050b11]"
        }`}
      >
        <div className="flex h-full w-full items-center justify-center">
          <span className="text-2xl">{step.icon || "⚙️"}</span>
        </div>
        {isActive && (
          <div className="absolute inset-0 animate-ping rounded-full border-4 border-[#00ff95] opacity-30" />
        )}
      </div>

      {/* Step Number */}
      <div
        className={`mt-2 font-mono text-xs font-bold transition-colors duration-300 ${
          isActive ? "text-[#00ff95]" : "text-[#6c7383]"
        }`}
      >
        {String(index + 1).padStart(2, "0")}
      </div>
    </div>
  );
}

export default function QualityProcess() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
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
        setActiveStep((prev) => (prev + 1) % PROCESS_STEPS.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

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
            QUALITY PROCESS
          </h2>
          <p className="font-mono text-sm text-[#6c7383]">
            // PRODUCTION PIPELINE v2.0
          </p>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <div className="flex items-start justify-between">
            {PROCESS_STEPS.map((step, index) => (
              <div key={step.id} className="flex-1">
                <TimelineMarker
                  step={step}
                  index={index}
                  isActive={activeStep === index}
                  color={step.color}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left: Active Step Details */}
          <div
            className={`space-y-6 transition-all duration-500 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="relative rounded-xl border-2 border-[rgba(0,255,149,0.3)] bg-[#070f17] p-8">
              <GridOverlay opacity={0.1} />

              <div
                key={activeStep}
                className="space-y-4 animate-fade-in"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="rounded-lg p-4"
                    style={{
                      backgroundColor: `${PROCESS_STEPS[activeStep].color}20`,
                      border: `2px solid ${PROCESS_STEPS[activeStep].color}`,
                    }}
                  >
                    <span className="text-3xl">
                      {PROCESS_STEPS[activeStep].icon || "⚙️"}
                    </span>
                  </div>
                  <div>
                    <h3
                      className="font-mono text-xl font-bold uppercase tracking-wider"
                      style={{ color: PROCESS_STEPS[activeStep].color }}
                    >
                      {PROCESS_STEPS[activeStep].title}
                    </h3>
                    <p className="mt-2 text-sm text-[#6c7383]">
                      STEP {String(activeStep + 1).padStart(2, "0")} /{" "}
                      {String(PROCESS_STEPS.length).padStart(2, "0")}
                    </p>
                  </div>
                </div>

                <p className="text-[#a7b2c7] leading-relaxed">
                  {PROCESS_STEPS[activeStep].description}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Bar Charts */}
          <div
            className={`space-y-6 transition-all duration-500 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="relative rounded-xl border-2 border-[rgba(0,255,149,0.3)] bg-[#070f17] p-8">
              <GridOverlay opacity={0.1} />

              <h3 className="mb-6 font-mono text-sm uppercase tracking-wider text-[#00ff95]">
                QUALITY METRICS
              </h3>

              <div className="space-y-6">
                {PROCESS_STEPS.map((step, index) => (
                  <BarChart
                    key={step.id}
                    percentage={step.percentage}
                    color={step.color}
                    label={step.title}
                    delay={index * 150}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </section>
  );
}

