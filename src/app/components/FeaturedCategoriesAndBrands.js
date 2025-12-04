"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import GridOverlay from "@/components/matrix/GridOverlay";

const FEATURED_CATEGORIES = [
  {
    id: "travel-safety",
    name: "Travel & Safety",
    discount: "up to 50% off",
    href: "/products?category=travel-safety",
    color: "#00ff95",
    image: "https://whitehavenvet.com/wp-content/uploads/2023/01/how-to-travel-safely-with-your-pets-national-pet-travel-safety-day-strip1.jpg",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    discount: "up to 50% off",
    href: "/products?category=healthcare",
    color: "#00e0ff",
    image: "https://d2zp5xs5cp8zlg.cloudfront.net/image-41937-800.jpg",
  },
  {
    id: "gifting",
    name: "Gifting",
    discount: "up to 60% off",
    href: "/products?category=gifting",
    color: "#7c5cff",
    image: "https://people.com/thmb/c5QoDPX3JD4B489mMkhyKlikA2s=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(794x529:796x531)/dog-in-gift-box-121622-72649698406d4b3fb7b6792dc6fb25a3.jpg",
  },
  {
    id: "cleaning-essentials",
    name: "Cleaning Essentials",
    discount: "up to 70% off",
    href: "/products?category=cleaning-essentials",
    color: "#ffed4f",
    image: "https://thegroomer.ae/wp-content/uploads/2025/09/beautiful-pet-portrait-dog-scaled.jpg",
  },
  {
    id: "clothing",
    name: "Clothing",
    discount: "up to 70% off",
    href: "/products?category=clothing",
    color: "#00ff95",
    image: "https://xcdn.next.co.uk/Common/Items/Default/Default/ItemImages/3_4Ratio/SearchINT/Lge/W23945.jpg?im=Resize,width=450",
  },
];

export default function FeaturedCategoriesAndBrands() {
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
      className="relative w-full overflow-hidden bg-[#040608] py-12 sm:py-16 md:py-20 lg:py-24"
    >
      <GridOverlay opacity={0.1} pulse={true} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Featured Categories Section */}
        <div className="mb-12 sm:mb-14 md:mb-16">
          <div
            className={`mb-6 sm:mb-8 text-center transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
            }`}
          >
            <h2 className="mb-2 text-xl sm:text-2xl font-semibold uppercase tracking-wider text-[#f5f7ff]">
              FEATURED CATEGORIES
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
            {FEATURED_CATEGORIES.map((category, index) => (
              <Link
                key={category.id}
                href={category.href}
                className="group relative flex w-full sm:w-[280px] md:w-[320px] lg:w-[360px] h-80 sm:h-96 md:h-[420px] flex-col overflow-hidden rounded-xl border-2 border-[rgba(0,255,149,0.2)] bg-[#070f17] p-4 sm:p-5 md:p-6 transition-all duration-500 hover:border-[#00ff95] hover:shadow-[0_0_30px_rgba(0,255,149,0.3)]"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible
                    ? "translateY(0) scale(1)"
                    : "translateY(30px) scale(0.9)",
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <GridOverlay opacity={0.05} />

                {/* Discount Badge - Top Right */}
                <div className="absolute right-3 top-3 sm:right-4 sm:top-4 z-10">
                  <div
                    className="flex h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 items-center justify-center rounded-full border-2 transition-all duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: `${category.color}20`,
                      borderColor: category.color,
                      boxShadow: `0 0 15px ${category.color}40`,
                    }}
                  >
                    <p
                      className="text-center font-mono text-[10px] sm:text-xs font-bold leading-tight uppercase tracking-tighter px-1"
                      style={{ color: category.color }}
                    >
                      {category.discount}
                    </p>
                  </div>
                </div>

                {/* Product Image */}
                <div className="relative mb-3 flex flex-1 items-center justify-center overflow-hidden rounded-lg border border-[rgba(0,255,149,0.2)] bg-[#050b11] transition-all duration-300 group-hover:border-[#00ff95]">
                  {category.image ? (
                    <div className="relative h-full w-full">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050b11]/80 via-transparent to-transparent" />
                    </div>
                  ) : (
                  <div className="relative h-full w-full">
                    <GridOverlay opacity={0.1} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="h-16 w-16 rounded-lg border-2 transition-all duration-300 group-hover:scale-110"
                        style={{
                          borderColor: category.color,
                          backgroundColor: `${category.color}10`,
                        }}
                      />
                    </div>
                  </div>
                  )}
                </div>

                {/* Category Name */}
                <p className="text-center font-mono text-sm sm:text-base font-bold uppercase tracking-wider text-[#a7b2c7] transition-colors duration-300 group-hover:text-[#00ff95]">
                  {category.name}
                </p>

                {/* Hover Glow */}
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at center, ${category.color}10 0%, transparent 70%)`,
                  }}
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Quote Section */}
        <div className="mt-16 sm:mt-20 md:mt-24">
          <div
            className={`relative mx-auto max-w-4xl transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="relative overflow-hidden rounded-2xl border-2 border-[rgba(0,255,149,0.3)] bg-[#070f17] p-8 sm:p-12 md:p-16">
              <GridOverlay opacity={0.08} />
              
              {/* Decorative Quote Marks */}
              <div className="absolute left-4 top-4 sm:left-6 sm:top-6 md:left-8 md:top-8 opacity-30">
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 30C20 20 25 15 35 15C45 15 50 20 50 30C50 40 45 45 35 45C30 45 25 42 23 40V55H10V30H20Z"
                    fill="#00ff95"
                  />
                  <path
                    d="M70 30C70 20 75 15 85 15C95 15 100 20 100 30C100 40 95 45 85 45C80 45 75 42 73 40V55H60V30H70Z"
                    fill="#00ff95"
                  />
                </svg>
              </div>

              {/* Quote Text */}
              <div className="relative z-10 text-center">
                <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed text-[#f5f7ff] italic">
                  <p className="mb-4">
                    "Love doesn't always need words. Sometimes it comes quietly, resting its paws on your knee, reminding you that you are seen, safe, and loved."
                  </p>
                </blockquote>
              </div>

              {/* Bottom Accent Line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00ff95] to-transparent opacity-50" />
              
              {/* Glow Effect */}
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(circle at center, rgba(0,255,149,0.1) 0%, transparent 70%)`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
