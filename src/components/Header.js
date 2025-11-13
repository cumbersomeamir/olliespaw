"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import SignUpModal from "./SignUpModal";
import SignInModal from "./SignInModal";

export default function Header() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const { setIsCartOpen } = useCart();

  const navItems = [
    { label: "all products", href: "/products", hasDropdown: true },
    { label: "nutrition", href: "/products?category=nutrition" },
    { label: "health & wellness", href: "/products?category=wellness" },
    { label: "grooming", href: "/products?category=grooming" },
    { label: "accessories", href: "/products?category=accessories", hasDropdown: true },
    { label: "treats", href: "/products?category=treats" },
    { label: "brands", href: "/products?category=brands", hasDropdown: true },
    { label: "about us", href: "/about" },
  ];

  return (
    <header className="border-b border-foreground/10 bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Left Navigation */}
        <nav className="flex items-center gap-6 text-sm text-foreground">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.hasDropdown && setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={item.href}
                className={`flex items-center gap-1 hover:text-foreground/80 ${
                  pathname === item.href ? "underline" : ""
                }`}
              >
                {item.label}
                {item.hasDropdown && (
                  <svg
                    className="h-3 w-3"
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
                )}
              </Link>
              {item.hasDropdown && openDropdown === item.label && (
                <div className="absolute left-0 top-full z-50 mt-2 w-48 rounded border border-foreground/10 bg-background shadow-lg">
                  <div className="py-2">
                    <Link
                      href={item.href}
                      className="block px-4 py-2 text-sm hover:bg-foreground/5"
                    >
                      View All
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right Icons */}
        <div className="flex items-center gap-6">
          {/* Search Icon */}
          <button
            aria-label="Search"
            className="text-foreground hover:text-foreground/70"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          {/* User Icon */}
          <button
            onClick={() => setIsSignUpModalOpen(true)}
            aria-label="Account"
            className="text-foreground hover:text-foreground/70"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </button>

          {/* Cart Icon */}
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="Shopping Cart"
            className="text-foreground hover:text-foreground/70"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Sign Up Modal */}
      <SignUpModal
        isOpen={isSignUpModalOpen}
        onClose={() => setIsSignUpModalOpen(false)}
        onSwitchToSignIn={() => {
          setIsSignUpModalOpen(false);
          setIsSignInModalOpen(true);
        }}
      />

      {/* Sign In Modal */}
      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
        onSwitchToSignUp={() => {
          setIsSignInModalOpen(false);
          setIsSignUpModalOpen(true);
        }}
      />
    </header>
  );
}


