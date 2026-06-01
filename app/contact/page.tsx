import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import PageBanner from "@/components/PageBanner";
import Footer from "@/components/Footer";
import Copyright from "@/components/Copyright";
import ContactForm from "@/components/ContactForm";
import { getSettings, getFooterContent, type SiteSettings } from "@/lib/data";

export const revalidate = 60;

const PRIMARY = "#2cbbdf";
const ACCENT = "#f0734a";

interface ContactItem {
  icon: string;
  label: string;
  value: string;
  href?: string;
}

function buildContactItems(s?: SiteSettings): ContactItem[] {
  const items: ContactItem[] = [];
  if (s?.phone1) {
    items.push({
      icon: "icofont-phone",
      label: "Call us anytime",
      value: s.phone1,
      href: `tel:${s.phone1.replace(/[^+\d]/g, "")}`,
    });
  }
  if (s?.email) {
    items.push({
      icon: "icofont-email",
      label: "Email our team",
      value: s.email,
      href: `mailto:${s.email}`,
    });
  }
  if (s?.address) {
    items.push({
      icon: "icofont-location-pin",
      label: "Visit our office",
      value: s.address,
    });
  }
  if (s?.workingHours) {
    items.push({
      icon: "icofont-clock-time",
      label: "Working hours",
      value: s.workingHours,
    });
  }
  return items;
}

function buildSocials(s?: SiteSettings) {
  const list = [
    { icon: "icofont-facebook",     href: s?.facebookUrl,  color: "#3b5998", label: "Facebook" },
    { icon: "icofont-twitter",      href: s?.twitterUrl,   color: "#1da1f2", label: "Twitter" },
    { icon: "icofont-linkedin",     href: s?.linkedinUrl,  color: "#0077b5", label: "LinkedIn" },
    { icon: "icofont-instagram",    href: s?.instagramUrl, color: "#e1306c", label: "Instagram" },
    { icon: "icofont-youtube-play", href: s?.youtubeUrl,   color: "#ff0000", label: "YouTube" },
  ];
  return list.filter((s) => s.href && s.href !== "#");
}

export default async function ContactPage() {
  const [settings, footerContent] = await Promise.all([
    getSettings(),
    getFooterContent(),
  ]);
  const contactItems = buildContactItems(settings);
  const socials = buildSocials(settings);

  return (
    <>
      <Preloader />
      <Header settings={settings} />
      <PageBanner
        title="Contact Us"
        description="Talk to a Smart Loans advisor — we usually reply within<br>24 working hours with clear next steps."
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
        {/* Decorative background blobs */}
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
              top: -120,
              left: -120,
              width: 360,
              height: 360,
              borderRadius: "50%",
              background:
                "radial-gradient(circle at center, rgba(44,187,223,0.18) 0%, rgba(44,187,223,0) 70%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -160,
              right: -120,
              width: 420,
              height: 420,
              borderRadius: "50%",
              background:
                "radial-gradient(circle at center, rgba(240,115,74,0.14) 0%, rgba(240,115,74,0) 70%)",
            }}
          />
        </div>

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.4fr)",
              gap: 28,
              alignItems: "stretch",
            }}
            className="contact-grid"
          >
            {/* ── Left: Info card ── */}
            <aside
              style={{
                position: "relative",
                background: `linear-gradient(160deg, #1f2247 0%, #2a2d5b 55%, #38275e 100%)`,
                color: "#fff",
                borderRadius: 24,
                padding: "40px 32px",
                overflow: "hidden",
                boxShadow: "0 24px 60px rgba(31,34,71,0.25)",
                display: "flex",
                flexDirection: "column",
                gap: 28,
              }}
            >
              <svg
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  pointerEvents: "none",
                  opacity: 0.6,
                }}
                viewBox="0 0 400 600"
                preserveAspectRatio="xMidYMid slice"
              >
                <circle cx="380" cy="40" r="120" fill="rgba(44,187,223,0.18)" />
                <circle cx="40" cy="540" r="140" fill="rgba(240,115,74,0.18)" />
                <circle
                  cx="200"
                  cy="300"
                  r="220"
                  fill="none"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="2"
                />
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
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                    marginBottom: 16,
                  }}
                >
                  <i className="icofont-headphone-alt" />
                  We&apos;re here for you
                </span>
                <h3
                  style={{
                    fontSize: 28,
                    lineHeight: 1.25,
                    fontWeight: 800,
                    margin: 0,
                    color: "#fff",
                  }}
                >
                  Let&apos;s find the right loan for you.
                </h3>
                <p
                  style={{
                    margin: "12px 0 0",
                    color: "rgba(255,255,255,0.70)",
                    fontSize: 14,
                    lineHeight: 1.7,
                  }}
                >
                  Reach out by phone, email, or the form on the right. A real
                  Smart Loans advisor will get back to you with answers, not
                  bots.
                </p>
              </div>

              <ul
                style={{
                  position: "relative",
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                {contactItems.map((c) => {
                  const inner = (
                    <span
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 14,
                        padding: "14px 16px",
                        borderRadius: 14,
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        transition: "background 0.2s, transform 0.2s",
                        color: "#fff",
                        textDecoration: "none",
                      }}
                    >
                      <span
                        style={{
                          flexShrink: 0,
                          width: 42,
                          height: 42,
                          borderRadius: 12,
                          background: `linear-gradient(135deg, ${PRIMARY}, ${ACCENT})`,
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 8px 20px rgba(44,187,223,0.35)",
                        }}
                      >
                        <i className={c.icon} style={{ fontSize: 18, color: "#fff" }} />
                      </span>
                      <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <span
                          style={{
                            fontSize: 11,
                            textTransform: "uppercase",
                            letterSpacing: 1,
                            color: "rgba(255,255,255,0.55)",
                          }}
                        >
                          {c.label}
                        </span>
                        <span style={{ fontSize: 15, fontWeight: 600, color: "#fff", lineHeight: 1.4, wordBreak: "break-word" }}>
                          {c.value}
                        </span>
                      </span>
                    </span>
                  );
                  return (
                    <li key={c.label}>
                      {c.href ? (
                        <a href={c.href} style={{ textDecoration: "none" }}>
                          {inner}
                        </a>
                      ) : (
                        inner
                      )}
                    </li>
                  );
                })}
              </ul>

              {socials.length > 0 && (
                <div style={{ position: "relative", marginTop: "auto" }}>
                  <div
                    style={{
                      fontSize: 11,
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      color: "rgba(255,255,255,0.55)",
                      marginBottom: 12,
                    }}
                  >
                    Follow Smart Loans
                  </div>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    {socials.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        aria-label={s.label}
                        style={{
                          width: 38,
                          height: 38,
                          borderRadius: 12,
                          background: "rgba(255,255,255,0.08)",
                          border: "1px solid rgba(255,255,255,0.12)",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#fff",
                          textDecoration: "none",
                          fontSize: 16,
                          transition: "background 0.2s, transform 0.2s",
                        }}
                      >
                        <i className={s.icon} />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </aside>

            {/* ── Right: Form card ── */}
            <div
              style={{
                background: "#ffffff",
                borderRadius: 24,
                padding: "40px 36px",
                boxShadow: "0 24px 60px rgba(31,34,71,0.10)",
                border: "1px solid #eef0fa",
              }}
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
                  Send us a message
                </h2>
                <p
                  style={{
                    margin: "8px 0 0",
                    color: "#6b7390",
                    fontSize: 14,
                    lineHeight: 1.6,
                  }}
                >
                  Fill in the form and we&apos;ll get back to you with the next
                  steps tailored to your loan needs.
                </p>
              </header>
              <ContactForm />
            </div>
          </div>
        </div>

        {/* Responsive: stack columns on smaller screens */}
        <style>{`
          @media (max-width: 991px) {
            .contact-grid {
              grid-template-columns: 1fr !important;
            }
          }
          @media (max-width: 575px) {
            section .contact-grid > aside,
            section .contact-grid > div {
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
