"use client";

import { useState } from "react";
import Link from "next/link";
import IconWithFallback from "@/components/IconWithFallback";
import type { ServiceItem, HomeContentData } from "@/lib/data";

const DEFAULT_TAGS = ["Most Popular","Best Rate","Low Interest","Fast Approval","Lowest Rate","Emergency"];

function serviceToProduct(s: ServiceItem, i: number, tags: string[]) {
  return {
    _id: s._id,
    // Pass the raw icon through; IconWithFallback handles resolution + SVG
    // fallback in one place so all cards behave identically.
    icon: s.icon,
    title: s.title,
    rate: s.rate,
    maxAmount: s.amount,
    tenure: s.tenure,
    tag: tags[i] ?? tags[tags.length - 1] ?? "Popular",
    tagColor: "#fff",
    accentColor: s.color,
    accentBg: `${s.color}1A`,
    bullets: s.features ?? [],
  };
}

const defaultProducts = [
  { _id:"1", icon:"icofont-businessman", title:"Business Loan", rate:"10.2%", maxAmount:"₹5,00,000", tenure:"Up to 84 months", tag:"Most Popular", tagColor:"#fff", accentColor:"#2cbbdf", accentBg:"rgba(44,187,223,0.10)", bullets:["No collateral required","Instant disbursal","Overdraft facility"] },
  { _id:"2", icon:"icofont-people",      title:"Personal Loan", rate:"9.35%", maxAmount:"₹2,00,000", tenure:"Up to 60 months", tag:"Best Rate",    tagColor:"#fff", accentColor:"#27ae60", accentBg:"rgba(39,174,96,0.10)",   bullets:["Zero processing fee","Flexible EMI plans","Same-day approval"] },
  { _id:"3", icon:"icofont-student",     title:"Education Loan",rate:"7.80%", maxAmount:"₹10,00,000",tenure:"Up to 120 months",tag:"Low Interest",  tagColor:"#fff", accentColor:"#2196f3", accentBg:"rgba(33,150,243,0.10)", bullets:["Tuition + living costs","Moratorium period","Tax benefit"] },
  { _id:"4", icon:"icofont-car",         title:"Car Loan",      rate:"8.70%", maxAmount:"₹3,00,000", tenure:"Up to 84 months", tag:"Fast Approval", tagColor:"#fff", accentColor:"#f0734a", accentBg:"rgba(240,115,74,0.10)", bullets:["New & used cars","Up to 95% financing","Doorstep service"] },
  { _id:"5", icon:"icofont-building",    title:"Home Loan",     rate:"6.90%", maxAmount:"₹50,00,000",tenure:"Up to 360 months",tag:"Lowest Rate",   tagColor:"#fff", accentColor:"#e91e8c", accentBg:"rgba(233,30,140,0.10)",bullets:["Balance transfer","Top-up facility","Tax benefits"] },
  { _id:"6", icon:"icofont-heartbeat",   title:"Medical Loan",  rate:"11.50%",maxAmount:"₹1,00,000", tenure:"Up to 48 months", tag:"Emergency",     tagColor:"#fff", accentColor:"#ff9800", accentBg:"rgba(255,152,0,0.10)",  bullets:["Disbursed in 4 hours","No income proof","Cashless hospitals"] },
];

interface LoanProductsSectionProps {
  services?: ServiceItem[];
  content?: HomeContentData;
}

export default function LoanProductsSection({ services, content }: LoanProductsSectionProps) {
  const tags = (content?.loanProductsTags?.length ? content.loanProductsTags : DEFAULT_TAGS);
  const products = services?.length ? services.map((s, i) => serviceToProduct(s, i, tags)) : defaultProducts;
  const [hovered, setHovered] = useState<string | null>(null);

  const badge = content?.loanProductsBadge ?? "Loan Products";
  const heading = content?.loanProductsHeading ?? "Choose the right loan\nfor your needs";
  const subtitle = content?.loanProductsSubtitle ?? "From personal to business, we have a loan product crafted\nfor every milestone in your life.";
  const ctaText = content?.loanProductsCtaText ?? "Apply Now";
  const ctaUrl = content?.loanProductsCtaUrl ?? "/application-form";

  return (
    <section
      className="commonSection"
      style={{ background: "#f8f8fb", position: "relative", overflow: "hidden" }}
    >
      {/* ── SVG background ── */}
      <svg
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}
        viewBox="0 0 1440 800"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Top wavy band */}
        <path d="M0 0 Q360 50 720 0 Q1080 -50 1440 0 L1440 70 Q1080 120 720 70 Q360 20 0 70 Z" fill="rgba(44,187,223,0.05)" />
        {/* Bottom wavy band */}
        <path d="M0 800 Q360 750 720 800 Q1080 850 1440 800 L1440 740 Q1080 690 720 740 Q360 790 0 740 Z" fill="rgba(44,187,223,0.05)" />

        {/* Side rings */}
        <circle cx="-80"  cy="400" r="260" fill="none" stroke="rgba(44,187,223,0.06)" strokeWidth="50" />
        <circle cx="1520" cy="400" r="260" fill="none" stroke="rgba(44,187,223,0.06)" strokeWidth="50" />

        {/* Dot curtain — top */}
        {Array.from({ length: 3 }).map((_, r) =>
          Array.from({ length: 16 }).map((_, c) => (
            <circle key={`t${r}-${c}`} cx={60 + c * 88} cy={40 + r * 28} r="2.5" fill="rgba(44,187,223,0.08)" />
          ))
        )}

        {/* Floating currency symbols */}
        {[
          { x: 60,   y: 350, sym: "₹", op: 0.06 },
          { x: 1360, y: 200, sym: "%", op: 0.06 },
          { x: 700,  y: 740, sym: "₹", op: 0.05 },
          { x: 1200, y: 620, sym: "₹", op: 0.05 },
          { x: 180,  y: 650, sym: "%", op: 0.05 },
        ].map((s, i) => (
          <text key={i} x={s.x} y={s.y} fontSize="52" fill={`rgba(44,187,223,${s.op})`} fontFamily="sans-serif" fontWeight="bold">{s.sym}</text>
        ))}

        {/* Orange accent dots */}
        <circle cx="1380" cy="700" r="20" fill="rgba(240,115,74,0.13)" />
        <circle cx="1350" cy="730" r="11" fill="rgba(240,115,74,0.18)" />
        <circle cx="80"   cy="130" r="16" fill="rgba(240,115,74,0.13)" />
      </svg>

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* ── Heading ── */}
        <div className="row">
          <div className="col-lg-12 text-center">
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(44,187,223,0.10)", padding: "6px 16px", borderRadius: 20, marginBottom: 16 }}>
              <i className="icofont-bank-alt" style={{ color: "#2cbbdf", fontSize: 16 }}></i>
              <span style={{ fontSize: 13, color: "#2cbbdf", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>{badge}</span>
            </div>
            <h2 className="sec_title" style={{ whiteSpace: "pre-line" }}>{heading}</h2>
            <p className="sec_desc" style={{ whiteSpace: "pre-line" }}>{subtitle}</p>
          </div>
        </div>

        {/* ── Product cards ── */}
        <div className="row">
            {products.map((p, idx) => {
            const isHovered = hovered === (p._id ?? p.title);
            return (
              <div key={p._id ?? p.title} className="col-lg-4 col-md-6" style={{ marginBottom: 30 }}>
                <div
                  onMouseEnter={() => setHovered(p._id ?? p.title)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    background: isHovered ? p.accentColor : "#fff",
                    borderRadius: 18,
                    padding: "34px 28px 28px",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: isHovered
                      ? `0 16px 48px ${p.accentColor}55`
                      : "0 4px 24px rgba(0,0,0,0.05)",
                    transition: "all 0.35s ease",
                    position: "relative",
                    overflow: "hidden",
                    cursor: "pointer",
                  }}
                >
                  {/* Decorative bg circle */}
                  <div style={{ position: "absolute", bottom: -40, right: -40, width: 140, height: 140, borderRadius: "50%", background: isHovered ? "rgba(255,255,255,0.10)" : p.accentBg, transition: "all 0.35s" }} />

                  {/* Tag pill */}
                  <div style={{ position: "absolute", top: 20, right: 20, background: isHovered ? "rgba(255,255,255,0.20)" : p.accentBg, padding: "3px 12px", borderRadius: 12 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: isHovered ? "#fff" : p.accentColor, letterSpacing: 0.5 }}>{p.tag}</span>
                  </div>

                  {/* Icon — IconWithFallback resolves a sensible class
                      from title keywords / rotation if the DB icon is
                      empty, and swaps to an inline SVG if the icofont
                      glyph fails to render. */}
                  <div style={{ width: 60, height: 60, borderRadius: 16, background: isHovered ? "rgba(255,255,255,0.18)" : p.accentBg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, transition: "all 0.35s", flexShrink: 0 }}>
                    <IconWithFallback
                      icon={p.icon}
                      title={p.title}
                      index={idx}
                      color={isHovered ? "#fff" : p.accentColor}
                      size={28}
                      iconStyle={{ transition: "color 0.35s" }}
                    />
                  </div>

                  {/* Title */}
                  <h4 style={{ fontSize: 20, fontWeight: 700, color: isHovered ? "#fff" : "#222", marginBottom: 16, transition: "color 0.35s" }}>{p.title}</h4>

                  {/* Key metrics row */}
                  <div style={{ display: "flex", gap: 0, marginBottom: 20, borderRadius: 12, overflow: "hidden", background: isHovered ? "rgba(255,255,255,0.12)" : "#f8f8fb" }}>
                    {[
                      { label: "Rate", value: p.rate, icon: "icofont-chart-growth" },
                      { label: "Max", value: p.maxAmount, icon: "icofont-money" },
                    ].map((m, mi) => (
                      <div key={m.label} style={{ flex: 1, padding: "12px 14px", borderRight: mi === 0 ? `1px solid ${isHovered ? "rgba(255,255,255,0.15)" : "#eee"}` : "none" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 3 }}>
                          <i className={m.icon} style={{ fontSize: 12, color: isHovered ? "rgba(255,255,255,0.70)" : "#aaa" }}></i>
                          <span style={{ fontSize: 11, color: isHovered ? "rgba(255,255,255,0.70)" : "#aaa", textTransform: "uppercase", letterSpacing: 0.5 }}>{m.label}</span>
                        </div>
                        <div style={{ fontSize: 16, fontWeight: 800, color: isHovered ? "#fff" : p.accentColor, transition: "color 0.35s" }}>{m.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Tenure */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                    <i className="icofont-calendar" style={{ color: isHovered ? "rgba(255,255,255,0.75)" : "#aaa", fontSize: 14 }}></i>
                    <span style={{ fontSize: 14, color: isHovered ? "rgba(255,255,255,0.85)" : "#929292", transition: "color 0.35s" }}>{p.tenure}</span>
                  </div>

                  {/* Bullet features */}
                  <ul style={{ padding: 0, margin: "0 0 24px", listStyle: "none", flex: 1 }}>
                    {p.bullets.map(b => (
                      <li key={b} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                        <i className="icofont-check-circled" style={{ fontSize: 15, color: isHovered ? "rgba(255,255,255,0.80)" : p.accentColor, flexShrink: 0, transition: "color 0.35s" }}></i>
                        <span style={{ fontSize: 14, color: isHovered ? "rgba(255,255,255,0.85)" : "#555", transition: "color 0.35s" }}>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href={ctaUrl}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      padding: "12px 24px",
                      borderRadius: 10,
                      background: isHovered ? "rgba(255,255,255,0.20)" : p.accentColor,
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: 15,
                      border: `2px solid ${isHovered ? "rgba(255,255,255,0.35)" : p.accentColor}`,
                      transition: "all 0.35s",
                      textDecoration: "none",
                    }}
                  >
                    {ctaText}
                    <i className="icofont-long-arrow-right" style={{ fontSize: 16 }}></i>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
