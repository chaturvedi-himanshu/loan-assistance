"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import IconWithFallback from "@/components/IconWithFallback";

interface ServiceCardProps {
  _id: string;
  /** URL slug — preferred when navigating to the detail page. */
  slug?: string;
  title: string;
  icon: string;
  color: string;
  rate: string;
  desc: string;
  amount: string;
  tenure: string;
  features: string[];
  /** Position in the parent list. Used to rotate fallback icons so
   *  adjacent cards do not all render the same default glyph. */
  index?: number;
}

export default function ServiceCard({ _id, slug, title, icon, color, rate, desc, amount, tenure, features, index = 0 }: ServiceCardProps) {
  const router = useRouter();
  // Always prefer the slug; fall back to id only if a legacy doc has
  // not yet had its slug back-filled.
  const detailHref = `/service-details/${slug ?? _id}`;
  return (
    <div
      onClick={() => router.push(detailHref)}
      style={{
        borderRadius: 20,
        overflow: "hidden",
        background: "#fff",
        height: "100%",
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
        border: "1px solid #ebebf5",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.25s, box-shadow 0.25s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 16px 48px rgba(0,0,0,0.12)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.06)";
      }}
    >
      {/* Coloured header band */}
      <div
        style={{
          background: `linear-gradient(135deg, ${color}, ${color}bb)`,
          padding: "24px 24px 20px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: -30, right: -30, width: 110, height: 110, borderRadius: "50%", background: "rgba(255,255,255,0.12)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -20, right: 20, width: 70, height: 70, borderRadius: "50%", background: "rgba(255,255,255,0.08)", pointerEvents: "none" }} />

        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", position: "relative", zIndex: 1 }}>
          <div style={{ width: 48, height: 48, borderRadius: 13, background: "rgba(255,255,255,0.22)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <IconWithFallback icon={icon} title={title} index={index} color="#fff" size={22} />
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 2 }}>From</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#fff", lineHeight: 1 }}>{rate}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.75)" }}>per annum</div>
          </div>
        </div>
        <h4 style={{ color: "#fff", fontSize: 18, fontWeight: 700, margin: "14px 0 0", position: "relative", zIndex: 1 }}>{title}</h4>
      </div>

      {/* Body */}
      <div style={{ padding: "20px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
        <p style={{ color: "#777", fontSize: 14, lineHeight: 1.65, margin: "0 0 16px" }}>{desc}</p>

        {/* Amount + Tenure chips */}
        <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
          <div style={{ flex: 1, background: "#f6f6fb", borderRadius: 10, padding: "10px 12px" }}>
            <div style={{ fontSize: 10, color: "#aaa", textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 3 }}>Max Amount</div>
            <div style={{ fontWeight: 700, color: "#333", fontSize: 14 }}>{amount}</div>
          </div>
          <div style={{ flex: 1, background: "#f6f6fb", borderRadius: 10, padding: "10px 12px" }}>
            <div style={{ fontSize: 10, color: "#aaa", textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 3 }}>Tenure</div>
            <div style={{ fontWeight: 700, color: "#333", fontSize: 14 }}>{tenure}</div>
          </div>
        </div>

        {/* Features */}
        <ul style={{ padding: 0, margin: "0 0 20px", listStyle: "none", flex: 1 }}>
          {features.map((f) => (
            <li key={f} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 7 }}>
              <span style={{ width: 18, height: 18, borderRadius: "50%", background: `${color}1a`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <i className="icofont-check" style={{ color, fontSize: 10 }}></i>
              </span>
              <span style={{ color: "#666", fontSize: 13 }}>{f}</span>
            </li>
          ))}
        </ul>

        <Link
          href="/application-form"
          onClick={(e) => e.stopPropagation()}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            background: `${color}14`,
            border: `1.5px solid ${color}44`,
            color,
            borderRadius: 10,
            padding: "11px 0",
            fontWeight: 700,
            fontSize: 14,
            textDecoration: "none",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = color;
            (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = `${color}14`;
            (e.currentTarget as HTMLAnchorElement).style.color = color;
          }}
        >
          Enquire Now <i className="icofont-long-arrow-right"></i>
        </Link>
      </div>
    </div>
  );
}
