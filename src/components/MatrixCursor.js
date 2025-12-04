"use client";

import { useEffect, useState } from "react";

export default function MatrixCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    const updateCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Add to trail
      setTrail((prev) => {
        const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: Date.now() }];
        // Keep only last 10 points
        return newTrail.slice(-10);
      });
    };

    window.addEventListener("mousemove", updateCursor);

    // Remove old trail points
    const interval = setInterval(() => {
      setTrail((prev) => prev.filter((point) => Date.now() - point.id < 200));
    }, 50);

    return () => {
      window.removeEventListener("mousemove", updateCursor);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <div
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="w-4 h-4 rounded-full bg-[#00FF41] blur-sm opacity-80" />
      </div>

      {/* Trail */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="fixed pointer-events-none z-[9998] mix-blend-difference"
          style={{
            left: `${point.x}px`,
            top: `${point.y}px`,
            transform: "translate(-50%, -50%)",
            opacity: (index + 1) / trail.length * 0.5,
          }}
        >
          <div
            className="w-2 h-2 rounded-full bg-[#00FF41] blur-sm"
            style={{
              width: `${2 + (index * 0.5)}px`,
              height: `${2 + (index * 0.5)}px`,
            }}
          />
        </div>
      ))}
    </>
  );
}



