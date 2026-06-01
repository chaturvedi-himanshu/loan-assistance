"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface DashData {
  services: number;
  team: number;
  testimonials: number;
  blogs: number;
  applications: number;
  pending: number;
  recentApps: Array<{
    _id: string;
    name: string;
    email: string;
    loanType: string;
    status: string;
    createdAt: string;
  }>;
}

const STATUS_COLORS: Record<string, string> = {
  pending: "#ff9800",
  reviewed: "#2196f3",
  approved: "#27ae60",
  rejected: "#e53935",
};

const quickLinks = [
  {
    href: "/admin/hero",
    icon: "icofont-image",
    label: "Hero Section",
    color: "#2cbbdf",
  },
  {
    href: "/admin/services",
    icon: "icofont-briefcase",
    label: "Services",
    color: "#f0734a",
  },
  {
    href: "/admin/blog",
    icon: "icofont-newspaper",
    label: "Blog Posts",
    color: "#2196f3",
  },
  {
    href: "/admin/applications",
    icon: "icofont-paper",
    label: "Applications",
    color: "#27ae60",
  },
  {
    href: "/admin/team",
    icon: "icofont-people",
    label: "Team",
    color: "#e91e8c",
  },
  {
    href: "/admin/settings",
    icon: "icofont-settings-alt",
    label: "Settings",
    color: "#ff9800",
  },
];

export default function AdminDashboard() {
  const [data, setData] = useState<DashData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/dashboard")
      .then((r) => r.json())
      .then((r) => {
        setData(r.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const statCards = data
    ? [
        {
          label: "Services",
          value: data.services,
          icon: "icofont-briefcase",
          color: "#2cbbdf",
        },
        {
          label: "Blog Posts",
          value: data.blogs,
          icon: "icofont-newspaper",
          color: "#2196f3",
        },
        {
          label: "Team Members",
          value: data.team,
          icon: "icofont-people",
          color: "#27ae60",
        },
        {
          label: "Testimonials",
          value: data.testimonials,
          icon: "icofont-speech-comments",
          color: "#f0734a",
        },
        {
          label: "Applications",
          value: data.applications,
          icon: "icofont-paper",
          color: "#e91e8c",
        },
        {
          label: "Pending Apps",
          value: data.pending,
          icon: "icofont-clock-time",
          color: "#ff9800",
        },
      ]
    : [];

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1
          style={{
            fontSize: 26,
            fontWeight: 800,
            color: "#1a1a2e",
            margin: "0 0 6px",
          }}
        >
          Welcome back 👋
        </h1>
        <p style={{ color: "#888", margin: 0 }}>
          Here is what is happening on your Smart Loans website.
        </p>
      </div>

      {/* ── Stat cards ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 18,
          marginBottom: 32,
        }}
      >
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  padding: 22,
                  height: 96,
                  animation: "pulse 1.5s infinite",
                }}
              />
            ))
          : statCards.map((s) => (
              <div
                key={s.label}
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  padding: "20px 22px",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: `${s.color}18`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <i
                    className={s.icon}
                    style={{ color: s.color, fontSize: 22 }}
                  ></i>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 26,
                      fontWeight: 800,
                      color: "#1a1a2e",
                      lineHeight: 1,
                    }}
                  >
                    {s.value}
                  </div>
                  <div style={{ fontSize: 13, color: "#999", marginTop: 3 }}>
                    {s.label}
                  </div>
                </div>
              </div>
            ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {/* ── Quick nav ── */}
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            padding: 24,
            boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
          }}
        >
          <h3
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#1a1a2e",
              margin: "0 0 18px",
            }}
          >
            Quick Actions
          </h3>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            {quickLinks.map((ql) => (
              <Link
                key={ql.href}
                href={ql.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "12px 14px",
                  borderRadius: 10,
                  background: `${ql.color}0F`,
                  border: `1px solid ${ql.color}22`,
                  textDecoration: "none",
                  transition: "transform 0.15s",
                }}
              >
                <i
                  className={ql.icon}
                  style={{ color: ql.color, fontSize: 18 }}
                ></i>
                <span style={{ color: "#333", fontSize: 13, fontWeight: 600 }}>
                  {ql.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Recent applications ── */}
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            padding: 24,
            boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <h3
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#1a1a2e",
                margin: 0,
              }}
            >
              Recent Applications
            </h3>
            <Link
              href="/admin/applications"
              style={{ fontSize: 13, color: "#2cbbdf", textDecoration: "none" }}
            >
              View all →
            </Link>
          </div>
          {loading ? (
            <p style={{ color: "#aaa" }}>Loading…</p>
          ) : !data?.recentApps.length ? (
            <p style={{ color: "#aaa", fontSize: 14 }}>No applications yet.</p>
          ) : (
            <div>
              {data.recentApps.map((app) => (
                <div
                  key={app._id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 0",
                    borderBottom: "1px solid #f0f0f8",
                  }}
                >
                  <div>
                    <div
                      style={{ fontWeight: 600, fontSize: 14, color: "#222" }}
                    >
                      {app.name}
                    </div>
                    <div style={{ fontSize: 12, color: "#aaa" }}>
                      {app.loanType} • {app.email}
                    </div>
                  </div>
                  <span
                    style={{
                      background: `${STATUS_COLORS[app.status]}18`,
                      color: STATUS_COLORS[app.status],
                      padding: "3px 10px",
                      borderRadius: 8,
                      fontSize: 12,
                      fontWeight: 700,
                      textTransform: "capitalize",
                    }}
                  >
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
