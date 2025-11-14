"use client";

import { useState, useEffect } from "react";

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export default function GlitchText({ 
  children, 
  className = "", 
  duration = 2000,
  glitchOnHover = false 
}) {
  const [displayText, setDisplayText] = useState(children);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    if (!glitchOnHover) {
      const interval = setInterval(() => {
        setIsGlitching(true);
        let iterations = 0;
        const interval2 = setInterval(() => {
          setDisplayText(
            children
              .split("")
              .map((letter, index) => {
                if (index < iterations) {
                  return children[index];
                }
                return chars[Math.floor(Math.random() * chars.length)];
              })
              .join("")
          );

          if (iterations >= children.length) {
            clearInterval(interval2);
            setIsGlitching(false);
            setDisplayText(children);
          }
          iterations += 1 / 3;
        }, 30);
      }, duration);

      return () => clearInterval(interval);
    }
  }, [children, duration, glitchOnHover]);

  const handleMouseEnter = () => {
    if (glitchOnHover) {
      setIsGlitching(true);
      let iterations = 0;
      const interval = setInterval(() => {
        setDisplayText(
          children
            .split("")
            .map((letter, index) => {
              if (index < iterations) {
                return children[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );

        if (iterations >= children.length) {
          clearInterval(interval);
          setIsGlitching(false);
          setDisplayText(children);
        }
        iterations += 1 / 3;
      }, 30);
    }
  };

  return (
    <span
      className={`${className} ${isGlitching ? "matrix-glitch" : ""}`}
      onMouseEnter={glitchOnHover ? handleMouseEnter : undefined}
    >
      {displayText}
    </span>
  );
}

