"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import SignUpModal from "./SignUpModal";
import SignInModal from "./SignInModal";

export default function Header() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { setIsCartOpen } = useCart();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { label: "home", href: "/" },
    { label: "all products", href: "/products", hasDropdown: true },
    { label: "about us", href: "/about" },
    { label: "contact", href: "/contact" },
  ];

  return (
    <header className="border-b border-foreground/10 bg-background sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        {/* Logo/Brand - Mobile */}
        <Link href="/" className="text-lg sm:text-xl font-bold md:hidden">
          OLLIE'S PAW
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-foreground">
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
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Search Icon */}
          <button
            aria-label="Search"
            className="text-foreground hover:text-foreground/70 touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
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
            className="text-foreground hover:text-foreground/70 touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
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
            className="text-foreground hover:text-foreground/70 touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
            className="md:hidden text-foreground hover:text-foreground/70 touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center ml-2"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-foreground/10 bg-background">
          <nav className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`block py-3 px-4 text-sm text-foreground hover:bg-foreground/5 rounded-lg touch-manipulation min-h-[44px] flex items-center ${
                  pathname === item.href ? "bg-foreground/10 font-semibold" : ""
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

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


