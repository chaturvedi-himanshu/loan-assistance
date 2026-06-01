"use client";

import { useEffect, useState } from "react";

interface PreloaderProps {
  /** Override the logo shown. Defaults to /images/logo.png. */
  logoSrc?: string;
  /** Override the alt text for the logo. */
  logoAlt?: string;
  /** How long the splash stays before fading out (ms). */
  duration?: number;
}

const DEFAULT_DURATION_MS = 1200;
const FADE_DURATION_MS = 400;

/**
 * Full-screen splash shown once per page load. Pulses the brand logo in/out
 * instead of the previous bouncing-dots loader. Replace `logoSrc` if you
 * want a different image without touching every page that mounts this.
 */
export default function Preloader({
  logoSrc = "/images/logo.png",
  logoAlt = "Loading",
  duration = DEFAULT_DURATION_MS,
}: PreloaderProps) {
  const [phase, setPhase] = useState<"visible" | "fading" | "gone">("visible");

  useEffect(() => {
    const fadeTimer = setTimeout(() => setPhase("fading"), duration);
    const removeTimer = setTimeout(
      () => setPhase("gone"),
      duration + FADE_DURATION_MS,
    );
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [duration]);

  if (phase === "gone") return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        background: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 99999,
        opacity: phase === "fading" ? 0 : 1,
        transition: `opacity ${FADE_DURATION_MS}ms ease-out`,
        pointerEvents: phase === "fading" ? "none" : "auto",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logoSrc}
        alt={logoAlt}
        style={{
          maxWidth: "180px",
          maxHeight: "120px",
          width: "auto",
          height: "auto",
          animation: "preloader-zoom 1.4s ease-in-out infinite",
        }}
      />
      <style jsx>{`
        @keyframes preloader-zoom {
          0%,
          100% {
            transform: scale(0.85);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
