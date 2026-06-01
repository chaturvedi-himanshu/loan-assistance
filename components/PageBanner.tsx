import Link from "next/link";

interface Crumb {
  label: string;
  href?: string;
}

interface PageBannerProps {
  title: string;
  description?: string;
  /** Optional small label shown above the title. Defaults to "Smart Loans". */
  eyebrow?: string;
  /**
   * Optional breadcrumb trail. If omitted we render `Home / {title}`.
   * Pass an empty array `[]` to hide the breadcrumb entirely.
   */
  breadcrumbs?: Crumb[];
}

const PRIMARY = "#2cbbdf";
const ACCENT = "#f0734a";

export default function PageBanner({
  title,
  description,
  eyebrow = "Smart Loans",
  breadcrumbs,
}: PageBannerProps) {
  const trail: Crumb[] =
    breadcrumbs ??
    [
      { label: "Home", href: "/" },
      { label: title },
    ];

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(135deg, #1f2247 0%, #2a2d5b 55%, #38275e 100%)",
        color: "#fff",
        padding: "clamp(96px, 14vw, 160px) 0 clamp(72px, 10vw, 120px)",
      }}
    >
      {/* Decorative SVG layer */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 480"
        preserveAspectRatio="xMidYMid slice"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          opacity: 0.85,
        }}
      >
        {/* Orbits */}
        <circle
          cx="1320"
          cy="80"
          r="220"
          fill="none"
          stroke="rgba(44,187,223,0.18)"
          strokeWidth="1.5"
        />
        <circle
          cx="1320"
          cy="80"
          r="160"
          fill="none"
          stroke="rgba(44,187,223,0.12)"
          strokeWidth="1"
        />
        <circle
          cx="1320"
          cy="80"
          r="100"
          fill="none"
          stroke="rgba(44,187,223,0.10)"
          strokeWidth="1"
        />
        {/* Glowing blobs */}
        <circle cx="-80" cy="420" r="240" fill="rgba(240,115,74,0.22)" />
        <circle cx="1280" cy="440" r="180" fill="rgba(44,187,223,0.18)" />
        <circle cx="220" cy="-60" r="200" fill="rgba(44,187,223,0.10)" />

        {/* Dot grid */}
        {Array.from({ length: 4 }).map((_, r) =>
          Array.from({ length: 10 }).map((_, c) => (
            <circle
              key={`dl-${r}-${c}`}
              cx={40 + c * 26}
              cy={60 + r * 26}
              r="1.8"
              fill="rgba(255,255,255,0.18)"
            />
          )),
        )}
        {Array.from({ length: 4 }).map((_, r) =>
          Array.from({ length: 10 }).map((_, c) => (
            <circle
              key={`dr-${r}-${c}`}
              cx={1160 + c * 26}
              cy={340 + r * 26}
              r="1.8"
              fill="rgba(255,255,255,0.16)"
            />
          )),
        )}

        {/* Diagonal accent lines */}
        <line
          x1="0"
          y1="380"
          x2="320"
          y2="220"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
          strokeDasharray="3 8"
        />
        <line
          x1="1440"
          y1="80"
          x2="1120"
          y2="240"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
          strokeDasharray="3 8"
        />
      </svg>

      {/* Bottom curved divider */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: -1,
          width: "100%",
          height: 60,
          display: "block",
          pointerEvents: "none",
        }}
      >
        <path
          d="M0,30 C360,80 1080,-20 1440,30 L1440,60 L0,60 Z"
          fill="#ffffff"
        />
      </svg>

      <div
        className="container"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div
          style={{
            maxWidth: 820,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          {eyebrow && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                alignSelf: "flex-start",
                padding: "6px 14px",
                background: "rgba(255,255,255,0.10)",
                border: "1px solid rgba(255,255,255,0.14)",
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                color: PRIMARY,
                backdropFilter: "blur(8px)",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${PRIMARY}, ${ACCENT})`,
                  display: "inline-block",
                }}
              />
              {eyebrow}
            </span>
          )}

          <h1
            style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              lineHeight: 1.1,
              fontWeight: 800,
              color: "#fff",
              margin: 0,
              letterSpacing: -0.5,
            }}
          >
            {title}
            <span
              aria-hidden="true"
              style={{
                display: "block",
                width: 88,
                height: 4,
                marginTop: 16,
                borderRadius: 4,
                background: `linear-gradient(90deg, ${PRIMARY} 0%, ${ACCENT} 100%)`,
                boxShadow: `0 0 24px rgba(44,187,223,0.55)`,
              }}
            />
          </h1>

          {description && (
            <p
              style={{
                margin: "6px 0 0",
                maxWidth: 620,
                fontSize: "clamp(15px, 1.6vw, 17px)",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.78)",
              }}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}

          {trail.length > 0 && (
            <nav
              aria-label="Breadcrumb"
              style={{ marginTop: 18 }}
            >
              <ol
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 8,
                  listStyle: "none",
                  padding: "10px 16px",
                  margin: 0,
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  borderRadius: 999,
                  fontSize: 13,
                  color: "rgba(255,255,255,0.70)",
                  width: "fit-content",
                  maxWidth: "100%",
                  backdropFilter: "blur(8px)",
                }}
              >
                {trail.map((c, i) => {
                  const isLast = i === trail.length - 1;
                  return (
                    <li
                      key={`${c.label}-${i}`}
                      style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
                    >
                      {c.href && !isLast ? (
                        <Link
                          href={c.href}
                          style={{
                            color: "rgba(255,255,255,0.78)",
                            textDecoration: "none",
                            transition: "color 0.2s",
                          }}
                          className="banner-crumb-link"
                        >
                          {i === 0 && (
                            <i
                              className="icofont-home"
                              style={{ marginRight: 6, fontSize: 14, color: PRIMARY }}
                            />
                          )}
                          {c.label}
                        </Link>
                      ) : (
                        <span
                          aria-current={isLast ? "page" : undefined}
                          style={{
                            color: isLast ? "#fff" : "rgba(255,255,255,0.78)",
                            fontWeight: isLast ? 600 : 400,
                          }}
                        >
                          {c.label}
                        </span>
                      )}
                      {!isLast && (
                        <i
                          className="icofont-rounded-right"
                          aria-hidden="true"
                          style={{
                            fontSize: 12,
                            color: "rgba(255,255,255,0.40)",
                          }}
                        />
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>
          )}
        </div>
      </div>

      {/* Hover styles for crumb links (can't inline pseudo) */}
      <style>{`
        .banner-crumb-link:hover { color: ${PRIMARY} !important; }
      `}</style>
    </section>
  );
}
