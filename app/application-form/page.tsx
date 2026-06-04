import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import PageBanner from "@/components/PageBanner";
import Footer from "@/components/Footer";
import Copyright from "@/components/Copyright";
import ApplicationFormClient from "@/components/ApplicationFormClient";
import {
  getSettings,
  getFooterContent,
  getApplicationPage,
  type SiteSettings,
  type ApplicationPageData,
} from "@/lib/data";

export const revalidate = 60;

const PRIMARY = "#2cbbdf";
const ACCENT = "#f0734a";

function SideCard({
  settings,
  content,
}: {
  settings: SiteSettings;
  content: ApplicationPageData;
}) {
  return (
    <aside
      style={{
        position: "sticky",
        top: 110,
        display: "flex",
        flexDirection: "column",
        gap: 18,
      }}
      className="apply-aside"
    >
      {/* Trust card */}
      <div
        style={{
          position: "relative",
          background: "linear-gradient(160deg, #1f2247 0%, #2a2d5b 60%, #38275e 100%)",
          color: "#fff",
          borderRadius: 22,
          padding: "32px 28px",
          overflow: "hidden",
          boxShadow: "0 24px 60px rgba(31,34,71,0.25)",
        }}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 400 500"
          preserveAspectRatio="xMidYMid slice"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            opacity: 0.6,
          }}
        >
          <circle cx="360" cy="60" r="120" fill="rgba(44,187,223,0.18)" />
          <circle cx="40" cy="460" r="160" fill="rgba(240,115,74,0.18)" />
          <circle cx="200" cy="260" r="220" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
        </svg>

        <div style={{ position: "relative" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(255,255,255,0.10)",
              color: PRIMARY,
              padding: "6px 14px",
              borderRadius: 999,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 1.2,
              textTransform: "uppercase",
              marginBottom: 14,
            }}
          >
            <i className="icofont-rocket-alt-2" />
            {content.sideBadge}
          </span>
          <h3
            style={{
              fontSize: 22,
              lineHeight: 1.25,
              fontWeight: 800,
              margin: "0 0 10px",
              color: "#fff",
            }}
          >
            {content.sideHeading}
          </h3>
          <p
            style={{
              margin: 0,
              color: "rgba(255,255,255,0.70)",
              fontSize: 14,
              lineHeight: 1.7,
            }}
          >
            {content.sideDescription}
          </p>

          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: "22px 0 0",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {content.benefits.map((b) => (
              <li
                key={b.title}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  padding: "12px 14px",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 14,
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: `linear-gradient(135deg, ${PRIMARY}, ${ACCENT})`,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    boxShadow: "0 8px 18px rgba(44,187,223,0.30)",
                  }}
                >
                  <i className={b.icon} style={{ fontSize: 16 }} />
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>
                    {b.title}
                  </span>
                  <span style={{ fontSize: 12.5, color: "rgba(255,255,255,0.65)", lineHeight: 1.55 }}>
                    {b.desc}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Process card */}
      <div
        style={{
          background: "#fff",
          borderRadius: 22,
          padding: "26px 24px",
          border: "1px solid #eef0fa",
          boxShadow: "0 16px 40px rgba(31,34,71,0.06)",
        }}
      >
        <h4
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "#8993a8",
            letterSpacing: 1.2,
            textTransform: "uppercase",
            margin: "0 0 14px",
          }}
        >
          {content.processHeading}
        </h4>
        <ol
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          {content.steps.map((s) => (
            <li key={s.num} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <span
                style={{
                  flexShrink: 0,
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: "rgba(44,187,223,0.10)",
                  color: PRIMARY,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 800,
                }}
              >
                {s.num}
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#1a1a2e" }}>
                  {s.title}
                </span>
                <span style={{ fontSize: 13, color: "#6b7390", lineHeight: 1.5 }}>
                  {s.desc}
                </span>
              </div>
            </li>
          ))}
        </ol>

        {(settings.phone1 || settings.whatsapp || settings.email) && (
          <div
            style={{
              marginTop: 22,
              paddingTop: 18,
              borderTop: "1px dashed #e0e3ef",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "#8993a8",
                letterSpacing: 1.2,
                textTransform: "uppercase",
              }}
            >
              {content.helpLabel}
            </div>
            {settings.phone1 && (
              <a
                href={`tel:${settings.phone1.replace(/[^+\d]/g, "")}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  color: "#1a1a2e",
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                <i className="icofont-phone" style={{ color: PRIMARY, fontSize: 16 }} />
                {settings.phone1}
              </a>
            )}
            {settings.whatsapp && (
              <a
                href={`https://wa.me/${settings.whatsapp.replace(/[^\d]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  color: "#1a1a2e",
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                <i className="icofont-brand-whatsapp" style={{ color: "#25d366", fontSize: 17 }} />
                {settings.whatsapp}
              </a>
            )}
            {settings.email && (
              <a
                href={`mailto:${settings.email}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  color: "#1a1a2e",
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: "none",
                  wordBreak: "break-word",
                }}
              >
                <i className="icofont-email" style={{ color: PRIMARY, fontSize: 16 }} />
                {settings.email}
              </a>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}

export default async function ApplicationFormPage() {
  const [settings, footerContent, content] = await Promise.all([
    getSettings(),
    getFooterContent(),
    getApplicationPage(),
  ]);

  return (
    <>
      <Preloader />
      <Header settings={settings} />
      <PageBanner
        title={content.bannerTitle}
        eyebrow={content.bannerEyebrow}
        description={content.bannerDesc}
      />

      <section
        style={{
          background:
            "linear-gradient(180deg, #f7f9ff 0%, #ffffff 60%, #ffffff 100%)",
          padding: "80px 0 100px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative blobs */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -140,
              left: -140,
              width: 380,
              height: 380,
              borderRadius: "50%",
              background:
                "radial-gradient(circle at center, rgba(44,187,223,0.16) 0%, rgba(44,187,223,0) 70%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -180,
              right: -120,
              width: 440,
              height: 440,
              borderRadius: "50%",
              background:
                "radial-gradient(circle at center, rgba(240,115,74,0.13) 0%, rgba(240,115,74,0) 70%)",
            }}
          />
        </div>

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div
            className="apply-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 0.85fr) minmax(0, 1.6fr)",
              gap: 28,
              alignItems: "start",
            }}
          >
            <SideCard settings={settings} content={content} />

            {/* Right: Form card */}
            <div
              style={{
                background: "#ffffff",
                borderRadius: 24,
                padding: "40px 36px",
                boxShadow: "0 24px 60px rgba(31,34,71,0.10)",
                border: "1px solid #eef0fa",
              }}
              className="apply-form-card"
            >
              <header style={{ marginBottom: 24 }}>
                <h2
                  style={{
                    fontSize: 26,
                    fontWeight: 800,
                    color: "#1a1a2e",
                    margin: 0,
                  lineHeight: 1.25,
                }}
              >
                {content.formHeading}
              </h2>
              <p
                style={{
                  margin: "8px 0 0",
                  color: "#6b7390",
                  fontSize: 14,
                  lineHeight: 1.6,
                }}
              >
                {content.formSubtitle}
              </p>
              </header>
              <ApplicationFormClient />
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 991px) {
            .apply-grid {
              grid-template-columns: 1fr !important;
            }
            .apply-aside {
              position: static !important;
              top: auto !important;
            }
          }
          @media (max-width: 575px) {
            .apply-form-card {
              padding: 28px 22px !important;
              border-radius: 18px !important;
            }
          }
        `}</style>
      </section>

      <Footer settings={settings} content={footerContent} />
      <Copyright settings={settings} content={footerContent} />
    </>
  );
}
