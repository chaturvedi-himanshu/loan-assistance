"use client";

import type { WhyItem, HomeContentData } from "@/lib/data";

interface WhyChooseUsSectionProps {
  features?: WhyItem[];
  content?: HomeContentData;
}

const defaultFeatures: WhyItem[] = [
  {
    _id: "1",
    icon: "icofont-flash",
    title: "Lightning Fast Approval",
    desc: "Get your loan approved within 24 hours. No lengthy paperwork, no endless waiting.",
    color: "#2cbbdf",
    bg: "rgba(44,187,223,0.10)",
    order: 1,
  },
  {
    _id: "2",
    icon: "icofont-shield-alt",
    title: "Bank-Level Security",
    desc: "Your data is protected by 256-bit SSL encryption and strict privacy protocols.",
    color: "#27ae60",
    bg: "rgba(39,174,96,0.10)",
    order: 2,
  },
  {
    _id: "3",
    icon: "icofont-money",
    title: "Lowest Interest Rates",
    desc: "We offer the most competitive rates in the market, starting from just 8.5% p.a.",
    color: "#f0734a",
    bg: "rgba(240,115,74,0.10)",
    order: 3,
  },
  {
    _id: "4",
    icon: "icofont-ui-calculator",
    title: "Flexible Repayment",
    desc: "Choose your own repayment tenure from 6 to 360 months to fit your budget.",
    color: "#e91e8c",
    bg: "rgba(233,30,140,0.10)",
    order: 4,
  },
  {
    _id: "5",
    icon: "icofont-support",
    title: "24 / 7 Expert Support",
    desc: "Our dedicated team of financial advisors is always available to guide you.",
    color: "#2196f3",
    bg: "rgba(33,150,243,0.10)",
    order: 5,
  },
  {
    _id: "6",
    icon: "icofont-paper",
    title: "Zero Hidden Charges",
    desc: "Complete transparency in every transaction. What you see is exactly what you pay.",
    color: "#ff9800",
    bg: "rgba(255,152,0,0.10)",
    order: 6,
  },
];

const defaultHighlights = [
  { icon: "icofont-check-alt", text: "No prepayment penalty" },
  { icon: "icofont-check-alt", text: "Minimal documentation" },
  { icon: "icofont-check-alt", text: "Instant e-approval letter" },
  { icon: "icofont-check-alt", text: "Doorstep document pickup" },
];

export default function WhyChooseUsSection({
  features,
  content,
}: WhyChooseUsSectionProps) {
  const items = features?.length ? features : defaultFeatures;
  const badge = content?.whyBadge ?? "Why Smart Loans";
  const heading =
    content?.whyHeading ?? "Why thousands of people\nchoose us every day";
  const subtitle =
    content?.whySubtitle ??
    "We combine speed, trust, and flexibility to deliver the best\nloan experience you've ever had.";
  const highlightIcon = content?.whyHighlightIcon ?? "icofont-check-alt";
  const highlights = content
    ? [
        { icon: highlightIcon, text: content.whyHighlight1 },
        { icon: highlightIcon, text: content.whyHighlight2 },
        { icon: highlightIcon, text: content.whyHighlight3 },
        { icon: highlightIcon, text: content.whyHighlight4 },
      ].filter((h) => h.text)
    : defaultHighlights;
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

        {/* ── Bottom highlights strip ── */}
        <div className="row" style={{ marginTop: 20 }}>
          <div className="col-lg-12">
            <div
              style={{
                background: "linear-gradient(135deg, #2cbbdf 0%, #38cfe8 100%)",
                borderRadius: 16,
                padding: "28px 40px",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                boxShadow: "0 8px 32px rgba(44,187,223,0.35)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* bg shape */}
              <div
                style={{
                  position: "absolute",
                  right: -40,
                  top: -40,
                  width: 160,
                  height: 160,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.07)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: -20,
                  bottom: -30,
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.05)",
                }}
              />

              {highlights.map((h) => (
                <div
                  key={h.text}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    zIndex: 1,
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.20)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <i
                      className={h.icon}
                      style={{ color: "#fff", fontSize: 14 }}
                    ></i>
                  </div>
                  <span
                    style={{ color: "#fff", fontWeight: 600, fontSize: 15 }}
                  >
                    {h.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
