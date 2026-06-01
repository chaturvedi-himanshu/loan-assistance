"use client";

import { useState } from "react";
import Image from "next/image";
import DynamicImage from "@/components/DynamicImage";
import type { HomeContentData } from "@/lib/data";

interface Testimonial {
  name: string;
  text: string;
  avatar: string;
  signature: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Austin Matthews",
    text: "From time time we need generate sample names to populate a test database usually just requiring first and last names address.",
    avatar: "/images/about/5.png",
    signature: "/images/signature.png",
  },
  {
    name: "Evelyn Goodman",
    text: "From time time we need generate sample names to populate a test database usually just requiring first and last names address.",
    avatar: "/images/about/5.png",
    signature: "/images/signature.png",
  },
  {
    name: "Calvin Cannon",
    text: "From time time we need generate sample names to populate a test database usually just requiring first and last names address.",
    avatar: "/images/about/5.png",
    signature: "/images/signature.png",
  },
];

import type { TestimonialItem } from "@/lib/data";

interface TestimonialsSectionProps {
  sectionClass?: string;
  showThumb?: boolean;
  testimonials?: TestimonialItem[];
  content?: HomeContentData;
}

export default function TestimonialsSection({
  sectionClass = "custome_sec_2",
  showThumb = true,
  testimonials: propTestimonials,
  content,
}: TestimonialsSectionProps) {
  const list = propTestimonials?.length
    ? propTestimonials.map(p => ({ name: p.name, text: p.text, avatar: p.image ?? "/images/about/5.png", signature: "/images/signature.png" }))
    : testimonials;

  const [current, setCurrent] = useState(0);

  const badge = content?.testimonialsBadge ?? "Testimonials";
  const heading = content?.testimonialsHeading ?? "What Our Clients\nSay About Us";
  const subtitle = content?.testimonialsSubtitle ?? "Real stories from people who chose Smart Loans\nto power their next big step.";
  const ratingValue = content?.testimonialsRatingValue ?? "5";
  const ratingLabel = content?.testimonialsRatingLabel ?? "Customer Rating";
  const sideImage = content?.testimonialsImage ?? "/images/about/3.png";
  const sideImageAlt = content?.testimonialsImageAlt ?? "Customer";

  const prev = () => setCurrent((c) => (c - 1 + list.length) % list.length);
  const next = () => setCurrent((c) => (c + 1) % list.length);

  const t = list[current];

  return (
    <section
      className={`commonSection`}
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* ── SVG background ── */}
      <svg
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 0,
        }}
        viewBox="0 0 1440 560"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <circle cx="200" cy="100" r="180" fill="rgba(44,187,223,0.05)" />
        <circle cx="1300" cy="450" r="200" fill="rgba(44,187,223,0.05)" />
        <circle
          cx="1380"
          cy="120"
          r="100"
          fill="none"
          stroke="rgba(44,187,223,0.08)"
          strokeWidth="22"
        />
        <circle
          cx="60"
          cy="480"
          r="100"
          fill="none"
          stroke="rgba(240,115,74,0.07)"
          strokeWidth="22"
        />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <circle
            key={i}
            cx={680 + (i % 3) * 30}
            cy={60 + Math.floor(i / 3) * 30}
            r="4"
            fill="rgba(44,187,223,0.10)"
          />
        ))}
        <path
          d="M0 500 Q360 460 720 500 Q1080 540 1440 500"
          fill="none"
          stroke="rgba(44,187,223,0.07)"
          strokeWidth="2"
        />
        {/* Large quote marks */}
        <text
          x="40"
          y="200"
          fontSize="160"
          fill="rgba(44,187,223,0.04)"
          fontFamily="Georgia,serif"
        >
          &ldquo;
        </text>
        <text
          x="1260"
          y="420"
          fontSize="160"
          fill="rgba(44,187,223,0.04)"
          fontFamily="Georgia,serif"
        >
          &rdquo;
        </text>
      </svg>

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="row">
          <div className="col-lg-12 text-center">
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(44,187,223,0.10)",
                padding: "6px 16px",
                borderRadius: 20,
                marginBottom: 16,
              }}
            >
              <i
                className="icofont-star"
                style={{ color: "#2cbbdf", fontSize: 14 }}
              ></i>
              <span
                style={{
                  fontSize: 13,
                  color: "#2cbbdf",
                  fontWeight: 700,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                }}
              >
                {badge}
              </span>
            </div>
            <h2 className="sec_title" style={{ whiteSpace: "pre-line" }}>
              {heading}
            </h2>
            <p className="sec_desc" style={{ whiteSpace: "pre-line" }}>
              {subtitle}
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 col-md-6">
            <div className="customer_area" style={{ position: "relative" }}>
              {/* Star rating */}
              <div style={{ marginBottom: 12 }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <i
                    key={s}
                    className="icofont-star"
                    style={{ color: "#f0734a", fontSize: 18, marginRight: 2 }}
                  ></i>
                ))}
              </div>

              <div className="singleCustomer">
                <div className="customer-info" style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <DynamicImage
                    src={t.avatar}
                    alt={t.name}
                    width={80}
                    height={80}
                  />
                  <div className="customer-name" style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <h5>{t.name}</h5>
                  </div>
                </div>
                <div className="quote_img">
                  <p>{t.text}</p>
                </div>
              </div>

              {/* Navigation with pill style */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginTop: 14,
                }}
              >
                <button
                  onClick={prev}
                  aria-label="Previous"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    border: "2px solid #2cbbdf",
                    background: "transparent",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <i
                    className="icofont-previous"
                    style={{ color: "#2cbbdf", fontSize: 16 }}
                  ></i>
                </button>
                <span style={{ fontSize: 14, color: "#aaa" }}>
                  {current + 1} / {list.length}
                </span>
                <button
                  onClick={next}
                  aria-label="Next"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "#2cbbdf",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 14px rgba(44,187,223,0.4)",
                  }}
                >
                  <i
                    className="icofont-next"
                    style={{ color: "#fff", fontSize: 16 }}
                  ></i>
                </button>
              </div>
            </div>
          </div>

          {showThumb && (
            <div className="col-lg-6 col-md-6">
              <div className="customer_thumb" style={{ position: "relative" }}>
                {/* Floating rating badge */}
                <div
                  style={{
                    position: "absolute",
                    top: 20,
                    right: 10,
                    background: "#fff",
                    borderRadius: 14,
                    padding: "12px 16px",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                    zIndex: 2,
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: 26, fontWeight: 800, color: "#222" }}>
                    {ratingValue}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      margin: "3px 0",
                    }}
                  >
                    {[1, 2, 3, 4, 5].map((s) => (
                      <i
                        key={s}
                        className="icofont-star"
                        style={{ color: "#f0734a", fontSize: 12 }}
                      ></i>
                    ))}
                  </div>
                  <div style={{ fontSize: 11, color: "#aaa" }}>
                    {ratingLabel}
                  </div>
                </div>
                <DynamicImage
                  src={sideImage}
                  alt={sideImageAlt}
                  width={500}
                  height={400}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
