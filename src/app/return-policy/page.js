"use client";

import { useState, useEffect, useRef } from "react";
import GridOverlay from "@/components/matrix/GridOverlay";
import CodeRain from "@/components/matrix/CodeRain";

function StepCard({ step, number, isVisible, delay, isActive }) {
  return (
    <div
      className="relative rounded-xl border-2 bg-[#070f17] p-6 transition-all duration-1000"
      style={{
        borderColor: isActive ? "#00ff95" : "rgba(0,255,149,0.2)",
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "translateY(0) scale(1)"
          : "translateY(30px) scale(0.9)",
        transitionDelay: `${delay}ms`,
        boxShadow: isActive
          ? "0 0 30px rgba(0,255,149,0.3)"
          : "none",
      }}
    >
      <GridOverlay opacity={0.05} />

      {/* Step Number */}
      <div className="mb-4 flex items-center gap-4">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-lg border-2 font-mono text-lg font-bold transition-all duration-300"
          style={{
            borderColor: isActive ? "#00ff95" : "rgba(0,255,149,0.3)",
            color: isActive ? "#00ff95" : "#6c7383",
            boxShadow: isActive
              ? "0 0 20px rgba(0,255,149,0.4)"
              : "none",
          }}
        >
          {String(number).padStart(2, "0")}
        </div>
        <h3
          className="font-mono text-base font-bold uppercase tracking-wider transition-colors duration-300"
          style={{ color: isActive ? "#00ff95" : "#a7b2c7" }}
        >
          {step.title}
        </h3>
      </div>

      {/* Content */}
      <p className="font-mono text-sm leading-relaxed text-[#a7b2c7]">
        {step.content}
      </p>

      {/* Active Indicator */}
      {isActive && (
        <div className="absolute right-4 top-4">
          <div className="h-3 w-3 animate-pulse rounded-full bg-[#00ff95]" />
        </div>
      )}
    </div>
  );
}

function ConditionCard({ condition, isVisible, delay }) {
  return (
    <div
      className="flex items-start gap-4 rounded-xl border-2 border-[rgba(0,255,149,0.2)] bg-[#070f17] p-6 transition-all duration-1000"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateX(0)" : "translateX(-20px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <GridOverlay opacity={0.05} />
      <div className="relative z-10 flex items-start gap-4">
        <div
          className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2"
          style={{
            borderColor: condition.met ? "#00ff95" : "#ff3670",
            backgroundColor: condition.met
              ? "rgba(0,255,149,0.1)"
              : "rgba(255,54,112,0.1)",
          }}
        >
          <span
            className="text-xs font-bold"
            style={{ color: condition.met ? "#00ff95" : "#ff3670" }}
          >
            {condition.met ? "✓" : "✕"}
          </span>
        </div>
        <div>
          <h4
            className="mb-2 font-mono text-sm font-bold uppercase tracking-wider"
            style={{ color: condition.met ? "#00ff95" : "#ff3670" }}
          >
            {condition.title}
          </h4>
          <p className="font-mono text-xs leading-relaxed text-[#a7b2c7]">
            {condition.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ReturnPolicyPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % returnSteps.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const returnSteps = [
    {
      title: "INITIATE RETURN",
      content:
        "Contact our customer service team within 7 days of delivery to initiate a return. You can reach us via email, phone, or through your account dashboard.",
    },
    {
      title: "RETURN AUTHORIZATION",
      content:
        "We will provide you with a Return Authorization (RA) number and return instructions. Please include the RA number with your return package.",
    },
    {
      title: "PACKAGE ITEM",
      content:
        "Pack the item in its original packaging with all tags and accessories. Include the original invoice and RA number. Ensure the item is in unused, resalable condition.",
    },
    {
      title: "SHIP BACK",
      content:
        "Ship the package to our return address using a trackable shipping method. We recommend using the same courier service for faster processing.",
    },
    {
      title: "REFUND PROCESSING",
      content:
        "Once we receive and inspect your return (within 5-7 business days), we will process your refund to the original payment method within 10-14 business days.",
    },
  ];

  const conditions = [
    {
      met: true,
      title: "RETURNABLE",
      description:
        "Items must be unused, unwashed, and in original packaging with all tags attached.",
    },
    {
      met: true,
      title: "TIME LIMIT",
      description: "Returns must be initiated within 7 days of delivery date.",
    },
    {
      met: false,
      title: "NON-RETURNABLE",
      description:
        "Personalized items, perishable goods, and items damaged by customer misuse cannot be returned.",
    },
    {
      met: true,
      title: "FREE RETURNS",
      description:
        "Free return shipping is available for orders over ₹1,500. Otherwise, return shipping is at customer's expense.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#040608]">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <CodeRain intensity={5} speed={100} />
      </div>
      <GridOverlay opacity={0.1} pulse={true} />

      <div ref={sectionRef} className="relative mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-16 md:py-20 lg:py-24">
        {/* Header */}
        <div
          className={`mb-12 sm:mb-14 md:mb-16 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          <h1 className="mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-[#f5f7ff]">
            RETURN POLICY
          </h1>
          <p className="font-mono text-sm text-[#6c7383]">
            // RETURN PROTOCOL v2.0
          </p>
        </div>

        {/* Policy Summary */}
        <div
          className="relative mb-12 sm:mb-14 md:mb-16 rounded-xl border-2 border-[rgba(0,255,149,0.3)] bg-[#070f17] p-6 sm:p-7 md:p-8 transition-all duration-1000"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <GridOverlay opacity={0.05} />
          <div className="relative z-10">
            <h2
              className="mb-4 font-mono text-lg font-bold uppercase tracking-wider"
              style={{ color: "#00ff95" }}
            >
              OUR COMMITMENT
            </h2>
            <p className="font-mono text-sm leading-relaxed text-[#a7b2c7]">
              We want you to be completely satisfied with your purchase. If you're not
              happy with your order, we offer a hassle-free 7-day return policy. Items
              must be unused, in original packaging, and with all tags attached.
            </p>
          </div>
        </div>

        {/* Return Steps */}
        <div className="mb-16">
          <h2
            className="mb-8 font-mono text-xl font-bold uppercase tracking-wider"
            style={{ color: "#00ff95" }}
          >
            RETURN PROCESS
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {returnSteps.map((step, index) => (
              <StepCard
                key={index}
                step={step}
                number={index + 1}
                isVisible={isVisible}
                delay={index * 150}
                isActive={activeStep === index}
              />
            ))}
          </div>
        </div>

        {/* Conditions */}
        <div className="mb-16">
          <h2
            className="mb-8 font-mono text-xl font-bold uppercase tracking-wider"
            style={{ color: "#00ff95" }}
          >
            RETURN CONDITIONS
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {conditions.map((condition, index) => (
              <ConditionCard
                key={index}
                condition={condition}
                isVisible={isVisible}
                delay={index * 100}
              />
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div
          className="relative rounded-xl border-2 border-[rgba(0,255,149,0.3)] bg-[#070f17] p-8 transition-all duration-1000"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "800ms",
          }}
        >
          <GridOverlay opacity={0.05} />
          <div className="relative z-10">
            <h3
              className="mb-4 font-mono text-lg font-bold uppercase tracking-wider"
              style={{ color: "#00ff95" }}
            >
              NEED HELP?
            </h3>
            <p className="mb-4 font-mono text-sm leading-relaxed text-[#a7b2c7]">
              For return requests or questions about our return policy, please contact:
            </p>
            <div className="space-y-2 font-mono text-sm text-[#a7b2c7]">
              <p>
                Email:{" "}
                <a
                  href="mailto:returns@olliespaw.com"
                  className="text-[#00ff95] hover:underline"
                >
                  returns@olliespaw.com
                </a>
              </p>
              <p>Phone: +91 8090005050</p>
              <p>Hours: Monday - Saturday, 10:00 AM - 7:00 PM IST</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

