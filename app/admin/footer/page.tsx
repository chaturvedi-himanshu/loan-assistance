import Link from "next/link";

const sections = [
  { href: "/admin/footer/brand", icon: "icofont-image", label: "Brand Column", desc: "Logo, alt text and the short description shown in the first footer column." },
  { href: "/admin/footer/quick-links", icon: "icofont-listing-box", label: "Quick Links", desc: "Heading and list of navigation links shown in the second column." },
  { href: "/admin/footer/loan-types", icon: "icofont-bank-alt", label: "Loan Types Links", desc: "Heading and list of loan-type links shown in the third column." },
  { href: "/admin/footer/newsletter", icon: "icofont-email", label: "Newsletter", desc: "Heading, description, form labels and trust badges." },
  { href: "/admin/footer/bottom-bar", icon: "icofont-copyright", label: "Bottom Bar", desc: "Copyright text and small links shown in the bottom strip." },
  { href: "/admin/footer/copyright-bar", icon: "icofont-ui-press", label: "Copyright Bar", desc: "Edit the small copyright bar shown below the footer." },
];

export default function FooterAdminIndex() {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1a1a2e", margin: "0 0 6px" }}>Footer</h2>
        <p style={{ color: "#888", margin: 0 }}>
          Edit every section of the site-wide footer. Contact info and social links still live in <Link href="/admin/settings" style={{ color: "#2cbbdf" }}>Site Settings</Link>.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            style={{
              display: "block",
              background: "#fff",
              borderRadius: 14,
              padding: 20,
              boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
              textDecoration: "none",
              color: "inherit",
              border: "1px solid #eef",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
              <div style={{ width: 42, height: 42, borderRadius: 11, background: "rgba(44,187,223,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <i className={s.icon} style={{ color: "#2cbbdf", fontSize: 20 }}></i>
              </div>
              <h4 style={{ margin: 0, fontSize: 15, color: "#1a1a2e", fontWeight: 700 }}>{s.label}</h4>
            </div>
            <p style={{ fontSize: 13, color: "#888", margin: 0, lineHeight: 1.5 }}>{s.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
