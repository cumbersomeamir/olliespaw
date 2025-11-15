"use client";

import { useState, useEffect, useRef } from "react";
import GridOverlay from "@/components/matrix/GridOverlay";
import CodeRain from "@/components/matrix/CodeRain";

function TimelineItem({ number, title, content, isVisible, delay }) {
  return (
    <div
      className="relative mb-12 transition-all duration-1000"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateX(0)" : "translateX(-30px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className="flex gap-6">
        {/* Timeline Line */}
        <div className="relative flex flex-col items-center">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-full border-2 font-mono text-lg font-bold transition-all duration-500"
            style={{
              borderColor: "#00ff95",
              backgroundColor: "#070f17",
              color: "#00ff95",
              boxShadow: "0 0 20px rgba(0,255,149,0.3)",
            }}
          >
            {String(number).padStart(2, "0")}
          </div>
          {number < 5 && (
            <div
              className="mt-2 h-24 w-0.5 transition-all duration-1000"
              style={{
                backgroundColor: "rgba(0,255,149,0.2)",
                opacity: isVisible ? 1 : 0,
              }}
            />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 rounded-xl border-2 border-[rgba(0,255,149,0.2)] bg-[#070f17] p-6">
          <GridOverlay opacity={0.05} />
          <h3
            className="mb-3 font-mono text-base font-bold uppercase tracking-wider"
            style={{ color: "#00ff95" }}
          >
            {title}
          </h3>
          <p className="font-mono text-sm leading-relaxed text-[#a7b2c7]">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, title, value, color, isVisible, delay }) {
  return (
    <div
      className="rounded-xl border-2 border-[rgba(0,255,149,0.2)] bg-[#070f17] p-6 transition-all duration-1000"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.9)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <GridOverlay opacity={0.05} />
      <div className="relative z-10 text-center">
        <div className="mb-4 flex justify-center text-4xl">{icon}</div>
        <h4 className="mb-2 font-mono text-xs font-bold uppercase tracking-wider text-[#6c7383]">
          {title}
        </h4>
        <p
          className="font-mono text-2xl font-bold"
          style={{ color }}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

export default function ShippingPolicyPage() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const timelineItems = [
    {
      number: 1,
      title: "ORDER PROCESSING",
      content:
        "Orders are processed within 1-2 business days. You will receive an order confirmation email with tracking details once your order is shipped.",
    },
    {
      number: 2,
      title: "SHIPPING METHODS",
      content:
        "We offer standard shipping (5-7 business days) and express shipping (2-3 business days) across India. Shipping costs are calculated at checkout based on weight and destination.",
    },
    {
      number: 3,
      title: "FREE SHIPPING",
      content:
        "Free shipping is available on orders over ₹1,500. This applies to standard shipping only. Express shipping charges may still apply.",
    },
    {
      number: 4,
      title: "TRACKING YOUR ORDER",
      content:
        "Once your order ships, you'll receive a tracking number via email. You can track your package in real-time through our website or the courier's tracking portal.",
    },
    {
      number: 5,
      title: "DELIVERY ADDRESS",
      content:
        "Please ensure your delivery address is correct at checkout. We are not responsible for orders delivered to incorrect addresses provided by customers.",
    },
  ];

  const infoCards = [
    { icon: "📦", title: "Processing Time", value: "1-2 Days", color: "#00ff95" },
    { icon: "🚚", title: "Standard Delivery", value: "5-7 Days", color: "#00e0ff" },
    { icon: "⚡", title: "Express Delivery", value: "2-3 Days", color: "#7c5cff" },
    { icon: "💰", title: "Free Shipping", value: "₹1,500+", color: "#ffed4f" },
  ];

  return (
    <div className="relative min-h-screen bg-[#040608]">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <CodeRain intensity={5} speed={100} />
      </div>
      <GridOverlay opacity={0.1} pulse={true} />

      <div ref={sectionRef} className="relative mx-auto max-w-4xl px-6 py-24">
        {/* Header */}
        <div
          className={`mb-16 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          <h1 className="mb-4 text-5xl font-bold uppercase tracking-tight text-[#f5f7ff] md:text-6xl">
            SHIPPING POLICY
          </h1>
          <p className="font-mono text-sm text-[#6c7383]">
            // DELIVERY PROTOCOL v2.0
          </p>
        </div>

        {/* Info Cards */}
        <div className="mb-16 grid grid-cols-2 gap-4 md:grid-cols-4">
          {infoCards.map((card, index) => (
            <InfoCard
              key={index}
              icon={card.icon}
              title={card.title}
              value={card.value}
              color={card.color}
              isVisible={isVisible}
              delay={index * 100}
            />
          ))}
        </div>

        {/* Timeline */}
        <div className="space-y-0">
          {timelineItems.map((item, index) => (
            <TimelineItem
              key={item.number}
              number={item.number}
              title={item.title}
              content={item.content}
              isVisible={isVisible}
              delay={index * 150}
            />
          ))}
        </div>

        {/* Additional Info */}
        <div
          className="relative mt-16 rounded-xl border-2 border-[rgba(0,255,149,0.3)] bg-[#070f17] p-8 transition-all duration-1000"
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
              IMPORTANT NOTES
            </h3>
            <ul className="space-y-3 font-mono text-sm leading-relaxed text-[#a7b2c7]">
              <li className="flex items-start gap-3">
                <span className="text-[#00ff95]">▶</span>
                <span>
                  Delivery times are estimates and may vary due to weather conditions,
                  holidays, or unforeseen circumstances.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#00ff95]">▶</span>
                <span>
                  For remote locations, delivery may take additional 2-3 business days.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#00ff95]">▶</span>
                <span>
                  If you have not received your order within the estimated delivery
                  time, please contact our customer service team.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

