"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";

type NavLeaf = { href: string; icon: string; label: string };
type NavGroup = { id: string; icon: string; label: string; children: NavLeaf[] };
type NavEntry = NavLeaf | NavGroup;

const isGroup = (n: NavEntry): n is NavGroup => "children" in n;

const navItems: NavEntry[] = [
  { href: "/admin", icon: "icofont-dashboard-web", label: "Dashboard" },

  {
    id: "homepage",
    icon: "icofont-ui-home",
    label: "Homepage",
    children: [
      { href: "/admin/homepage/hero", icon: "icofont-image", label: "Hero Section" },
      { href: "/admin/homepage/stats", icon: "fa fa-bar-chart", label: "Stats Bar" },
      { href: "/admin/homepage/services-intro", icon: "icofont-briefcase", label: "Services Intro" },
      { href: "/admin/homepage/loan-products", icon: "icofont-bank-alt", label: "Loan Products" },
      { href: "/admin/homepage/why-choose-us", icon: "icofont-star", label: "Why Choose Us" },
      { href: "/admin/homepage/contact", icon: "icofont-headphone-alt", label: "Contact Banner" },
      { href: "/admin/homepage/process", icon: "icofont-rocket-alt-2", label: "Process Steps" },
      { href: "/admin/homepage/conveyancing", icon: "icofont-law-document", label: "Conveyancing" },
      { href: "/admin/homepage/apply-amount", icon: "icofont-money", label: "Apply Amount Form" },
      { href: "/admin/homepage/emi-calculator", icon: "icofont-ui-calculator", label: "EMI Calculator" },
      { href: "/admin/homepage/team", icon: "icofont-people", label: "Team Section" },
      { href: "/admin/homepage/testimonials", icon: "icofont-speech-comments", label: "Testimonials" },
    ],
  },

  {
    id: "footer",
    icon: "icofont-ui-press",
    label: "Footer",
    children: [
      { href: "/admin/footer/brand", icon: "icofont-image", label: "Brand Column" },
      { href: "/admin/footer/quick-links", icon: "icofont-listing-box", label: "Quick Links" },
      { href: "/admin/footer/loan-types", icon: "icofont-bank-alt", label: "Loan Types Links" },
      { href: "/admin/footer/newsletter", icon: "icofont-email", label: "Newsletter" },
      { href: "/admin/footer/bottom-bar", icon: "icofont-copyright", label: "Bottom Bar" },
      { href: "/admin/footer/copyright-bar", icon: "icofont-ui-press", label: "Copyright Bar" },
    ],
  },

  { href: "/admin/about", icon: "icofont-info-circle", label: "About Page" },
  { href: "/admin/services", icon: "icofont-briefcase", label: "Services (CRUD)" },
  { href: "/admin/conveyancing", icon: "icofont-law-document", label: "Conveyancing (CRUD)" },
  { href: "/admin/why-choose-us", icon: "icofont-star", label: "Why Choose Us (CRUD)" },
  { href: "/admin/process-steps", icon: "icofont-rocket-alt-2", label: "Process Steps (CRUD)" },
  { href: "/admin/partners", icon: "icofont-handshake-deal", label: "Partners & Awards" },
  { href: "/admin/team", icon: "icofont-people", label: "Team Members (CRUD)" },
  { href: "/admin/testimonials", icon: "icofont-speech-comments", label: "Testimonials (CRUD)" },
  { href: "/admin/stats", icon: "fa fa-bar-chart", label: "Stats (CRUD)" },
  { href: "/admin/blog", icon: "icofont-newspaper", label: "Blog Posts" },
  { href: "/admin/chatbot", icon: "icofont-chat", label: "Chatbot Q&A" },
  { href: "/admin/chat-leads", icon: "icofont-contacts", label: "Chat Leads" },
  { href: "/admin/applications", icon: "icofont-paper", label: "Applications" },
  { href: "/admin/form-fields", icon: "icofont-ui-form", label: "Form Fields" },
  { href: "/admin/settings", icon: "icofont-settings-alt", label: "Settings" },
];

function isActive(href: string, pathname: string) {
  return pathname === href || (href !== "/admin" && pathname.startsWith(href));
}

function flattenLeaves(entries: NavEntry[]): NavLeaf[] {
  return entries.flatMap((e) => (isGroup(e) ? e.children : [e]));
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Track which groups are expanded. Auto-expand the group containing the active route.
  const initialOpenGroups = useMemo(() => {
    const set: Record<string, boolean> = {};
    navItems.forEach((n) => {
      if (isGroup(n) && n.children.some((c) => isActive(c.href, pathname))) {
        set[n.id] = true;
      }
    });
    return set;
  }, [pathname]);

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(initialOpenGroups);

  useEffect(() => {
    setOpenGroups((prev) => ({ ...prev, ...initialOpenGroups }));
  }, [initialOpenGroups]);

  if (pathname === "/admin/login") return <>{children}</>;

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.replace("/admin/login");
  };

  const toggleGroup = (id: string) =>
    setOpenGroups((p) => ({ ...p, [id]: !p[id] }));

  // Compute current page label (search nested)
  const currentLabel =
    flattenLeaves(navItems).find((l) => isActive(l.href, pathname))?.label ?? "Admin";

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Segoe UI', sans-serif", background: "#f0f2f8" }}>
      {/* ── Sidebar ── */}
      <aside style={{
        width: 240, background: "#13132b", display: "flex", flexDirection: "column",
        position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 100,
        boxShadow: "4px 0 20px rgba(0,0,0,0.15)",
      }}>
        {/* Logo */}
        <div style={{ padding: "28px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#2cbbdf,#38cfe8)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <i className="icofont-bank" style={{ color: "#fff", fontSize: 18 }}></i>
            </div>
            <div>
              <div style={{ color: "#fff", fontWeight: 800, fontSize: 16, lineHeight: 1.1 }}>Payloan</div>
              <div style={{ color: "rgba(255,255,255,0.40)", fontSize: 11 }}>Admin Panel</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, overflowY: "auto", padding: "12px 10px" }}>
          {navItems.map((item) => {
            if (isGroup(item)) {
              const open = openGroups[item.id] ?? false;
              const hasActiveChild = item.children.some((c) => isActive(c.href, pathname));
              return (
                <div key={item.id} style={{ marginBottom: 4 }}>
                  <button
                    type="button"
                    onClick={() => toggleGroup(item.id)}
                    aria-expanded={open}
                    style={{
                      width: "100%", display: "flex", alignItems: "center", gap: 10,
                      padding: "10px 12px", borderRadius: 10,
                      background: hasActiveChild ? "rgba(44,187,223,0.12)" : "transparent",
                      borderLeft: hasActiveChild ? "3px solid #2cbbdf" : "3px solid transparent",
                      color: hasActiveChild ? "#7dd8ed" : "rgba(255,255,255,0.55)",
                      border: "none", cursor: "pointer", textAlign: "left",
                      fontSize: 14, fontWeight: hasActiveChild ? 600 : 500,
                      transition: "all 0.2s",
                    }}
                  >
                    <i className={item.icon} style={{ fontSize: 17, width: 20, textAlign: "center" }}></i>
                    <span style={{ flex: 1 }}>{item.label}</span>
                    <i
                      className="icofont-rounded-down"
                      style={{
                        fontSize: 14,
                        transition: "transform 0.2s ease",
                        transform: open ? "rotate(0deg)" : "rotate(-90deg)",
                      }}
                    ></i>
                  </button>

                  <div
                    style={{
                      overflow: "hidden",
                      maxHeight: open ? `${item.children.length * 40 + 8}px` : 0,
                      transition: "max-height 0.25s ease",
                      paddingLeft: 14,
                    }}
                  >
                    <div style={{ paddingTop: 4 }}>
                      {item.children.map((child) => {
                        const active = isActive(child.href, pathname);
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            style={{
                              display: "flex", alignItems: "center", gap: 10,
                              padding: "8px 12px", borderRadius: 8, marginBottom: 2,
                              background: active ? "rgba(44,187,223,0.20)" : "transparent",
                              color: active ? "#7dd8ed" : "rgba(255,255,255,0.50)",
                              textDecoration: "none", fontSize: 13,
                              fontWeight: active ? 600 : 400,
                              transition: "all 0.2s",
                            }}
                          >
                            <i className={child.icon} style={{ fontSize: 14, width: 18, textAlign: "center" }}></i>
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            }

            const active = isActive(item.href, pathname);
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "10px 12px", borderRadius: 10, marginBottom: 4,
                  background: active ? "rgba(44,187,223,0.20)" : "transparent",
                  borderLeft: active ? "3px solid #2cbbdf" : "3px solid transparent",
                  color: active ? "#7dd8ed" : "rgba(255,255,255,0.55)",
                  textDecoration: "none", fontSize: 14, fontWeight: active ? 600 : 400,
                  transition: "all 0.2s",
                }}
              >
                <i className={item.icon} style={{ fontSize: 17, width: 20, textAlign: "center" }}></i>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div style={{ padding: "14px 20px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.40)", fontSize: 13, textDecoration: "none" }}>
            <i className="icofont-external-link"></i> View Site
          </Link>
        </div>
      </aside>

      {/* ── Main ── */}
      <div style={{ marginLeft: 240, flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        {/* Topbar */}
        <header style={{ background: "#fff", borderBottom: "1px solid #e8eaf2", padding: "0 32px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
          <div style={{ fontWeight: 700, color: "#222", fontSize: 16 }}>{currentLabel}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#f8f8fb", borderRadius: 10, padding: "6px 12px" }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#2cbbdf,#38cfe8)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <i className="icofont-user-alt-5" style={{ color: "#fff", fontSize: 14 }}></i>
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#333" }}>Admin</span>
            </div>
            <button
              onClick={handleLogout}
              style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(229,57,53,0.08)", border: "1.5px solid rgba(229,57,53,0.20)", color: "#e53935", padding: "6px 14px", borderRadius: 10, cursor: "pointer", fontSize: 13, fontWeight: 600 }}
            >
              <i className="icofont-logout" style={{ fontSize: 15 }}></i>
              Logout
            </button>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, padding: "28px 32px" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
