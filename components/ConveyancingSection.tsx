"use client";

import Link from "next/link";
import type { ConveyancingItem, HomeContentData } from "@/lib/data";

interface ConveyancingSectionProps {
  items?: ConveyancingItem[];
  compact?: boolean; // true = home page (show 3), false = services page (show all)
  content?: HomeContentData;
}

export default function ConveyancingSection({ items = [], compact = false, content }: ConveyancingSectionProps) {
  const displayed = compact ? items.slice(0, 3) : items;
  const badge = content?.conveyancingBadge ?? "Conveyancing Services";
  const heading = content?.conveyancingHeading ?? "Expert Property Transfer & Legal Services";
  const subtitle = content?.conveyancingSubtitle ?? "From residential settlements to commercial title transfers, our licensed conveyancers ensure every transaction is secure, compliant, and hassle-free.";
  const ctaCompactText = content?.conveyancingCtaCompactText ?? "View All Conveyancing Services";
  const ctaCompactUrl = content?.conveyancingCtaCompactUrl ?? "/services";
  const ctaFullText = content?.conveyancingCtaFullText ?? "Get a Free Consultation";
  const ctaFullUrl = content?.conveyancingCtaFullUrl ?? "/application-form";

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(160deg, #0e1628 0%, #1a2744 55%, #0e1628 100%)",
        padding: "80px 0",
      }}
    >
      {/* Background decoration */}
      <svg
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
        viewBox="0 0 1440 700"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <circle cx="100" cy="120" r="220" fill="rgba(44,187,223,0.06)" />
        <circle cx="1360" cy="580" r="280" fill="rgba(44,187,223,0.05)" />
        <circle cx="1200" cy="80" r="140" fill="rgba(240,115,74,0.05)" />
        <path d="M0 600 Q360 540 720 600 Q1080 660 1440 600" fill="none" stroke="rgba(44,187,223,0.08)" strokeWidth="2" />
        <path d="M0 620 Q360 560 720 620 Q1080 680 1440 620" fill="none" stroke="rgba(44,187,223,0.05)" strokeWidth="1" />
        {/* Dot grid top-right */}
        {Array.from({ length: 4 }).map((_, r) =>
          Array.from({ length: 5 }).map((_, c) => (
            <circle
              key={`d${r}-${c}`}
              cx={1060 + c * 40}
              cy={140 + r * 40}
              r="2.5"
              fill="rgba(44,187,223,0.15)"
            />
          ))
        )}
      </svg>

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Section heading */}
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(44,187,223,0.12)",
              border: "1px solid rgba(44,187,223,0.25)",
              padding: "6px 18px",
              borderRadius: 20,
              marginBottom: 18,
            }}
          >
            <i className="icofont-law-document" style={{ color: "#2cbbdf", fontSize: 15 }}></i>
            <span style={{ fontSize: 12, color: "#2cbbdf", fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase" }}>
              {badge}
            </span>
          </div>
          <h2 style={{ color: "#fff", fontSize: 36, fontWeight: 800, margin: "0 0 14px", lineHeight: 1.25 }}>
            {heading}
          </h2>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 16, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
            {subtitle}
          </p>
        </div>

        {/* Cards grid */}
        <div className="row">
          {displayed.map((item) => (
            <div
              key={item._id}
              className={compact ? "col-lg-4 col-md-6" : "col-lg-4 col-md-6"}
              style={{ marginBottom: 28 }}
            >
              <div
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  borderRadius: 18,
                  padding: "28px 26px",
                  height: "100%",
                  transition: "transform 0.25s, box-shadow 0.25s, background 0.25s",
                  cursor: "default",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)";
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 50px rgba(0,0,0,0.35)`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.04)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                {/* Subtle color accent top-left glow */}
                <div
                  style={{
                    position: "absolute",
                    top: -40,
                    left: -40,
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    background: item.color,
                    opacity: 0.07,
                    pointerEvents: "none",
                  }}
                />

                {/* Icon */}
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    background: `${item.color}22`,
                    border: `1.5px solid ${item.color}44`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 18,
                  }}
                >
                  <i className={item.icon} style={{ color: item.color, fontSize: 22 }}></i>
                </div>

                {/* Title */}
                <h4
                  style={{
                    color: "#fff",
                    fontSize: 17,
                    fontWeight: 700,
                    margin: "0 0 10px",
                    lineHeight: 1.35,
                  }}
                >
                  {item.title}
                </h4>

                {/* Description */}
                <p
                  style={{
                    color: "rgba(255,255,255,0.50)",
                    fontSize: 14,
                    lineHeight: 1.7,
                    margin: "0 0 16px",
                  }}
                >
                  {item.desc}
                </p>

                {/* Features */}
                <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
                  {item.features.map((f) => (
                    <li
                      key={f}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 7,
                        fontSize: 13,
                        color: "rgba(255,255,255,0.65)",
                      }}
                    >
                      <i
                        className="icofont-check-circled"
                        style={{ color: item.color, fontSize: 14, flexShrink: 0 }}
                      ></i>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* CTA row */}
        <div style={{ textAlign: "center", marginTop: 20 }}>
          {compact ? (
            <Link
              href={ctaCompactUrl}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(44,187,223,0.15)",
                border: "1.5px solid rgba(44,187,223,0.35)",
                color: "#2cbbdf",
                padding: "12px 28px",
                borderRadius: 50,
                fontWeight: 700,
                fontSize: 14,
                textDecoration: "none",
                transition: "all 0.25s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "#2cbbdf";
                (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(44,187,223,0.15)";
                (e.currentTarget as HTMLAnchorElement).style.color = "#2cbbdf";
              }}
            >
              {ctaCompactText}
              <i className="icofont-long-arrow-right"></i>
            </Link>
          ) : (
            <Link href={ctaFullUrl} className="common_btn">
              {ctaFullText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
