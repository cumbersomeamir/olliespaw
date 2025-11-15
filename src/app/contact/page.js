"use client";

import { useState, useEffect, useRef } from "react";
import GridOverlay from "@/components/matrix/GridOverlay";
import CodeRain from "@/components/matrix/CodeRain";

function InputField({ label, type = "text", placeholder, value, onChange, required = false, error }) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  useEffect(() => {
    setHasValue(value.length > 0);
  }, [value]);

  return (
    <div className="relative">
      <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-wider text-[#6c7383]">
        {label} {required && <span className="text-[#ff3670]">*</span>}
      </label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setHasValue(e.target.value.length > 0);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          required={required}
          className={`w-full rounded-lg border-2 bg-[#050b11] px-6 py-4 font-mono text-sm text-[#f5f7ff] placeholder:text-[#6c7383] transition-all duration-300 focus:outline-none ${
            error
              ? "border-[#ff3670] animate-shake"
              : isFocused || hasValue
              ? "border-[#00ff95]"
              : "border-[rgba(0,255,149,0.2)]"
          }`}
          style={{
            boxShadow:
              isFocused && !error
                ? "0 0 20px rgba(0,255,149,0.3)"
                : error
                ? "0 0 20px rgba(255,54,112,0.3)"
                : "none",
          }}
        />
        {(isFocused || hasValue) && !error && (
          <div className="absolute bottom-0 left-0 h-0.5 w-full bg-[#00ff95] animate-laser-sweep" />
        )}
      </div>
      {error && (
        <p className="mt-2 font-mono text-xs text-[#ff3670]">{error}</p>
      )}
    </div>
  );
}

function TextAreaField({ label, placeholder, value, onChange, required = false, error }) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  useEffect(() => {
    setHasValue(value.length > 0);
  }, [value]);

  return (
    <div className="relative">
      <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-wider text-[#6c7383]">
        {label} {required && <span className="text-[#ff3670]">*</span>}
      </label>
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setHasValue(e.target.value.length > 0);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          required={required}
          rows={6}
          className={`w-full rounded-lg border-2 bg-[#050b11] px-6 py-4 font-mono text-sm text-[#f5f7ff] placeholder:text-[#6c7383] transition-all duration-300 focus:outline-none resize-none ${
            error
              ? "border-[#ff3670] animate-shake"
              : isFocused || hasValue
              ? "border-[#00ff95]"
              : "border-[rgba(0,255,149,0.2)]"
          }`}
          style={{
            boxShadow:
              isFocused && !error
                ? "0 0 20px rgba(0,255,149,0.3)"
                : error
                ? "0 0 20px rgba(255,54,112,0.3)"
                : "none",
          }}
        />
        {(isFocused || hasValue) && !error && (
          <div className="absolute bottom-0 left-0 h-0.5 w-full bg-[#00ff95] animate-laser-sweep" />
        )}
      </div>
      {error && (
        <p className="mt-2 font-mono text-xs text-[#ff3670]">{error}</p>
      )}
    </div>
  );
}

function ContactInfoCard({ icon, label, value, href, color, isVisible, delay }) {
  return (
    <a
      href={href}
      className="group relative block overflow-hidden rounded-xl border-2 border-[rgba(0,255,149,0.2)] bg-[#070f17] p-6 transition-all duration-500 hover:border-[#00ff95] hover:shadow-[0_0_30px_rgba(0,255,149,0.3)]"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "translateY(0) scale(1)"
          : "translateY(30px) scale(0.9)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <GridOverlay opacity={0.05} />

      {/* Icon */}
      <div className="mb-4 flex justify-center">
        <div
          className="rounded-full p-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
          style={{
            backgroundColor: `${color}20`,
            border: `2px solid ${color}40`,
            boxShadow: `0 0 20px ${color}40`,
          }}
        >
          <span className="text-3xl">{icon}</span>
        </div>
      </div>

      {/* Label */}
      <h3
        className="mb-2 text-center font-mono text-xs font-bold uppercase tracking-wider transition-colors duration-300"
        style={{ color }}
      >
        {label}
      </h3>

      {/* Value */}
      <p className="text-center font-mono text-sm text-[#a7b2c7] transition-colors duration-300 group-hover:text-[#f5f7ff]">
        {value}
      </p>
    </a>
  );
}

export default function ContactPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Invalid phone number";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: "✉️",
      label: "EMAIL",
      value: "info@olliespaw.com",
      href: "mailto:info@olliespaw.com",
      color: "#00ff95",
    },
    {
      icon: "📞",
      label: "PHONE",
      value: "+91 8090005050",
      href: "tel:+918090005050",
      color: "#00e0ff",
    },
    {
      icon: "📍",
      label: "ADDRESS",
      value: "Dehradun, Uttarakhand",
      href: "#",
      color: "#7c5cff",
    },
    {
      icon: "📄",
      label: "LICENSE",
      value: "U10809UT2025PTC019729",
      href: "#",
      color: "#ffed4f",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#040608]">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <CodeRain intensity={5} speed={100} />
      </div>
      <GridOverlay opacity={0.1} pulse={true} />

      <div ref={sectionRef} className="relative mx-auto max-w-6xl px-6 py-24">
        {/* Header */}
        <div
          className={`mb-16 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          <h1 className="mb-4 text-5xl font-bold uppercase tracking-tight text-[#f5f7ff] md:text-6xl">
            CONTACT US
          </h1>
          <p className="font-mono text-sm text-[#6c7383]">
            // COMMUNICATION PROTOCOL v2.0
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contactInfo.map((info, index) => (
            <ContactInfoCard
              key={index}
              icon={info.icon}
              label={info.label}
              value={info.value}
              href={info.href}
              color={info.color}
              isVisible={isVisible}
              delay={index * 100}
            />
          ))}
        </div>

        {/* Form and Map Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <div
            className="relative rounded-xl border-2 border-[rgba(0,255,149,0.2)] bg-[#070f17] p-8 transition-all duration-1000"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(-30px)",
              transitionDelay: "200ms",
            }}
          >
            <GridOverlay opacity={0.05} />

            <div className="relative z-10">
              <h2
                className="mb-6 font-mono text-xl font-bold uppercase tracking-wider"
                style={{ color: "#00ff95" }}
              >
                SEND US A MESSAGE
              </h2>
              <p className="mb-8 font-mono text-sm text-[#6c7383]">
                We'd love to hear from you. Fill out the form and we'll get back soon.
              </p>

              {submitSuccess && (
                <div className="mb-6 rounded-lg border-2 border-[#00ff95] bg-[#00ff95]20 p-4">
                  <p className="font-mono text-sm font-bold text-[#00ff95]">
                    ✓ MESSAGE SENT SUCCESSFULLY! WE'LL GET BACK TO YOU SOON.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <InputField
                  label="NAME"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(value) =>
                    setFormData({ ...formData, name: value })
                  }
                  required
                  error={errors.name}
                />

                <InputField
                  label="EMAIL"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(value) =>
                    setFormData({ ...formData, email: value })
                  }
                  required
                  error={errors.email}
                />

                <InputField
                  label="PHONE"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(value) =>
                    setFormData({ ...formData, phone: value })
                  }
                  required
                  error={errors.phone}
                />

                <TextAreaField
                  label="MESSAGE"
                  placeholder="Enter your message"
                  value={formData.message}
                  onChange={(value) =>
                    setFormData({ ...formData, message: value })
                  }
                  required
                  error={errors.message}
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full overflow-hidden rounded-lg border-2 border-[#00ff95] bg-transparent px-8 py-4 font-mono text-sm font-bold uppercase tracking-wider text-[#00ff95] transition-all duration-300 hover:bg-[#00ff95] hover:text-[#040608] hover:shadow-[0_0_30px_rgba(0,255,149,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#00ff95] border-t-transparent" />
                        SENDING...
                      </>
                    ) : (
                      <>
                        SEND MESSAGE
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
            </div>
          </div>

          {/* Map and Address */}
          <div
            className="space-y-6 transition-all duration-1000"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(30px)",
              transitionDelay: "400ms",
            }}
          >
            {/* Address Card */}
            <div className="relative rounded-xl border-2 border-[rgba(0,255,149,0.2)] bg-[#070f17] p-8">
              <GridOverlay opacity={0.05} />
              <div className="relative z-10">
                <h2
                  className="mb-6 font-mono text-xl font-bold uppercase tracking-wider"
                  style={{ color: "#00ff95" }}
                >
                  VISIT US
                </h2>
                <div className="space-y-4 font-mono text-sm leading-relaxed text-[#a7b2c7]">
                  <p>
                    <span className="font-bold text-[#00ff95]">Address:</span>
                    <br />
                    Khasra No. 513, Bharuwala, Clementtown,
                    <br />
                    Dehradun-248002, Uttarakhand, India
                  </p>
                  <p>
                    <span className="font-bold text-[#00ff95]">License No:</span>
                    <br />
                    U10809UT2025PTC019729
                  </p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="relative overflow-hidden rounded-xl border-2 border-[rgba(0,255,149,0.2)] bg-[#070f17]">
              <GridOverlay opacity={0.1} />
              <div className="relative aspect-video flex items-center justify-center">
                <div className="text-center">
                  <div className="mb-4 text-6xl">🗺️</div>
                  <p className="font-mono text-sm text-[#6c7383]">
                    // MAP INTEGRATION
                  </p>
                  <p className="mt-2 font-mono text-xs text-[#6c7383]">
                    Google Maps will be embedded here
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
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

        @keyframes laser-sweep {
          from {
            transform: scaleX(0);
            transform-origin: left;
          }
          to {
            transform: scaleX(1);
            transform-origin: left;
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

        .animate-laser-sweep {
          animation: laser-sweep 0.5s ease-out;
        }

        .animate-ripple {
          animation: ripple 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
