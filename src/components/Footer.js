"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import GridOverlay from "@/components/matrix/GridOverlay";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Shipping Policy", href: "/shipping-policy" },
    { label: "Terms of Use", href: "/terms-of-use" },
    { label: "Return Policy", href: "/return-policy" },
  ];

  return (
    <footer className="relative mt-16 border-t border-[rgba(0,255,149,0.2)] bg-[#040608]">
      <GridOverlay opacity={0.1} pulse={true} />

      <div className="relative mx-auto max-w-7xl px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Column 1: Brand */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h3 className="mb-4 font-serif text-2xl font-semibold text-[#f5f7ff]">
              OLLIE'S PAW
            </h3>
            <p className="mb-4 font-mono text-sm leading-relaxed text-[#a7b2c7]">
              Every Paw Matters — Health, Nutrition & Care. Premium, made-in-India pet
              wellness products.
            </p>
            <div className="flex gap-4">
              {["🐾", "❤️", "🔬"].map((icon, index) => (
                <div
                  key={index}
                  className="rounded-full border-2 border-[rgba(0,255,149,0.2)] bg-[#070f17] p-2 transition-all duration-300 hover:border-[#00ff95] hover:shadow-[0_0_15px_rgba(0,255,149,0.3)]"
                >
                  <span className="text-xl">{icon}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Contact */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <h4 className="mb-4 font-mono text-sm font-bold uppercase tracking-wider text-[#00ff95]">
              CONTACT
            </h4>
            <ul className="space-y-3 font-mono text-sm text-[#a7b2c7]">
              <li>
                <span className="text-[#6c7383]">Email: </span>
                <a
                  href="mailto:info@olliespaw.com"
                  className="text-[#00ff95] transition-colors duration-300 hover:text-[#00e0ff] hover:underline"
                >
                  info@olliespaw.com
                </a>
              </li>
              <li>
                <span className="text-[#6c7383]">Phone: </span>
                <a
                  href="tel:+918090005050"
                  className="text-[#00ff95] transition-colors duration-300 hover:text-[#00e0ff] hover:underline"
                >
                  +91 8090005050
                </a>
              </li>
              <li>
                <span className="text-[#6c7383]">License No: </span>
                <span className="font-mono text-xs text-[#6c7383]">
                  U10809UT2025PTC019729
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: Address */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <h4 className="mb-4 font-mono text-sm font-bold uppercase tracking-wider text-[#00ff95]">
              ADDRESS
            </h4>
            <p className="font-mono text-sm leading-relaxed text-[#a7b2c7]">
              Khasra No. 513, Bharuwala, Clementtown,
              <br />
              Dehradun-248002, Uttarakhand, India
            </p>
          </div>
        </div>

        {/* Policy Links */}
        <div
          className={`mt-12 flex flex-wrap justify-center gap-6 border-t border-[rgba(0,255,149,0.2)] pt-8 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          {footerLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative font-mono text-xs font-medium uppercase tracking-wider text-[#6c7383] transition-all duration-300 hover:text-[#00ff95]"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(10px)",
                transitionDelay: `${700 + index * 100}ms`,
              }}
            >
              {link.label}
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#00ff95] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Copyright */}
        <div
          className={`mt-8 border-t border-[rgba(0,255,149,0.2)] pt-6 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "1000ms" }}
        >
          <p className="font-mono text-xs text-[#6c7383]">
            © {currentYear} OLLIE'S PAW. ALL RIGHTS RESERVED.
          </p>
          <p className="mt-2 font-mono text-[10px] text-[#6c7383]">
            // SYSTEM STATUS: OPERATIONAL
          </p>
        </div>
      </div>
    </footer>
  );
}
