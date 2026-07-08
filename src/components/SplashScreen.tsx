"use client";

import { useState, useEffect } from "react";

export default function SplashScreen({
  onFinished,
}: {
  onFinished: () => void;
}) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Simulate loading progress while real assets load
    let raf: number;
    let start: number | null = null;
    const duration = 2400; // total ms for the loading bar

    const animate = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);

      if (pct < 100) {
        raf = requestAnimationFrame(animate);
      } else {
        // Start fade out
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(onFinished, 700); // wait for fade animation
        }, 300);
      }
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [onFinished]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#0A0A0A",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
        pointerEvents: fadeOut ? "none" : "auto",
      }}
    >
      {/* Subtle radial glow behind logo */}
      <div
        style={{
          position: "absolute",
          width: "340px",
          height: "340px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Brand name */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          marginBottom: "48px",
          position: "relative",
        }}
      >
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(28px, 6vw, 42px)",
            fontWeight: 700,
            color: "#F5F2EC",
            letterSpacing: "0.04em",
            lineHeight: 1,
          }}
        >
          Prowealth{" "}
          <span style={{ color: "#D4AF37", fontStyle: "italic" }}>Fashion</span>
        </span>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "11px",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "rgba(212,175,55,0.6)",
            fontWeight: 400,
          }}
        >
          House
        </span>
      </div>

      {/* Progress bar */}
      <div
        style={{
          width: "clamp(200px, 40vw, 280px)",
          height: "1px",
          background: "rgba(245,242,236,0.08)",
          borderRadius: "2px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background:
              "linear-gradient(90deg, #D4AF37, #E8C96A)",
            borderRadius: "2px",
            transition: "width 0.1s linear",
            boxShadow: "0 0 12px rgba(212,175,55,0.4)",
          }}
        />
      </div>

      {/* Percentage */}
      <span
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "11px",
          letterSpacing: "0.2em",
          color: "rgba(245,242,236,0.3)",
          marginTop: "16px",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {Math.round(progress)}%
      </span>
    </div>
  );
}
