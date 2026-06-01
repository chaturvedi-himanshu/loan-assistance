import Link from "next/link";
import { getSettings, getFooterContent } from "@/lib/data";

import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import PageBanner from "@/components/PageBanner";
import Footer from "@/components/Footer";
import Copyright from "@/components/Copyright";

const benefits = [
  "Loan amount up to ₹5,00,000",
  "Flexible tenure from 6 to 84 months",
  "Interest starts from 9.35% p.a.",
  "Minimal documentation required",
  "Fast approval and quick disbursal",
  "Dedicated account manager",
];

const process = [
  {
    icon: "icofont-ui-user",
    title: "Share your profile",
    text: "Submit basic details and business requirements online.",
  },
  {
    icon: "icofont-file-document",
    title: "Upload documents",
    text: "Upload KYC, income proof, and business papers securely.",
  },
  {
    icon: "icofont-search-document",
    title: "Verification",
    text: "Our team verifies your profile and eligibility quickly.",
  },
  {
    icon: "icofont-money-bag",
    title: "Disbursal",
    text: "Amount gets disbursed to your account after approval.",
  },
];

const metrics = [
  { label: "Starting Rate", value: "9.35%", icon: "icofont-chart-line" },
  { label: "Max Amount", value: "₹5,00,000", icon: "icofont-money" },
  { label: "Approval Time", value: "24 Hours", icon: "icofont-clock-time" },
  { label: "Success Cases", value: "50,000+", icon: "icofont-badge" },
];

export const revalidate = 60;

export default async function ServiceDetailsPage() {
  const [settings, footerContent] = await Promise.all([getSettings(), getFooterContent()]);
  return (
    <>
      <Preloader />
      <Header settings={settings} />
      <PageBanner
        title="Service Details"
        description="Detailed information about our loan services and why customers trust Smart Loans."
      />

      <section
        className="commonSection"
        style={{
          background: "#f8f8fb",
          position: "relative",
          overflow: "hidden",
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
            zIndex: 0,
          }}
          viewBox="0 0 1440 920"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <circle cx="100" cy="140" r="220" fill="rgba(44,187,223,0.08)" />
          <circle cx="1370" cy="790" r="220" fill="rgba(240,115,74,0.08)" />
          <path
            d="M0 90 Q360 20 720 90 Q1080 160 1440 90"
            fill="none"
            stroke="rgba(44,187,223,0.10)"
            strokeWidth="2"
          />
          {Array.from({ length: 7 }).map((_, r) =>
            Array.from({ length: 12 }).map((_, c) => (
              <circle
                key={`${r}-${c}`}
                cx={160 + c * 95}
                cy={180 + r * 90}
                r="2.2"
                fill="rgba(44,187,223,0.08)"
              />
            )),
          )}
        </svg>

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="row" style={{ marginBottom: 34 }}>
            {metrics.map((m) => (
              <div
                key={m.label}
                className="col-lg-3 col-md-6"
                style={{ marginBottom: 16 }}
              >
                <div
                  style={{
                    background: "#fff",
                    borderRadius: 14,
                    padding: "20px 18px",
                    border: "1px solid #efeff7",
                    boxShadow: "0 6px 24px rgba(0,0,0,0.04)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: 8,
                    }}
                  >
                    <div
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: 10,
                        background: "rgba(44,187,223,0.12)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <i
                        className={m.icon}
                        style={{ color: "#2cbbdf", fontSize: 16 }}
                      ></i>
                    </div>
                    <span
                      style={{
                        fontSize: 12,
                        color: "#9a9a9a",
                        textTransform: "uppercase",
                        fontWeight: 600,
                      }}
                    >
                      {m.label}
                    </span>
                  </div>
                  <h4 style={{ margin: 0, fontSize: 22 }}>{m.value}</h4>
                </div>
              </div>
            ))}
          </div>

          <div className="row">
            <div className="col-lg-8" style={{ marginBottom: 26 }}>
              <div
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  border: "1px solid #efeff7",
                  padding: 30,
                  boxShadow: "0 10px 28px rgba(0,0,0,0.05)",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "rgba(44,187,223,0.12)",
                    padding: "6px 14px",
                    borderRadius: 18,
                    marginBottom: 14,
                  }}
                >
                  <i
                    className="icofont-briefcase-alt-1"
                    style={{ color: "#2cbbdf" }}
                  ></i>
                  <span
                    style={{ color: "#2cbbdf", fontSize: 13, fontWeight: 700 }}
                  >
                    Business Loan
                  </span>
                </div>

                <h3 style={{ fontSize: 30, marginBottom: 12 }}>
                  Flexible funding built for growing businesses
                </h3>
                <p>
                  Our business loan helps you manage working capital, purchase
                  equipment, expand operations, and handle seasonal demand. The
                  process is simple, transparent, and tailored to your repayment
                  capacity.
                </p>
                <p>
                  From first-time entrepreneurs to established enterprises, we
                  provide a custom borrowing plan with competitive rates, clear
                  terms, and full advisory support.
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: 14,
                    flexWrap: "wrap",
                    marginTop: 18,
                  }}
                >
                  <Link className="common_btn" href="/application-form">
                    Apply Now
                  </Link>
                  <Link
                    href="/contact"
                    style={{
                      padding: "12px 20px",
                      borderRadius: 8,
                      border: "1px solid #2cbbdf",
                      color: "#2cbbdf",
                      fontWeight: 700,
                    }}
                  >
                    Talk to Advisor
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-4" style={{ marginBottom: 26 }}>
              <div
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  border: "1px solid #efeff7",
                  padding: 26,
                  boxShadow: "0 10px 28px rgba(0,0,0,0.05)",
                  height: "100%",
                }}
              >
                <h4 style={{ marginBottom: 14 }}>Key Benefits</h4>
                <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                  {benefits.map((point) => (
                    <li
                      key={point}
                      style={{
                        marginBottom: 10,
                        display: "flex",
                        gap: 10,
                        alignItems: "flex-start",
                      }}
                    >
                      <i
                        className="icofont-check-circled"
                        style={{ color: "#2cbbdf", marginTop: 2 }}
                      ></i>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  border: "1px solid #efeff7",
                  padding: 28,
                  boxShadow: "0 10px 28px rgba(0,0,0,0.05)",
                }}
              >
                <h4 style={{ marginBottom: 18 }}>How it works</h4>
                <div className="row">
                  {process.map((step, idx) => (
                    <div
                      key={step.title}
                      className="col-lg-3 col-md-6"
                      style={{ marginBottom: 14 }}
                    >
                      <div
                        style={{
                          background: "#f8f8fb",
                          borderRadius: 12,
                          padding: 18,
                          height: "100%",
                        }}
                      >
                        <div
                          style={{
                            width: 42,
                            height: 42,
                            borderRadius: 12,
                            background: "rgba(44,187,223,0.12)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: 10,
                          }}
                        >
                          <i
                            className={step.icon}
                            style={{ color: "#2cbbdf", fontSize: 18 }}
                          ></i>
                        </div>
                        <span
                          style={{
                            display: "inline-block",
                            fontSize: 11,
                            color: "#2cbbdf",
                            fontWeight: 700,
                            marginBottom: 6,
                          }}
                        >
                          Step {idx + 1}
                        </span>
                        <h5 style={{ marginBottom: 8 }}>{step.title}</h5>
                        <p style={{ marginBottom: 0, fontSize: 14 }}>
                          {step.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer settings={settings} content={footerContent} />
      <Copyright settings={settings} content={footerContent} />
    </>
  );
}
