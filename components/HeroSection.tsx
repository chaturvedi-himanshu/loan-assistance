import Link from "next/link";
import DynamicImage from "@/components/DynamicImage";
import type { HeroData, StatItem } from "@/lib/data";

interface HeroSectionProps {
  hero?: HeroData;
  stats?: StatItem[];
}

const fallbackStats = [
  { icon: "icofont-people", value: "25K+", label: "Happy Clients" },
  { icon: "icofont-check-circled", value: "$2B+", label: "Loans Processed" },
  { icon: "icofont-star", value: "98%", label: "Satisfaction Rate" },
];

export default function HeroSection({ hero, stats }: HeroSectionProps) {
  const heroStats = stats
    ? [
        {
          icon: "icofont-people",
          value: stats[0]?.value ?? "25K+",
          label: stats[0]?.label ?? "Happy Clients",
        },
        {
          icon: "icofont-check-circled",
          value: stats[1]?.value ?? "$2B+",
          label: stats[1]?.label ?? "Loans Processed",
        },
        {
          icon: "icofont-star",
          value: stats[2]?.value ?? "98%",
          label: stats[2]?.label ?? "Satisfaction Rate",
        },
      ]
    : fallbackStats;

  const ctaPrimaryUrl = hero?.ctaPrimaryUrl ?? "/application-form";
  const ctaSecondaryUrl = hero?.ctaSecondaryUrl ?? "/services";
  const imageSrc = hero?.image ?? "/images/slider/2.png";
  const imageAlt = hero?.imageAlt ?? "Loan";

  return (
    <section
      className="Smart Loans_header_bg header_bg_1"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* ── Animated SVG background ── */}
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
        <circle
          cx="720"
          cy="350"
          r="280"
          fill="none"
          stroke="rgba(44,187,223,0.06)"
          strokeWidth="60"
        />
        <circle
          cx="720"
          cy="350"
          r="180"
          fill="none"
          stroke="rgba(44,187,223,0.05)"
          strokeWidth="40"
        />
        <ellipse
          cx="-80"
          cy="80"
          rx="300"
          ry="200"
          fill="rgba(44,187,223,0.07)"
        />
        <ellipse
          cx="1520"
          cy="650"
          rx="320"
          ry="220"
          fill="rgba(240,115,74,0.06)"
        />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <circle
            key={`dl${i}`}
            cx={60 + (i % 2) * 40}
            cy={160 + i * 60}
            r="5"
            fill="rgba(44,187,223,0.15)"
          />
        ))}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <circle
            key={`dr${i}`}
            cx={1380 + (i % 2) * 30}
            cy={100 + i * 70}
            r="5"
            fill="rgba(44,187,223,0.12)"
          />
        ))}
        <line
          x1="200"
          y1="0"
          x2="0"
          y2="200"
          stroke="rgba(44,187,223,0.07)"
          strokeWidth="1.5"
          strokeDasharray="6 10"
        />
        <line
          x1="300"
          y1="0"
          x2="0"
          y2="300"
          stroke="rgba(44,187,223,0.05)"
          strokeWidth="1.5"
          strokeDasharray="6 10"
        />
        <line
          x1="1440"
          y1="400"
          x2="1200"
          y2="700"
          stroke="rgba(240,115,74,0.08)"
          strokeWidth="1.5"
          strokeDasharray="6 10"
        />
        <polygon points="1380,0 1440,0 1440,80" fill="rgba(44,187,223,0.08)" />
        <circle cx="1100" cy="80" r="12" fill="rgba(240,115,74,0.15)" />
        <circle cx="1140" cy="110" r="7" fill="rgba(240,115,74,0.20)" />
        <path
          d="M0 660 Q240 620 480 660 Q720 700 960 660 Q1200 620 1440 660"
          fill="none"
          stroke="rgba(44,187,223,0.08)"
          strokeWidth="2"
        />
      </svg>

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="row align-items-center">
          {/* ── Text side ── */}
          <div className="col-lg-6">
            <div className="welcome_area">
              <div className="welcome_text">
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "rgba(44,187,223,0.12)",
                    padding: "6px 16px",
                    borderRadius: 20,
                    marginBottom: 18,
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
                    {hero?.eyebrow ?? "Trusted Loan Partner"}
                  </span>
                </div>

                <h1>
                  {hero?.title ? (
                    <>{hero.title}</>
                  ) : (
                    <>
                      The right <span>decision</span>
                      <br />
                      at the right time.
                    </>
                  )}
                </h1>
                <p>
                  {hero?.subtitle ??
                    "We are here to help you when you need your financial support, then we are here to help you grow and succeed."}
                </p>
              </div>

              <div
                className="welcome_button"
                style={{
                  display: "flex",
                  gap: 16,
                  flexWrap: "wrap",
                  alignItems: "center",
                  marginBottom: 40,
                }}
              >
                <Link href={ctaPrimaryUrl} className="common_btn">
                  {hero?.ctaPrimary ?? "Apply Now"}
                </Link>
                <Link
                  href={ctaSecondaryUrl}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    color: "#2cbbdf",
                    fontWeight: 700,
                    fontSize: 16,
                  }}
                >
                  <span
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      border: "2px solid #2cbbdf",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <i
                      className="icofont-play-alt-2"
                      style={{ fontSize: 14 }}
                    ></i>
                  </span>
                  {hero?.ctaSecondary ?? "Our Services"}
                </Link>
              </div>

              <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
                {heroStats.map((s) => (
                  <div
                    key={s.label}
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: "50%",
                        background: "rgba(44,187,223,0.12)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <i
                        className={s.icon}
                        style={{ color: "#2cbbdf", fontSize: 20 }}
                      ></i>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 20,
                          fontWeight: 800,
                          color: "#222",
                          lineHeight: 1.1,
                        }}
                      >
                        {s.value}
                      </div>
                      <div style={{ fontSize: 13, color: "#929292" }}>
                        {s.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Image side ── */}
          <div className="col-lg-6">
            <div className="header_img" style={{ position: "relative" }}>
              {/* <div
                style={{
                  position: "absolute",
                  top: 30,
                  left: -10,
                  background: "#fff",
                  borderRadius: 12,
                  padding: "10px 16px",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.10)",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  zIndex: 2,
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    background: "#2cbbdf",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <i
                    className={hero?.badge1Icon ?? "icofont-check-alt"}
                    style={{ color: "#fff", fontSize: 18 }}
                  ></i>
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#222" }}>
                    {hero?.badge1Title ?? "Instant Approval"}
                  </div>
                  <div style={{ fontSize: 11, color: "#929292" }}>
                    {hero?.badge1Subtitle ?? "Within 24 hours"}
                  </div>
                </div>
              </div> */}

              <DynamicImage
                src={imageSrc}
                alt={imageAlt}
                width={600}
                height={500}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
