"use client";

import LogoCarousel from "@/components/LogoCarousel";
import type { WhyItem, HomeContentData } from "@/lib/data";

interface WhyChooseUsSectionProps {
  features?: WhyItem[];
  content?: HomeContentData;
}

export default function WhyChooseUsSection({
  features,
  content,
}: WhyChooseUsSectionProps) {
  const items = features ?? [];
  const badge = content?.whyBadge ?? "";
  const heading = content?.whyHeading ?? "";
  const subtitle = content?.whySubtitle ?? "";
  const logos = (content?.whyLogos ?? []).filter((l) => l?.image);
  const logosHeading = content?.whyLogosHeading ?? "";

  const hasHeader = Boolean(badge || heading || subtitle);
  // Nothing to show at all → hide the whole section.
  if (!hasHeader && items.length === 0 && logos.length === 0) return null;

  return (
    <section
      className="commonSection"
      style={{ background: "#fff", position: "relative", overflow: "hidden" }}
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
        viewBox="0 0 1440 700"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Large concentric circles — centre */}
        <circle
          cx="720"
          cy="350"
          r="380"
          fill="none"
          stroke="rgba(44,187,223,0.04)"
          strokeWidth="70"
        />
        <circle
          cx="720"
          cy="350"
          r="260"
          fill="none"
          stroke="rgba(44,187,223,0.04)"
          strokeWidth="50"
        />
        <circle
          cx="720"
          cy="350"
          r="140"
          fill="none"
          stroke="rgba(44,187,223,0.04)"
          strokeWidth="30"
        />

        {/* Top-left filled blob */}
        <ellipse
          cx="-60"
          cy="-40"
          rx="280"
          ry="200"
          fill="rgba(44,187,223,0.05)"
        />

        {/* Bottom-right blob */}
        <ellipse
          cx="1500"
          cy="720"
          rx="300"
          ry="220"
          fill="rgba(240,115,74,0.05)"
        />

        {/* Dot grid — top half */}
        {Array.from({ length: 5 }).map((_, r) =>
          Array.from({ length: 12 }).map((_, c) => (
            <circle
              key={`tg${r}-${c}`}
              cx={100 + c * 110}
              cy={60 + r * 55}
              r="3"
              fill="rgba(44,187,223,0.07)"
            />
          )),
        )}

        {/* Dot grid — bottom half */}
        {Array.from({ length: 3 }).map((_, r) =>
          Array.from({ length: 12 }).map((_, c) => (
            <circle
              key={`bg${r}-${c}`}
              cx={100 + c * 110}
              cy={530 + r * 55}
              r="3"
              fill="rgba(44,187,223,0.07)"
            />
          )),
        )}

        {/* Diagonal dashes */}
        <line
          x1="0"
          y1="700"
          x2="200"
          y2="400"
          stroke="rgba(44,187,223,0.06)"
          strokeWidth="1.5"
          strokeDasharray="6 12"
        />
        <line
          x1="1440"
          y1="0"
          x2="1200"
          y2="300"
          stroke="rgba(240,115,74,0.06)"
          strokeWidth="1.5"
          strokeDasharray="6 12"
        />

        {/* Orange accent bubbles */}
        <circle cx="1360" cy="200" r="18" fill="rgba(240,115,74,0.14)" />
        <circle cx="1330" cy="230" r="10" fill="rgba(240,115,74,0.20)" />
        <circle cx="80" cy="620" r="14" fill="rgba(240,115,74,0.14)" />
        <circle cx="110" cy="648" r="8" fill="rgba(240,115,74,0.20)" />

        {/* Thin cross marks */}
        <line
          x1="1100"
          y1="60"
          x2="1120"
          y2="80"
          stroke="rgba(44,187,223,0.15)"
          strokeWidth="2"
        />
        <line
          x1="1120"
          y1="60"
          x2="1100"
          y2="80"
          stroke="rgba(44,187,223,0.15)"
          strokeWidth="2"
        />
        <line
          x1="340"
          y1="620"
          x2="360"
          y2="640"
          stroke="rgba(44,187,223,0.15)"
          strokeWidth="2"
        />
        <line
          x1="360"
          y1="620"
          x2="340"
          y2="640"
          stroke="rgba(44,187,223,0.15)"
          strokeWidth="2"
        />
      </svg>

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* ── Heading ── */}
        {hasHeader && (
          <div className="row">
            <div className="col-lg-12 text-center">
              {badge && (
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
              )}
              {heading && (
                <h2 className="sec_title" style={{ whiteSpace: "pre-line" }}>
                  {heading}
                </h2>
              )}
              {subtitle && (
                <p className="sec_desc" style={{ whiteSpace: "pre-line" }}>
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        )}

        {/* ── Feature cards ── */}
        <div className="row">
          {items.map((f) => (
            <div
              key={f.title}
              className="col-lg-4 col-md-6"
              style={{ marginBottom: 30 }}
            >
              <div
                style={{
                  background: "#fff",
                  border: "1px solid #f0f0f8",
                  borderRadius: 16,
                  padding: "32px 28px",
                  height: "100%",
                  transition: "box-shadow 0.3s, transform 0.3s",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 12px 40px rgba(44,187,223,0.18)";
                  (e.currentTarget as HTMLDivElement).style.transform =
                    "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 4px 20px rgba(0,0,0,0.04)";
                  (e.currentTarget as HTMLDivElement).style.transform =
                    "translateY(0)";
                }}
              >
                {/* Subtle corner gradient */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: 80,
                    height: 80,
                    background: f.bg,
                    borderRadius: "0 16px 0 80px",
                  }}
                />

                {/* Icon */}
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 14,
                    background: f.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 18,
                  }}
                >
                  <i
                    className={f.icon}
                    style={{ fontSize: 26, color: f.color }}
                  ></i>
                </div>

                <h4
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#222",
                    marginBottom: 10,
                  }}
                >
                  {f.title}
                </h4>
                <p
                  style={{
                    fontSize: 15,
                    color: "#929292",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Partner / bank logo carousel ── */}
        {logos.length > 0 && (
          <div className="row" style={{ marginTop: 20 }}>
            <div className="col-lg-12">
              <LogoCarousel logos={logos} heading={logosHeading} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
