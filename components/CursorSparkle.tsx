"use client"; // required for client-side interactivity

import { useEffect, useState } from "react";

interface Sparkle {
  x: number;
  y: number;
  id: number;
  size: number;
  color: string;
}

const NUM_SPARKLES = 15;

const colors = ["#ffffff", "#a0eaff", "#ffb6ff", "#b0ffb0"]; // white-ish sparkles

export default function CursorSparkle() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newSparkle: Sparkle = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now() + Math.random(), // unique
        size: Math.random() * 4 + 2, // 2px to 6px
        color: colors[Math.floor(Math.random() * colors.length)],
      };
      setSparkles((prev) => [...prev.slice(-NUM_SPARKLES), newSparkle]);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed top-0 left-0 w-full h-full z-50">
      {sparkles.map((s) => (
        <div
          key={s.id}
          style={{
            position: "absolute",
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
            backgroundColor: s.color,
            borderRadius: "50%",
            boxShadow: `0 0 ${s.size * 2}px ${s.color}`,
            pointerEvents: "none",
            transform: "translate(-50%, -50%)",
            animation: "sparkle-fade 0.6s forwards",
          }}
        />
      ))}
      <style jsx>{`
        @keyframes sparkle-fade {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0);
          }
        }
      `}</style>
    </div>
  );
}
