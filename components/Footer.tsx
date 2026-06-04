"use client";

import { useMemo } from "react";
import Link from "next/link";
import DynamicImage from "@/components/DynamicImage";
import type { SiteSettings, FooterContentData, FooterLink } from "@/lib/data";

interface FooterProps {
  settings?: SiteSettings;
  content?: FooterContentData;
}

const DEFAULT_QUICK_LINKS: FooterLink[] = [
  { label: "Home", href: "/", icon: "icofont-home" },
  { label: "About Us", href: "/about", icon: "icofont-people" },
  { label: "Services", href: "/services", icon: "icofont-briefcase" },
  { label: "Contact", href: "/contact", icon: "icofont-phone" },
  { label: "Application Form", href: "/application-form", icon: "icofont-paper" },
];

const DEFAULT_LOAN_LINKS: FooterLink[] = [
  { label: "Home Loan", href: "/services", icon: "icofont-building" },
  { label: "Business Loan", href: "/services", icon: "icofont-businessman" },
  { label: "Car Loan", href: "/services", icon: "icofont-car" },
];

function interpolate(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? ""));
}

export default function Footer({ settings, content }: FooterProps) {
  const s = settings;
  const c = content;

  const brandLogo = c?.brandLogo ?? "/images/logo.png";
  const brandLogoAlt = c?.brandLogoAlt ?? s?.siteName ?? "Smart Loans";
  const brandDescription =
    c?.brandDescription ??
    "Smart Loans helps you access fast, affordable financing with zero hassle. Trusted by thousands of customers across the country.";

  const quickLinksHeading = c?.quickLinksHeading ?? "Quick Links";
  const quickLinks = c?.quickLinks?.length ? c.quickLinks : DEFAULT_QUICK_LINKS;

  const loanLinksHeading = c?.loanLinksHeading ?? "Loan Types";
  const loanLinks = c?.loanLinks?.length ? c.loanLinks : DEFAULT_LOAN_LINKS;

  const bottomLinks = c?.bottomLinks?.length
    ? c.bottomLinks
    : [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Use", href: "#" },
        { label: "Sitemap", href: "#" },
      ];

  const copyrightText = useMemo(() => {
    const template = c?.copyrightText ?? "© {year} {siteName}. All rights reserved.";
    return interpolate(template, {
      year: new Date().getFullYear(),
      siteName: s?.siteName ?? "Smart Loans",
    });
  }, [c?.copyrightText, s?.siteName]);

  const phone = s?.phone1 ?? "+1 (800) 694-8956";
  const whatsapp = s?.whatsapp ?? "";
  const email = s?.email ?? "hello@payloan.com";
  const contactInfo: { icon: string; text: string; href?: string }[] = [
    { icon: "icofont-location-pin", text: s?.address ?? "42 Finance Tower, New York, NY 10001" },
    { icon: "icofont-phone", text: phone, href: `tel:${phone.replace(/[^+\d]/g, "")}` },
    ...(whatsapp
      ? [{ icon: "icofont-brand-whatsapp", text: whatsapp, href: `https://wa.me/${whatsapp.replace(/[^\d]/g, "")}` }]
      : []),
    { icon: "icofont-email", text: email, href: `mailto:${email}` },
    { icon: "icofont-clock-time", text: s?.workingHours ?? "Mon – Sat: 9 AM – 6 PM" },
  ];
  const socialsWithLinks = [
    { icon: "icofont-facebook",     href: s?.facebookUrl  ?? "#", color: "#3b5998", label: "Facebook" },
    { icon: "icofont-twitter",      href: s?.twitterUrl   ?? "#", color: "#1da1f2", label: "Twitter" },
    { icon: "icofont-linkedin",     href: s?.linkedinUrl  ?? "#", color: "#0077b5", label: "LinkedIn" },
    { icon: "icofont-instagram",    href: s?.instagramUrl ?? "#", color: "#e1306c", label: "Instagram" },
    { icon: "icofont-youtube-play", href: s?.youtubeUrl   ?? "#", color: "#ff0000", label: "YouTube" },
  ];

  return (
    <footer style={{ background: "#13132b", position: "relative", overflow: "hidden" }}>
      {/* ── Decorative SVG ── */}
      <svg
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}
        viewBox="0 0 1440 600"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <circle cx="-100" cy="300" r="380" fill="none" stroke="rgba(44,187,223,0.07)" strokeWidth="60" />
        <circle cx="1540" cy="300" r="380" fill="none" stroke="rgba(44,187,223,0.07)" strokeWidth="60" />
        <circle cx="720" cy="-80" r="280" fill="none" stroke="rgba(44,187,223,0.04)" strokeWidth="40" />
        <circle cx="720" cy="680" r="280" fill="none" stroke="rgba(240,115,74,0.05)" strokeWidth="40" />
        <ellipse cx="0" cy="0" rx="220" ry="160" fill="rgba(44,187,223,0.06)" />
        <ellipse cx="1440" cy="600" rx="220" ry="160" fill="rgba(240,115,74,0.06)" />
        <ellipse cx="720" cy="300" rx="300" ry="180" fill="rgba(44,187,223,0.02)" />
        <path d="M0 0 Q360 40 720 0 Q1080 -40 1440 0 L1440 50 Q1080 90 720 50 Q360 10 0 50 Z" fill="rgba(44,187,223,0.06)" />
        {Array.from({ length: 6 }).map((_, r) =>
          Array.from({ length: 18 }).map((_, ci) => (
            <circle key={`d${r}-${ci}`} cx={40 + ci * 80} cy={60 + r * 90} r="1.8" fill="rgba(44,187,223,0.10)" />
          )),
        )}
        <line x1="0" y1="600" x2="200" y2="300" stroke="rgba(44,187,223,0.05)" strokeWidth="1" strokeDasharray="6 14" />
        <line x1="1440" y1="0" x2="1240" y2="300" stroke="rgba(240,115,74,0.05)" strokeWidth="1" strokeDasharray="6 14" />
        <line x1="400" y1="0" x2="600" y2="600" stroke="rgba(44,187,223,0.03)" strokeWidth="1" strokeDasharray="4 18" />
        <line x1="1040" y1="0" x2="840" y2="600" stroke="rgba(44,187,223,0.03)" strokeWidth="1" strokeDasharray="4 18" />
        <circle cx="1340" cy="80" r="16" fill="rgba(240,115,74,0.15)" />
        <circle cx="1310" cy="110" r="9" fill="rgba(240,115,74,0.20)" />
        <circle cx="100" cy="520" r="14" fill="rgba(240,115,74,0.12)" />
        <circle cx="130" cy="548" r="8" fill="rgba(240,115,74,0.18)" />
        {[[300, 80], [1100, 500], [900, 100], [500, 480]].map(([x, y], i) => (
          <g key={i}>
            <line x1={x - 8} y1={y} x2={x + 8} y2={y} stroke="rgba(44,187,223,0.14)" strokeWidth="1.5" />
            <line x1={x} y1={y - 8} x2={x} y2={y + 8} stroke="rgba(44,187,223,0.14)" strokeWidth="1.5" />
          </g>
        ))}
      </svg>

      {/* ── Top divider stripe ── */}
      <div style={{ height: 4, background: "linear-gradient(90deg, #2cbbdf 0%, #f0734a 50%, #2cbbdf 100%)", position: "relative", zIndex: 1 }} />

      {/* ── Main footer body ── */}
      <div className="container" style={{ position: "relative", zIndex: 1, padding: "64px 15px 48px" }}>
        <div className="row">
          {/* ── Col 1 — Brand ── */}
          <div className="col-lg-6 col-md-6" style={{ marginBottom: 40 }}>
            <Link href="/">
              <DynamicImage
                src={brandLogo}
                alt={brandLogoAlt}
                width={160}
                height={48}
                style={{ marginBottom: 20, filter: "brightness(0) invert(1)" }}
              />
            </Link>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, lineHeight: 1.8, marginBottom: 24 }}>
              {brandDescription}
            </p>

            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px" }}>
              {contactInfo.map((ci) => {
                const iconColor = ci.icon === "icofont-brand-whatsapp" ? "#25d366" : "#2cbbdf";
                const content = (
                  <>
                    <div style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(44,187,223,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                      <i className={ci.icon} style={{ color: iconColor, fontSize: 14 }}></i>
                    </div>
                    <span style={{ color: "rgba(255,255,255,0.60)", fontSize: 13, lineHeight: 1.6 }}>{ci.text}</span>
                  </>
                );
                return (
                  <li key={ci.text} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
                    {ci.href ? (
                      <a
                        href={ci.href}
                        {...(ci.icon === "icofont-brand-whatsapp" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        style={{ display: "flex", alignItems: "flex-start", gap: 10, textDecoration: "none" }}
                      >
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </li>
                );
              })}
            </ul>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {socialsWithLinks.map((soc) => (
                <a
                  key={soc.label}
                  href={soc.href}
                  aria-label={soc.label}
                  style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.10)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.60)", fontSize: 15, transition: "all 0.3s", textDecoration: "none" }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = soc.color;
                    el.style.borderColor = soc.color;
                    el.style.color = "#fff";
                    el.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = "rgba(255,255,255,0.07)";
                    el.style.borderColor = "rgba(255,255,255,0.10)";
                    el.style.color = "rgba(255,255,255,0.60)";
                    el.style.transform = "translateY(0)";
                  }}
                >
                  <i className={soc.icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* ── Col 2 — Quick Links ── */}
          <div className="col-lg-3 col-md-6" style={{ marginBottom: 40 }}>
            <h4 style={{ color: "#fff", fontSize: 17, fontWeight: 700, marginBottom: 24, position: "relative", paddingBottom: 14 }}>
              {quickLinksHeading}
              <span style={{ position: "absolute", bottom: 0, left: 0, width: 32, height: 3, background: "linear-gradient(90deg,#2cbbdf,#f0734a)", borderRadius: 2 }} />
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {quickLinks.map((l, i) => (
                <li key={`${l.label}-${i}`} style={{ marginBottom: 12 }}>
                  <Link
                    href={l.href || "#"}
                    style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(255,255,255,0.55)", fontSize: 14, textDecoration: "none", transition: "all 0.25s" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "#2cbbdf";
                      (e.currentTarget as HTMLAnchorElement).style.paddingLeft = "4px";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.55)";
                      (e.currentTarget as HTMLAnchorElement).style.paddingLeft = "0";
                    }}
                  >
                    {l.icon && <i className={l.icon} style={{ fontSize: 14, color: "#2cbbdf", width: 16, flexShrink: 0 }}></i>}
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3 — Loan Types ── */}
          <div className="col-lg-3 col-md-6" style={{ marginBottom: 40 }}>
            <h4 style={{ color: "#fff", fontSize: 17, fontWeight: 700, marginBottom: 24, position: "relative", paddingBottom: 14 }}>
              {loanLinksHeading}
              <span style={{ position: "absolute", bottom: 0, left: 0, width: 32, height: 3, background: "linear-gradient(90deg,#2cbbdf,#f0734a)", borderRadius: 2 }} />
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {loanLinks.map((l, i) => (
                <li key={`${l.label}-${i}`} style={{ marginBottom: 12 }}>
                  <Link
                    href={l.href || "#"}
                    style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(255,255,255,0.55)", fontSize: 14, textDecoration: "none", transition: "all 0.25s" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "#f0734a";
                      (e.currentTarget as HTMLAnchorElement).style.paddingLeft = "4px";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.55)";
                      (e.currentTarget as HTMLAnchorElement).style.paddingLeft = "0";
                    }}
                  >
                    {l.icon && <i className={l.icon} style={{ fontSize: 14, color: "#f0734a", width: 16, flexShrink: 0 }}></i>}
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", position: "relative", zIndex: 1 }}>
        <div className="container" style={{ padding: "20px 15px" }}>
          <div className="row align-items-center">
            <div className="col-md-6">
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, margin: 0 }}>{copyrightText}</p>
            </div>
            <div className="col-md-6 text-right">
              <div style={{ display: "flex", gap: 20, justifyContent: "flex-end", flexWrap: "wrap" }}>
                {bottomLinks.map((l, i) => (
                  <Link
                    key={`${l.label}-${i}`}
                    href={l.href || "#"}
                    style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#2cbbdf")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.35)")}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
