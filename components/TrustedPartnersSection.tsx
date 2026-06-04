"use client";

import Link from "next/link";
import type { PartnerItem } from "@/lib/data";

interface TrustedPartnersSectionProps {
  partners?: PartnerItem[];
}

const accentColors = ["#2cbbdf", "#f0734a", "#27ae60", "#2196f3", "#e91e8c", "#ff9800"];

export default function TrustedPartnersSection({ partners: allItems }: TrustedPartnersSectionProps) {
  const items = allItems ?? [];

  const bankPartners = items.filter(p => p.type === "partner");
  const awards       = items.filter(p => p.type === "award");
  const certs        = items.filter(p => p.type === "certification");

  return (
    <>
      {/* ── PARTNERS STRIP ── */}
      <section style={{ background: "#fff", padding: "56px 0", position: "relative", overflow: "hidden", borderTop: "1px solid #f0f0f8", borderBottom: "1px solid #f0f0f8" }}>
        <svg aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} viewBox="0 0 1440 180" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <ellipse cx="0"    cy="90" rx="160" ry="120" fill="rgba(44,187,223,0.04)" />
          <ellipse cx="1440" cy="90" rx="160" ry="120" fill="rgba(240,115,74,0.04)" />
          {Array.from({ length: 18 }).map((_, i) => (<circle key={i} cx={80 + i * 76} cy={20} r="2.5" fill="rgba(44,187,223,0.07)" />))}
          {Array.from({ length: 18 }).map((_, i) => (<circle key={`b${i}`} cx={80 + i * 76} cy={160} r="2.5" fill="rgba(44,187,223,0.07)" />))}
        </svg>

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="row align-items-center">
            <div className="col-lg-3">
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(44,187,223,0.10)", padding: "5px 14px", borderRadius: 20, marginBottom: 10 }}>
                  <i className="icofont-handshake" style={{ color: "#2cbbdf", fontSize: 15 }}></i>
                  <span style={{ fontSize: 12, color: "#2cbbdf", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>Banking Partners</span>
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: "#222", margin: 0 }}>Trusted by leading banks</h3>
              </div>
            </div>
            <div className="col-lg-9">
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16, justifyContent: "space-around" }}>
                {bankPartners.map(p => (
                  <div key={p._id}
                    style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 22px", border: "1.5px solid #f0f0f8", borderRadius: 12, background: "#fafafa", transition: "all 0.3s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#2cbbdf"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 20px rgba(44,187,223,0.15)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#f0f0f8"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
                  >
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: `${p.color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <i className={p.icon} style={{ fontSize: 20, color: p.color }}></i>
                    </div>
                    <span style={{ fontSize: 15, fontWeight: 700, color: "#333" }}>{p.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── AWARDS + CERTIFICATIONS + CTA ── */}
      <section className="commonSection" style={{ background: "#f8f8fb", position: "relative", overflow: "hidden" }}>
        <svg aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} viewBox="0 0 1440 640" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <circle cx="100"  cy="100" r="180" fill="rgba(44,187,223,0.05)" />
          <circle cx="1340" cy="540" r="200" fill="rgba(240,115,74,0.05)" />
          <circle cx="1380" cy="100" r="110" fill="none" stroke="rgba(44,187,223,0.08)" strokeWidth="24" />
          <circle cx="60"   cy="540" r="110" fill="none" stroke="rgba(240,115,74,0.07)"  strokeWidth="24" />
          {[0,1,2,3,4,5,6,7,8].map(i => (<circle key={i} cx={650 + (i%3)*30} cy={70 + Math.floor(i/3)*30} r="4" fill="rgba(44,187,223,0.10)" />))}
          <path d="M0 580 Q360 540 720 580 Q1080 620 1440 580" fill="none" stroke="rgba(44,187,223,0.07)" strokeWidth="2" />
        </svg>

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="row">
            <div className="col-lg-12 text-center">
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(44,187,223,0.10)", padding: "6px 16px", borderRadius: 20, marginBottom: 16 }}>
                <i className="icofont-badge" style={{ color: "#2cbbdf", fontSize: 16 }}></i>
                <span style={{ fontSize: 13, color: "#2cbbdf", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>Recognition</span>
              </div>
              <h2 className="sec_title">Awards &amp; certifications<br />we are proud of</h2>
              <p className="sec_desc">Industry recognition and international standards that prove<br />our commitment to excellence.</p>
            </div>
          </div>

          {/* ── Award cards ── */}
          <div className="row" style={{ marginBottom: 56 }}>
            {awards.map((a, i) => (
              <div key={a._id} className="col-lg-3 col-md-6" style={{ marginBottom: 24 }}>
                <div style={{ background: "#fff", borderRadius: 16, padding: "28px 22px", textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, right: 0, width: 0, height: 0, borderStyle: "solid", borderWidth: "0 52px 52px 0", borderColor: `transparent ${accentColors[i % accentColors.length]} transparent transparent` }} />
                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: `${accentColors[i % accentColors.length]}18`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                    <i className={a.icon} style={{ fontSize: 28, color: accentColors[i % accentColors.length] }}></i>
                  </div>
                  <h5 style={{ fontSize: 16, fontWeight: 700, color: "#222", marginBottom: 6 }}>{a.name}</h5>
                  <p style={{ fontSize: 13, color: "#aaa", margin: 0 }}>{a.org}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Certifications row ── */}
          {certs.length > 0 && (
            <div className="row" style={{ marginBottom: 56 }}>
              <div className="col-lg-12">
                <div style={{ background: "#fff", borderRadius: 16, padding: "28px 40px", display: "flex", flexWrap: "wrap", justifyContent: "space-around", alignItems: "center", gap: 20, boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
                  {certs.map(c => (
                    <div key={c._id} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 44, height: 44, borderRadius: "50%", background: `${c.color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <i className={c.icon} style={{ fontSize: 20, color: c.color }}></i>
                      </div>
                      <span style={{ fontSize: 15, fontWeight: 600, color: "#333" }}>{c.text || c.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Full-width CTA banner ── */}
          <div className="row">
            <div className="col-lg-12">
              <div style={{ background: "linear-gradient(135deg, #222 0%, #3a3a5c 100%)", borderRadius: 20, padding: "52px 60px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 28, position: "relative", overflow: "hidden", boxShadow: "0 16px 48px rgba(0,0,0,0.15)" }}>
                <svg aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} viewBox="0 0 1200 180" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                  <circle cx="-40" cy="90" r="160" fill="rgba(44,187,223,0.12)" />
                  <circle cx="1240" cy="90" r="160" fill="rgba(240,115,74,0.10)" />
                  {Array.from({length:6}).map((_,r) => Array.from({length:14}).map((_,c) => (<circle key={`${r}-${c}`} cx={100 + c*80} cy={20 + r*26} r="1.8" fill="rgba(255,255,255,0.05)" />)))}
                </svg>
                <div style={{ zIndex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <i className="icofont-flash" style={{ color: "#2cbbdf", fontSize: 22 }}></i>
                    <span style={{ color: "#2cbbdf", fontWeight: 700, fontSize: 14, textTransform: "uppercase", letterSpacing: 1 }}>Limited Time Offer</span>
                  </div>
                  <h3 style={{ color: "#fff", fontSize: 32, fontWeight: 700, margin: "0 0 10px" }}>
                    Get <span style={{ color: "#2cbbdf" }}>0% processing fee</span> on your first loan!
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 16, margin: 0 }}>
                    Apply before December 31 and save up to $500 in fees. Limited slots available.
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, zIndex: 1, flexShrink: 0 }}>
                  <Link href="/application-form" className="common_btn" style={{ textAlign: "center", display: "flex", alignItems: "center", gap: 8 }}>
                    <i className="icofont-paper-plane"></i> Apply Now — Free
                  </Link>
                  <Link href="/services" style={{ color: "rgba(255,255,255,0.70)", fontSize: 14, textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                    <i className="icofont-info-circle" style={{ fontSize: 15 }}></i> Learn about our products
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
