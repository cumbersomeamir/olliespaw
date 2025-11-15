"use client";

import { useState, useEffect, useRef } from "react";
import GridOverlay from "@/components/matrix/GridOverlay";
import CodeRain from "@/components/matrix/CodeRain";

function AccordionSection({ title, content, isOpen, onToggle, index, isVisible }) {
  return (
    <div
      className="mb-4 overflow-hidden rounded-xl border-2 border-[rgba(0,255,149,0.2)] bg-[#070f17] transition-all duration-500"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <GridOverlay opacity={0.05} />
      <button
        onClick={onToggle}
        className="relative z-10 flex w-full items-center justify-between p-6 text-left transition-all duration-300 hover:bg-[#050b11]"
      >
        <div className="flex items-center gap-4">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-lg border-2 font-mono text-sm font-bold transition-all duration-300"
            style={{
              borderColor: isOpen ? "#00ff95" : "rgba(0,255,149,0.3)",
              color: isOpen ? "#00ff95" : "#6c7383",
              boxShadow: isOpen ? "0 0 15px rgba(0,255,149,0.3)" : "none",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </div>
          <h3
            className="font-mono text-base font-bold uppercase tracking-wider transition-colors duration-300"
            style={{ color: isOpen ? "#00ff95" : "#a7b2c7" }}
          >
            {title}
          </h3>
        </div>
        <svg
          className={`h-6 w-6 text-[#00ff95] transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ${
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-[rgba(0,255,149,0.2)] p-6">
          <div className="space-y-4 font-mono text-sm leading-relaxed text-[#a7b2c7]">
            {content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TermsOfUsePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [openSection, setOpenSection] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const sections = [
    {
      title: "ACCEPTANCE OF TERMS",
      content: [
        "By accessing and using the Ollie's Paw website, you accept and agree to be bound by these Terms of Use. If you do not agree with any part of these terms, you must not use our website.",
        "We reserve the right to modify these terms at any time. Your continued use of the website after changes constitutes acceptance of the modified terms.",
      ],
    },
    {
      title: "USE OF WEBSITE",
      content: [
        "You may use our website for lawful purposes only. You agree not to use the website in any way that violates applicable laws or regulations.",
        "You are prohibited from attempting to gain unauthorized access to any part of the website, other accounts, computer systems, or networks connected to the website.",
        "You must not use the website to transmit any viruses, malware, or other harmful code.",
      ],
    },
    {
      title: "PRODUCT INFORMATION",
      content: [
        "We strive to provide accurate product descriptions, images, and pricing. However, we do not warrant that product descriptions or other content on the website is accurate, complete, or error-free.",
        "Product colors may vary slightly from what is displayed on your screen due to monitor settings.",
        "We reserve the right to correct any errors, inaccuracies, or omissions and to change or update information at any time without prior notice.",
      ],
    },
    {
      title: "PRICING & PAYMENT",
      content: [
        "All prices are listed in Indian Rupees (₹) and are subject to change without notice.",
        "We reserve the right to refuse or cancel any order at our discretion, including orders that appear to be placed by dealers or resellers.",
        "Payment must be made through our secure payment gateway. We accept major credit cards, debit cards, UPI, and other payment methods as displayed at checkout.",
      ],
    },
    {
      title: "INTELLECTUAL PROPERTY",
      content: [
        "All content on this website, including text, graphics, logos, images, and software, is the property of Ollie's Paw or its content suppliers and is protected by copyright and trademark laws.",
        "You may not reproduce, distribute, modify, or create derivative works from any content on this website without our express written permission.",
        "The Ollie's Paw name and logo are trademarks of Ollie's Paw and may not be used without permission.",
      ],
    },
    {
      title: "LIMITATION OF LIABILITY",
      content: [
        "To the fullest extent permitted by law, Ollie's Paw shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the website.",
        "Our total liability for any claims arising from your use of the website shall not exceed the amount you paid for the products in question.",
        "We do not guarantee that the website will be available at all times or that it will be free from errors or interruptions.",
      ],
    },
    {
      title: "GOVERNING LAW",
      content: [
        "These Terms of Use are governed by and construed in accordance with the laws of India.",
        "Any disputes arising from these terms or your use of the website shall be subject to the exclusive jurisdiction of the courts in Dehradun, Uttarakhand, India.",
      ],
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
            TERMS OF USE
          </h1>
          <p className="font-mono text-sm text-[#6c7383]">
            // USER AGREEMENT PROTOCOL v2.0
          </p>
          <div className="mt-6 flex items-center justify-center gap-4 font-mono text-xs text-[#6c7383]">
            <span>Last Updated:</span>
            <span className="text-[#00ff95]">November 14, 2025</span>
          </div>
        </div>

        {/* Introduction */}
        <div
          className="relative mb-8 sm:mb-10 md:mb-12 rounded-xl border-2 border-[rgba(0,255,149,0.3)] bg-[#070f17] p-6 sm:p-7 md:p-8 transition-all duration-1000"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <GridOverlay opacity={0.05} />
          <p className="relative z-10 font-mono text-sm leading-relaxed text-[#a7b2c7]">
            Please read these Terms of Use carefully before using the Ollie's Paw
            website. These terms govern your access to and use of our website and
            services. By using our website, you agree to comply with and be bound by
            these terms.
          </p>
        </div>

        {/* Accordion Sections */}
        <div className="space-y-4">
          {sections.map((section, index) => (
            <AccordionSection
              key={index}
              title={section.title}
              content={section.content}
              isOpen={openSection === index}
              onToggle={() => setOpenSection(openSection === index ? null : index)}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Contact Section */}
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
              QUESTIONS?
            </h3>
            <p className="font-mono text-sm leading-relaxed text-[#a7b2c7]">
              If you have any questions about these Terms of Use, please contact us at{" "}
              <a
                href="mailto:legal@olliespaw.com"
                className="text-[#00ff95] hover:underline"
              >
                legal@olliespaw.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

