import { notFound } from "next/navigation";
import Link from "next/link";
import { getServiceBySlug, getServices, getSettings, getFooterContent } from "@/lib/data";

import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import PageBanner from "@/components/PageBanner";
import Footer from "@/components/Footer";
import Copyright from "@/components/Copyright";

export const revalidate = 60;

export async function generateStaticParams() {
  const services = await getServices();
  // Prefer slug; fall back to _id for any legacy doc that has not yet had
  // its slug auto-generated.
  return services.map((s) => ({ slug: s.slug ?? s._id }));
}

const processSteps = [
  { icon: "icofont-ui-user", title: "Share your profile", text: "Submit basic details and requirements online in minutes." },
  { icon: "icofont-file-document", title: "Upload documents", text: "Upload KYC, income proof, and supporting papers securely." },
  { icon: "icofont-search-document", title: "Verification", text: "Our team verifies your profile and eligibility quickly." },
  { icon: "icofont-money-bag", title: "Disbursal", text: "Amount gets disbursed directly to your account after approval." },
];

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [service, settings, footerContent] = await Promise.all([
    // `getServiceBySlug` also accepts an ObjectId, so any legacy
    // /service-details/<id> URL still resolves cleanly.
    getServiceBySlug(slug),
    getSettings(),
    getFooterContent(),
  ]);

  if (!service) notFound();

  return (
    <>
      <Preloader />
      <Header settings={settings} />
      <PageBanner
        title={service.title}
        description="Detailed information about this loan — rates, eligibility, and how to apply."
      />

      <section className="commonSection" style={{ background: "#f8f8fb", position: "relative", overflow: "hidden" }}>
        {/* Background decoration */}
        <svg
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}
          viewBox="0 0 1440 920"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <circle cx="100" cy="140" r="220" fill="rgba(44,187,223,0.07)" />
          <circle cx="1370" cy="790" r="220" fill="rgba(240,115,74,0.07)" />
          <path d="M0 90 Q360 20 720 90 Q1080 160 1440 90" fill="none" stroke="rgba(44,187,223,0.09)" strokeWidth="2" />
        </svg>

        <div className="container" style={{ position: "relative", zIndex: 1 }}>

          {/* ── Key metrics row ── */}
          {/* <div className="row" style={{ marginBottom: 30 }}>
            {[
              { label: "Starting Rate", value: service.rate, icon: "icofont-chart-line" },
              { label: "Max Amount", value: service.amount, icon: "icofont-money" },
              { label: "Tenure", value: service.tenure, icon: "icofont-clock-time" },
              { label: "Features", value: `${service.features.length} benefits`, icon: "icofont-badge" },
            ].map((m) => (
              <div key={m.label} className="col-lg-3 col-md-6" style={{ marginBottom: 16 }}>
                <div style={{ background: "#fff", borderRadius: 14, padding: "20px 18px", border: "1px solid #efeff7", boxShadow: "0 6px 24px rgba(0,0,0,0.04)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <div style={{
                      width: 34, height: 34, borderRadius: 10,
                      background: `${service.color}1a`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <i className={m.icon} style={{ color: service.color, fontSize: 16 }}></i>
                    </div>
                    <span style={{ fontSize: 12, color: "#9a9a9a", textTransform: "uppercase", fontWeight: 600 }}>{m.label}</span>
                  </div>
                  <h4 style={{ margin: 0, fontSize: 22 }}>{m.value}</h4>
                </div>
              </div>
            ))}
          </div> */}

          {/* ── Main content + sidebar ── */}
          <div className="row" style={{ marginBottom: 26 }}>
            <div className="col-lg-8" style={{ marginBottom: 26 }}>
              <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #efeff7", padding: 30, boxShadow: "0 10px 28px rgba(0,0,0,0.05)" }}>
                {/* Eyebrow badge */}
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 18, marginBottom: 14, background: `${service.color}1a` }}>
                  <i className={service.icon} style={{ color: service.color }}></i>
                  <span style={{ color: service.color, fontSize: 13, fontWeight: 700 }}>{service.title}</span>
                </div>

                <h3 style={{ fontSize: 28, marginBottom: 12 }}>
                  Get the right loan at the right rate
                </h3>
                <p style={{ color: "#666", lineHeight: 1.75 }}>{service.desc}</p>
                <p style={{ color: "#666", lineHeight: 1.75 }}>
                  Whether you&apos;re a first-time borrower or returning customer, our streamlined process
                  ensures minimal paperwork, fast approvals, and personalised support at every step.
                </p>

                <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 20 }}>
                  <Link className="common_btn" href="/application-form">Apply Now</Link>
                  <Link
                    href="/contact"
                    style={{ padding: "12px 20px", borderRadius: 8, border: `1px solid ${service.color}`, color: service.color, fontWeight: 700, textDecoration: "none" }}
                  >
                    Talk to Advisor
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-4" style={{ marginBottom: 26 }}>
              <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #efeff7", padding: 26, boxShadow: "0 10px 28px rgba(0,0,0,0.05)", height: "100%" }}>
                {/* Coloured top band */}
                <div style={{ background: `linear-gradient(135deg, ${service.color}, ${service.color}bb)`, margin: "-26px -26px 20px", borderRadius: "16px 16px 0 0", padding: "20px 24px" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(255,255,255,0.22)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
                    <i className={service.icon} style={{ color: "#fff", fontSize: 20 }}></i>
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, marginBottom: 4 }}>Starting from</div>
                  <div style={{ color: "#fff", fontSize: 30, fontWeight: 800 }}>{service.rate}</div>
                </div>

                <h4 style={{ marginBottom: 14 }}>Key Benefits</h4>
                <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                  {service.features.map((f) => (
                    <li key={f} style={{ marginBottom: 10, display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{ width: 20, height: 20, borderRadius: "50%", background: `${service.color}1a`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                        <i className="icofont-check" style={{ color: service.color, fontSize: 10 }}></i>
                      </span>
                      <span style={{ color: "#555", fontSize: 14 }}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* ── How it works ── */}
          <div className="row" style={{ marginBottom: 26 }}>
            <div className="col-lg-12">
              <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #efeff7", padding: 28, boxShadow: "0 10px 28px rgba(0,0,0,0.05)" }}>
                <h4 style={{ marginBottom: 20 }}>How it works</h4>
                <div className="row">
                  {processSteps.map((step, idx) => (
                    <div key={step.title} className="col-lg-3 col-md-6" style={{ marginBottom: 14 }}>
                      <div style={{ background: "#f8f8fb", borderRadius: 12, padding: 18, height: "100%", position: "relative" }}>
                        <div style={{
                          width: 42, height: 42, borderRadius: 12,
                          background: `${service.color}1a`,
                          display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10,
                        }}>
                          <i className={step.icon} style={{ color: service.color, fontSize: 18 }}></i>
                        </div>
                        <span style={{ display: "inline-block", fontSize: 11, color: service.color, fontWeight: 700, marginBottom: 6 }}>Step {idx + 1}</span>
                        <h5 style={{ marginBottom: 8 }}>{step.title}</h5>
                        <p style={{ marginBottom: 0, fontSize: 14, color: "#777" }}>{step.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── CTA banner ── */}
          <div className="row">
            <div className="col-lg-12">
              <div style={{ background: `linear-gradient(135deg, ${service.color} 0%, ${service.color}bb 100%)`, borderRadius: 16, padding: "30px 34px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14 }}>
                <div>
                  <h4 style={{ color: "#fff", margin: "0 0 6px", fontSize: 22 }}>Ready to apply for {service.title}?</h4>
                  <p style={{ color: "rgba(255,255,255,0.85)", margin: 0 }}>Complete your application in minutes. Our team will be in touch shortly.</p>
                </div>
                <Link className="common_btn" href="/application-form" style={{ background: "#fff", color: service.color }}>
                  Apply Now
                </Link>
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
