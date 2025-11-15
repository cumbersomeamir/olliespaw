"use client";

import { useState, useEffect, useRef } from "react";
import GridOverlay from "@/components/matrix/GridOverlay";

const VALUES = [
  {
    id: 1,
    title: "LOVE & COMPASSION",
    description: "Every product is crafted with genuine care for your pet's wellbeing.",
    percentage: 100,
    color: "#00ff95",
  },
  {
    id: 2,
    title: "WELLNESS & SCIENCE",
    description: "Backed by research and formulated with scientific precision.",
    percentage: 95,
    color: "#00e0ff",
  },
  {
    id: 3,
    title: "QUALITY & TRANSPARENCY",
    description: "No compromises. Full ingredient disclosure and quality assurance.",
    percentage: 98,
    color: "#7c5cff",
  },
  {
    id: 4,
    title: "COMMUNITY & CARE",
    description: "Building a community of informed pet parents across India.",
    percentage: 92,
    color: "#ffed4f",
  },
];

function PieChart({ percentage, color, delay = 0 }) {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById(`pie-${percentage}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [percentage]);

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
    <div id={`pie-${percentage}`} className="relative h-32 w-32">
      <svg className="h-full w-full -rotate-90 transform">
        {/* Background circle */}
        <circle
          cx="50%"
          cy="50%"
          r="45"
          fill="none"
          stroke="rgba(0, 255, 149, 0.1)"
          strokeWidth="8"
        />
        {/* Animated circle */}
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

function NodeConnection({ from, to, delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById(`connection-${from}-${to}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [from, to]);

  const pathLength = 200;
  const [dashOffset, setDashOffset] = useState(pathLength);

  useEffect(() => {
    if (isVisible) {
      setDashOffset(0);
    }
  }, [isVisible]);

  return (
    <svg
      id={`connection-${from}-${to}`}
      className="absolute inset-0 h-full w-full"
      style={{ pointerEvents: "none" }}
    >
      <line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke="#00ff95"
        strokeWidth="2"
        strokeDasharray={pathLength}
        strokeDashoffset={dashOffset}
        opacity="0.4"
        className="transition-all duration-2000"
        style={{ transitionDelay: `${delay}ms` }}
      />
    </svg>
  );
}

export default function OurValues() {
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
            OUR VALUES
          </h2>
          <p className="font-mono text-sm text-[#6c7383]">
            // CORE PRINCIPLES MATRIX
          </p>
        </div>

        {/* Values Grid with Node Connections */}
        <div className="relative">
          {/* Node Connections Background */}
          <div className="absolute inset-0 h-full min-h-[600px]">
            <NodeConnection
              from={{ x: "25%", y: "30%" }}
              to={{ x: "50%", y: "50%" }}
              delay={200}
            />
            <NodeConnection
              from={{ x: "75%", y: "30%" }}
              to={{ x: "50%", y: "50%" }}
              delay={400}
            />
            <NodeConnection
              from={{ x: "25%", y: "70%" }}
              to={{ x: "50%", y: "50%" }}
              delay={600}
            />
            <NodeConnection
              from={{ x: "75%", y: "70%" }}
              to={{ x: "50%", y: "50%" }}
              delay={800}
            />
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value, index) => (
              <div
                key={value.id}
                className="group relative rounded-xl border-2 border-[rgba(0,255,149,0.2)] bg-[#070f17] p-8 transition-all duration-500 hover:border-[#00ff95] hover:shadow-[0_0_30px_rgba(0,255,149,0.3)]"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible
                    ? "translateY(0) scale(1)"
                    : "translateY(30px) scale(0.9)",
                  transitionDelay: `${index * 150}ms`,
                }}
              >
                <GridOverlay opacity={0.05} />

                {/* Pie Chart */}
                <div className="mb-6 flex justify-center">
                  <PieChart
                    percentage={value.percentage}
                    color={value.color}
                    delay={index * 200}
                  />
                </div>

                {/* Value Title */}
                <h3
                  className="mb-4 text-center font-mono text-sm font-bold uppercase tracking-wider transition-colors duration-300"
                  style={{ color: value.color }}
                >
                  {value.title}
                </h3>

                {/* Description */}
                <p className="text-center text-sm leading-relaxed text-[#a7b2c7]">
                  {value.description}
                </p>

                {/* Hover Glow Effect */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at center, ${value.color}10 0%, transparent 70%)`,
                    mixBlendMode: "screen",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Center Node */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible
                ? "translate(-50%, -50%) scale(1)"
                : "translate(-50%, -50%) scale(0)",
              transition: "all 1s ease-out",
              transitionDelay: "1000ms",
            }}
          >
            <div className="relative h-24 w-24 rounded-full border-4 border-[#00ff95] bg-[#070f17]">
              <div className="absolute inset-0 animate-ping rounded-full border-4 border-[#00ff95] opacity-20" />
              <div className="flex h-full w-full items-center justify-center">
                <span className="text-3xl">🐾</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

