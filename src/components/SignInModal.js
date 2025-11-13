"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignInModal({ isOpen, onClose, onSwitchToSignUp }) {
  const [showPassword, setShowPassword] = useState(false);
  const [useEmail, setUseEmail] = useState(false);
  const [formData, setFormData] = useState({
    countryCode: "+91",
    mobileNumber: "",
    email: "",
    password: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign in:", formData);
    // Handle sign in logic here
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-foreground/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative w-full max-w-md bg-background shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-foreground/10 px-6 py-4">
            <div className="font-serif text-xl font-semibold text-primary">
              OLLIE'S PAW
            </div>
            <button
              onClick={onClose}
              className="text-foreground/60 hover:text-foreground"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-6">
            {/* Title */}
            <h2 className="mb-2 text-2xl font-semibold text-foreground">
              Sign in to Ollie's Paw account
            </h2>
            <p className="mb-6 text-sm text-foreground/70">
              New to Ollie's Paw?{" "}
              <button
                onClick={onSwitchToSignUp}
                className="font-medium text-primary underline hover:text-primary/80"
              >
                Create Account
              </button>
            </p>

            {/* Information Banner */}
            <div className="mb-6 rounded border border-primary/30 bg-primary/10 px-4 py-3">
              <p className="text-xs text-foreground/80">
                We've recently upgraded our experience, so you may need to reset your password. If you haven't already, please{" "}
                <button className="font-medium text-primary underline hover:text-primary/80">
                  Reset password
                </button>
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Mobile Number or Email */}
              {useEmail ? (
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">
                    Email <span className="text-primary">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="w-full border border-foreground/20 bg-background px-4 py-3 text-foreground placeholder:text-foreground/40 focus:border-primary focus:outline-none"
                  />
                </div>
              ) : (
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">
                    Mobile Number <span className="text-primary">*</span>
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-shrink-0">
                      <select
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleChange}
                        className="appearance-none border border-foreground/20 bg-background px-4 py-3 pr-8 text-foreground focus:border-primary focus:outline-none"
                      >
                        <option value="+91">🇮🇳 +91</option>
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+44">🇬🇧 +44</option>
                      </select>
                      <svg
                        className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/60"
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
                    </div>
                    <input
                      type="tel"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      placeholder="Enter your mobile number"
                      required
                      className="flex-1 border border-foreground/20 bg-background px-4 py-3 text-foreground placeholder:text-foreground/40 focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Password */}
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">
                  Password <span className="text-primary">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    className="w-full border border-foreground/20 bg-background px-4 py-3 pr-12 text-foreground placeholder:text-foreground/40 focus:border-primary focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/60 hover:text-foreground"
                  >
                    {showPassword ? (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                <div className="mt-2 text-right">
                  <button
                    type="button"
                    className="text-sm text-primary underline hover:text-primary/80"
                  >
                    Forgotten your Password?
                  </button>
                </div>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                className="w-full bg-primary px-6 py-4 text-sm font-medium uppercase tracking-wider text-background hover:bg-primary/90"
              >
                Sign In
              </button>

              {/* OR Separator */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-foreground/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-background px-2 text-foreground/60">OR</span>
                </div>
              </div>

              {/* Continue with Email/Phone Button */}
              <button
                type="button"
                onClick={() => setUseEmail(!useEmail)}
                className="flex w-full items-center justify-center gap-3 border border-foreground/20 bg-background px-6 py-4 text-sm font-medium text-foreground hover:border-foreground/40"
              >
                {useEmail ? (
                  <>
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    Continue with Phone
                  </>
                ) : (
                  <>
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    Continue with email
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

