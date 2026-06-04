"use client";

import type { WhyLogo } from "@/lib/data";

interface LogoCarouselProps {
  logos: WhyLogo[];
  heading?: string;
}

/**
 * Infinite, auto-scrolling strip of logos. Shows ~6 logos per screen on
 * desktop (4 on tablet, 3 on mobile) and loops seamlessly by duplicating the
 * list and translating the track by exactly one full set (-50%).
 *
 * Slide width is sized with container query units (cqw) so "6 visible" holds
 * regardless of the surrounding layout width.
 */
export default function LogoCarousel({ logos, heading }: LogoCarouselProps) {
  const valid = (logos ?? []).filter((l) => l?.image);
  if (valid.length === 0) return null;

  // Duplicate the list so translateX(-50%) produces a seamless loop.
  const track = [...valid, ...valid];
  // Keep a roughly constant scroll speed regardless of how many logos exist.
  const duration = Math.max(18, valid.length * 4);

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #f0f0f8",
        borderRadius: 16,
        padding: "28px 8px",
        boxShadow: "0 8px 32px rgba(31,34,71,0.06)",
        overflow: "hidden",
      }}
    >
      {heading && (
        <div
          style={{
            textAlign: "center",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 1.4,
            textTransform: "uppercase",
            color: "#8993a8",
            marginBottom: 22,
          }}
        >
          {heading}
        </div>
      )}

      <div className="logo-carousel-mask" aria-label="Partner logos">
        <div className="logo-carousel-track">
          {track.map((l, i) => (
            <div className="logo-carousel-slide" key={`${l.image}-${i}`} aria-hidden={i >= valid.length}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={l.image} alt={l.alt || "Partner logo"} loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .logo-carousel-mask {
          container-type: inline-size;
          width: 100%;
          overflow: hidden;
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
        }
        .logo-carousel-track {
          display: flex;
          width: max-content;
          animation: logoCarouselScroll ${duration}s linear infinite;
        }
        .logo-carousel-mask:hover .logo-carousel-track {
          animation-play-state: paused;
        }
        .logo-carousel-slide {
          flex: 0 0 calc(100cqw / 6);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 24px;
          box-sizing: border-box;
        }
        .logo-carousel-slide img {
          max-width: 100%;
          max-height: 46px;
          width: auto;
          height: auto;
          object-fit: contain;
          filter: grayscale(100%);
          opacity: 0.7;
          transition: filter 0.3s ease, opacity 0.3s ease;
        }
        .logo-carousel-slide img:hover {
          filter: grayscale(0%);
          opacity: 1;
        }
        @keyframes logoCarouselScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (max-width: 991px) {
          .logo-carousel-slide { flex-basis: calc(100cqw / 4); }
        }
        @media (max-width: 575px) {
          .logo-carousel-slide { flex-basis: calc(100cqw / 3); padding: 0 16px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .logo-carousel-track { animation: none; }
        }
      `}</style>
    </div>
  );
}
