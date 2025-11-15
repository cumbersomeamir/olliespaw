"use client";

import { useState, useEffect, useRef } from "react";
import GridOverlay from "@/components/matrix/GridOverlay";
import CodeRain from "@/components/matrix/CodeRain";

function SectionDivider({ number, title, isVisible }) {
  return (
    <div
      className={`mb-8 flex items-center gap-4 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-lg border-2 font-mono text-lg font-bold transition-all duration-300"
          style={{
            borderColor: "#00ff95",
            color: "#00ff95",
            boxShadow: "0 0 15px rgba(0,255,149,0.3)",
          }}
        >
          {String(number).padStart(2, "0")}
        </div>
        <div className="h-0.5 flex-1 bg-gradient-to-r from-[#00ff95] to-transparent" />
      </div>
      <h2
        className="font-mono text-xl font-bold uppercase tracking-wider"
        style={{ color: "#00ff95" }}
      >
        {title}
      </h2>
    </div>
  );
}

function AnimatedListItem({ children, index, isVisible }) {
  return (
    <li
      className="mb-4 flex items-start gap-4 font-mono text-sm leading-relaxed text-[#a7b2c7] transition-all duration-500"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateX(0)" : "translateX(-20px)",
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <span className="mt-1 text-[#00ff95]">▶</span>
      <span>{children}</span>
    </li>
  );
}

export default function PrivacyPolicyPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      if (contentRef.current) {
        const scrollTop = window.scrollY;
        const docHeight =
          contentRef.current.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        setScrollProgress(Math.min(progress, 100));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sections = [
    {
      number: 1,
      title: "INFORMATION WE COLLECT",
      content: [
        "Personal information such as name, email address, phone number, and shipping address when you create an account or place an order.",
        "Payment information processed securely through our payment gateway partners.",
        "Usage data including browsing behavior, product preferences, and interaction with our website.",
        "Device information such as IP address, browser type, and operating system.",
      ],
    },
    {
      number: 2,
      title: "HOW WE USE YOUR INFORMATION",
      content: [
        "To process and fulfill your orders and deliver products to you.",
        "To communicate with you about your orders, account, and our services.",
        "To improve our website, products, and customer experience.",
        "To send you marketing communications (with your consent) about new products, offers, and promotions.",
        "To comply with legal obligations and protect our rights.",
      ],
    },
    {
      number: 3,
      title: "DATA SECURITY",
      content: [
        "We implement industry-standard security measures to protect your personal information.",
        "All payment transactions are encrypted using SSL technology.",
        "We regularly review and update our security practices to ensure data protection.",
        "However, no method of transmission over the internet is 100% secure.",
      ],
    },
    {
      number: 4,
      title: "COOKIES & TRACKING",
      content: [
        "We use cookies and similar technologies to enhance your browsing experience.",
        "Cookies help us remember your preferences and improve website functionality.",
        "You can control cookie settings through your browser preferences.",
        "Some features may not function properly if cookies are disabled.",
      ],
    },
    {
      number: 5,
      title: "YOUR RIGHTS",
      content: [
        "You have the right to access, update, or delete your personal information.",
        "You can opt-out of marketing communications at any time.",
        "You can request a copy of your personal data we hold.",
        "You can withdraw consent for data processing where applicable.",
      ],
    },
    {
      number: 6,
      title: "THIRD-PARTY SERVICES",
      content: [
        "We may share information with trusted third-party service providers who assist in operations.",
        "These partners are contractually obligated to protect your information.",
        "We do not sell your personal information to third parties.",
        "Third-party links on our website have their own privacy policies.",
      ],
    },
    {
      number: 7,
      title: "CHANGES TO THIS POLICY",
      content: [
        "We may update this Privacy Policy from time to time.",
        "Significant changes will be notified via email or website notice.",
        "Continued use of our services after changes constitutes acceptance.",
        "Last updated: November 2025.",
      ],
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#040608]">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-[#050b11]">
        <div
          className="h-full transition-all duration-300"
          style={{
            width: `${scrollProgress}%`,
            background: "linear-gradient(90deg, #00ff95, #00e0ff)",
            boxShadow: "0 0 10px rgba(0,255,149,0.5)",
          }}
        />
      </div>

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
            PRIVACY POLICY
          </h1>
          <p className="font-mono text-sm text-[#6c7383]">
            // DATA PROTECTION PROTOCOL v2.0
          </p>
          <div className="mt-6 flex items-center justify-center gap-4 font-mono text-xs text-[#6c7383]">
            <span>Last Updated:</span>
            <span className="text-[#00ff95]">November 14, 2025</span>
          </div>
        </div>

        {/* Introduction */}
        <div
          ref={contentRef}
          className="relative mb-16 rounded-xl border-2 border-[rgba(0,255,149,0.3)] bg-[#070f17] p-8 transition-all duration-1000"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <GridOverlay opacity={0.05} />
          <p className="relative z-10 font-mono text-sm leading-relaxed text-[#a7b2c7]">
            At Ollie's Paw, we are committed to protecting your privacy and ensuring
            the security of your personal information. This Privacy Policy explains how
            we collect, use, disclose, and safeguard your information when you visit our
            website or make a purchase.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-16">
          {sections.map((section, index) => (
            <div
              key={section.number}
              className="relative rounded-xl border-2 border-[rgba(0,255,149,0.2)] bg-[#070f17] p-8 transition-all duration-1000"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(30px)",
                transitionDelay: `${(index + 1) * 100}ms`,
              }}
            >
              <GridOverlay opacity={0.05} />

              <SectionDivider
                number={section.number}
                title={section.title}
                isVisible={isVisible}
              />

              <ul className="relative z-10 list-none space-y-2">
                {section.content.map((item, itemIndex) => (
                  <AnimatedListItem
                    key={itemIndex}
                    index={itemIndex}
                    isVisible={isVisible}
                  >
                    {item}
                  </AnimatedListItem>
                ))}
              </ul>
            </div>
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
              CONTACT US
            </h3>
            <p className="mb-4 font-mono text-sm leading-relaxed text-[#a7b2c7]">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <div className="space-y-2 font-mono text-sm text-[#a7b2c7]">
              <p>
                Email:{" "}
                <a
                  href="mailto:privacy@olliespaw.com"
                  className="text-[#00ff95] hover:underline"
                >
                  privacy@olliespaw.com
                </a>
              </p>
              <p>Phone: +91 8090005050</p>
              <p>
                Address: Khasra No. 513, Bharuwala, Clementtown, Dehradun-248002,
                Uttarakhand, India
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

