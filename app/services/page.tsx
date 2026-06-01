import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import PageBanner from "@/components/PageBanner";
import Footer from "@/components/Footer";
import Copyright from "@/components/Copyright";
import ConveyancingSection from "@/components/ConveyancingSection";
import ServiceCard from "@/components/ServiceCard";
import Link from "next/link";
import {
  getServices,
  getSettings,
  getConveyancingServices,
  getHomeContent,
  getFooterContent,
} from "@/lib/data";

export const revalidate = 60;

export default async function ServicesPage() {
  const [services, settings, conveyancing, homeContent, footerContent] = await Promise.all([
    getServices(),
    getSettings(),
    getConveyancingServices(),
    getHomeContent(),
    getFooterContent(),
  ]);

  return (
    <>
      <Preloader />
      <Header settings={settings} />
      <PageBanner
        title="Services of Smart Loans"
        description="We are here to help you when you need your<br>financial support, then we are help you."
      />

      {/* ── Loan Products ─────────────────────────────────── */}
      <section
        className="commonSection servicePage"
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
          viewBox="0 0 1440 900"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <circle cx="-80" cy="150" r="260" fill="rgba(44,187,223,0.08)" />
          <circle cx="1500" cy="760" r="260" fill="rgba(240,115,74,0.08)" />
          <path
            d="M0 70 Q360 10 720 70 Q1080 130 1440 70"
            fill="none"
            stroke="rgba(44,187,223,0.10)"
            strokeWidth="2"
          />
        </svg>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="row">
            <div className="col-lg-12 text-center">
              <div
                style={{
                  display: "inline-flex",
                  gap: 8,
                  alignItems: "center",
                  background: "rgba(44,187,223,0.10)",
                  padding: "6px 16px",
                  borderRadius: 20,
                  marginBottom: 14,
                }}
              >
                <i
                  className="icofont-ui-briefcase"
                  style={{ color: "#2cbbdf" }}
                ></i>
                <span
                  style={{
                    color: "#2cbbdf",
                    fontWeight: 700,
                    fontSize: 13,
                    textTransform: "uppercase",
                    letterSpacing: 0.8,
                  }}
                >
                  Our Loan Services
                </span>
              </div>
              <h2 className="sec_title">
                Find the right loan product for your goals
              </h2>
              <p className="sec_desc">
                Each service is designed with competitive rates, flexible
                tenure, and transparent processing.
              </p>
            </div>
          </div>

          <div className="row">
            {services.map((s) => (
              <div
                key={s._id}
                className="col-lg-4 col-md-6"
                style={{ marginBottom: 30 }}
              >
                <ServiceCard
                  _id={s._id}
                  title={s.title}
                  icon={s.icon}
                  color={s.color}
                  rate={s.rate}
                  desc={s.desc}
                  amount={s.amount}
                  tenure={s.tenure}
                  features={s.features}
                />
              </div>
            ))}
          </div>

          {/* CTA Banner */}
          <div className="row mt42">
            <div className="col-lg-12">
              <div
                style={{
                  background:
                    "linear-gradient(135deg, #2cbbdf 0%, #4ccae5 100%)",
                  borderRadius: 16,
                  padding: "30px 34px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 14,
                }}
              >
                <div>
                  <h4
                    style={{ color: "#fff", margin: "0 0 6px", fontSize: 24 }}
                  >
                    Need help choosing the right loan?
                  </h4>
                  <p style={{ color: "rgba(255,255,255,0.8)", margin: 0 }}>
                    Talk to our advisor and get a tailored recommendation in
                    minutes.
                  </p>
                </div>
                <Link className="common_btn" href="/application-form">
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Conveyancing Services ──────────────────────────── */}
      <ConveyancingSection
        items={conveyancing}
        compact={false}
        content={homeContent}
      />

      <Footer settings={settings} content={footerContent} />
      <Copyright settings={settings} content={footerContent} />
    </>
  );
}
