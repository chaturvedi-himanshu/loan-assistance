import Link from "next/link";

const sections = [
  { href: "/admin/homepage/hero", icon: "icofont-image", label: "Hero Section", desc: "Main banner with headline, CTAs, and floating badges." },
  { href: "/admin/homepage/stats", icon: "fa fa-bar-chart", label: "Stats Bar", desc: "The teal counter strip directly under the hero." },
  { href: "/admin/homepage/services-intro", icon: "icofont-briefcase", label: "Services Intro", desc: "Heading, features list and CTA for the services section." },
  { href: "/admin/homepage/loan-products", icon: "icofont-bank-alt", label: "Loan Products", desc: "Card grid heading, subtitle, and product tag labels." },
  { href: "/admin/homepage/why-choose-us", icon: "icofont-star", label: "Why Choose Us", desc: "Section heading and bottom highlights strip." },
  { href: "/admin/homepage/contact", icon: "icofont-headphone-alt", label: "Contact Banner", desc: "Headings, image, floating badges and labels." },
  { href: "/admin/homepage/process", icon: "icofont-rocket-alt-2", label: "Process Steps", desc: "Section heading for the application process steps." },
  { href: "/admin/homepage/conveyancing", icon: "icofont-law-document", label: "Conveyancing", desc: "Dark section heading, subtitle, and CTA labels." },
  { href: "/admin/homepage/apply-amount", icon: "icofont-money", label: "Apply Amount Form", desc: "Heading, input placeholders and submit button label." },
  { href: "/admin/homepage/emi-calculator", icon: "icofont-ui-calculator", label: "EMI Calculator", desc: "Slider ranges, defaults, currency and labels." },
  { href: "/admin/homepage/team", icon: "icofont-people", label: "Team Section", desc: "Section heading for the team members grid." },
  { href: "/admin/homepage/testimonials", icon: "icofont-speech-comments", label: "Testimonials", desc: "Section heading, image and rating badge." },
];

export default function HomepageAdminIndex() {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1a1a2e", margin: "0 0 6px" }}>Homepage</h2>
        <p style={{ color: "#888", margin: 0 }}>
          Edit every section of the homepage. Pick a section below to manage its copy, images and item lists.
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
              transition: "transform 0.15s, box-shadow 0.15s",
              border: "1px solid #eef",
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
