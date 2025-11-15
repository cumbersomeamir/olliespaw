"use client";

import { useState, useEffect, useRef } from "react";
import GridOverlay from "@/components/matrix/GridOverlay";

function ToastSlideIn({ message, type, isVisible, onClose }) {
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
        isVisible
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-full"
      }`}
    >
      <div
        className="rounded-xl border-2 bg-[#070f17] px-6 py-4 font-mono text-sm shadow-lg"
        style={{
          borderColor: type === "success" ? "#00ff95" : "#ff3670",
          boxShadow: `0 0 20px ${type === "success" ? "rgba(0,255,149,0.3)" : "rgba(255,54,112,0.3)"}`,
        }}
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{type === "success" ? "✓" : "✕"}</span>
          <span
            style={{
              color: type === "success" ? "#00ff95" : "#ff3670",
            }}
          >
            {message}
          </span>
          <button
            onClick={onClose}
            className="ml-4 text-[#6c7383] hover:text-[#f5f7ff]"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

function ErrorShake({ isActive }) {
  return (
    <div
      className={`transition-all duration-300 ${
        isActive ? "animate-shake" : ""
      }`}
    />
  );
}

export default function Newsletter() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ isVisible: false, message: "", type: "success" });
  const [showError, setShowError] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      setShowError(true);
      setTimeout(() => setShowError(false), 500);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setToast({
        isVisible: true,
        message: "SUCCESSFULLY SUBSCRIBED TO NEWSLETTER",
        type: "success",
      });
      setEmail("");
      setTimeout(() => {
        setToast((prev) => ({ ...prev, isVisible: false }));
      }, 3000);
    }, 1000);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#040608] py-24"
    >
      <GridOverlay opacity={0.1} pulse={true} />

      {/* Pin and Play Background Animation */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-[#00ff95] opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `pin-pulse ${2 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-4xl px-6">
        {/* Header */}
        <div
          className={`mb-12 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          <h2 className="mb-4 text-4xl font-bold uppercase tracking-tight text-[#f5f7ff] md:text-5xl">
            STAY CONNECTED
          </h2>
          <p className="font-mono text-sm text-[#6c7383]">
            // SUBSCRIBE TO OUR NEWSLETTER
          </p>
        </div>

        {/* Newsletter Form Card */}
        <div
          className={`relative overflow-hidden rounded-xl border-2 border-[rgba(0,255,149,0.3)] bg-[#070f17] p-8 md:p-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 scale(1)" : "opacity-0 scale(0.95)"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <GridOverlay opacity={0.1} />

          <ErrorShake isActive={showError} />

          <div className="relative z-10">
            <p className="mb-8 text-center text-lg leading-relaxed text-[#a7b2c7]">
              Get the latest updates on new products, exclusive offers, and pet care tips delivered straight to your inbox.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER YOUR EMAIL ADDRESS"
                  className={`w-full rounded-lg border-2 bg-[#050b11] px-6 py-4 font-mono text-sm text-[#f5f7ff] placeholder:text-[#6c7383] transition-all duration-300 focus:outline-none ${
                    showError
                      ? "border-[#ff3670] animate-shake"
                      : "border-[rgba(0,255,149,0.3)] focus:border-[#00ff95]"
                  }`}
                  style={{
                    boxShadow: showError
                      ? "0 0 20px rgba(255,54,112,0.3)"
                      : "none",
                  }}
                />
                {showError && (
                  <p className="mt-2 font-mono text-xs text-[#ff3670]">
                    PLEASE ENTER A VALID EMAIL ADDRESS
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full overflow-hidden rounded-lg border-2 border-[#00ff95] bg-transparent px-8 py-4 font-mono text-sm font-bold uppercase tracking-wider text-[#00ff95] transition-all duration-300 hover:bg-[#00ff95] hover:text-[#040608] hover:shadow-[0_0_30px_rgba(0,255,149,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {isSubmitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#00ff95] border-t-transparent" />
                      SUBSCRIBING...
                    </>
                  ) : (
                    <>
                      SUBSCRIBE NOW
                      <svg
                        className="h-5 w-5 transition-transform group-hover:translate-x-1"
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
                    </>
                  )}
                </span>

                {/* Ripple Effect */}
                {!isSubmitting && (
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute inset-0 animate-ripple bg-[#00ff95] opacity-20" />
                  </div>
                )}
              </button>
            </form>

            {/* Benefits List */}
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              {[
                "Exclusive Offers",
                "Pet Care Tips",
                "New Product Launches",
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-lg border border-[rgba(0,255,149,0.2)] bg-[#050b11] px-4 py-3"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(10px)",
                    transitionDelay: `${400 + index * 100}ms`,
                  }}
                >
                  <span className="text-[#00ff95]">✓</span>
                  <span className="font-mono text-xs text-[#a7b2c7]">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <ToastSlideIn
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast((prev) => ({ ...prev, isVisible: false }))}
      />

      <style jsx>{`
        @keyframes pin-pulse {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.5);
          }
        }

        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          10%, 30%, 50%, 70%, 90% {
            transform: translateX(-5px);
          }
          20%, 40%, 60%, 80% {
            transform: translateX(5px);
          }
        }

        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }

        .animate-ripple {
          animation: ripple 0.6s ease-out;
        }
      `}</style>
    </section>
  );
}

