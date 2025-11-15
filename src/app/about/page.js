"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import GridOverlay from "@/components/matrix/GridOverlay";
import CodeRain from "@/components/matrix/CodeRain";

function TextReveal({ children, delay = 0, isVisible }) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setRevealed(true), delay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, delay]);

  return (
    <span
      className={`inline-block transition-all duration-700 ${
        revealed
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4"
      }`}
    >
      {children}
    </span>
  );
}

function ValueCard({ value, description, icon, color, index, isVisible }) {
  return (
    <div
      className="group relative overflow-hidden rounded-xl border-2 border-[rgba(0,255,149,0.2)] bg-[#070f17] p-8 transition-all duration-500 hover:border-[#00ff95] hover:shadow-[0_0_30px_rgba(0,255,149,0.3)]"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "translateY(0) scale(1)"
          : "translateY(30px) scale(0.9)",
        transitionDelay: `${index * 150}ms`,
      }}
    >
      <GridOverlay opacity={0.05} />

      {/* Icon */}
      <div className="mb-6 flex justify-center">
        <div
          className="rounded-full p-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
          style={{
            backgroundColor: `${color}20`,
            border: `2px solid ${color}40`,
            boxShadow: `0 0 20px ${color}40`,
          }}
        >
          <span className="text-4xl">{icon}</span>
        </div>
      </div>

      {/* Title */}
      <h3
        className="mb-4 text-center font-mono text-base font-bold uppercase tracking-wider transition-colors duration-300"
        style={{ color }}
      >
        {value}
      </h3>

      {/* Description */}
      <p className="text-center text-sm leading-relaxed text-[#a7b2c7]">
        {description}
      </p>
    </div>
  );
}

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const values = [
    {
      value: "LOVE & COMPASSION",
      description: "Every product is crafted with genuine care for your pet's wellbeing.",
      icon: "❤️",
      color: "#00ff95",
    },
    {
      value: "WELLNESS & SCIENCE",
      description: "Backed by research and formulated with scientific precision.",
      icon: "🔬",
      color: "#00e0ff",
    },
    {
      value: "QUALITY & TRANSPARENCY",
      description: "No compromises. Full ingredient disclosure and quality assurance.",
      icon: "✓",
      color: "#7c5cff",
    },
    {
      value: "COMMUNITY & CARE",
      description: "Building a community of informed pet parents across India.",
      icon: "🤝",
      color: "#ffed4f",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#040608]">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <CodeRain intensity={5} speed={100} />
      </div>
      <GridOverlay opacity={0.1} pulse={true} />

      <div ref={sectionRef} className="relative mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-16 md:py-20 lg:py-24">
        {/* Header */}
        <div
          className={`mb-12 sm:mb-14 md:mb-16 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          <h1 className="mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-[#f5f7ff]">
            ABOUT OLLIE'S PAW
          </h1>
          <p className="font-mono text-sm text-[#6c7383]">
            // COMPANY PROFILE DATABASE
          </p>
        </div>

        {/* Tagline */}
        <div
          className="relative mb-12 sm:mb-14 md:mb-16 rounded-xl border-2 border-[rgba(0,255,149,0.3)] bg-[#070f17] p-6 sm:p-7 md:p-8 text-center transition-all duration-1000"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <GridOverlay opacity={0.05} />
          <p className="relative z-10 font-mono text-2xl font-bold uppercase tracking-wider text-[#00ff95]">
            EVERY PAW MATTERS — HEALTH, NUTRITION & CARE
          </p>
        </div>

        {/* Main Story Section */}
        <div className="mb-12 sm:mb-14 md:mb-16 space-y-6 sm:space-y-8">
          {/* Story Part 1 */}
          <div
            className="relative rounded-xl border-2 border-[rgba(0,255,149,0.2)] bg-[#070f17] p-6 sm:p-7 md:p-8 transition-all duration-1000"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transitionDelay: "200ms",
            }}
          >
            <GridOverlay opacity={0.05} />
            <div className="relative z-10">
              <h2
                className="mb-6 font-mono text-xl font-bold uppercase tracking-wider"
                style={{ color: "#00ff95" }}
              >
                OUR MISSION
              </h2>
              <div className="space-y-4 font-mono text-sm leading-relaxed text-[#a7b2c7]">
                <p>
                  <TextReveal isVisible={isVisible} delay={400}>
                    At Ollie's Paw, we believe that pets aren't just animals — they're
                    family. Born out of pure love for our furry companions, Ollie's Paw
                    was created with one mission: to provide trusted, premium, and
                    wholesome care for pets that deserve nothing but the best.
                  </TextReveal>
                </p>
                <p>
                  <TextReveal isVisible={isVisible} delay={800}>
                    Our brand focuses exclusively on pet health, nutrition, and care,
                    offering a carefully developed range of products that support a pet's
                    overall wellbeing — from the inside out.
                  </TextReveal>
                </p>
                <p>
                  <TextReveal isVisible={isVisible} delay={1200}>
                    Every product we create carries the Ollie's Paw promise: made with
                    love, guided by science, and dedicated to wellness. We don't sell or
                    distribute products from any other brand — only our own creations that
                    meet the highest standards of quality, safety, and care.
                  </TextReveal>
                </p>
              </div>
            </div>
          </div>

          {/* Story Part 2 */}
          <div
            className="relative rounded-xl border-2 border-[rgba(0,255,149,0.2)] bg-[#070f17] p-6 sm:p-7 md:p-8 transition-all duration-1000"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transitionDelay: "400ms",
            }}
          >
            <GridOverlay opacity={0.05} />
            <div className="relative z-10">
              <h2
                className="mb-6 font-mono text-xl font-bold uppercase tracking-wider"
                style={{ color: "#00ff95" }}
              >
                OUR STORY
              </h2>
              <div className="space-y-4 font-mono text-sm leading-relaxed text-[#a7b2c7]">
                <p>
                  <TextReveal isVisible={isVisible} delay={600}>
                    Ollie's Paw began with a simple belief that our pets deserve the same
                    love, care, and attention we give to any member of our family.
                  </TextReveal>
                </p>
                <p>
                  <TextReveal isVisible={isVisible} delay={1000}>
                    It all started with Ollie, a happy, playful dog whose health journey
                    changed the way we looked at pet care. When we couldn't find products
                    that truly met our expectations — free from harmful fillers, rich in
                    nutrition, and backed by real research — we decided to create our own.
                  </TextReveal>
                </p>
                <p>
                  <TextReveal isVisible={isVisible} delay={1400}>
                    That's how Ollie's Paw was born, a heartfelt initiative built by pet
                    lovers, for pet lovers.
                  </TextReveal>
                </p>
                <p>
                  <TextReveal isVisible={isVisible} delay={1800}>
                    Every product we make carries a promise of compassion, honesty, and
                    care. Whether it's food that fuels energy, grooming care that feels
                    gentle, or supplements that nurture from within, everything we do
                    comes from a place of love and understanding.
                  </TextReveal>
                </p>
              </div>
            </div>
          </div>

          {/* Vision */}
          <div
            className="relative rounded-xl border-2 border-[rgba(0,255,149,0.2)] bg-[#070f17] p-6 sm:p-7 md:p-8 transition-all duration-1000"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transitionDelay: "600ms",
            }}
          >
            <GridOverlay opacity={0.05} />
            <div className="relative z-10">
              <h2
                className="mb-6 font-mono text-xl font-bold uppercase tracking-wider"
                style={{ color: "#00ff95" }}
              >
                OUR VISION
              </h2>
              <div className="space-y-4 font-mono text-sm leading-relaxed text-[#a7b2c7]">
                <p>
                  <TextReveal isVisible={isVisible} delay={800}>
                    Our dream is simple: to build a community of pet parents across India
                    who believe in better, healthier, and more mindful pet care. Because
                    at Ollie's Paw, we care for every paw.
                  </TextReveal>
                </p>
                <p>
                  <TextReveal isVisible={isVisible} delay={1200}>
                    What started with one dog has grown into a mission to redefine pet
                    wellness in India. We don't believe in shortcuts or compromises.
                    Every ingredient, every formula, and every product is tested, trusted,
                    and made with love.
                  </TextReveal>
                </p>
                <p>
                  <TextReveal isVisible={isVisible} delay={1600}>
                    Our goal is to empower every pet parent to make healthier choices and
                    to create a world where every pet lives longer, stronger, and happier.
                  </TextReveal>
                </p>
                <p className="mt-6 text-center">
                  <TextReveal isVisible={isVisible} delay={2000}>
                    <span className="font-mono text-lg font-bold text-[#00ff95]">
                      Ollie's Paw, born from love, built for care, made for every paw. 🐾
                    </span>
                  </TextReveal>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-12 sm:mb-14 md:mb-16">
          <div
            className={`mb-6 sm:mb-8 text-center transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
            }`}
            style={{ transitionDelay: "800ms" }}
          >
            <h2 className="mb-2 text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#f5f7ff]">
              OUR VALUES
            </h2>
            <p className="font-mono text-sm text-[#6c7383]">
              // CORE PRINCIPLES MATRIX
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <ValueCard
                key={index}
                value={value.value}
                description={value.description}
                icon={value.icon}
                color={value.color}
                index={index}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>

        {/* Target Audience */}
        <div
          className="relative rounded-xl border-2 border-[rgba(0,255,149,0.2)] bg-[#070f17] p-6 sm:p-7 md:p-8 transition-all duration-1000"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "1000ms",
          }}
        >
          <GridOverlay opacity={0.05} />
          <div className="relative z-10">
            <h2
              className="mb-6 font-mono text-xl font-bold uppercase tracking-wider"
              style={{ color: "#00ff95" }}
            >
              WHO WE SERVE
            </h2>
            <p className="mb-4 font-mono text-sm leading-relaxed text-[#a7b2c7]">
              We aim to connect deeply with pet parents across India who prioritize their
              pets' health, nutrition, and happiness. Our community consists of pet lovers
              who view their pets as part of their heart and home. Ollie's Paw is here to
              make that bond even stronger — by helping every tail wag longer, healthier,
              and happier.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div
          className="mt-16 text-center transition-all duration-1000"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "1200ms",
          }}
        >
          <Link
            href="/products"
            className="group inline-flex items-center gap-3 rounded-xl border-2 border-[#00ff95] bg-transparent px-10 py-5 font-mono text-base font-bold uppercase tracking-wider text-[#00ff95] transition-all duration-300 hover:bg-[#00ff95] hover:text-[#040608] hover:scale-105 hover:shadow-[0_0_30px_rgba(0,255,149,0.5)]"
          >
            EXPLORE OUR PRODUCTS
            <svg
              className="h-5 w-5 transition-transform group-hover:translate-x-2"
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
          </Link>
        </div>
      </div>
    </div>
  );
}
