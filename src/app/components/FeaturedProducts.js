"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import GridOverlay from "@/components/matrix/GridOverlay";

const FEATURED_PRODUCTS = [
  {
    id: "1",
    title: "PET + IRON",
    image: "/images/PET IRON.jpeg",
    price: "₹ 450.00",
    deliveryTime: "2-3 days",
    dietaryInfo: "For All Pets",
    accent: "#ff3670",
    slug: "pet-plus-iron",
  },
  {
    id: "2",
    title: "PET + CALCIUM",
    image: "/images/PET CALCIUM.jpeg",
    price: "₹ 380.00",
    deliveryTime: "1-2 days",
    dietaryInfo: "For All Pets",
    accent: "#00e0ff",
    slug: "pet-plus-calcium",
  },
  {
    id: "3",
    title: "VITAPET",
    image: "/images/VITA PET.jpeg",
    price: "₹ 420.00",
    deliveryTime: "3-5 days",
    dietaryInfo: "For All Pets",
    accent: "#ffed4f",
    slug: "vita-pet",
  },
  {
    id: "4",
    title: "PET FERTILE",
    image: "/images/PET FERTILE.jpeg",
    price: "₹ 550.00",
    deliveryTime: "2-4 days",
    dietaryInfo: "For All Pets",
    accent: "#00ff95",
    slug: "pet-plus-fertile",
  },
];

export default function FeaturedProducts() {
  const [isVisible, setIsVisible] = useState(false);
  const [centerIndex, setCenterIndex] = useState(0);
  const scrollContainerRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const scrollLeft = scrollContainerRef.current.scrollLeft;
        const container = scrollContainerRef.current;
        
        // Calculate which card is most visible
        let closestIndex = 0;
        let closestDistance = Infinity;
        
        cardRefs.current.forEach((card, index) => {
          if (card) {
            const cardRect = card.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            const cardCenter = cardRect.left + cardRect.width / 2;
            const containerCenter = containerRect.left + containerRect.width / 2;
            const distance = Math.abs(cardCenter - containerCenter);
            
            if (distance < closestDistance) {
              closestDistance = distance;
              closestIndex = index;
            }
          }
        });
        
        setCenterIndex(closestIndex);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      // Also check on resize
      window.addEventListener("resize", handleScroll);
      return () => {
        container.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleScroll);
      };
    }
  }, []);

  const scrollLeft = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    
    // Find the currently centered card
    let currentCardIndex = 0;
    let minDistance = Infinity;
    
    cardRefs.current.forEach((card, index) => {
      if (card) {
        const cardRect = card.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const containerCenter = containerRect.left + containerRect.width / 2;
        const distance = Math.abs(cardCenter - containerCenter);
        
        if (distance < minDistance) {
          minDistance = distance;
          currentCardIndex = index;
        }
      }
    });
    
    // Scroll to previous card
    const targetIndex = Math.max(0, currentCardIndex - 1);
    const targetCard = cardRefs.current[targetIndex];
    
    if (targetCard) {
      const containerRect = container.getBoundingClientRect();
      const cardRect = targetCard.getBoundingClientRect();
      const scrollLeft = container.scrollLeft;
      const cardLeft = cardRect.left - containerRect.left + scrollLeft;
      const containerCenter = containerRect.width / 2;
      const cardCenter = cardRect.width / 2;
      const targetScroll = cardLeft - containerCenter + cardCenter;
      
      container.scrollTo({ left: targetScroll, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    
    // Find the currently centered card
    let currentCardIndex = 0;
    let minDistance = Infinity;
    
    cardRefs.current.forEach((card, index) => {
      if (card) {
        const cardRect = card.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const containerCenter = containerRect.left + containerRect.width / 2;
        const distance = Math.abs(cardCenter - containerCenter);
        
        if (distance < minDistance) {
          minDistance = distance;
          currentCardIndex = index;
        }
      }
    });
    
    // Scroll to next card
    const targetIndex = Math.min(FEATURED_PRODUCTS.length - 1, currentCardIndex + 1);
    const targetCard = cardRefs.current[targetIndex];
    
    if (targetCard) {
      const containerRect = container.getBoundingClientRect();
      const cardRect = targetCard.getBoundingClientRect();
      const scrollLeft = container.scrollLeft;
      const cardLeft = cardRect.left - containerRect.left + scrollLeft;
      const containerCenter = containerRect.width / 2;
      const cardCenter = cardRect.width / 2;
      const targetScroll = cardLeft - containerCenter + cardCenter;
      
      container.scrollTo({ left: targetScroll, behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full bg-[#040608] py-8 sm:py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header Section */}
        <div
          className={`mb-8 sm:mb-10 md:mb-12 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <h3 className="mb-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#f5f7ff]">
            FEATURED PRODUCTS
          </h3>
          <h2 className="mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-[#f5f7ff] px-2">
            FROM OUR KITCHEN TO YOURS
          </h2>
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 rounded-lg border-2 border-[#00ff95] bg-transparent px-6 py-3 text-sm font-mono font-semibold uppercase tracking-wider text-[#00ff95] transition-all hover:bg-[#00ff95] hover:text-[#040608] hover:scale-105 matrix-neon-pulse"
          >
            View More
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
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

        {/* Carousel Container */}
        <div className="relative px-8 sm:px-12 md:px-16">
          {/* Scroll Buttons */}
          <button
            onClick={scrollLeft}
            disabled={centerIndex === 0}
            className="absolute left-0 top-1/2 z-20 -translate-y-1/2 rounded-full border-2 border-[#00ff95] bg-[#070f17]/95 p-3 sm:p-4 text-[#00ff95] shadow-lg backdrop-blur-sm transition-all hover:bg-[#00ff95] hover:text-[#040608] hover:scale-110 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#070f17]/95 disabled:hover:text-[#00ff95] disabled:hover:scale-100 touch-manipulation min-h-[48px] min-w-[48px] flex items-center justify-center"
            aria-label="Scroll left"
          >
            <svg
              className="h-6 w-6 sm:h-7 sm:w-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={scrollRight}
            disabled={centerIndex === FEATURED_PRODUCTS.length - 1}
            className="absolute right-0 top-1/2 z-20 -translate-y-1/2 rounded-full border-2 border-[#00ff95] bg-[#070f17]/95 p-3 sm:p-4 text-[#00ff95] shadow-lg backdrop-blur-sm transition-all hover:bg-[#00ff95] hover:text-[#040608] hover:scale-110 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#070f17]/95 disabled:hover:text-[#00ff95] disabled:hover:scale-100 touch-manipulation min-h-[48px] min-w-[48px] flex items-center justify-center"
            aria-label="Scroll right"
          >
            <svg
              className="h-6 w-6 sm:h-7 sm:w-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Product Cards Carousel */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 sm:gap-8 md:gap-10 overflow-x-auto scrollbar-hide pb-4 scroll-smooth snap-x snap-mandatory"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {FEATURED_PRODUCTS.map((product, index) => {
              const isCenter = index === centerIndex;
              const distance = Math.abs(index - centerIndex);
              
              return (
                <div
                  key={product.id}
                  ref={(el) => {
                    if (el) cardRefs.current[index] = el;
                  }}
                >
                  <MatrixProductCard
                    product={product}
                    index={index}
                    isVisible={isVisible}
                    isCenter={isCenter}
                    distance={distance}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function MatrixProductCard({ product, index, isVisible, isCenter, distance }) {
  const [isHovered, setIsHovered] = useState(false);
  const scale = isCenter ? 1.0 : 0.92;
  const opacity = isCenter ? 1 : 0.7;

  return (
    <div
      className="group relative flex-shrink-0 transition-all duration-500 snap-center"
      style={{
        minWidth: "300px",
        maxWidth: "300px",
        transform: `scale(${scale})`,
        opacity: opacity,
        filter: isCenter ? "brightness(1.1)" : "brightness(0.85)",
        transitionDelay: `${index * 100}ms`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.slug}`} className="touch-manipulation">
        <div
          className={`relative h-[420px] sm:h-[460px] md:h-[480px] overflow-hidden rounded-xl sm:rounded-2xl border-2 bg-[#070f17] p-4 sm:p-5 md:p-6 transition-all duration-300 ${
            isCenter
              ? "border-[#00ff95] shadow-[0_0_40px_rgba(0,255,149,0.4)]"
              : "border-[rgba(0,255,149,0.2)]"
          }`}
          style={{
            boxShadow: isCenter
              ? `0 0 40px ${product.accent}40, inset 0 0 40px ${product.accent}20`
              : "none",
          }}
        >
          {/* Background Gradient Shift */}
          {isCenter && (
            <div
              className="absolute inset-0 opacity-20 transition-opacity duration-500"
              style={{
                background: `linear-gradient(135deg, ${product.accent}20 0%, transparent 50%, ${product.accent}10 100%)`,
                animation: "gradient-shift 5s ease infinite",
              }}
            />
          )}

          <GridOverlay opacity={0.1} />

          {/* Scanline Overlay */}
          {isHovered && (
            <div className="matrix-scanline absolute inset-0 pointer-events-none rounded-2xl" />
          )}

          {/* Product Image - Wireframe to Solid */}
          <div className="relative mb-4 h-64 w-full overflow-hidden rounded-xl border border-[rgba(0,255,149,0.2)] bg-[#050b11]">
            <div
              className={`absolute inset-0 transition-all duration-700 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 320px) 100vw, 320px"
              />
            </div>
            
            {/* Wireframe overlay that fades on hover */}
            <div
              className={`absolute inset-0 transition-opacity duration-500 ${
                isHovered ? "opacity-0" : "opacity-30"
              }`}
            >
              <svg className="h-full w-full">
                <rect
                  x="10%"
                  y="10%"
                  width="80%"
                  height="80%"
                  fill="none"
                  stroke={product.accent}
                  strokeWidth="2"
                  strokeOpacity="0.5"
                />
                <line x1="10%" y1="30%" x2="90%" y2="30%" stroke={product.accent} strokeWidth="1" strokeOpacity="0.3" />
                <line x1="10%" y1="50%" x2="90%" y2="50%" stroke={product.accent} strokeWidth="1" strokeOpacity="0.3" />
                <line x1="10%" y1="70%" x2="90%" y2="70%" stroke={product.accent} strokeWidth="1" strokeOpacity="0.3" />
              </svg>
            </div>
          </div>

          {/* Delivery Time Badge - Glitch */}
          <div
            className={`absolute right-6 top-6 rounded-lg border-2 px-3 py-1.5 text-xs font-mono font-semibold text-white shadow-lg transition-all duration-300 ${
              isHovered ? "matrix-glitch" : ""
            }`}
            style={{
              borderColor: product.accent,
              backgroundColor: `${product.accent}20`,
              boxShadow: `0 0 10px ${product.accent}40`,
            }}
          >
            {product.deliveryTime}
          </div>

          {/* Dietary Info */}
          <div className="mb-4 flex items-center gap-2">
            <svg
              className="h-5 w-5 transition-colors duration-300"
              style={{ color: product.accent }}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-medium text-[#a7b2c7]">
              {product.dietaryInfo}
            </span>
          </div>

          {/* Product Title */}
          <h3
            className={`mb-2 text-xl font-bold uppercase leading-tight transition-all duration-300 ${
              isCenter ? "text-[#f5f7ff]" : "text-[#a7b2c7]"
            }`}
            style={{
              textShadow: isCenter ? `0 0 10px ${product.accent}40` : "none",
            }}
          >
            {product.title}
          </h3>

          {/* Price */}
          {product.price && (
            <div className="mb-6">
              <p
                className="text-2xl font-bold transition-colors duration-300"
                style={{ color: product.accent }}
              >
                {product.price}
              </p>
              <p className="text-xs text-[#6c7383] font-mono uppercase tracking-wider mt-1">
                OLLIE'S PAW
              </p>
            </div>
          )}

          {/* View Product Button */}
          <div
            className={`w-full rounded-lg border-2 px-6 py-3 text-sm font-mono font-semibold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
              isCenter
                ? "border-[#00ff95] bg-[#00ff95] text-[#040608] hover:bg-[#00ff95]/80"
                : "border-[rgba(0,255,149,0.3)] bg-transparent text-[#00ff95] hover:bg-[#00ff95] hover:text-[#040608]"
            }`}
            style={{
              boxShadow: isCenter
                ? `0 0 20px ${product.accent}40`
                : "none",
            }}
          >
            View Product
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
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
          </div>
        </div>
      </Link>
    </div>
  );
}
