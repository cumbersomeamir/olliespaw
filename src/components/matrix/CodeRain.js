"use client";

import { useEffect, useRef } from "react";

const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";

export default function CodeRain({ intensity = 20, speed = 50 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;

    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops = Array(columns).fill(1);

    function draw() {
      ctx.fillStyle = "rgba(4, 6, 8, 0.05)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#00ff95";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillStyle = `rgba(0, 255, 149, ${Math.random() * 0.5 + 0.3})`;
        ctx.fillText(text, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const interval = setInterval(draw, speed);
    return () => clearInterval(interval);
  }, [speed]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-30"
      style={{ mixBlendMode: "screen" }}
    />
  );
}

