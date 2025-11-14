"use client";

export default function GridOverlay({ opacity = 0.1, pulse = false }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${
        pulse ? "matrix-grid-pulse" : ""
      }`}
      style={{
        backgroundImage: `
          linear-gradient(rgba(0, 255, 149, ${opacity}) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 255, 149, ${opacity}) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
      }}
    />
  );
}

